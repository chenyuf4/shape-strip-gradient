import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import "./App.css";
import Gradient from "./components/Gradient";

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas gl={{ preserveDrawingBuffer: true, antialias: true }}>
        <Gradient />
        <AdaptiveDpr pixelated />
      </Canvas>
    </Suspense>
  );
}

export default App;
