import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ModelView from './ModelView';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { models, sizes } from '../constants';
import { animateWithGsapTimeline } from '../utils/animation';

gsap.registerPlugin(ScrollTrigger);

type ModelProps = {
  id: number;
  title: string;
  color: string[];
  img: string;
};

export default function Model() {
  const [size, setSize] = useState('small');

  const [model, setModel] = useState<ModelProps>(models[0]);

  // These are the references for the camera controls
  const cameraControlSmall = useRef(null);
  const cameraControlLarge = useRef(null);

  // These are the references for the models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // These are the references for the models
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const timeLine = gsap.timeline();

  useEffect(() => {
    if (size === 'small') {
      animateWithGsapTimeline(
        timeLine,
        large,
        largeRotation,
        '#view2',
        '#view1',
        { transform: 'translateX(0%)', duration: 2 }
      );
    }

    if (size === 'large') {
      animateWithGsapTimeline(
        timeLine,
        small,
        smallRotation,
        '#view1',
        '#view2',
        { transform: 'translateX(-100%)', duration: 2 }
      );
    }
  }, [size]);

  useGSAP(() => {
    gsap.to('#heading', {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: '#heading',
        start: 'top 90%',
        end: 'bottom 60%',
      },
    });
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look.
        </h1>

        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModelView
              index={1}
              groupRef={small}
              gsapType='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className='w-full h-full'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')!}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className='mx-auto w-full'>
            <p className='text-sm font-light text-center py-4'>{model.title}</p>
            <div className='flex-center'>
              <ul className='color-container gap-4'>
                {models.map((item, index) => (
                  <li
                    key={index}
                    className='w-6 h-6 rounded-full mx-auto cursor-pointer'
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  ></li>
                ))}
              </ul>
              <button className='size-btn-container outline-none'>
                {sizes.map((item, index) => (
                  <span
                    className='size-btn transition-colors duration-200 will-change-auto ease-in'
                    onClick={() => setSize(item.value)}
                    style={{
                      backgroundColor:
                        size === item.value ? 'white' : 'transparent',
                      color: size === item.value ? 'black' : 'white',
                    }}
                    key={index}
                  >
                    {item.label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
