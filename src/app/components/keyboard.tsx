import React, { useEffect, useState, useRef } from "react";
import { Group } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export function Keyboard({ props }: { props?: any }) {
    const { nodes, materials } = useLoader(
        GLTFLoader,
        "/model/keyboard.glb",
        (loader) => {
            const dracoLoader = new DRACOLoader();

            dracoLoader.setDecoderPath("/draco/");
            loader.setDRACOLoader(dracoLoader);
        }
    ) as any;

    const modelRef = useRef<Group>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [positionY, setPositionY] = useState(4);
    const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
    const baseRotation = {
        x: Math.PI / 2,
        y: Math.PI / 3.6,
        z: -Math.PI / 5.6,
    };

    const { gl } = useThree();
    const canvas = gl.domElement;

    useEffect(() => {
        if (nodes && materials) {
            setIsLoaded(true);
        }
    }, [nodes, materials]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const xRatio = (e.clientX - rect.left) / rect.width;
            const yRatio = (e.clientY - rect.top) / rect.height;

            const offsetX = xRatio * 0.04;
            const offsetY = yRatio * 0.04;

            setTargetOffset({ x: offsetX, y: offsetY });
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        return () => canvas.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame(() => {
        if (isLoaded && modelRef.current) {
            const currentY = modelRef.current.position.y;
            const targetY = 0;
            const distance = currentY - targetY;

            if (distance <= 0.0001) {
                modelRef.current.position.y = targetY;
            } else {
                const transform = distance * 0.04;

                modelRef.current.position.y -= transform;
            }
        }

        if (modelRef.current) {
            const current = modelRef.current.rotation;
            const targetX = baseRotation.x + targetOffset.x;
            const targetY = baseRotation.y + targetOffset.y;

            current.x += (targetX - current.x) * 0.2;
            current.y += (targetY - current.y) * 0.2;
            current.z = baseRotation.z;
        }
    });

    return (
        <group
            {...props}
            dispose={null}
            scale={[0.01, 0.01, 0.01]}
            rotation={[Math.PI / 2, Math.PI / 3.6, Math.PI / -5.6]}
            ref={modelRef}
            position={[0, positionY, 0]}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Box002.geometry}
                material={materials.alu}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Box121.geometry}
                material={materials.kaycaps}
                rotation={[Math.PI / 2, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object001.geometry}
                material={materials.Material__5}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload("/model/keyboard.glb");
