import { useGSAP } from '@gsap/react';
import React from 'react';
import { animateWithGsap } from '../utils/animation';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    animateWithGsap('#features_title', { opacity: 1, y: 0, duration: 1 });
    animateWithGsap('.g_grow', {
      opacity: 1,
      scale: 1,
      ease: 'power1',
      duration: 1,
    });
    animateWithGsap('.g_text', { y: 0, opacity: 1, duration: 1 });

    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        // Scroll-in, scroll-out, scroll-back-in, scroll-back-out
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => videoRef.current?.play(),
    });

    gsap.to('#features_headings', {
      scrollTrigger: {
        trigger: '#features_headings',
        // Scroll-in, scroll-out, scroll-back-in, scroll-back-out
        toggleActions: 'restart reverse restart reverse',
        start: 'top 85%',
      },
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className='w-full common-padding bg-zinc relative overflow-hidden'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full'>
          <h1 id='features_title' className='section-heading'>
            Explore the full story
          </h1>
        </div>

        <div className='flex flex-col justify-center items-center overflow-hidden'>
          <div id='features_headings' className='mt-32 mb-24 pl-24 opacity-0'>
            <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone</h2>
            <h3 className='text-5xl lg:text-7xl font-semibold'>
              Forged in titanium
            </h3>
          </div>

          <div className='flex-center flex-col sm:px-10'>
            <div className='relative h-[50vh] w-full flex items-center'>
              <video
                ref={videoRef}
                playsInline
                id='exploreVideo'
                className='w-full h-full object-cover object-center'
                preload='none'
                muted
                autoPlay
              >
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>

            <div className='flex flex-col w-full relative'>
              <div className='feature-video-container'>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img
                    src={explore1Img}
                    alt='titanium'
                    className='feature-video g_grow'
                  />
                </div>

                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img
                    src={explore2Img}
                    alt='titanium 2'
                    className='feature-video g_grow'
                  />
                </div>
              </div>

              <div className='feature-text-container'>
                <div className='flex-1 flex-center'>
                  <p className='feature-text g_text p-1 text-xs md:text-base'>
                    iPhone 15 Pro is
                    <span className='text-slate-50'>
                      {' '}
                      The first iPhone to feature an aerospace-grade titanium
                      design,
                    </span>
                    using the same alloy that spacecraft use for missions to
                    Mars.
                  </p>

                  <p className='feature-text g_text p-1'>
                    The glass on the front is the toughest ever on an iPhone,{' '}
                    <span className='text-slate-50'>
                      And it's the first OLED display with Pro Motion{' '}
                    </span>
                    for a more responsive feel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
