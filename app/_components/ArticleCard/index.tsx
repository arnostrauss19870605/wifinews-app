import { MdKeyboardArrowRight } from 'react-icons/md';

function ArticleCard({ icon, title, description, link }: any) {
  return (
    <a
      href={link}
      className='mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow transition hover:bg-gray-100'
    >
      <div className='flex items-center'>
        <div className='rounded-full bg-gray-200 p-2'>{icon}</div>
        <div className='ml-4'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='text-sm text-gray-600'>{description}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='border-l-2 border-gray-300 pl-4'>
          <MdKeyboardArrowRight className='text-gray-500' />
        </div>
      </div>
    </a>
  );
}

export default ArticleCard;
