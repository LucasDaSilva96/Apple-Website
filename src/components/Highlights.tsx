import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { rightImg, watchImg } from '../utils';
import VideoCarousel from './VideoCarousel';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Highlights() {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      translateY: 0,
      scrollTrigger: {
        trigger: '#title',
        start: 'top 80%',
        end: 'bottom 20%',
      },
    });
    gsap.to('.link', {
      opacity: 1,
      duration: 1,
      translateY: 0,
      stagger: 0.5,
      scrollTrigger: {
        trigger: '#title',
        start: 'top 80%',
        end: 'bottom 20%',
      },
    });
  }, []);

  return (
    <section
      id='highlight'
      className='w-screen overflow-hidden h-full common-padding bg-zinc '
    >
      <div className='screen-max-width'>
        <div className='mb-12 w-full items-end justify-between md:flex md:items-center'>
          <h2 className='section-heading' id='title'>
            Get the highlights
          </h2>

          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film
              <img src={watchImg} alt='watch' />
            </p>

            <p className='link'>
              Watch the film
              <img src={rightImg} alt='watch' />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
}
