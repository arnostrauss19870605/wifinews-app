declare namespace googletag {
  interface PubAdsService {
    enableSingleRequest(): PubAdsService;
    collapseEmptyDivs(collapse?: boolean): PubAdsService;
    enableAsyncRendering(): PubAdsService;
    disableInitialLoad(): PubAdsService;
    refresh(): void;
    addEventListener(eventType: string, listener: Function): void;
  }

  interface Slot {
    addService(service: PubAdsService): Slot;
    setForceSafeFrame(force: boolean): Slot;
    setTargeting(key: string, value: string | string[]): Slot;
  }

  interface OutOfPageSlot extends Slot {}

  interface GPT {
    cmd: { push: (callback: () => void) => void };
    pubads: () => PubAdsService;
    defineSlot(
      adUnitPath: string,
      size: (string | [number, number])[],
      divId: string
    ): Slot;
    defineOutOfPageSlot(
      adUnitPath: string,
      opt_div?: string | googletag.enums.OutOfPageFormat
    ): OutOfPageSlot | null;
    display(divId: string): void;
    enableServices(): void;
  }

  namespace enums {
    enum OutOfPageFormat {
      REWARDED = 'rewarded',
      INTERSTITIAL = 'interstitial',
      STICKY = 'sticky',
    }
  }

  const cmd: GPT['cmd'];
  function pubads(): PubAdsService;
  function defineSlot(
    adUnitPath: string,
    size: (string | [number, number])[],
    divId: string
  ): Slot;
  function defineOutOfPageSlot(
    adUnitPath: string,
    opt_div?: string | googletag.enums.OutOfPageFormat
  ): OutOfPageSlot | null;
  function display(divId: string): void;
  function enableServices(): void;
}

declare global {
  interface Window {
    googletag: typeof googletag;
  }
}

export {};
