export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ].forEach((param) => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  return utmParams;
}

export function appendUtmParams(url: string): string {
  if (typeof window === 'undefined') {
    return url;
  }

  const utmParams = getUtmParams();
  const urlObj = new URL(url, window.location.origin);

  Object.entries(utmParams).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });

  return urlObj.toString();
}
