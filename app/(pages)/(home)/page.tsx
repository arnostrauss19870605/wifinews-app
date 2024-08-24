import ConnectWiFi from '@/app/_components/ConnectWiFi';
import LearningMaterial from '@/app/_components/LearningMaterial';
import DiscussionForum from '@/app/_components/DiscussionForum';
import AdSection from '@/app/_components/Ads/AdSection';
import FeaturedArticles from '@/app/_components/FeaturedArticles';
import PopularReading from '@/app/_components/PopularReading';

function Home() {
  return (
    <>
      <ConnectWiFi />
      <AdSection />
      <LearningMaterial />
      <AdSection />
      <DiscussionForum />
      <AdSection />
      <div className='my-10'>
        <FeaturedArticles />
        <PopularReading />
      </div>
    </>
  );
}

export default Home;
