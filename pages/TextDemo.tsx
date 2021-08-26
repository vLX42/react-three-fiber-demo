import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Layout from "../components/Layout";
import { OrbitControls, useTexture, Text, Reflector } from "@react-three/drei";
import { Vector2, sRGBEncoding } from "three";

function VideoText({ ...props }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/freight3.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      onloadeddata: () => setVideoLoaded(true),
    })
  );

  useEffect(() => void (videoLoaded && video.play()), [video, videoLoaded]);
  return (
    <Text
      font="/DFDS-Bold.woff"
      fontSize={0.8}
      letterSpacing={-0.06}
      {...props}
    >
      Digital Freight
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  );
}

function Ground() {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector
      resolution={512}
      args={[10, 10]}
      mirror={0.4}
      mixBlur={8}
      mixStrength={1}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      blur={[400, 100]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={new Vector2(1, 1) }
          {...props}
        />
      )}
    </Reflector>
  );
}

const TextDemo = () => {
  return (
    <Layout title="Home | Box">
      <Canvas shadows style={{ height: "calc(100vh - 100px)" }}>
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <VideoText position={[0, 0.8, -2]} />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </Layout>
  );
};

export default TextDemo;
