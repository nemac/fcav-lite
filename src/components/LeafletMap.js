/* This component will be for the leaflet map and all of its logic
We anticipate calling NDVIMultiYearGraph from this component
MapLegend.js will be in here too
*/

import React, { useDebugValue, useState } from 'react';
import { NDVIMultiYearGraph } from "./NDVIMultiYearGraph";
import {Grid} from "@material-ui/core";
import { MapContainer } from "react-leaflet";
import { MapController } from './../fcav.js';

// Map Defaults
const center = [35, -82]
const zoom = 13

function useStateWithLabel(initialValue, name) {
    const [value, setValue] = useState(initialValue)
    useDebugValue(`${name}: ${value}`)
    return [value, setValue]
}

const [currentGraphCoords, setCurrentGraphCoords] = useStateWithLabel([0,0], "currentGraphCoords");
const [mapHeight, setMapHeight] = useStateWithLabel("90vh", "mapHeight");

export function LeafletMap() {
    return (
        <div>
            <Grid item xs={12}>
                <MapContainer
                    className='mapContainer'
                    //loadingControl={true}
                    whenCreated={(map) => {
                        map.on("click", function (e) {
                            const { lat, lng } = e.latlng;
                            setCurrentGraphCoords([lat,lng]);
                            //getChartData(lng, lat)
                        });
                    }}
                    center={center}
                    zoom={zoom}
                    style={{ height: mapHeight,
                        display: "flex"}}
                >
                    <MapController />
                </MapContainer>
            </Grid>
            <NDVIMultiYearGraph/>
        </div>
    );
}
