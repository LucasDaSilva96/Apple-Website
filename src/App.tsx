import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {
  const timeLine = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

  useGSAP(() => {
    gsap.to('#blue-box', {
      x: 200,
      duration: 3,
      ease: 'bounce',
      repeat: -1,
      yoyo: true,
      rotate: 360,
    });
  }, []);

  useGSAP(() => {
    gsap.from('#green-box', {
      x: 200,
      duration: 3,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      rotate: 360,
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      '#red-box',
      {
        x: 0,
        rotate: 0,
        borderRadius: '0%',
      },
      {
        x: 200,
        duration: 3,
        ease: 'bounce.out',
        repeat: -1,
        yoyo: true,
        rotate: 360,
        borderRadius: '100%',
      }
    );
  }, []);

  useGSAP(() => {
    timeLine.to('#yellow-box', {
      x: 200,
      duration: 3,
      ease: 'bounce',
      repeat: -1,
      yoyo: true,
      rotate: 360,
      borderRadius: '50%',
    });
    timeLine.to('#yellow-box', {
      x: 900,
      rotate: 360,
      scale: 2,
      rotation: 360,
      borderRadius: '20%',
      duration: 3,
    });

    timeLine.to('#yellow-box', {
      y: 250,
      scale: 1,
      duration: 3,
      rotation: 360,
      borderRadius: '50%',
      ease: 'back.in',
    });
  }, []);

  return (
    <section className='w-full h-screen flex items-center justify-center overflow-hidden'>
      <div className='grid grid-rows-3 gap-6'>
        <div id='blue-box' className='w-20 h-20 bg-blue-800 rounded-lg'></div>
        <div id='green-box' className='w-20 h-20 bg-green-800 rounded-lg'></div>
        <div id='red-box' className='w-20 h-20 bg-red-800 rounded-lg'></div>

        <div className='flex flex-col gap-4'>
          <button className='py-2 px-4 bg-neutral-700 text-slate-50 rounded-md'>
            Play/Play
          </button>
          <div
            id='yellow-box'
            className='w-20 h-20 bg-yellow-500 rounded-lg'
          ></div>
        </div>
      </div>
    </section>
  );
}

export default App;
