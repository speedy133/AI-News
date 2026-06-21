import { createClient } from '@/utils/supabase/server';
import ArticleCard from '@/components/ArticleCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

export const revalidate = 0; // Dynamic route

export default async function SavedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: savedRaw } = await supabase
    .from('saved_articles')
    .select(`
      article_id,
      articles (
        id, title, source, url, image_url, published_at
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Map out the nested article object
  const articles = (savedRaw || []).map((s: any) => s.articles).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight sm:text-5xl mb-4">
            Saved Articles
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            Your personal reading list.
          </p>
        </header>

        <section aria-label="Saved Feed" className="mt-10 flex flex-col gap-6">
          <Suspense fallback={<div className="flex flex-col gap-6"><SkeletonLoader /><SkeletonLoader /></div>}>
            {articles.length > 0 ? (
              articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} isSaved={true} />
              ))
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 border-dashed shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">No saved articles</h3>
                <p className="mt-3 text-base text-gray-500">
                  You haven't saved any articles yet. Explore the feed to build your reading list.
                </p>
              </div>
            )}
          </Suspense>
        </section>

      </div>
    </main>
  );
}
