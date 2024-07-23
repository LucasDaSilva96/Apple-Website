import { Html } from '@react-three/drei';

export default function Loader() {
  return (
    <Html>
      <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
        <div className='w-[10vw] h-[10vw] rounded-full'>
          <p className='animate-bounce transition-all'>Loading...</p>
        </div>
      </div>
    </Html>
  );
}
