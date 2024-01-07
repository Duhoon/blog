"use client"

import * as Three from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, OrbitControls, PerspectiveCamera, Reflector } from '@react-three/drei';


function Box(props: any){
    const ref = useRef<any>(null);

    useFrame(()=>{
        if (ref.current){
            ref.current.rotation.x += 0.005;
            ref.current.rotation.y += 0.005;
        }
    })

    return (
        <mesh
            {...props}
            ref={ref}
            scale={1}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color='blue' wireframe={true}/>
        </mesh>
    )
}

function Wall(props: any){
    const ref =  useRef();

    return (
        <mesh
            {...props}
            ref={ref}
        >
            <boxGeometry args = {[5, 5, 0.1]}/>
            <MeshReflectorMaterial
                resolution = {1024}
                mirror={2}
                color={"white"}
            />
        </mesh>
    )
}

export function Main(){
    return (
        <Canvas
        >
            <PerspectiveCamera makeDefault position={[0, 2, 3]} rotation={[ Math.PI / 4 , 0 , 0]} />
            <OrbitControls position={[0, 0, 3]}/>
            <ambientLight intensity={3} position={[0, 10, 0]}/>
            
            <Box position={[0, 0, 0]}/>

            <Wall position={[0, 0, 5]} rotation={[0, Math.PI, 0]}/>
            <Wall position={[0, 0, -5]} rotation={[0, Math.PI * 2, 0]}/>
            <Wall position={[5, 0, 0]} rotation={[0, Math.PI / 2 + Math.PI, 0]}/>
            <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2 + 2 * Math.PI, 0]}/>
        </Canvas>
    )
}