import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import News from '@/app/(pages)/news/page';
import AdComponent from '@/app/_components/AdComponent';

function Home() {
  return (
    <>
      <AdComponent
        adUnitPath='/22047902240/wifinews/landing_interstitial'
        divId='div-gpt-ad-7092085-1'
        sizes={['fluid', [320, 480], [300, 250], [300, 600]]}
      />
      <LearningMaterial />
      <DiscussionForum />
      <div className='my-10'>
        <News />
      </div>
    </>
  );
}

export default Home;
