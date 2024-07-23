import { useGSAP } from '@gsap/react';
import React from 'react';
import { animateWithGsap } from '../utils/animation';

export default function Features() {
  useGSAP(() => {
    animateWithGsap('#features_title', { opacity: 1, y: 0, duration: 1 });
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
          <div className='mt-32 mb-24 pl-24'>
            <h2 className='text-5xl lg:text-7xl font-semibold'>Iphone</h2>
            <h3 className='text-5xl lg:text-7xl font-semibold'>
              Forged in titanium
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
