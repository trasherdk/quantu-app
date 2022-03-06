import { run } from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit/types/internal';

export async function get(event: RequestEvent) {
	const departmentUrl: string = event.params.departmentUrl;

	return run(async (client) =>
		client.department.findUnique({
			where: {
				url: departmentUrl
			}
		})
	).then((departments) => ({
		body: departments,
		status: 200
	}));
}