import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FileUpload from "../../components/FileUpload";

const options = ["buildings", "meters", "energy_consumptions"];
const useUploadStyles = makeStyles((theme) => ({
  uploadButtons: { marginTop: 150 },
}));

export function Upload() {
  const classes = useUploadStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.uploadButtons}
    >
      <Grid item xs={8}>
        <FileUpload document={options[0]} />
      </Grid>
      <Grid item xs={8}>
        <FileUpload document={options[1]} />
      </Grid>
      <Grid item xs={8}>
        <FileUpload document={options[2]} />
      </Grid>
    </Grid>
  );
}
