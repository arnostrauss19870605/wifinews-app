import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className='mx-auto max-w-4xl px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Privacy Policy</h1>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          1. Information We Collect
        </h2>

        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold'>
            1.1 Personal Information
          </h3>
          <p className='mb-2'>
            We may collect personal information that you voluntarily provide
            when interacting with our website, such as:
          </p>
          <ul className='ml-6 list-disc'>
            <li>Name</li>
            <li>Email address (if you contact us)</li>
            <li>
              Any other information you submit via forms or communications
            </li>
          </ul>
        </div>

        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold'>
            1.2 Non-Personal Information
          </h3>
          <p className='mb-2'>
            When you visit our website, we automatically collect certain
            non-personal information, including:
          </p>
          <ul className='ml-6 list-disc'>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>
              Device information (operating system, screen resolution, etc.)
            </li>
            <li>Referring URL and exit pages</li>
            <li>Usage data (e.g., pages visited, time spent on site)</li>
          </ul>
        </div>

        <div>
          <h3 className='mb-2 text-xl font-semibold'>
            1.3 Cookies &amp; Tracking Technologies
          </h3>
          <p>
            We use cookies, web beacons, and similar tracking technologies to
            enhance user experience, analyze website traffic, and serve relevant
            advertisements. You can manage cookie preferences through your
            browser settings.
          </p>
        </div>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          2. How We Use Your Information
        </h2>
        <ul className='ml-6 list-disc'>
          <li>To provide and improve our services</li>
          <li>To personalize your browsing experience</li>
          <li>To analyze website traffic and optimize performance</li>
          <li>To serve targeted advertisements (as detailed in Section 3)</li>
          <li>To comply with legal requirements</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          3. Advertising &amp; Third-Party Services
        </h2>
        <p className='mb-4'>
          We use Google AdSense and Google Ad Manager to display advertisements.
          These services may collect user data through cookies and similar
          technologies to serve relevant ads. Google may use your data in
          accordance with its{' '}
          <a
            href='https://policies.google.com/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            Privacy &amp; Terms
          </a>
          .
        </p>
        <div>
          <h3 className='mb-2 text-xl font-semibold'>
            3.1 Google Ad Technologies Compliance
          </h3>
          <p className='mb-2'>
            Our website complies with Google’s EU User Consent Policy. We
            display a consent management tool for users in regions requiring
            explicit consent (e.g., GDPR compliance in the EU).
          </p>
          <p>
            Users can opt out of personalized ads via{' '}
            <a
              href='https://adssettings.google.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
            >
              Google Ads Settings
            </a>
            .
          </p>
        </div>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          4. Data Sharing &amp; Third-Party Disclosure
        </h2>
        <p className='mb-2'>
          We do not sell or trade your personal information. However, we may
          share data with:
        </p>
        <ul className='ml-6 list-disc'>
          <li>
            Service providers (e.g., analytics, advertising networks) who help
            operate our website
          </li>
          <li>Legal authorities if required by law</li>
          <li>Business transfers, in case of a merger or acquisition</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          5. User Rights &amp; Choices
        </h2>
        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold'>
            5.1 GDPR (European Users)
          </h3>
          <p className='mb-2'>
            Under the General Data Protection Regulation (GDPR), you have rights
            to:
          </p>
          <ul className='ml-6 list-disc'>
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Data portability</li>
          </ul>
          <p className='mt-2'>
            To exercise your rights, contact us at info@entelek.co.za.
          </p>
        </div>
        <div>
          <h3 className='mb-2 text-xl font-semibold'>
            5.2 CCPA (California Users)
          </h3>
          <p className='mb-2'>
            Under the California Consumer Privacy Act (CCPA), California
            residents have the right to:
          </p>
          <ul className='ml-6 list-disc'>
            <li>Request disclosure of collected information</li>
            <li>Opt out of data sales (we do not sell personal data)</li>
            <li>Request deletion of data</li>
          </ul>
          <p className='mt-2'>To submit a request, email info@entelek.co.za.</p>
        </div>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>6. Data Security</h2>
        <p>
          We implement security measures to protect your information. However,
          no internet transmission is 100% secure, and we cannot guarantee
          absolute security.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          7. Children&apos;s Privacy
        </h2>
        <p>
          Our website is not intended for children under 13. We do not knowingly
          collect personal information from minors.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this policy periodically. We encourage you to review
          this page for any changes.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>9. Contact Us</h2>
        <p className='mb-2'>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          Email:{' '}
          <a
            href='mailto:info@entelek.co.za'
            className='text-blue-600 underline'
          >
            info@entelek.co.za
          </a>
        </p>
        <p>
          Website:{' '}
          <a
            href='https://wifinews.co.za'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            https://wifinews.co.za
          </a>
        </p>
      </section>

      <section>
        <p>By using our website, you consent to this Privacy Policy.</p>
      </section>
    </div>
  );
}
