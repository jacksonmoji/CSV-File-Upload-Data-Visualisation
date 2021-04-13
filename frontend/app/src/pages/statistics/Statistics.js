import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation } from "@devexpress/dx-react-chart";
import FileStream from "../../services/FileStream";
import Progress from "../../components/Loader";
import { Grid, makeStyles } from "@material-ui/core";
import FileUpload from "../../components/FileUpload";

const useUploadStyles = makeStyles((theme) => ({
  uploadButtons: { marginTop: 150 },
}));

export default function Statistics() {
  const classes = useUploadStyles();
  const [list, setList] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    //send loading status
    setStatus({
      loading: true,
      message: "fetching data...",
    });

    getStatistics();
  }, []);

  const getStatistics = async () => {
    //get remote stats data
    await FileStream("get", "energy_consumptions_stats").then(
      (energy_consumptions_stats) => {
        setList(energy_consumptions_stats.data);
      }
    );
    //send loading status
    await setStatus({
      loading: false,
      message: "fetch data done",
    });
  };

  if (status.loading && !list.data) {
    return <Progress loading={status.loading} type="linear" />;
  }
  if (!list.data && !status.loading) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.uploadButtons}
      >
        <Grid item xs={8}>
          {list.message}
        </Grid>
        <Grid item xs={8}>
          <FileUpload document="energy_consumptions" />
        </Grid>
      </Grid>
    );
  } else {
    console.log(list.data);
    return (
      <Paper>
        <Chart data={list.data}>
          <ValueScale name="consumption" />
          <ArgumentAxis />
          <ValueAxis
            scaleName="consumption"
            showGrid={false}
            showLine
            showTicks
          />
          <BarSeries
            name="Energy"
            valueField="consumption"
            argumentField="day"
            scaleName="consumption"
          />
          <Legend />
          <Title text="Hotels Daily Energy Consumption" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
