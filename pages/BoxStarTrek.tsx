import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Layout from "../components/Layout";
import Form from "../components/Form";
import { OrbitControls, Text, Stars, Html } from "@react-three/drei";

const Box = (props:any) => {
  const colorMap = useLoader(THREE.TextureLoader, "/borg.jpeg");
  const mesh = useRef<THREE.Mesh>();

  const [active, setActive] = useState(false);
  useFrame((state, delta) => (mesh.current.rotation.y += 0.005));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={colorMap} />
      <>
      <Html
        style={{
          transition: "all 0.2s",
          opacity: 1,
          transform: 0.5,
        }}
        distanceFactor={1.5}
        position={[0, 0, 0.51]}
        transform
        occlude
      >
        <Form />
      </Html>
      </>
    </mesh>
  );
};
const BoxStarTrek = () => (
  <Layout title="Home | Box">
    <Canvas shadows style={{ height: "calc(100vh - 100px)" }}>
      <color attach="background" args={["black"]} />
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
