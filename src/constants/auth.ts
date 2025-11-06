import type { AuthProvider } from '@models/auth';

export const PROVIDERS: Record<string, AuthProvider> = {
	TWITCH: 'twitch',
	GITHUB: 'github',
	DISCORD: 'discord'
};
