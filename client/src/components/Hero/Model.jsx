import { useThree } from "@react-three/fiber"
import modelUrl from "../../assets/models/3d_desktop.glb"
import { Center, useGLTF } from "@react-three/drei"

export default function Model () {
    const { viewport } = useThree()
    const { scene } = useGLTF(modelUrl)

    const isMobile = viewport.width < 2
    const isTablet = viewport.width >= 2 && viewport.width < 6


    return (
        <group 
            position={[0, -0.5, 0]}
        >
            <Center>
                <primitive 
                    object={scene} 
                    scale={isMobile ? 0.1 : isTablet ? 0.18 : 0.3}
                />
            </Center>
        </group>
    )
}