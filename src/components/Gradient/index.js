import { useRef, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { fragmentShader } from "./fragmentShader";
import { vertexShader } from "./vertexShader";
import * as THREE from "three";
import { useControls, folder, button } from "leva";
import { useFrame } from "@react-three/fiber";
const Gradient = () => {
  const { viewport, size, gl } = useThree();
  const meshRef = useRef(null);

  const {
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
    color9,
    spacing,
    colorNoiseSize,
    colorNoiseStrength,
    shapeSize,
  } = useControls({
    colors: folder({
      color1: "#cce5ff",
      color2: "#99ccff",
      color3: "#66b2ff",
      color4: "#3299ff",
      color5: "#007fff",
      color6: "#0066cc",
      color7: "#004c99",
      color8: "#003366",
      color9: "#001933",
      spacing: { value: 0.04, min: 0.01, max: 0.05, step: 0.001 },
      shapeSize: { value: 0.4, min: 0.1, max: 1.0, step: 0.001 },
    }),
    noise: folder({
      colorNoiseStrength: { value: 0.8, min: 0, max: 1.0, step: 0.01 },
      colorNoiseSize: { value: 0.62, min: 0.01, max: 5.0, step: 0.01 },
    }),
    Screenshot: button(() => {
      const link = document.createElement("a");
      link.setAttribute("download", "canvas.png");
      link.setAttribute(
        "href",
        gl.domElement
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    }),
  });

  const uniforms = useMemo(
    () => ({
      u_colors: {
        value: [
          new THREE.Color(color1),
          new THREE.Color(color2),
          new THREE.Color(color3),
          new THREE.Color(color4),
          new THREE.Color(color5),
          new THREE.Color(color6),
          new THREE.Color(color7),
          new THREE.Color(color8),
          new THREE.Color(color9),
        ],
      },
      u_spacing: { value: spacing },
      u_viewportSize: { value: new THREE.Vector2(size.width, size.height) },
      u_colorNoiseSize: { value: colorNoiseSize },
      u_colorNoiseStrength: { value: colorNoiseStrength },
      u_shapeSize: { value: shapeSize },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_viewportSize.value.set(
        size.width,
        size.height
      );
      meshRef.current.material.uniforms.u_colors.value = [
        new THREE.Color(color1),
        new THREE.Color(color2),
        new THREE.Color(color3),
        new THREE.Color(color4),
        new THREE.Color(color5),
        new THREE.Color(color6),
        new THREE.Color(color7),
        new THREE.Color(color8),
        new THREE.Color(color9),
      ];
      meshRef.current.material.uniforms.u_spacing.value = spacing;
      meshRef.current.material.uniforms.u_colorNoiseSize.value = colorNoiseSize;
      meshRef.current.material.uniforms.u_colorNoiseStrength.value =
        colorNoiseStrength;
      meshRef.current.material.uniforms.u_shapeSize.value = shapeSize;
    }
  });
  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1024, 1024]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

export default Gradient;
