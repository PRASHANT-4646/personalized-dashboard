'use client';
import { useEffect, useState } from 'react';
interface NewsArticle {
  title: string;
  url: string;
  source: {
    name: string;
  };
}
interface NewsData {
  articles: NewsArticle[];
}
export const NewsWidget = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);             
        const apiKey = process.env.NEWS_API_KEY;
        if (!apiKey || apiKey === 'your_actual_api_key_here') { 
          const mockNews: NewsArticle[] = [
            { title: 'Breaking News: React 19 Released!', url: 'https://react.dev/learn', source: { name: 'Tech News' } },
            { title: 'Next.js Continues to Dominate Framework Market', url: 'https://www.reddit.com/r/nextjs/comments/1h3oaoz/is_nextjs_losing_ground_to_remix_as_the_goto/', source: { name: 'dev Daily' } },
            { title: 'AI Tools Revolutionizing Development Workflows', url: 'https://www.aidigital.com/', source: { name: 'AI Digest' } },
          ];
          setNews(mockNews);
          return;
        }
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`News API error: ${response.status}`);
        } 
        const data: NewsData = await response.json();
        setNews(data.articles);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  if (loading) return <div className="p-4">Loading news...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Top News</h3>
      <div className="space-y-3">
        {news.map((article, index) => (
          <a 
            key={index} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <h4 className="font-medium text-sm">{article.title}</h4>
            <p className="text-xs text-gray-500 mt-1">{article.source.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};