import { useFrame, useThree } from "@react-three/fiber"
import modelUrl from "../../assets/models/3d_desktop.glb"
import { Center, useGLTF } from "@react-three/drei"
import { useRef } from "react"

export default function Model () {
    const { viewport } = useThree()
    const { scene } = useGLTF(modelUrl)

    const isMobile = viewport.width < 2
    const isTablet = viewport.width >= 2 && viewport.width < 6

    const idleRef = useRef()

    // Idle animation
    useFrame((state) => {
        if (!idleRef.current) return 

        const t = state.clock.getElapsedTime()
        idleRef.current.rotation.y = Math.sin(t * 0.4) * 0.25
        idleRef.current.rotation.x = Math.sin(t * 0.2) * 0.08
    })

    return (
        <group position={[0, 0, 0]}>
            <group 
                ref={idleRef}
            >
                <Center>
                    <primitive 
                        object={scene} 
                        scale={isMobile ? 0.1 : 0.3}
                    />
                </Center>
            </group>
        </group>
    )
}