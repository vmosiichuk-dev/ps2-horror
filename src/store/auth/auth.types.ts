import type { Session, User } from '@supabase/supabase-js';
import type { AuthProvider, CaptchaToken } from '@models/auth';

export type AuthStore = {
	user: User | null;
	session: Session | null;
	authPending: boolean;
	authError: string | null;
	clearAuthError: () => void;
	loginGuest: (token?: CaptchaToken) => Promise<void>;
	loginProvider: (provider: AuthProvider) => Promise<void>;
	logout: () => Promise<void>;
	restoreSession: () => Promise<void>;
};
