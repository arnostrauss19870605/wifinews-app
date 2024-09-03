import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import News from '@/app/(pages)/news/page';
import AdComponent from '@/app/_components/AdComponent';
import RewardedAdComponent from '@/app/_components/RewardedAdComponent';

function Home() {
  return (
    <>
      {/* AdComponent for landing_interstitial */}
      <AdComponent
        adUnitPath='/22047902240/wifinews/landing_interstitial'
        divId='div-gpt-ad-7092085-1'
        sizes={['fluid', [320, 480], [300, 250], [300, 600]]}
      />

      {/* AdComponent for landing_top320x50 */}
      <AdComponent
        adUnitPath='/22047902240/wifinews/landing_top320x50'
        divId='div-gpt-ad-7092085-2'
        sizes={[
          'fluid',
          [300, 250],
          [320, 50],
          [320, 100],
          [468, 60],
          [728, 90],
        ]}
      />

      {/* AdComponent for landing_sticky */}
      <AdComponent
        adUnitPath='/22047902240/wifinews/landing_sticky'
        divId='div-gpt-ad-7092085-3'
        sizes={['fluid', [320, 50], [320, 100], [468, 60], [728, 90]]}
      />
      <LearningMaterial />
      <DiscussionForum />
      <div className='my-10'>
        <News />
      </div>
      <RewardedAdComponent />
    </>
  );
}

export default Home;
