/* This component will be for the graph that pops up
when you click on a pixel on the product layer
*/

import {Grid} from "@material-ui/core";
import React, {useDebugValue, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Line} from "react-chartjs-2";
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
})
const classes = useStyles();

const [graphOn, setGraphOn] = useStateWithLabel(false, "GraphOn");

const [modisData, setModisData] = useStateWithLabel({
    labels: ['1', '2', '3', '4', '5', '6'],
    coordinates: [0,0],
    datasets: [
        {
            label: '# of Votes',
            data: [],
            fill: false,
            backgroundColor: 'rgb(3, 237, 96)',
            borderColor: 'rgba(3, 237, 96, 0.8)',
            xAxisID:'xAxis',
        },
    ],
}, "MODIS CHART DATA");

const [modisDataConfig, setModisDataConfig] = useStateWithLabel({
    maintainAspectRatio: false,
    plugins: {
        annotation: {
            annotations: [{
                drawTime: "afterDatasetsDraw",
                type: "line",
                mode: "vertical",
                scaleID: "xAxis",
                value: 0,
                borderWidth: 5,
                borderColor: "white",
                label: {
                    content: "TODAY",
                    enabled: true,
                    position: "top"
                }
            }]
        }
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 100,
                    fontColor: "white",
                },
            },
        ],
    },
}, "MODIS CHART CONFIG");

const GraphData = () =>(

    <Box className={classes.paper}>
        <Typography variant="h4" align="center"> MODIS NDVI {(modisData.coordinates[0]).toFixed(2) + ', ' + (modisData.coordinates[1]).toFixed(2)} </Typography>
        <div style={{height:"35vh"}}>
            <Line data={modisData} options={modisDataConfig} plugins={[]}/>
        </div>
    </Box>

);

export function NDVIMultiYearGraph(){
    /*
    <Modal className ={classes.modal}
      open={graphOn}
      onClose={handleGraphOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box className={classes.paper}>
        <Line data={modisData} options={modisDataConfig} />
      </Box>
    </Modal>
    */
    return(
        <Grid item xs={12}>
            { graphOn ? <GraphData /> : null }
        </Grid>
    )
}