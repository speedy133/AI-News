import { login, loginWithGoogle } from './actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ message?: string }>
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-24 mx-auto relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-[100%] blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="flex-1 flex flex-col w-full justify-center gap-2 glass-panel p-8 rounded-3xl shadow-2xl border border-white/10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-extrabold mb-3 text-on-surface">Sign In</h1>
          <p className="text-on-surface-variant">Initialize your custom intelligence feed.</p>
        </div>
        
        <form action={loginWithGoogle} className="flex flex-col gap-4 mb-6">
          <button type="submit" className="flex items-center justify-center gap-3 glass bg-surface-container hover:bg-surface-container-high px-4 py-3 rounded-xl border border-white/5 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-semibold text-on-surface">Continue with Google</span>
          </button>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Or Magic Link</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>
        
        <form className="flex flex-col w-full" action={login}>
          <label className="text-sm font-semibold text-on-surface-variant mb-1 ml-1" htmlFor="email">
            Email address
          </label>
          <input
            className="rounded-xl px-4 py-3 bg-surface-container border border-white/10 text-on-surface mb-6 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          
          <button type="submit" className="bg-primary text-on-primary rounded-xl px-4 py-3 font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(173,198,255,0.4)]">
            Send Magic Link
          </button>
          
          {searchParams?.message && (
            <div className="mt-6 p-4 bg-tertiary/10 text-tertiary text-sm font-medium text-center rounded-xl border border-tertiary/20">
              {searchParams.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
