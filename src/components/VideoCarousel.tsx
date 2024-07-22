import React, { useEffect, useRef } from 'react';
import { hightlightsSlides } from '../constants/index';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

interface VideoProps {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}

gsap.registerPlugin(ScrollTrigger);

export default function VideoCarousel() {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLDivElement[]>([]);

  const [video, setVideo] = React.useState<VideoProps>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = React.useState<any[]>([]);
  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video;

  useGSAP(() => {
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        if (videoRef.current) startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  const handleLoadedMetaData = (
    _index: number,
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    return setLoadedData((prev) => [...prev, event]);
  };

  useEffect(() => {
    let currentProgress = 0;

    const span = videoSpanRef.current;
    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? '10vw' // mobile
                  : window.innerWidth < 1200
                  ? '10vw' // tablet
                  : '4vw', // laptop
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });

            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });
      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId] / hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  // TODO Add index number to handleProcess ??
  const handleProcess = (type: string) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: prev.videoId + 1,
        }));
        break;

      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;

      case 'video-reset':
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;

      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((slide, index) => (
          <div key={slide.id} id='slider' className='sm:pr-20 pr-10'>
            <div className='video-carousel_container'>
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video
                  ref={(el) => {
                    return (videoRef.current[index] = el as HTMLVideoElement);
                  }}
                  onPlay={() => {
                    setVideo((prev) => ({ ...prev, isPlaying: true }));
                  }}
                  id='video'
                  playsInline={true}
                  preload='auto'
                  muted
                  onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                >
                  <source src={slide.video} type='video/mp4' />
                </video>
              </div>

              <div className='absolute top-12 left-[5%] z-10'>
                {slide.textLists.map((text, i) => (
                  <p key={i} className='md:text-2xl text-xl font-medium'>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
              ref={(el) => (videoDivRef.current[i] = el as HTMLDivElement)}
            >
              <span
                className='absolute h-full w-full rounded-full'
                ref={(el) => (videoSpanRef.current[i] = el as HTMLDivElement)}
              />
            </span>
          ))}
        </div>

        <button className='control-btn'>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
}
