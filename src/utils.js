import {useDebugValue, useEffect, useRef, useState} from "react";
import {getNextFWDate, toWMSDate} from "./datemanagement";
import config from "./config";
import L from "leaflet";

export function useStateWithLabel(initialValue, name) {
    const [value, setValue] = useState(initialValue)
    useDebugValue(`${name}: ${value}`)
    return [value, setValue]
}

// Desired hook
export function useCompare (val) {
    const prevVal = usePrevious(val)
    return prevVal !== val
}

// Helper hook
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function getWMSLayersYearRange(startDate, endDate, productIdx) {
    let wmsLayers = [];
    let tempDate = getNextFWDate(startDate);
//    console.log("tempdate: " + tempDate);
    while(tempDate <= endDate){
        const wmsdate = toWMSDate(tempDate);
        const o = config.wms_template(wmsdate, productIdx)
        o.leafletLayer = L.tileLayer.wms(o.baseUrl, o.options)
        o.date = tempDate
        wmsLayers.push(o);
        tempDate.setDate(tempDate.getDate() + 1);
        tempDate = getNextFWDate(tempDate);
    }
    return wmsLayers;
}
