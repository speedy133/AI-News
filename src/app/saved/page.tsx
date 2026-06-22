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

  const articles = (savedRaw || []).map((s: any) => s.articles).filter(Boolean);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-secondary/10 rounded-[100%] blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        
        <header className="mb-14">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6 text-on-surface">
            Saved Signals.
          </h1>
          <p className="text-xl text-on-surface-variant font-medium">
            Your personal intelligence archive.
          </p>
        </header>

        <section aria-label="Saved Feed" className="flex flex-col gap-8">
          <Suspense fallback={<div className="flex flex-col gap-8"><SkeletonLoader /><SkeletonLoader /></div>}>
            {articles.length > 0 ? (
              articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} isSaved={true} />
              ))
            ) : (
              <div className="text-center py-32 glass rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/5 to-transparent"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold text-on-surface">No saved items</h3>
                  <p className="mt-4 text-lg text-on-surface-variant max-w-md mx-auto">
                    You haven't bookmarked any signals yet. Explore the feed to build your archive.
                  </p>
                </div>
              </div>
            )}
          </Suspense>
        </section>

      </div>
    </main>
  );
}
