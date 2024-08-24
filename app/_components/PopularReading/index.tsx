import { BsBookmarkStarFill } from 'react-icons/bs';
import ArticleCard from '@/app/_components/ArticleCard';

function PopularReading() {
  return (
    <div className='my-5'>
      <h2 className='mb-4 text-center text-2xl font-semibold'>
        Popular Reading
      </h2>
      <ArticleCard
        icon={<BsBookmarkStarFill className='text-grey-500' />}
        title='Popular Post 1'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        link='#'
      />
      <ArticleCard
        icon={<BsBookmarkStarFill className='text-grey-500' />}
        title='Popular Post 2'
        description='Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        link='#'
      />
      <ArticleCard
        icon={<BsBookmarkStarFill className='text-grey-500' />}
        title='Popular Post 3'
        description='Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        link='#'
      />
      <ArticleCard
        icon={<BsBookmarkStarFill className='text-grey-500' />}
        title='Popular Post 4'
        description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.'
        link='#'
      />
      <ArticleCard
        icon={<BsBookmarkStarFill className='text-grey-500' />}
        title='Popular Post 5'
        description='Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.'
        link='#'
      />
    </div>
  );
}

export default PopularReading;
