import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import SaveButton from './SaveButton';

type ArticleCardProps = {
  article: {
    id: string;
    title: string;
    source: string;
    url: string;
    image_url: string | null;
    published_at: string;
  };
  isSaved?: boolean;
};

export default function ArticleCard({ article, isSaved = false }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.published_at), { addSuffix: true });

  return (
    <div className="group flex flex-col md:flex-row gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
      {/* Optional Image Area */}
      {article.image_url ? (
        <div className="md:w-1/4 h-40 md:h-auto rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="md:w-1/4 h-40 md:h-auto rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-50 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">{article.source}</span>
        </div>
      )}

      {/* Content Area */}
      <div className="flex flex-col flex-grow justify-between py-1">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">
              {article.source}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {timeAgo}
            </span>
          </div>
          
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="block mt-2 group/link">
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover/link:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              Read the full story on {article.source}
            </p>
          </a>
        </div>

        {/* Actions Bottom Bar */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
          <SaveButton articleId={article.id} initialSaved={isSaved} />
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            <span>Read Article</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
