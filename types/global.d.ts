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
}

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
