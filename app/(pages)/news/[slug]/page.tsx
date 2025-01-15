import React from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { sanityClient, urlFor } from '@/app/cms';

const query = `*[_type == "news" && slug.current == $slug][0]{
  title,
  content,
  date,
  category,
  image
}`;

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <pre className='overflow-x-auto rounded-md bg-gray-100 p-4'>
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    normal: ({ children }) => <p className='mb-4'>{children}</p>,
    h1: ({ children }) => (
      <h1 className='mb-4 text-2xl font-bold'>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className='mb-3 text-xl font-bold'>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className='mb-2 text-lg font-bold'>{children}</h3>
    ),
  },
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  const article = await sanityClient.fetch(query, { slug });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <header className='py-6'>
        <div className='container mx-auto max-w-4xl px-4'>
          <h1 className='text-3xl font-bold'>{article.title}</h1>
          <div className='mt-2 flex items-center text-sm text-gray-600'>
            <FaCalendarAlt className='mr-2' />
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span className='ml-4 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
              {article.category}
            </span>
          </div>
        </div>
      </header>
      <main className='container mx-auto max-w-4xl px-4 py-8'>
        <div className='relative h-64 w-full md:h-96'>
          <Image
            src={urlFor(article.image).url()}
            alt={article.title}
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
        </div>
        <article className='mt-8 text-gray-800'>
          <PortableText
            value={article.content}
            components={portableTextComponents}
          />
        </article>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await sanityClient.fetch(`*[_type == "news"]{slug}`);
  return articles.map((article: { slug: { current: string } }) => ({
    slug: article.slug.current,
  }));
}
