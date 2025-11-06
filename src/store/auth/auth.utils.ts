import type { AuthProvider, CaptchaToken } from '@models/auth';
import type { AuthStore } from './auth.types';

import { supabase } from '@lib/supabase.ts';

const _handleAuthError = (
	set: (state: Partial<AuthStore>) => void,
	error: unknown
) => {
	const hasMessage = error instanceof Error;
	const message = hasMessage ? error.message : String(error);
	set({ authError: message });
};

export const handleGuestLogin = async (
	set: (state: Partial<AuthStore>) => void,
	token?: CaptchaToken
) => {
	try {
		if (token) {
			const url = `${import.meta.env.VITE_API_BASE_URL}/api/supabase/verify-captcha`;

			const res = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token }),
			});

			const { success } = await res.json();

			if (!success) {
				_handleAuthError(set, 'Captcha verification failed');
				return;
			}
		}

		const { data, error } = await supabase.auth.signInAnonymously();

		if (error) _handleAuthError(set, error);
		else set({ user: data.user, session: data.session });
	} catch (error) {
		_handleAuthError(set, error);
	}
};

export const handleProviderLogin = async (
	set: (state: Partial<AuthStore>) => void,
	provider: AuthProvider
) => {
	const options = { redirectTo: window.location.origin };
	const { error } = await supabase.auth.signInWithOAuth({ provider, options });
	if (error) _handleAuthError(set, error);
};

export const handleLogout = async (
	set: (state: Partial<AuthStore>) => void,
) => {
	const { error } = await supabase.auth.signOut();
	if (error) _handleAuthError(set, error);
	else set({ user: null, session: null });
};

export const handleSessionRestoration = async (
	set: (state: Partial<AuthStore>) => void,
) => {
	const { data, error } = await supabase.auth.getSession();
	if (error) _handleAuthError(set, error);
	else set({ user: data.session?.user, session: data.session });
};
