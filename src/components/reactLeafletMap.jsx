import React, { useState } from "react";
import { MapContainer, WMSTileLayer } from "react-leaflet";
import L from "leaflet";
import { styled } from "@mui/system";
import BaseMap from "./BaseMap";
import { config } from "../config";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

export const StyledMapContainer = styled(MapContainer)(({ theme }) => ({
  height: "800px",
}));

export default function ReactLeafletMap(props) {
  const { selectedLayer } = props;

  return (
    <StyledMapContainer
      center={config.mapCenter}
      zoom={config.mapZoom}
    >
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@latest/dist/leaflet.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"
      />
      {selectedLayer && (
        <WMSTileLayer
          key={selectedLayer.layer}
          url={selectedLayer.url}
          layers={selectedLayer.layer}
          format="image/png"
          transparent={true}
          uppercase={true}
          opacity={1}
        />
      )}
      <VectorBasemapLayer name="arcgis/dark-gray" token={config.agolApiKey} />
    </StyledMapContainer>
  )
}
