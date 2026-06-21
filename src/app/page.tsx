import { createClient } from '@/utils/supabase/server';
import ArticleCard from '@/components/ArticleCard';
import TopicChips from '@/components/TopicChips';
import SkeletonLoader from '@/components/SkeletonLoader';
import FollowButton from '@/components/FollowButton';
import { Suspense } from 'react';

export const revalidate = 60; // Revalidate at most every minute

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const selectedTopicSlug = typeof searchParams.topic === 'string' ? searchParams.topic : undefined;

  // Fetch all active topics for the chips
  const { data: topics } = await supabase
    .from('topics')
    .select('*')
    .eq('is_active', true)
    .order('label');

  let savedArticleIds = new Set<string>();
  let followedTopicIds = new Set<string>();

  if (user) {
    const { data: saved } = await supabase.from('saved_articles').select('article_id').eq('user_id', user.id);
    if (saved) saved.forEach((s: any) => savedArticleIds.add(s.article_id));

    const { data: follows } = await supabase.from('user_follows').select('topic_id').eq('user_id', user.id);
    if (follows) follows.forEach((f: any) => followedTopicIds.add(f.topic_id));
  }

  let articlesQuery = supabase
    .from('articles')
    .select(`
      id, title, source, url, image_url, published_at,
      article_topics!inner(
        topic_id,
        topics!inner(slug)
      )
    `)
    .order('published_at', { ascending: false })
    .limit(50);

  // If a topic is explicitly selected in the URL, filter by it.
  if (selectedTopicSlug) {
    articlesQuery = articlesQuery.eq('article_topics.topics.slug', selectedTopicSlug);
  } 
  // Else, if the user is logged in and follows topics, default the feed to ONLY their followed topics
  else if (user && followedTopicIds.size > 0) {
    articlesQuery = articlesQuery.in('article_topics.topic_id', Array.from(followedTopicIds));
  }

  const { data: rawArticles, error } = await articlesQuery;
  
  if (error) {
    console.error("Error fetching articles:", error);
  }

  const articles = (rawArticles || []).map((a: any) => ({
    id: a.id,
    title: a.title,
    source: a.source,
    url: a.url,
    image_url: a.image_url,
    published_at: a.published_at,
  }));

  const activeTopicObj = topics?.find((t: any) => t.slug === selectedTopicSlug);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight sm:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">
              Pulse.
            </h1>
            <p className="text-xl text-gray-500 font-medium flex items-center">
              {activeTopicObj ? activeTopicObj.label : (user && followedTopicIds.size > 0 ? 'Your Followed Feed' : 'All News')}
              {activeTopicObj && <FollowButton topicId={activeTopicObj.id} initialFollowed={followedTopicIds.has(activeTopicObj.id)} />}
            </p>
          </div>
        </header>

        <section aria-label="Topic Filters">
          <TopicChips topics={topics || []} selectedSlug={selectedTopicSlug} />
        </section>

        <section aria-label="News Feed" className="mt-10 flex flex-col gap-6">
          <Suspense fallback={<div className="flex flex-col gap-6"><SkeletonLoader /><SkeletonLoader /><SkeletonLoader /></div>}>
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} isSaved={savedArticleIds.has(article.id)} />
              ))
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 border-dashed shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">No articles found</h3>
                <p className="mt-3 text-base text-gray-500">
                  {user && followedTopicIds.size === 0 && !selectedTopicSlug 
                    ? "You aren't following any topics yet. Select a topic above to explore."
                    : "We're still gathering the latest signal for this topic. Check back soon."}
                </p>
              </div>
            )}
          </Suspense>
        </section>

      </div>
    </main>
  );
}
