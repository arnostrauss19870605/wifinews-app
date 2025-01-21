import { sanityClient } from '@/app/_cms';
import { FiArrowRight, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import React from 'react';

type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  category: {
    title: string;
  };
  description: string;
  date: string;
  image?: {
    asset: { _ref: string };
  };
};

const featuredQuery = `*[_type == "news" && isFeatured == true] | order(date desc)[0...2] {
  _id,
  title,
  slug,
  "category": {
    "title": select(
      category == "breaking" => "Breaking News",
      category == "world" => "World",
      category == "sports" => "Sports",
      category == "entertainment" => "Entertainment",
      category == "technology" => "Technology",
      category == "mzansi-trends" => "Mzansi Trends",
      category == "gossip-celebs" => "Gossip & Celebs",
      category == "eish-moments" => "Eish Moments",
      category == "money-matters" => "Money Matters",
      category == "lifestyle-vibes" => "Lifestyle & Vibes",
      category == "community-news" => "Community News",
      category == "street-politics" => "Street Politics",
      category == "sport-kasi-action" => "Sport & Kasi Action",
      category == "tech-gadgets" => "Tech & Gadgets",
      category == "mzansi-stories" => "Mzansi Stories",
      category == "world-news" => "World News"
    ),
    "value": category
  },
  description,
  date,
  image
}`;

const recentQuery = `*[_type == "news" && isFeatured != true] | order(date desc)[0...3] {
  _id,
  title,
  slug,
  "category": {
    "title": select(
      category == "breaking" => "Breaking News",
      category == "world" => "World",
      category == "sports" => "Sports",
      category == "entertainment" => "Entertainment",
      category == "technology" => "Technology",
      category == "mzansi-trends" => "Mzansi Trends",
      category == "gossip-celebs" => "Gossip & Celebs",
      category == "eish-moments" => "Eish Moments",
      category == "money-matters" => "Money Matters",
      category == "lifestyle-vibes" => "Lifestyle & Vibes",
      category == "community-news" => "Community News",
      category == "street-politics" => "Street Politics",
      category == "sport-kasi-action" => "Sport & Kasi Action",
      category == "tech-gadgets" => "Tech & Gadgets",
      category == "mzansi-stories" => "Mzansi Stories",
      category == "world-news" => "World News"
    ),
    "value": category
  },
  description,
  date,
  image
}`;

export default async function NewsWidget() {
  const [featuredArticles, recentArticles]: [Article[], Article[]] =
    await Promise.all([
      sanityClient.fetch(featuredQuery),
      sanityClient.fetch(recentQuery),
    ]);

  return (
    <div className='mx-auto max-w-6xl px-2 py-4'>
      {/* Featured Section */}
      <h1 className='mb-2 text-center text-2xl font-bold'>Featured</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {featuredArticles.map((article: Article) => (
          <div
            key={article._id}
            className='flex h-full flex-col justify-between rounded-md bg-white p-4 shadow transition-shadow duration-300 hover:shadow-md'
          >
            <div>
              <div className='flex items-center text-sm text-gray-500'>
                <FiBookOpen className='mr-1 uppercase' />
                <span>{article.category.title}</span>
              </div>
              <h2 className='mt-2 text-lg font-semibold'>{article.title}</h2>
              <p className='mt-2 text-sm text-gray-600'>
                {article.description}
              </p>
            </div>
            <a href={`/news/${article.slug.current}`}>
              <button className='mt-2 flex w-full items-center justify-center rounded bg-black px-2 py-2 text-sm text-white transition-colors duration-300 hover:bg-gray-800'>
                Read More <FiArrowRight className='ml-1' />
              </button>
            </a>
          </div>
        ))}
      </div>

      {/* Most Recent Section */}
      <div className='mt-4'>
        <h2 className='mb-2 text-center text-lg font-semibold'>Most Recent</h2>
        <div className='space-y-4'>
          {recentArticles.map((article: Article) => (
            <div
              key={article._id}
              className='flex flex-col justify-between rounded-md bg-white p-2 shadow transition-shadow duration-300 hover:shadow-sm sm:flex-row sm:items-center'
            >
              <div className='flex-1'>
                <h4 className='text-sm font-medium'>{article.title}</h4>
                <hr className='my-2 border-gray-300' />
                <p className='text-xs uppercase text-gray-500'>
                  {article.category.title}
                </p>
              </div>
              <a href={`/news/${article.slug.current}`}>
                <div className='mt-2 flex items-center text-black hover:text-gray-700 sm:ml-3 sm:mt-0'>
                  <span className='text-sm font-semibold'>Read More</span>
                  <FiTrendingUp className='text-md ml-1' />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
