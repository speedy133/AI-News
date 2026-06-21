import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors">
            Pulse.
          </Link>
          {user && (
            <Link href="/saved" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Saved
            </Link>
          )}
        </div>
        
        <div>
          {user ? (
            <form action="/auth/signout" method="post">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Sign Out
              </button>
            </form>
          ) : (
            <Link href="/login" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
