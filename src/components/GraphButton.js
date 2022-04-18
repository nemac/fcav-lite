import Button from "@material-ui/core/Button";
import StopIcon from "@material-ui/icons/Stop";
import AssessmentIcon from "@material-ui/icons/Assessment";
import React, {useDebugValue, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

function useStateWithLabel(initialValue, name) {
    const [value, setValue] = useState(initialValue)
    useDebugValue(`${name}: ${value}`)
    return [value, setValue]
}

// Initialize Material UI styles
const useStyles = makeStyles({
    root: {
        width: 300,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        color: "white",
        width: '100%',
        height: '45vh',
        background: 'rgb(26, 35, 39)',
        boxShadow: 24,
        padding: 4,
    },
});

export function GraphButton(props){

    const [graphOn, setGraphOn] = useStateWithLabel(false, "GraphOn");

    const [map, setMap] = useStateWithLabel('', "map");

    const classes = useStyles();

    const handleGraphOpen = () => {
        //setModisData(getChartData(-78.65678578328217,35.45115625827913));
        //console.log(fetchChartData(-78.65678578328217,35.45115625827913));
        setGraphOn(!graphOn);
        //if(graphOn){
        const mapContainer = document.querySelector(".mapContainer");
        if(!graphOn){
            mapContainer.style.setProperty("height", "45vh")
        }
        else{
            mapContainer.style.setProperty("height", "90vh")
        }
        map.invalidateSize()
        //}
    }

    //const handleGraphClose = () => setGraphOn(false);
    //getChartData(-78.65678578328217,35.45115625827913)
    return(
        <Button
            letiant="contained"
            color="secondary"
            className={classes.button}
            startIcon={ graphOn ? <StopIcon/> : <AssessmentIcon />}
            onClick={handleGraphOpen}
        >{ graphOn ? "Hide Graph" : "Show Graph" }
        </Button>
    )
}