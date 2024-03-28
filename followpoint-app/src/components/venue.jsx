import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";

//! JANGAN DISENTUH
const boothPositions = [
  [0.12346411, 0.0107113, -0.07073326], //booth13
  [-0.05188416, 0.0107113, -0.07073326], //booth6
  [0.12346411, 0.0107113, -0.01502018], //booth14
  [-0.05188416, 0.0107113, -0.01502018], //booth2
  [0.10320776, 0.0107113, -0.07073326], //booth11
  [-0.07214051, 0.0107113, -0.07073326], //booth5
  [0.10320776, 0.0107113, -0.01502018], //booth12
  [-0.07214051, 0.0107113, -0.01502018], //booth1
  [0.08116882, 0.0107113, -0.07073326], //booth9
  [-0.09417946, 0.0107113, -0.07073326], //booth4
  [0.08116882, 0.0107113, -0.01502018], //booth10
  [-0.09417946, 0.0107113, -0.01502018], //booth0
  [0.06017566, 0.0107113, -0.07073326], //booth7
  [-0.11517262, 0.0107113, -0.07073326], //booth 3
  [0.06017566, 0.0107113, -0.01502018], //booth 8
  [-0.11517262, 0.0107113, -0.01502018], //booth 15
];

export function Venue({ data, onTenantClick }) {
  const { nodes, materials } = useGLTF("/venue.glb");

  return (
    <group dispose={null}>
      {data.map((venue, index) => {
        const iconPosition = [
          boothPositions[index][0],
          boothPositions[index][1],
          boothPositions[index][2] + 100,
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
          <>
            <group
              key={venue.id}
              name="Booth_13"
              position={boothPositions[index]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={0.00031028}
            >
              <mesh
                name="Windows"
                castShadow
                receiveShadow
                geometry={nodes.Windows.geometry}
                material={materials["Windows 14"]}
                position={[87.29199982, -52.29198837, -3.77000022]}
              />
              <mesh
                name="Frames"
                castShadow
                receiveShadow
                geometry={nodes.Frames.geometry}
                material={materials["Frames 14"]}
                position={[87.29199982, -52.29198837, -3.77000022]}
              />
              <mesh
                name="Roof"
                castShadow
                receiveShadow
                geometry={nodes.Roof.geometry}
                material={materials["Roof 27"]}
                position={[87.29199982, -52.29198837, -3.77000022]}
              />
              <mesh
                name="Roof_02"
                castShadow
                receiveShadow
                geometry={nodes.Roof_02.geometry}
                material={materials["Roof 28"]}
              />
              <mesh
                name="Main_body"
                castShadow
                receiveShadow
                geometry={nodes.Main_body.geometry}
                material={materials["Main body 14"]}
                position={[87.29199982, -52.29198837, -3.77000022]}
              />
              <mesh
                name="Plaster"
                castShadow
                receiveShadow
                geometry={nodes.Plaster.geometry}
                material={materials["Plaster 14"]}
                position={[0, 0, 2.05065417]}
              />
              <Html position={iconPosition} scaleFactor={10} center>
                <button
                  key={venue.name}
                  style={isHovered ? hoverStyle : defaultStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => onTenantClick(venue)}
                >
                  {venue.name}
                </button>
              </Html>
            </group>
            ;
          </>
        );
      })}

      <group
        name="Group_4"
        position={[-0.08154321, 0.0107113, -0.04204525]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        scale={0.001}
      >
        <group
          name="Picnic_Table_And_Bench_1"
          position={[34.00249418, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench.geometry}
              material={materials["Subsurface Textured 10"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim"
              castShadow
              receiveShadow
              geometry={nodes.rim.geometry}
              material={materials["Subsurface Textured 11"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame"
              castShadow
              receiveShadow
              geometry={nodes.frame.geometry}
              material={materials["Chrome Satin 6"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
        <group
          name="Picnic_Table_And_Bench_3"
          position={[13.11386704, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_1"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_1"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_1.geometry}
              material={materials["Subsurface Textured 12"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_1"
              castShadow
              receiveShadow
              geometry={nodes.rim_1.geometry}
              material={materials["Subsurface Textured 13"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_1"
              castShadow
              receiveShadow
              geometry={nodes.frame_1.geometry}
              material={materials["Chrome Satin 7"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
        <group
          name="Street_Trash_Can_1"
          position={[-39.56731892, 8.8459955, 0]}
          scale={0.00356618}
        >
          <mesh
            name="Street_Trash_Can_cylindrical_metal_02_1"
            castShadow
            receiveShadow
            geometry={nodes.Street_Trash_Can_cylindrical_metal_02_1.geometry}
            material={materials["Aluminum Satin 2"]}
            scale={5.19163817}
          />
        </group>
        <group
          name="Picnic_Table_And_Bench_2"
          position={[-28.77000865, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_2"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_2"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_2.geometry}
              material={materials["Subsurface Textured 14"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_2"
              castShadow
              receiveShadow
              geometry={nodes.rim_2.geometry}
              material={materials["Subsurface Textured 15"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_2"
              castShadow
              receiveShadow
              geometry={nodes.frame_2.geometry}
              material={materials["Chrome Satin 8"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
        <group
          name="Street_Trash_Can_1"
          position={[-39.56731892, -8.8459955, 0]}
          scale={0.00356618}
        >
          <mesh
            name="Street_Trash_Can_cylindrical_metal_02_1_1"
            castShadow
            receiveShadow
            geometry={nodes.Street_Trash_Can_cylindrical_metal_02_1_1.geometry}
            material={materials["Aluminum Satin 3"]}
            scale={5.19163817}
          />
        </group>
        <group
          name="Picnic_Table_And_Bench_4"
          position={[-8.10933686, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_3"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_3"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_3.geometry}
              material={materials["Subsurface Textured 16"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_3"
              castShadow
              receiveShadow
              geometry={nodes.rim_3.geometry}
              material={materials["Subsurface Textured 17"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_3"
              castShadow
              receiveShadow
              geometry={nodes.frame_3.geometry}
              material={materials["Chrome Satin 9"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
      </group>
      <group
        name="Group_3"
        position={[0.08598235, 0.0107113, -0.04204525]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <group
          name="Picnic_Table_And_Bench_1_1"
          position={[34.00249418, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_4"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_4"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_4.geometry}
              material={materials["Subsurface Textured 2"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_4"
              castShadow
              receiveShadow
              geometry={nodes.rim_4.geometry}
              material={materials["Subsurface Textured 3"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_4"
              castShadow
              receiveShadow
              geometry={nodes.frame_4.geometry}
              material={materials["Chrome Satin 2"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
        <group
          name="Picnic_Table_And_Bench_3_1"
          position={[13.11386704, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_5"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_5"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_5.geometry}
              material={materials["Subsurface Textured 6"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_5"
              castShadow
              receiveShadow
              geometry={nodes.rim_5.geometry}
              material={materials["Subsurface Textured 7"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_5"
              castShadow
              receiveShadow
              geometry={nodes.frame_5.geometry}
              material={materials["Chrome Satin 4"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
        <group
          name="Street_Trash_Can_1_1"
          position={[-39.56731892, 8.8459955, 0]}
          scale={0.00356618}
        >
          <mesh
            name="Street_Trash_Can_cylindrical_metal_02_1_2"
            castShadow
            receiveShadow
            geometry={nodes.Street_Trash_Can_cylindrical_metal_02_1_2.geometry}
            material={materials["Aluminum Satin 1"]}
            scale={5.19163817}
          />
        </group>
        <group
          name="Picnic_Table_And_Bench_2_1"
          position={[-28.77000865, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_6"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_6"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_6.geometry}
              material={materials["Subsurface Textured 4"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_6"
              castShadow
              receiveShadow
              geometry={nodes.rim_6.geometry}
              material={materials["Subsurface Textured 5"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_6"
              castShadow
              receiveShadow
              geometry={nodes.frame_6.geometry}
              material={materials["Chrome Satin 3"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
        <group
          name="Street_Trash_Can_4"
          position={[-39.56731892, -8.8459955, 0]}
          scale={0.00356618}
        >
          <mesh
            name="Street_Trash_Can_cylindrical_metal_02_1_3"
            castShadow
            receiveShadow
            geometry={nodes.Street_Trash_Can_cylindrical_metal_02_1_3.geometry}
            material={materials["Aluminum Satin"]}
            scale={5.19163817}
          />
        </group>
        <group
          name="Picnic_Table_And_Bench_4_1"
          position={[-8.10933686, -0.25886999, 0]}
          scale={0.03977972}
        >
          <group
            name="Picnic_Table_And_Bench_7"
            position={[0, -12.3586235, -0.00003815]}
          >
            <mesh
              name="table_and_bench_7"
              castShadow
              receiveShadow
              geometry={nodes.table_and_bench_7.geometry}
              material={materials["Subsurface Textured 8"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="rim_7"
              castShadow
              receiveShadow
              geometry={nodes.rim_7.geometry}
              material={materials["Subsurface Textured 9"]}
              rotation={[0, 0, Math.PI / 2]}
            />
            <mesh
              name="frame_7"
              castShadow
              receiveShadow
              geometry={nodes.frame_7.geometry}
              material={materials["Chrome Satin 5"]}
              rotation={[0, 0, Math.PI / 2]}
            />
          </group>
        </group>
      </group>
      <group
        name="Music_neon_sign"
        position={[-0.02032828, 0.03797951, -0.27894866]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.00003736}
      >
        <group
          name="Music_Neon_Sign"
          position={[-5.75248599, -30.95590591, 0.00001907]}
        >
          <mesh
            name="glass_neon_tube_guitar"
            castShadow
            receiveShadow
            geometry={nodes.glass_neon_tube_guitar.geometry}
            material={materials["neon glass tube"]}
            scale={10}
          />
          <mesh
            name="glass_neon_tube_music_sign"
            castShadow
            receiveShadow
            geometry={nodes.glass_neon_tube_music_sign.geometry}
            material={materials["Classic Calm 1"]}
            scale={10}
          />
          <mesh
            name="metal_hitches"
            castShadow
            receiveShadow
            geometry={nodes.metal_hitches.geometry}
            material={materials["Chrome Satin"]}
            scale={10}
          />
        </group>
      </group>
      <group
        name="Group_8"
        position={[-0.14476061, 0.00345742, 0.01228745]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <group
          name="Restroom_Sign_1"
          position={[4.28329018, -0.21484087, 14.23615918]}
          rotation={[0, 0, Math.PI / 2]}
          scale={0.07839768}
        >
          <mesh
            name="RestroomSign"
            castShadow
            receiveShadow
            geometry={nodes.RestroomSign.geometry}
            material={materials["Metal 4"]}
            position={[0, -0.4860708, 19.82478878]}
            scale={17.13566303}
          />
          <mesh
            name="Tape"
            castShadow
            receiveShadow
            geometry={nodes.Tape.geometry}
            material={materials["Tape 4"]}
            position={[0, -0.48607029, 19.82478878]}
            scale={8.21950363}
          />
        </group>
        <mesh
          name="Box"
          castShadow
          receiveShadow
          geometry={nodes.Box.geometry}
          material={materials["Berlin 4"]}
          position={[-0.03396783, 0, 0]}
          scale={1.07185731}
        />
      </group>
      <group
        name="Group_7"
        position={[-0.14476061, 0.00345742, 0.02588775]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <group
          name="Restroom_Sign_1_1"
          position={[4.28329018, -0.21484087, 14.23615918]}
          rotation={[0, 0, Math.PI / 2]}
          scale={0.07839768}
        >
          <mesh
            name="RestroomSign_1"
            castShadow
            receiveShadow
            geometry={nodes.RestroomSign_1.geometry}
            material={materials["Metal 3"]}
            position={[0, -0.4860708, 19.82478878]}
            scale={17.13566303}
          />
          <mesh
            name="Tape_1"
            castShadow
            receiveShadow
            geometry={nodes.Tape_1.geometry}
            material={materials["Tape 3"]}
            position={[0, -0.48607029, 19.82478878]}
            scale={8.21950363}
          />
        </group>
        <mesh
          name="Box_1"
          castShadow
          receiveShadow
          geometry={nodes.Box_1.geometry}
          material={materials["Berlin 3"]}
          position={[-0.03396783, 0, 0]}
          scale={1.07185731}
        />
      </group>
      <group
        name="Group_2"
        position={[-0.14476061, 0.00345742, 0.03878679]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <group
          name="Restroom_Sign_1_2"
          position={[4.28329018, -0.21484087, 14.23615918]}
          rotation={[0, 0, Math.PI / 2]}
          scale={0.07839768}
        >
          <mesh
            name="RestroomSign_2"
            castShadow
            receiveShadow
            geometry={nodes.RestroomSign_2.geometry}
            material={materials["Metal 2"]}
            position={[0, -0.4860708, 19.82478878]}
            scale={17.13566303}
          />
          <mesh
            name="Tape_2"
            castShadow
            receiveShadow
            geometry={nodes.Tape_2.geometry}
            material={materials["Tape 2"]}
            position={[0, -0.48607029, 19.82478878]}
            scale={8.21950363}
          />
        </group>
        <mesh
          name="Box_2"
          castShadow
          receiveShadow
          geometry={nodes.Box_2.geometry}
          material={materials["Berlin 2"]}
          position={[-0.03396783, 0, 0]}
          scale={1.07185731}
        />
      </group>
      <mesh
        name="Merged_Objects_13"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_13.geometry}
        material={materials["Astra 8"]}
        position={[-0.0001666, 0.0106064, -0.15060819]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_17"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_17.geometry}
        material={materials["Astra 12"]}
        position={[0.13519118, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_16"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_16.geometry}
        material={materials["Astra 11"]}
        position={[0.11308379, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_15"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_15.geometry}
        material={materials["Astra 10"]}
        position={[0.09135974, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_22"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_22.geometry}
        material={materials["Astra 17"]}
        position={[-0.14060076, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_21"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_21.geometry}
        material={materials["Astra 16"]}
        position={[-0.12340971, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_20"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_20.geometry}
        material={materials["Astra 15"]}
        position={[-0.10504667, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_19"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_19.geometry}
        material={materials["Astra 14"]}
        position={[-0.0869661, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_18"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_18.geometry}
        material={materials["Astra 13"]}
        position={[-0.0689439, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_14"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_14.geometry}
        material={materials["Astra 9"]}
        position={[0.07098863, 0.0106064, -0.26925885]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_5"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_5.geometry}
        material={materials.Astra}
        position={[-0.0001666, 0.0106064, -0.15060819]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_1"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_1.geometry}
        material={materials["Chrome Satin 13"]}
        position={[0.09152492, 0.01073166, -0.1074046]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_4"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_4.geometry}
        material={materials["Chrome Satin 16"]}
        position={[0.09025301, 0.01073166, -0.24984705]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_3"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_3.geometry}
        material={materials["Chrome Satin 15"]}
        position={[-0.09240684, 0.01073166, -0.24984705]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects_2"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects_2.geometry}
        material={materials["Chrome Satin 14"]}
        position={[-0.09240684, 0.01073166, -0.1074046]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <mesh
        name="Merged_Objects"
        castShadow
        receiveShadow
        geometry={nodes.Merged_Objects.geometry}
        material={materials["Chrome Satin 12"]}
        position={[0.09152492, 0.01073166, -0.1074046]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      />
      <group
        name="Stage"
        position={[0.00272623, 0.0085591, -0.2655731]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh
          name="Stage_Screen"
          castShadow
          receiveShadow
          geometry={nodes.Stage_Screen.geometry}
          material={materials["Emerald Dream 1"]}
          position={[0, 16.66101077, 23.85813331]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.26855484}
        />
        <mesh
          name="Stage_Floor"
          castShadow
          receiveShadow
          geometry={nodes.Stage_Floor.geometry}
          material={materials["Emerald Dream"]}
          scale={0.26855484}
        />
      </group>
      <mesh
        name="Floor"
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials["Garden Glow"]}
        position={[0, 0, -0.11803198]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.00153019}
      />
      <mesh
        name="Three_Steps_Stairs_1"
        castShadow
        receiveShadow
        geometry={nodes.Three_Steps_Stairs_1.geometry}
        material={materials.Shape}
        position={[0.04664603, 0.01083532, -0.26541762]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.00028719}
      />
      <mesh
        name="metal_fence_segment"
        castShadow
        receiveShadow
        geometry={nodes.metal_fence_segment.geometry}
        material={materials["Noise Satin"]}
        position={[0.00202897, 0.0107113, 0.05030323]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.00011088}
      />
    </group>
  );
}

useGLTF.preload("/venue.glb");
