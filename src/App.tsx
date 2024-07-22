import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const timeLine = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

  const scrollRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useGSAP(() => {
    gsap.to('.stagger-box', {
      y: 200,
      duration: 1,
      rotation: 360,
      borderRadius: '50%',
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 1.5,
        grid: [2, 1],
        axis: 'y',
        ease: 'circ.inOut',
        from: 'center',
      },
    });
  }, []);

  useGSAP(
    () => {
      if (scrollRef.current) {
        const boxes = gsap.utils.toArray(scrollRef.current.children);
        boxes.forEach((box) => {
          gsap.to(box as HTMLDivElement, {
            x: 150 * boxes.indexOf(box) + 5,
            rotation: 360,
            borderRadius: '50%',
            scale: 1.5,
            scrollTrigger: {
              trigger: box as HTMLDivElement,
              start: 'bottom, bottom',
              end: 'top 10%',
              scrub: true,
            },
            ease: 'power1.inOut',
          });
        });
      }
    },
    { scope: scrollRef }
  );

  useGSAP(() => {
    gsap.to('#txt', {
      ease: 'power1.inOut',
      opacity: 1,
      y: 0,
    });

    gsap.fromTo(
      '#para',
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power1.inOut',
      }
    );
  }, []);

  return (
    <section className='w-full flex items-center justify-center overflow-x-hidden overscroll-y-auto'>
      <div className='grid grid-rows-5 gap-6'>
        <h1
          className='py-3 text-center font-semibold text-3xl opacity-0 translate-y-10'
          id='txt'
        >
          Hello World
        </h1>
        <p id='para' className='text-center'>
          This is just a paragraph
        </p>
        <div id='blue-box' className='w-20 h-20 bg-blue-800 rounded-lg'></div>
        <div id='green-box' className='w-20 h-20 bg-green-800 rounded-lg'></div>
        <div id='red-box' className='w-20 h-20 bg-red-800 rounded-lg'></div>

        <div className='flex flex-col gap-4'>
          <button
            onClick={() => {
              if (timeLine.paused()) {
                timeLine.play();
              } else {
                timeLine.pause();
              }
            }}
            className='py-2 px-4 bg-neutral-700 text-slate-50 rounded-md'
          >
            Play/Play
          </button>
          <div
            id='yellow-box'
            className='w-20 h-20 bg-yellow-500 rounded-lg'
          ></div>
        </div>
        <div className='w-full flex items-center gap-3 mt-5'>
          <div className='w-20 h-20 bg-blue-100 rounded-lg stagger-box'></div>
          <div className='w-20 h-20 bg-blue-200 rounded-lg stagger-box'></div>
          <div className='w-20 h-20 bg-blue-300 rounded-lg stagger-box'></div>
          <div className='w-20 h-20 bg-blue-400 rounded-lg stagger-box'></div>
          <div className='w-20 h-20 bg-blue-500 rounded-lg stagger-box'></div>
          <div className='w-20 h-20 bg-blue-600 rounded-lg stagger-box'></div>
          <div className='w-20 h-20 bg-blue-700 rounded-lg stagger-box'></div>
        </div>
        <div
          ref={scrollRef}
          className='h-screen mt-4 w-full flex flex-row items-center justify-center'
        >
          <div className='w-20 h-20 bg-red-800 rounded-lg'></div>
          <div className='w-20 h-20 bg-red-600 rounded-lg ml-8'></div>
        </div>
      </div>
    </section>
  );
}

export default App;
