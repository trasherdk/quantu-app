import type { Result } from '@prisma/client';
import { authenticated } from '$lib/api/auth';
import { run } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit/types/internal';
import { removePrivate } from './departments/[departmentUrl]/challenges';

export const get = authenticated((event: RequestEvent) =>
	run(async (client) => {
		const challenges = await client.challenge.findMany({
			where: {
				visible: true,

				NOT: [{ releasedAt: null }],

				releasedAt: {
					lte: new Date()
				}
			},
			include: {
				department: {
					select: {
						url: true,
						name: true
					}
				}
			},
			orderBy: {
				releasedAt: 'desc'
			}
		});

		const [results, solvers] = await Promise.all([
			client.result.findMany({
				where: {
					userId: event.locals.token.userId,
					challengeId: {
						in: challenges.map((challenge) => challenge.id)
					}
				}
			}),
			client.result.groupBy({
				by: ['challengeId'],
				_count: { _all: true },
				where: {
					challengeId: {
						in: challenges.map((challenge) => challenge.id)
					}
				}
			})
		]);

		const resultMap = results.reduce((map, result) => {
			map[result.challengeId] = result;
			return map;
		}, {} as Record<string, Result>);
		const solverMap = solvers.reduce((map, solver) => {
			map[solver.challengeId] = solver._count._all;
			return map;
		}, {} as Record<string, number>);

		return {
			body: challenges.map((challenge) => {
				(challenge as any).result = resultMap[challenge.id];
				(challenge as any).solvers = solverMap[challenge.id] || 0;
				return removePrivate(challenge);
			}),
			status: 200
		};
	})
);
