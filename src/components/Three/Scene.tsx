"use client"

import { 
    AmbientLight,
    HemisphereLight, 
    HemisphereLightHelper, 
    LoadingManager, 
    Mesh, 
    SpotLightHelper,
    TextureLoader,
} from 'three';
import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
    MeshReflectorMaterial, 
    OrbitControls, 
    PerspectiveCamera, 
    useHelper,
    useProgress,
} from '@react-three/drei';


function Mable(props: any){
    const objectRef = useRef<Mesh>(null);
    const [colorMap, normalMap, roughnessMap, displacementMap] = 
        useLoader(TextureLoader, 
            [
                './assets/texture/Marble_Red_004_basecolor.jpg', 
                './assets/texture/Marble_Red_004_normal.jpg', 
                './assets/texture/Marble_Red_004_roughness.jpg', 
                './assets/texture/Marble_Red_004_height.png',
            ]
        );

    useFrame(()=>{
        if (objectRef.current){
            objectRef.current.rotation.x += 0.005;
            objectRef.current.rotation.y += 0.005;
        }
    })

    return  (
        <mesh
            {...props}
            ref={objectRef}
            scale={1}
            castShadow={true}
        >
            <sphereGeometry args={[2, 360, 360]} />
            <meshPhongMaterial
                map={colorMap} 
                normalMap={normalMap}
                displacementMap={displacementMap}
                shininess={5}
                specular={'#ffffff'}
            />
        </mesh>
    )
}

function Floor () {
    const base = useLoader(TextureLoader, './assets/texture/Concrete_019_BaseColor.jpg');
    const normal = useLoader(TextureLoader, './assets/texture/Concrete_019_Normal.jpg');
    const height = useLoader(TextureLoader, './assets/texture/Concrete_019_Height.png');
    const roughness = useLoader(TextureLoader, './assets/texture/Concrete_019_Roughness.jpg');

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow={true}>
            <planeGeometry args={[50, 50]}/>
            <meshStandardMaterial 
                map={base} 
                normalMap={normal} 
                displacementMap={height} 
                displacementScale={0.1} 
                roughnessMap={roughness}
            />
        </mesh>
    )

}

function Wall(props: any){
    const ref =  useRef<Mesh>(null);
    
    return (
        <mesh
            {...props}
            ref={ref}
        >
            <boxGeometry args = {[50, 50, 0.1]}/>
            <MeshReflectorMaterial
                resolution = {2048}
                mirror={4}
                color={"white"}
            />
        </mesh>
    )
}

function Light () {
    const hemisphereLightRef = useRef<HemisphereLight>(null!);
    // useHelper(hemisphereLightRef, HemisphereLightHelper, 4, 'red');

    return (
        <hemisphereLight 
            color={'#ffffff'} 
            intensity={1} 
            position={[0, 1, 0]} 
            ref={hemisphereLightRef}
        />
    )
}

function DirectionLight(){
    return (
        <directionalLight intensity={1} position={[0, 2, 0]} castShadow/>
    )
}

export function Scene(){
    return (
        <Canvas
            shadows={true}
        >
            <PerspectiveCamera makeDefault position={[0, 10, 10]} rotation={[ Math.PI / 4 , 0 , 0]}/>
            <OrbitControls position={[0, 0, 10]} maxDistance={25} minDistance={5} maxPolarAngle={Math.PI / 2}/> 
            <Light/>
            <DirectionLight/>
            
            <Floor/>

            <Mable position={[0, 1, 0]}/>

            <Wall position={[0, 0, 25]} rotation={[0, Math.PI, 0]}/>
            <Wall position={[0, 0, -25]} rotation={[0, Math.PI * 2, 0]}/>
            <Wall position={[25, 0, 0]} rotation={[0, Math.PI / 2 + Math.PI, 0]}/>
            <Wall position={[-25, 0, 0]} rotation={[0, Math.PI / 2 + 2 * Math.PI, 0]}/>
        </Canvas>
    )
}