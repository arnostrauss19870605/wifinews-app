// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest): NextResponse | undefined {
  const url = request.nextUrl.clone();
  const pathname = url.pathname; // Get the current route path
  const utmParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  let utmQueryString = '';

  // Collect UTM parameters from the URL
  utmParams.forEach((param) => {
    const value = url.searchParams.get(param);
    if (value) {
      utmQueryString += `${param}=${encodeURIComponent(value)}&`;
    }
  });

  // Redirect logic for the specific routes
  if (pathname === '/forti') {
    const destinationUrl = `https://wib.wifinews.co.za/forti${utmQueryString ? '?' + utmQueryString.slice(0, -1) : ''}`;
    return NextResponse.redirect(destinationUrl);
  }

  if (pathname === '/forti_2') {
    const destinationUrl = `https://wib.wifinews.co.za/forti_2${utmQueryString ? '?' + utmQueryString.slice(0, -1) : ''}`;
    return NextResponse.redirect(destinationUrl);
  }

  // If no match is found, let the request proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/forti', '/forti_2'],
};
