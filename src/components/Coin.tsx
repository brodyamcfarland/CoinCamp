import { Gltf } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Coin = () => {
     const ref = useRef<any>();

     useFrame(() => {
          if (ref.current) {
               ref.current.rotation.y += 0.005;
          }
     });
     return (
          <Gltf
               src="/GLTF-Models/coin.gltf"
               receiveShadow
               castShadow
               position={[0, 0, 0]}
               rotation={[0, -Math.PI, 0]}
               scale={7}
               ref={ref}
               name="coin"
          />
     );
};

export default Coin;
