import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Coin from "./Coin";

const CoinCanvas = () => {
     return (
          <Canvas>
               <directionalLight
                    args={["#ffffff", 1]}
                    position={[0, 100, -10]}
               />
               <pointLight position={[100, 100, 40]} />
               <Coin />
               <OrbitControls />
          </Canvas>
     );
};

export default CoinCanvas;
