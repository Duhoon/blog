"use client"

import * as Three from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props: any){
    const ref = useRef();
    return (
        <mesh
            {...props}
            ref={ref}
            scale={1}

        >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='hotpink'/>
        </mesh>
    )
}

export function Main(){
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera( 75, 3, 0.1, 1000 );

    // renderer.setSize(window.innerWidth, window.innerHeight);
    
    // console.log(renderer.domElement);

    return (
        <Canvas>
            <pointLight position={[10, 10, 10]}/>
            <Box position={[0,0,0]}/>
        </Canvas>
    )
}