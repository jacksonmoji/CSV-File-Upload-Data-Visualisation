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

export default function Statistics() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    FileStream("get", "energy_consumptions_stats").then(
      (energy_consumptions_stats) => {
        setList(energy_consumptions_stats.data);
        setLoading(false);
      }
    );
  };

  if (loading) {
    return <Progress loading={loading} type="linear" />;
  } else {
    return (
      <Paper>
        <Chart data={list}>
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
