"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import CentralParkVenue from "@/components/CentralParkMap";
import GreenFieldVenue from "@/components/GreenFieldMap";
import BackButton from "@/components/BackButtonMap";
import { Canvas } from "@react-three/fiber";
import { Bazar } from "@/components/Bazar";
import { Venue } from "@/components/Venue";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";
import MouseControl from "@/components/MouseControler";
import SideBarMap from "@/components/SidebarMap";
import { IEvents } from "@/types";
import { getEventBySlug } from "@/actions/payment";

export default function MapEventPage({ params }: any) {
  const [venuesData, setVenuesData] = useState<IEvents | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  const orbitRef = useRef<ThreeOrbitControls | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res: IEvents = await getEventBySlug(params.slug);
    setVenuesData(res);
    setLoading(false);
  };

  const toggleSidebarWithTenant = (tenantData: any) => {
    setCurrentTenant(tenantData);
    setIsSidebarVisible(true);
  };

  const onClose = () => {
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    if (orbitRef.current) {
      const target: [number, number, number] = [1, 0, 0];
      orbitRef.current.target.set(...target);
      orbitRef.current.update();
    }
  }, []);

  return (
    <>
      {venuesData?.venueFileName === "bazar" ? (
        <CentralParkVenue />
      ) : (
        <GreenFieldVenue />
      )}

      <BackButton />
      {loading ? (
        <div className="text-white"></div>
      ) : (
        <Canvas
          style={{
            width: "100vw",
            height: "100vh",
            background: "rgba(27,29,34,1)",
          }}
          camera={{ position: [3, 3, 3], fov: 20 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />
            {venuesData?.venueFileName === "bazar" ? (
              <Bazar
                data={venuesData.booth}
                onTenantClick={toggleSidebarWithTenant}
              />
            ) : (
              <Venue
                data={venuesData?.booth}
                onTenantClick={toggleSidebarWithTenant}
              />
            )}
            <DreiOrbitControls ref={orbitRef} />
          </Suspense>
        </Canvas>
      )}
      <MouseControl />
      {isSidebarVisible && (
        <SideBarMap tenantData={currentTenant} onClose={onClose} />
      )}
    </>
  );
}
