import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import React, { Suspense } from 'react';
import * as THREE from 'three';
import Lights from './Lights';
import IphoneModel from './Iphone';
import Loader from './Loader';
import { OrbitControls as ORBITCONTROLER } from 'three-stdlib';

type ModelViewProps = {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.MutableRefObject<ORBITCONTROLER>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: { id: number; title: string; color: string[]; img: string };
  size: string;
};

export default function ModelView({
  controlRef,
  groupRef,
  gsapType,
  index,
  item,
  setRotationState,
  size,
}: ModelViewProps) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${
        index === 2 ? 'right-[-100%]' : ''
      } `}
    >
      <ambientLight intensity={0.4} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() =>
          setRotationState(
            controlRef.current ? controlRef.current.getAzimuthalAngle() : 0
          )
        }
      />
      <group
        ref={groupRef}
        name={`${index === 1 ? 'small' : 'large'}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IphoneModel
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}
