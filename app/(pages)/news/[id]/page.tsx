import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaCalendarAlt } from 'react-icons/fa';

// Define the article type
type Article = {
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
};

// Simulate fetching articles from an API or database
async function getArticle(id: string): Promise<Article | null> {
  const articles: Record<string, Article> = {
    '1': {
      title: 'Bose Line of Products on the Show: Showroom Open Now in Dubai',
      content: `
        Bose has announced a new line of innovative products that aim to revolutionize the way we experience sound. 
        From noise-canceling headphones to smart speakers, the range is designed to meet the needs of modern consumers. 
        The launch event in Dubai drew a large crowd eager to see the latest technology in action.
      `,
      date: 'January 14, 2021',
      category: 'Gadgets',
      imageUrl: 'https://picsum.photos/800/400?random=1',
    },
    '2': {
      title:
        'Airlines Face Billions in Losses As COVID Will Wipe Out Even More Flights',
      content: `
        Airlines are bracing for significant financial losses as travel restrictions continue to impact the industry. 
        Experts predict a slow recovery, with many flights still canceled due to low demand.
      `,
      date: 'January 15, 2021',
      category: 'Technology',
      imageUrl: 'https://picsum.photos/800/400?random=2',
    },
  };

  return articles[id] || null;
}

// Define the props type
type ArticlePageProps = {
  params: {
    id: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params;
  const article = await getArticle(id);

  if (!article) {
    notFound(); // Render a 404 page if the article doesn't exist
  }

  return (
    <div>
      {/* Header Section */}
      <header className='py-6'>
        <div className='container mx-auto max-w-4xl px-4'>
          <h1 className='text-3xl font-bold'>{article.title}</h1>
          <div className='mt-2 flex items-center text-sm text-gray-600'>
            <FaCalendarAlt className='mr-2' />
            <span>{article.date}</span>
            <span className='ml-4 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
              {article.category}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className='container mx-auto max-w-4xl px-4 py-8'>
        {/* Image Section */}
        <div className='relative h-64 w-full md:h-96'>
          <Image
            src={article.imageUrl}
            alt={article.title}
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
            priority
          />
        </div>
        {/* Article Content */}
        <article className='mt-8 text-gray-800'>
          <p className='mb-4 whitespace-pre-line leading-7'>
            {article.content}
          </p>
        </article>
      </main>
    </div>
  );
}

// Optional: Generate Static Params
export async function generateStaticParams() {
  // Replace with actual IDs fetched from your database or API
  const articleIds = ['1', '2'];

  return articleIds.map((id) => ({ id }));
}
