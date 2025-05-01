import { handleAuth } from '@supabase/auth-helpers-nextjs';

// This single API route will handle all Supabase auth actions:
// sign-in, sign-up, callback, refresh, logout, user retrieval, etc.
export default handleAuth({
  logout: { returnTo: '/' },
});
