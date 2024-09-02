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
  sizeMapping: () => SizeMappingBuilder;
}

// Define PubAds type
interface PubAds {
  enableSingleRequest: () => void;
  collapseEmptyDivs: () => void;
  addEventListener: (eventType: string, listener: Function) => void;
  refresh: (slots?: GoogletagSlot[]) => void;
  setTargeting: (key: string, value: string | string[]) => void;
}

// Define Slot type with correct methods
interface GoogletagSlot {
  addService: (service: any) => GoogletagSlot;
  setTargeting: (key: string, value: string | string[]) => GoogletagSlot;
  defineSizeMapping: (sizeMapping: SizeMappingBuilder) => GoogletagSlot;
}

// Define SizeMappingBuilder type
interface SizeMappingBuilder {
  addSize: (
    viewportSize: number[],
    adSizes: (string | number[])[]
  ) => SizeMappingBuilder;
  build: () => any;
}
