import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function ConcertFestival({ data }) {
  const { nodes, materials } = useGLTF("/Concert-Festival.glb");

  //! JANGAN SENTUH APAPUN DISINI
  const getBoothProps = (index) => {
    const booths = [
      {
        name: "Tenants1_1",
        materialName: "Magic Moment 3",
        geometryNode: "Tenants1_1",
        position: [-1895.293, -1011.12, 5.395],
      },
      {
        name: "Tenants2_1",
        materialName: "_Color_M01_2",
        geometryNode: "Tenants2_1",
        position: [-1895.293, 493.84, 5.395],
      },
      {
        name: "Tenants3_1",
        materialName: "Lorenzo 14",
        geometryNode: "Tenants3_1",
        position: [-1895.293, 2055.932, 5.395],
      },
      {
        name: "Tenants4_1",
        materialName: "Herbal Scent 6",
        geometryNode: "Tenants4_1",
        position: [352.965, -1097.05, 0],
      },
      {
        name: "Tenants5_1",
        materialName: "_Color_M01_2",
        geometryNode: "Tenants5_1",
        position: [352.965, 407.91, 0],
      },
      {
        name: "Tenants6_1",
        materialName: "_Color_M01_2",
        geometryNode: "Tenants6_1",
        position: [352.965, 1969.997, 0],
      },
    ];

    return booths[index % booths.length];
  };

  return (
    <group dispose={null}>
      <group //gadigunakan
        name="festival_bsr"
        position={[0.03, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh //gadigunakan
          name="Mesh1_Group1_Model"
          castShadow
          receiveShadow
          geometry={nodes.Mesh1_Group1_Model.geometry}
          material={materials._Color_M01_2}
          position={[-3120, 2300, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh //gadigunakan
          name="Merged_Objects"
          castShadow
          receiveShadow
          geometry={nodes.Merged_Objects.geometry}
          material={materials._Color_M01_1}
          position={[390.965, 85.864, -22.005]}
        />
        {data.map((item, index) => {
          const { position, materialName, geometryNode } = getBoothProps(index);
          return (
            <mesh
              key={index}
              name={item.name}
              castShadow
              receiveShadow
              geometry={nodes[geometryNode].geometry}
              material={materials[materialName]}
              position={position}
            />
          );
        })}
      </group>
    </group>
  );
}

useGLTF.preload("/Concert-Festival.glb");