import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Layout from '../components/Layout'
import { OrbitControls } from '@react-three/drei'

const Box = (props: any) => {

  const mesh = useRef<THREE.Mesh>()

  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
const IndexPage = () => (
  <Layout title="Home | Box">
        <Canvas
          shadows
          style={{ height: 'calc(100vh - 100px)',  }}
          >
          <ambientLight />
          <OrbitControls />
          <pointLight position={[10, 10, 10]} />
          <Box position={[0, 0, 0]} />
        </Canvas>

  </Layout>
)

export default IndexPage
