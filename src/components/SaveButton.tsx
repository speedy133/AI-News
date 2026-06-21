'use client'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SaveButton({ articleId, initialSaved = false }: { articleId: string, initialSaved?: boolean }) {
  const [isSaved, setIsSaved] = useState(initialSaved)
  const supabase = createClient()
  const router = useRouter()

  async function toggleSave() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    if (isSaved) {
      await supabase.from('saved_articles').delete().eq('article_id', articleId).eq('user_id', user.id)
      setIsSaved(false)
    } else {
      await supabase.from('saved_articles').insert({ article_id: articleId, status: 'saved' })
      setIsSaved(true)
    }
  }

  return (
    <button onClick={toggleSave} className="flex items-center gap-2 text-sm font-medium transition-colors">
      {isSaved ? (
        <><BookmarkCheck className="w-4 h-4 text-blue-600" /><span className="text-blue-600">Saved</span></>
      ) : (
        <><Bookmark className="w-4 h-4 text-gray-400 hover:text-gray-900" /><span className="text-gray-400 hover:text-gray-900">Save</span></>
      )}
    </button>
  )
}
