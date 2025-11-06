import type { AuthProvider, CaptchaToken } from '@models/auth';
import type { AuthStore } from './auth.types';

import { create } from 'zustand';

import {
	handleGuestLogin,
	handleProviderLogin,
	handleLogout,
	handleSessionRestoration
} from './auth.utils.ts';

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	session: null,
	authPending: false,
	authError: null,
	clearAuthError: () => {
		set({ authError: null });
	},
	loginGuest: async (token?: CaptchaToken) => {
		set({ authPending: true, authError: null });
		await handleGuestLogin(set, token);
		set({ authPending: false });
	},
	loginProvider: async (provider: AuthProvider) => {
		set({ authPending: true, authError: null });
		await handleProviderLogin(set, provider);
		set({ authPending: false });
	},
	logout: async () => {
		set({ authPending: true, authError: null });
		await handleLogout(set);
		set({ authPending: false });
	},
	restoreSession: async () => {
		set({ authPending: true, authError: null });
		await handleSessionRestoration(set);
		set({ authPending: false });
	}
}));
