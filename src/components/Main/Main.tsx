"use client"

import * as Three from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props: any){
    const ref = useRef();

    useFrame(()=>{
        if (ref){
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }
    })
    return (
        <mesh
            {...props}
            ref={ref}
            scale={1}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color='blue'/>
        </mesh>
    )
}

export function Main(){
    return (
        <Canvas>
            <ambientLight intensity={0.1} position={[0, 0, 0]}/>
            <Box position={[0,0,0]}/>
        </Canvas>
    )
}