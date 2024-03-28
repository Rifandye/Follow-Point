import React, { useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";

export function Bazar({ data, onTenantClick }) {
  const { nodes, materials } = useGLTF("/Bazar.glb");

  const getBoothProps = (index) => {
    const boothsData = [
      {
        name: "Tenant1",
        position: [-320.781, 553.252, -7.873],
        geometry: "Tenant1",
        material: "Spanish Style",
      },
      {
        name: "Tenant2",
        position: [26.407, 553.252, -7.873],
        geometry: "Tenant2",
        material: "Champion",
      },
      {
        name: "Tenant3",
        position: [379.787, 553.252, -7.873],
        geometry: "Tenant3",
        material: "_Color_M01_1",
      },
      {
        name: "Tenant4",
        position: [-843.55, 589.882, -13.269],
        geometry: "Tenant4",
        material: "_Color_A05_1",
      },
      {
        name: "Tenant5",
        position: [1366.602, 93.901, -4.478],
        geometry: "Tenant5",
        material: "Color_H07",
      },
      {
        name: "Tenant6",
        position: [1366.602, -186.982, -4.478],
        geometry: "Tenant6",
        material: "Lagoon Glow",
      },
      {
        name: "Tenant7",
        position: [613.557, -407.69, -7.873],
        geometry: "Tenant7",
        material: "Incognito",
      },
      {
        name: "Tenant8",
        position: [16.742, -407.69, -7.873],
        geometry: "Tenant8",
        material: "Haiti",
      },
      {
        name: "Tenant9",
        position: [-856.256, -315.257, -7.873],
        geometry: "Tenant9",
        material: "Color_H07",
      },
      {
        name: "Tenant10",
        position: [877.952, 549.344, -9.873],
        geometry: "Tenant10",
        material: "Color_I03",
      },
    ];
    return boothsData[index % boothsData.length];
  };

  return (
    <>
      <group dispose={null}>
        <group name="Bazar">
          <group name="Bazar_1" rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
            <mesh
              name="Floor"
              castShadow
              receiveShadow
              geometry={nodes.Floor.geometry}
              material={materials.Color_I02}
              position={[-1195.203, -495.898, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            {data.map((item, index) => {
              const { position, geometry, material } = getBoothProps(index);
              const iconPosition = [
                position[0],
                position[1],
                position[2] + 500,
              ];
              const [isHovered, setIsHovered] = useState(false);

              const defaultStyle = {
                color: "#fff",
                background: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                padding: "5px 10px",
                textAlign: "center",
                textShadow: "0 0 4px rgba(0, 0, 0, 0.5)",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              };

              const hoverStyle = {
                ...defaultStyle,
                background: "rgba(255, 255, 255, 0.7)",
                color: "#000",
                border: "1px solid #fff",
              };

              return (
                <group key={index}>
                  <mesh
                    name={item.name}
                    castShadow
                    receiveShadow
                    geometry={nodes[geometry].geometry}
                    material={materials[material]}
                    position={position}
                  />
                  <Html position={iconPosition} scaleFactor={10} center>
                    <button
                      key={item.name}
                      style={isHovered ? hoverStyle : defaultStyle}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => onTenantClick(item)}
                    >
                      {item.name}
                    </button>
                  </Html>
                </group>
              );
            })}
            <mesh
              name="Mesh60_Model"
              castShadow
              receiveShadow
              geometry={nodes.Mesh60_Model.geometry}
              material={materials.Color_G06}
              position={[-1195.203, -495.898, -13.269]}
              rotation={[Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/Bazar.glb");
