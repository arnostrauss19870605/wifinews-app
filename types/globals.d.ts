interface Window {
  gtag: (
    command: string,
    eventName: string,
    params?: Record<string, any>
  ) => void;
  ym: (
    counterId: number,
    action: string,
    params?: Record<string, any> | string
  ) => void;
  googletag: Googletag;
  dataLayer: any[];
}

// Declare gtag and ym globally
declare var gtag: (
  command: string,
  eventName: string,
  params?: Record<string, any>
) => void;
declare var ym: (
  counterId: number,
  action: string,
  params?: Record<string, any> | string
) => void;

// Define googletag type
interface Googletag {
  cmd: Function[];
  pubads: () => PubAds;
  enableServices: () => void;
  defineSlot: (adUnitPath: string, size: any[], divId: string) => GoogletagSlot;
  defineOutOfPageSlot: (
    adUnitPath: string,
    divId: string | googletag.enums.OutOfPageFormat
  ) => GoogletagSlot | null;
  sizeMapping: () => SizeMappingBuilder;
  enums: {
    OutOfPageFormat: {
      REWARDED: 'rewarded';
    };
  };
}

// Define PubAds type
interface PubAds {
  enableSingleRequest: () => void;
  collapseEmptyDivs: () => void;
  addEventListener: (eventType: string, listener: Function) => void;
  refresh: (slots?: GoogletagSlot[]) => void;
  setTargeting: (key: string, value: string | string[]) => void;
  enableAsyncRendering: () => void; // Add this method for async rendering
}

// Define Slot type with correct methods
interface GoogletagSlot {
  addService: (service: any) => GoogletagSlot;
  setTargeting: (key: string, value: string | string[]) => GoogletagSlot;
  defineSizeMapping: (sizeMapping: SizeMappingBuilder) => GoogletagSlot; // Correct method defined here
  setForceSafeFrame: (forceSafeFrame: boolean) => void; // For rewarded slot
}

// Define SizeMappingBuilder type
interface SizeMappingBuilder {
  addSize: (
    viewportSize: number[],
    adSizes: (string | number[])[]
  ) => SizeMappingBuilder;
  build: () => any;
}
