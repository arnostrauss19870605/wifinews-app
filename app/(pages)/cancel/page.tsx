import { headers } from 'next/headers';
import NoThankYouClient from '@/app/_components/NoThankYouClient';

export default function NoThankYou() {
  const headersList = headers();
  const referer = headersList.get('referer') || '';
  const isFromInterstitial = referer.includes('/interstitial');
  const isFromForti = referer.includes('/forti_2');

  console.log('Server-side Referer:', referer);
  console.log('Server-side Is from interstitial:', isFromInterstitial);

  return (
    <NoThankYouClient
      initialIsFromInterstitial={isFromInterstitial}
      isFromForti={isFromForti}
    />
  );
}
