import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useGLTF, Preload } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from 'three';

import CanvasLoader from "../Loader";

// Certification Plane Component
const CertificationPlane = ({ imageUrl }) => {
  const texture = useLoader(TextureLoader, imageUrl);

  // Calculer le ratio d'aspect de l'image
  const imageAspect = texture.image ? texture.image.width / texture.image.height : 1.4;

  // Dimensions du plan basées sur le ratio de l'image
  const planeHeight = CERT_HEIGHT;
  const planeWidth = planeHeight * imageAspect;

  return (
    <mesh position={CERT_POSITION} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
};

// === PARAMETRES VUE & RENDU ===
const CAMERA_FOV = 50;             // Champ de vision (petit = zoom, grand = grand angle)
const CAMERA_POSITION = [-4, 1, 0]; // Position caméra [x, y, z]
const CAMERA_TARGET = [0, 0.6, 0];  // Point regardé par la caméra [x, y, z]
const AVATAR_SCALE = 2;             // Échelle de l'avatar
const AVATAR_POSITION = [0, 0.5, 0]; // Position de l'avatar [x, y, z]
const CERT_POSITION = [-0.6, 0.5, 0]; // Position du plan certification
const CERT_HEIGHT = 0.85;            // Hauteur du plan certification

// === PARAMETRES ANIMATION ===
const ANIM_DURATION = 0.8;          // Durée de l'animation (secondes)
const ANIM_SCALE_INTENSITY = 0.06;  // Intensité du bounce de scale
const ANIM_WIGGLE_INTENSITY = 0.15; // Intensité de la rotation wiggle
const ANIM_WIGGLE_FREQ = 2.5;       // Fréquence de l'oscillation

// Inner scene component (needs Canvas context for useFrame/useGLTF)
const AvatarScene = ({ certificationImage }) => {
  const group = useRef();
  const avatarRef = useRef();
  const { nodes, materials } = useGLTF('/avatar/avatar.glb');

  // Animation state
  const animRef = useRef({ active: false, time: 0 });
  const prevImage = useRef(certificationImage);

  // Detect certification change and trigger animation
  useEffect(() => {
    if (prevImage.current !== certificationImage && certificationImage) {
      prevImage.current = certificationImage;
      animRef.current = { active: true, time: 0 };
    }
  }, [certificationImage]);

  // Run animation each frame
  useFrame((state, delta) => {
    const anim = animRef.current;
    if (!anim.active || !avatarRef.current) return;

    anim.time += delta;
    const t = Math.min(anim.time / ANIM_DURATION, 1);

    // Elastic bounce on scale (grows then shrinks back)
    const scaleOffset = Math.sin(t * Math.PI) * ANIM_SCALE_INTENSITY * (1 - t * 0.5);
    const s = 1 + scaleOffset;
    avatarRef.current.scale.set(s, s, s);

    // Damped rotation wiggle (oscillates and fades out)
    const wiggle = Math.sin(t * Math.PI * ANIM_WIGGLE_FREQ) * ANIM_WIGGLE_INTENSITY * (1 - t);
    avatarRef.current.rotation.y = wiggle;

    if (t >= 1) {
      anim.active = false;
      avatarRef.current.scale.set(1, 1, 1);
      avatarRef.current.rotation.y = 0;
    }

    // Request next frame (needed because frameloop="demand")
    state.invalidate();
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        target={CAMERA_TARGET}
      />
      <group ref={group} dispose={null}>
        {/* Light */}
        <hemisphereLight intensity={2} groundColor="black" />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />

        {/* Animated avatar group */}
        <group ref={avatarRef}>
          <primitive
            object={nodes.Hips}
            scale={AVATAR_SCALE}
            position={AVATAR_POSITION}
            rotation={[0, -Math.PI / 2, 0]}
          />

          {/* Certification Plane - part of 3D scene */}
          {certificationImage && (
            <Suspense fallback={null}>
              <CertificationPlane imageUrl={certificationImage} />
            </Suspense>
          )}

          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
          />
        </group>
      </group>
    </>
  );
};

const AvatarCanvas = ({ certificationImage }) => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: CAMERA_FOV, near: 0.1, far: 200, position: CAMERA_POSITION }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <AvatarScene certificationImage={certificationImage} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default AvatarCanvas;
