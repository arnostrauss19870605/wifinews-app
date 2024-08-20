import Navigation from '@/app/_components/Navigation';
import Footer from '@/app/_components/Footer';

function Home() {
  return (
    <>
      <Navigation />
      <div className='container mx-auto'>
        <div className='my-3 text-center text-lg font-semibold'>Step 2/3</div>
        <div className='loader my-4'></div>

        <div className='my-5 flex justify-center'>
          <button
            type='button'
            className='rounded-lg bg-slate-950 px-10 py-3 font-medium text-white focus:outline-none'
          >
            Connect
          </button>
        </div>

        <div className='ad-md align-center my-5 flex justify-center bg-neutral-300 text-xl'>
          Ad Section
        </div>

        <div className='my-5 flex justify-center'>
          <button
            type='button'
            className='w-full rounded-lg bg-slate-950 px-10 py-3 font-medium text-white focus:outline-none'
          >
            Access free learning material here
          </button>
        </div>

        <div className='my-5 bg-neutral-300 px-5 py-5'>
          <div className='my-3 text-center text-xl font-semibold'>
            Have Your Say!
          </div>
          <div className='text-center text-sm'>
            Amid all that&apos;s happening, share your thoughts and discuss with
            others in our open community forum
          </div>
        </div>

        <div className='font- my-5 text-center'>
          How do you think the recently signed NHI bill will change the way you
          access healthcare in South Africa ?
        </div>

        <div className='chat-block my-5 px-5 py-5 text-xs'>
          <div className='chat-box bg-neutral-400 px-5 py-2'>
            <div>Kasongo Kibanza:</div>
            <div className='text-white'>
              I&apos;m not sure, we&apos;ll have to see as time goes on
            </div>
          </div>

          <div className='chat-box ml-auto bg-neutral-400 px-5 py-2'>
            <div>Kasongo Kibanza:</div>
            <div className='text-white'>
              I&apos;m not sure, we&apos;ll have to see as time goes on
            </div>
          </div>

          <div className='chat-box bg-neutral-400 px-5 py-2'>
            <div>Kasongo Kibanza:</div>
            <div className='text-white'>
              I&apos;m not sure, we&apos;ll have to see as time goes on
            </div>
          </div>

          <div className='chat-box ml-auto bg-neutral-400 px-5 py-2'>
            <div>Kasongo Kibanza:</div>
            <div className='text-white'>
              I&apos;m not sure, we&apos;ll have to see as time goes on
            </div>
          </div>
        </div>

        <div className='my-5 flex justify-center'>
          <button
            type='button'
            className='rounded-lg bg-slate-950 px-10 py-3 font-medium text-white focus:outline-none'
          >
            Have Your Say!
          </button>
        </div>

        <div className='ad-sm align-center my-5 flex justify-center bg-neutral-300 text-xl'>
          Ad Section
        </div>

        <div className='ad-xl align-center my-5 flex justify-center bg-neutral-300 text-xl'>
          Ad Section
        </div>

        <div className='my-5 text-center text-2xl font-semibold'>
          Featured Articles
        </div>

        <div className='my-5 bg-neutral-300 px-5 py-5'>
          <p>
            WiFi news keeps you up to date with all things relating to your
            connectivity and data access.
          </p>
          <div className='text-right'>
            <a href=''>read more</a>
          </div>
        </div>

        <div className='my-5 text-center text-2xl font-semibold'>
          Popular Reading
        </div>

        <nav className='accordion arrows'>
          <input type='radio' name='accordion' id='cb1' />
          <section className='box my-3 bg-neutral-400 font-medium'>
            <label className='box-title' htmlFor='cb1'>
              The Evolution and Impact of WiFi in South Africa: The Growth of
              WiFi Networks
            </label>
            <label className='box-close' htmlFor='acc-close'></label>
            <div className='box-content'>
              Click on an item to open. Click on its header or the list header
              to close.
            </div>
          </section>
          <input type='radio' name='accordion' id='cb2' />
          <section className='box my-3 bg-neutral-400 font-medium'>
            <label className='box-title' htmlFor='cb2'>
              WiFi and the Digital Economy
            </label>
            <label className='box-close' htmlFor='acc-close'></label>
            <div className='box-content'>
              Add the class &apos;arrows&apos; to nav.accordion to add dropdown
              arrows.
            </div>
          </section>
          <input type='radio' name='accordion' id='cb3' />
          <section className='box my-3 bg-neutral-400 font-medium'>
            <label className='box-title' htmlFor='cb3'>
              Wi-Fi in Education and Healthcare
            </label>
            <label className='box-close' htmlFor='acc-close'></label>
            <div className='box-content'>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Quisque finibus tristique nisi, maximus
              ullamcorper ante finibus eget.
            </div>
          </section>

          <input type='radio' name='accordion' id='acc-close' />
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default Home;
