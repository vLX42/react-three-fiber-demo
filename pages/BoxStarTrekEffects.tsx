import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Layout from "../components/Layout";
import { OrbitControls, Text, Stars } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";


const TorusShaderMaterial = {
  uniforms: {
    u_time: { type: "f", value: 0 }
  },
  vertexShader: `
    precision mediump float;
    varying vec2 vUv;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float u_time;
    void main() {
      vec2 uv = vUv;
      float cb = floor((uv.x + u_time) * 40.);
      gl_FragColor = vec4(mod(cb, 2.0),0.,0.,1.);
    }
  `
};


const Box = (props) => {
  const colorMap = useLoader(THREE.TextureLoader, "/borg.jpeg");
  const mesh = useRef();

  const [active, setActive] = useState(false);
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01));

  return (
    <EffectComposer multisampling={0} disableNormalPass={true}>
    <DepthOfField focusDistance={20} focalLength={0.02} bokehScale={2} height={480} />
    <Bloom luminanceThreshold={0} luminanceSmoothing={0.002 } height={300} opacity={3} />
    <Noise opacity={.25} />
    <Vignette eskil={false} offset={0.1} darkness={1.1} />
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* <torusGeometry args={[1.8, 1.2, 48, 64]} /> */}
      <meshStandardMaterial map={colorMap} />
    </mesh>
    </EffectComposer>
  );
};
const BoxStarTrek = () => (
  <Layout title="Home | Box">
    <Canvas
      shadows
      style={{ height: "calc(100vh - 100px)" }}
    >
      <color attach="background" args={['black']} />
      <ambientLight />
      <OrbitControls />
      <pointLight position={[10, 10, 10]} />
      <Suspense
        fallback={
          <Text color={"white"} fontSize={12}>
            Loading texture...
          </Text>
        }
      >
        <Box position={[0, 0, 0]} />
      </Suspense>
      <Stars />
    </Canvas>
  </Layout>
);

export default BoxStarTrek;
