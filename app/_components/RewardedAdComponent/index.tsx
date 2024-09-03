'use client';
import { useEffect } from 'react';

const RewardedAdComponent = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      const rewardedSlot = window.googletag
        .defineOutOfPageSlot(
          '147246189,22047902240/wifinews.co.za_rewarded',
          window.googletag.enums.OutOfPageFormat.REWARDED
        )
        ?.addService(window.googletag.pubads());

      if (rewardedSlot) {
        rewardedSlot.setForceSafeFrame(true);
      }

      window.googletag.pubads().enableAsyncRendering();
      window.googletag.enableServices();
    });
  }, []);

  return null;
};

export default RewardedAdComponent;
