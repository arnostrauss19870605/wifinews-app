import featuredArticles from '@/app/_data/featured-articles';

export default function News() {
  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Featured</h1>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {featuredArticles.map((article) => (
          <div key={article.id} className='rounded-lg bg-white p-6 shadow'>
            <p className='text-sm text-gray-500'>{article.category}</p>
            <h2 className='mt-2 text-xl font-semibold'>{article.title}</h2>
            <p className='mt-2 text-gray-600'>{article.summary}</p>
            <p className='mt-4 text-sm text-blue-500'>{article.source}</p>
          </div>
        ))}
      </div>

      <div className='mt-16'>
        <h2 className='mb-6 text-xl font-semibold'>Popular Readings</h2>
        <div className='space-y-6'>
          {featuredArticles.map((article) => (
            <div key={article.id} className='rounded-lg bg-white p-4 shadow'>
              <h4 className='text-md font-medium'>{article.title}</h4>
              <p className='text-sm text-gray-500'>{article.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
