import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import FileStream from "../../services/FileStream";
import Progress from "../../components/Loader";
import FileUpload from "../../components/FileUpload";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useUploadStyles = makeStyles((theme) => ({
  uploadButtons: { marginTop: 150 },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Meters
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Fuel</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.meters.length > 0 ? (
                    row.meters.map((metersRow, index) => (
                      <TableRow key={`letter-${index}`}>
                        <TableCell>{metersRow.id}</TableCell>
                        <TableCell component="th" scope="row">
                          {metersRow.fuel}
                        </TableCell>
                        <TableCell>{metersRow.unit}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell> No Meter Entries </TableCell>
                      <TableCell>
                        <FileUpload document="meters" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Buildings() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState({});

  const classes = useUploadStyles();

  useEffect(() => {
    //send loading status
    setStatus({
      loading: true,
      message: "fetching data...",
    });

    //get remote buildings data
    getBuildingsList();
  }, []);

  const getBuildingsList = async () => {
    await FileStream("get", "buildings").then((buildingsList) => {
      setList(buildingsList.data);
    });
    //send loading dispatch
    await setStatus({
      loading: false,
      message: "fetch data done",
    });
  };

  if (status.loading && list.length < 1) {
    return <Progress loading={status.loading} type="linear" />;
  }
  if (!status.loading && list.length < 1) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.uploadButtons}
      >
        <Grid item xs={8}>
          {"No Building Data"}
        </Grid>
        <Grid item xs={8}>
          <FileUpload document="buildings" />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <React.Fragment>
        {console.log(list)}
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" gutterBottom component="div">
                    Buildings
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
}
