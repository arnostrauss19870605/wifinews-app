import React from 'react';
import { FaCheck } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <div className='mx-auto max-w-4xl px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>About Us – WiFi News</h1>
      <p className='mb-6 text-xl font-medium'>
        Connecting South Africa, One Hotspot at a Time
      </p>

      <section className='mb-6'>
        <p className='mb-4'>
          Welcome to WiFi News (WiFinews.co.za)—your trusted source for news,
          insights, and updates on public Wi-Fi, connectivity solutions, and
          digital trends in South Africa. We are committed to keeping users
          informed about the evolving landscape of free and public Wi-Fi access,
          digital inclusion, and the role of connectivity in shaping modern
          life.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>What We Do</h2>
        <ul className='ml-6 list-disc'>
          <li className='mb-2 flex items-start'>
            <FaCheck className='mr-2 mt-1 text-green-500' />
            <span>
              <strong>Public Wi-Fi Access</strong> – We operate and manage Wi-Fi
              hotspots, ensuring users can connect reliably and conveniently in
              malls, transport hubs, and public spaces.
            </span>
          </li>
          <li className='mb-2 flex items-start'>
            <FaCheck className='mr-2 mt-1 text-green-500' />
            <span>
              <strong>News &amp; Insights</strong> – We provide up-to-date
              information on digital trends, connectivity developments, security
              tips, and the future of Wi-Fi technology.
            </span>
          </li>
          <li className='flex items-start'>
            <FaCheck className='mr-2 mt-1 text-green-500' />
            <span>
              <strong>Advertising &amp; Monetization</strong> – Our platform
              enables brands to engage with online audiences through high-impact
              advertising while ensuring a seamless browsing experience for
              users.
            </span>
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>
          Editorial Team &amp; Content Standards
        </h2>
        <p>
          All content on WiFinews.co.za is produced and curated by our editorial
          team, a group of experienced writers, researchers, and industry
          professionals who are passionate about digital connectivity.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>Who is Bob van Wyk?</h2>
        <p>
          You may have noticed articles authored by Bob van Wyk—this is the
          pseudonym used by our internal team of writers. The use of a staff
          pseudonym is a common practice in publishing and journalism, ensuring
          consistency in our editorial voice while maintaining high standards of
          accuracy and reliability.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='mb-4 text-2xl font-semibold'>Our Commitment to You</h2>
        <p>
          At WiFi News, we believe that access to reliable information is just
          as important as access to reliable Wi-Fi. Our goal is to create a
          trusted digital hub where users can stay informed, connected, and
          engaged with the latest advancements in connectivity.
        </p>
      </section>

      <section className='mb-6'>
        <p>
          Thank you for being part of our community. If you have any questions,
          suggestions, or collaboration inquiries, feel free to contact us at{' '}
          <a
            href='mailto:info@entelek.co.za'
            className='text-blue-600 underline'
          >
            info@entelek.co.za
          </a>
          .
        </p>
      </section>

      <section>
        <p>Stay Connected. Stay Informed.</p>
      </section>
    </div>
  );
}
