import { Points, PointMaterial } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function AstralParticles({
  count = 100,
  size = 0.03,
  opacity = 0.5,
  depth = 8,
  speed = 0.2,
  drift = 0.05,
  color = "#a78bfa",
}) {

    const ref = useRef()

    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const vel = new Float32Array(count)

        for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 10
        pos[i * 3 + 1] = (Math.random() - 0.5) * 6
        pos[i * 3 + 2] = -Math.random() * depth

        vel[i] = Math.random() * speed + speed * 0.3
        }

        return { positions: pos, velocities: vel }
    }, [count, depth, speed])

    useFrame((state, delta) => {
        if (!ref.current) return

        const arr = ref.current.geometry.attributes.position.array

        for (let i = 0; i < count; i++) {
        // upward drift
        arr[i * 3 + 1] += velocities[i] * delta

        // subtle horizontal wobble
        arr[i * 3 + 0] += Math.sin(state.clock.elapsedTime * 0.5 + i) * drift * delta

        // wrap particles vertically
        if (arr[i * 3 + 1] > 3) arr[i * 3 + 1] = -3

        }

        ref.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
            transparent
            color={color}
            size={size}
            sizeAttenuation
            depthWrite={false}
            opacity={opacity}
            blending={THREE.AdditiveBlending}
        />
        </Points>
    )
}
