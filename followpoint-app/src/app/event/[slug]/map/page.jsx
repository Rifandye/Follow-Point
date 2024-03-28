"use client";

import { Venue } from "@/components/venue";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { ConcertFestival } from "@/components/concert-festival";
import { Bazar } from "@/components/bazar";
import SideBarMap from "@/components/sidebarmap";
import MouseControl from "@/components/mouseControl";
import { getEventDetails } from "../page";
import BackButton from "@/components/backbuttonmap";
import CentralParkVenue from "@/components/CentralParkMap";
import GreenFieldVenue from "@/components/GreenFieldMap";

export default function MapEventPage({ params }) {
  const [venuesData, setVenuesData] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getEventDetails(params.slug);
    setVenuesData(res);
    setLoading(false);
  };

  const toggleSidebarWithTenant = (tenantData) => {
    setCurrentTenant(tenantData);
    setIsSidebarVisible(true);
  };

  const onClose = () => {
    setIsSidebarVisible(false);
  };

  const orbitRef = useRef();

  useEffect(() => {
    if (orbitRef.current) {
      const target = [1, 0, 0];
      orbitRef.current.target.set(...target);
      orbitRef.current.update();
    }
  }, []);
  return (
    <>
      {venuesData.venueFileName === "bazar" ? (
        <CentralParkVenue />
      ) : (
        <GreenFieldVenue />
      )}

      <BackButton />
      {loading ? (
        <div className="text-white">Loading the tickets...</div>
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
            {venuesData.venueFileName === "bazar" ? (
              <Bazar
                data={venuesData.booth}
                onTenantClick={toggleSidebarWithTenant}
              />
            ) : (
              <Venue
                data={venuesData.booth}
                onTenantClick={toggleSidebarWithTenant}
              />
            )}
            <OrbitControls ref={orbitRef} />
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
