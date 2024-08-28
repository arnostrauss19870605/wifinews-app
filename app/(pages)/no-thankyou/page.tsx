"use client";

function NoThankyou() {

  const handleRedirect = () => {
    window.location.replace('/landing-page');
  }

  return (
    <>
      <div className="text-5xl my-10 text-center font-bold">You have opted not to access our free Wi-fi.</div>
      
      <p className="text-2xl my-10 text-center">This service is available for FREE to you, which is made possible by our advertisers.To continue, please support and watch the ad to continue using this service.</p>
      
      <button type='button' className='rounded-lg text-md bg-slate-950 px-4 py-3 text-white focus:outline-none w-full' onClick={handleRedirect}>Yes, I PRESS TO ACCESS FREE Wi-Fi</button>
    </>
  );
}

export default NoThankyou;