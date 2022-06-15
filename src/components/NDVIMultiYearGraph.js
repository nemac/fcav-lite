/* This component will be for the graph that pops up
when you click on a pixel on the product layer
*/

import {Grid} from "@material-ui/core";
import React, {useDebugValue, useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Line} from "react-chartjs-2";
import {makeStyles} from "@material-ui/core/styles";

export function NDVIMultiYearGraph({ classes, graphOn, modisData, modisDataConfig }) {

    const GraphData = () =>(

        <Box className={classes.paper}>
            <Typography variant="h4" align="center"> MODIS NDVI {(modisData.coordinates[0]).toFixed(2) + ', '
            + (modisData.coordinates[1]).toFixed(2)} </Typography>
            <div style={{height:"35vh"}}>
                <Line data={modisData} options={modisDataConfig} plugins={[]}/>
            </div>
        </Box>

    );

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