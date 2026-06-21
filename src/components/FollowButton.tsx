'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function FollowButton({ topicId, initialFollowed = false }: { topicId: string, initialFollowed?: boolean }) {
  const [isFollowed, setIsFollowed] = useState(initialFollowed)
  const supabase = createClient()
  const router = useRouter()

  async function toggleFollow() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    if (isFollowed) {
      await supabase.from('user_follows').delete().eq('topic_id', topicId).eq('user_id', user.id)
      setIsFollowed(false)
    } else {
      await supabase.from('user_follows').insert({ topic_id: topicId })
      setIsFollowed(true)
    }
  }

  return (
    <button 
      onClick={toggleFollow} 
      className={`ml-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
        isFollowed 
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {isFollowed ? 'Following' : 'Follow'}
    </button>
  )
}
