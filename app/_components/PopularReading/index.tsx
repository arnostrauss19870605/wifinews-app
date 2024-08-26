import popularArticles from '@/app/_data/popular-articles';

export default function PopularReading() {
  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <h2 className='mb-6 text-xl font-semibold'>Popular Readings</h2>

      <div className='space-y-6'>
        {popularArticles.map((article) => (
          <div key={article.id} className='rounded-lg bg-white p-4 shadow'>
            <h4 className='text-md font-medium'>{article.title}</h4>
            <p className='text-sm text-gray-500'>{article.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
