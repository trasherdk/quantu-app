/// <reference types="@sveltejs/kit" />
/// <reference types="@types/vite" />

import type { ITokenValue } from '$lib/api/auth';
import type { IJwtString } from '$lib/api/jwt';
import type { User } from '@prisma/client';
import type * as bootstrap from 'bootstrap';

declare namespace App {
	interface Locals {
		rawToken?: IJwtString<ITokenValue>;
		token?: ITokenValue;
	}
	// interface Platform {}
	interface Session {
		user: Omit<User, 'encryptedPassword'>;
	}
	// interface Stuff {}
}

declare global {
	interface Window {
		bootstrap: typeof bootstrap;
		dataLayer: IArguments[];
		gtag(type: string, ...args: any[]): void;
	}
}
