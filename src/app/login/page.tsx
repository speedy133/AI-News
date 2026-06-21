import { login } from './actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ message?: string }>
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-20 mx-auto">
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={login}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Pulse</h1>
          <p className="text-gray-500">Sign in to personalize your AI news feed</p>
        </div>
        
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email address
        </label>
        <input
          className="rounded-lg px-4 py-3 bg-white border border-gray-300 mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        
        <button className="bg-gray-900 rounded-lg px-4 py-3 text-white mb-2 hover:bg-gray-800 font-medium transition-colors shadow-sm">
          Send Magic Link
        </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-blue-50 text-blue-900 text-sm font-medium text-center rounded-lg border border-blue-100">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
