import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (
  target: string,
  animationProps: {
    opacity?: number;
    y?: number;
    x?: number;
    duration?: number;
  },
  scrollTriggerProps?: { start?: string; end?: string }
) => {
  gsap.to(target, {
    ...animationProps,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: target,
      // Scroll-in, scroll-out, scroll-back-in, scroll-back-out
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
    },
  });
};

export const animateWithGsapTimeline = (
  timeLine: gsap.core.Timeline,
  rotationRef: React.MutableRefObject<THREE.Group>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: { transform: string; duration: number }
) => {
  timeLine.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeLine.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<'
  );

  timeLine.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<'
  );
};
