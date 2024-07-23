import React from 'react';
import { chipImg, frameImg, frameVideo } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { animateWithGsap } from '../utils/animation';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
        toggleActions: 'restart none none none',
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut',
    });
    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    gsap.to('#frameVideo', {
      scrollTrigger: {
        trigger: '#frameVideo',
        start: '90% top',
        toggleActions: 'play restart',
      },
      onComplete: () => videoRef.current?.play(),
    });
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <div id='chip' className='flex-center w-full my-20'>
          <img src={chipImg} alt='chip' width={180} height={180} />
        </div>
        <div className='flex flex-col items-center'>
          <h2 className='hiw-title'>
            A17 Pro chip.
            <br />A monster win for gaming
          </h2>
          <p className='hiw-subtitle'>
            It's here. The biggest redesign in the history of Apple GPUs
          </p>
        </div>

        <div className='mt-10 md:mt-20 mb-14'>
          <div className='relative h-full flex-center'>
            <div className='overflow-hidden'>
              <img
                src={frameImg}
                alt='frame'
                className='bg-transparent relative z-10'
              />
            </div>
            <div className='hiw-video'>
              <video
                id='frameVideo'
                ref={videoRef}
                className='pointer-events-none'
                playsInline
                preload='none'
                muted
                autoPlay
              >
                <source src={frameVideo} type='video/mp4'></source>
              </video>
            </div>
          </div>
          <p className='text-gray font-semibold mt-3 text-center'>
            Honkai: Star Rail
          </p>
        </div>
        <div className='hiw-text-container'>
          <div className='flex-1 flex justify-center flex-col gap-12'>
            <p className='hiw-text g_fadeIn p-1 text-xs md:text-xl'>
              A17 Pro is an entirely new class of iPhone chip that delivers our
              <span className='text-slate-50'>
                {' '}
                best graphics performance ever.
              </span>
            </p>

            <p className='hiw-text g_fadeIn p-1 text-xs md:text-xl'>
              Mobile{' '}
              <span className='text-slate-50'>
                games will look and feel so immersive, you'll lose yourself in,{' '}
              </span>
              with the highest-quality video in a smartphone.
            </p>
          </div>

          <div className='flex-1 flex justify-center flex-col g_fadeIn'>
            <p className='hiw-text'>New</p>
            <p className='hiw-bigtext'>Pro-class GPU</p>
            <p className='hiw-text'>With 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
}
