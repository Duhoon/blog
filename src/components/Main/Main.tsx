"use client"

import * as Three from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';


function Box(props: any){
    const ref = useRef();

    useFrame(()=>{
        if (ref){
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
            <meshStandardMaterial color='blue'/>
        </mesh>
    )
}

export function Main(){
    return (
        <Canvas
            linear={true}
        >
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls/>
            <ambientLight intensity={5} position={[10, 0, 0]}/>
            
            <Box position={[0,0,5]}/>

            <mesh position={[0, 0, 1]} rotation={[0, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={'white'}/>
            </mesh>
            
        </Canvas>
    )
}