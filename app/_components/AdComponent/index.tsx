'use client';
import { useEffect, useRef } from 'react';

interface AdComponentProps {
  adUnitPath: string;
  divId: string;
  sizes: (string | [number, number])[];
}

const AdComponent: React.FC<AdComponentProps> = ({
  adUnitPath,
  divId,
  sizes,
}) => {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure code runs only on the client side
    if (typeof window === 'undefined') return;

    const loadAd = () => {
      if (window.googletag?.cmd) {
        window.googletag.cmd.push(function () {
          const slot = window.googletag
            .defineSlot(adUnitPath, sizes, divId)
            .addService(window.googletag.pubads());

          window.googletag.display(divId);
        });
      }
    };

    const currentAdRef = adRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentAdRef) {
          loadAd();
          observer.unobserve(currentAdRef);
        }
      },
      { threshold: 0.1 }
    );

    if (currentAdRef) {
      observer.observe(currentAdRef);
    }

    return () => {
      if (currentAdRef) {
        observer.unobserve(currentAdRef);
      }
    };
  }, [adUnitPath, divId, sizes]);

  return (
    <div
      ref={adRef}
      id={divId}
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    />
  );
};

export default AdComponent;
