import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadRounded from "@material-ui/icons/CloudUploadRounded";
import React, { useContext } from "react";
import FileStream from "../services/FileStream";
import { LoaderContext } from "../app/App";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  inputStyle: {
    display: "none",
  },
}));

export default function FileUpload(props) {
  const classes = useStyles();
  const { dispatch } = useContext(LoaderContext);

  const uploadFile = ({ target: { files } }) => {
    //send loading dispatch
    dispatch({ type: "open", payload: { loading: true } });

    let data = new FormData();
    data.append("file", files[0]);
    
    //upload document
    FileStream("post", props.document, data).then((documentList) => {
      console.log(documentList.data);
      dispatch({ type: "close", payload: { loading: false } });
    });
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" component="label">
        <CloudUploadRounded className={classes.extendedIcon} />
        <input
          type="file"
          accept="text/csv"
          formEncType="multipart/form-data"
          hidden
          onChange={uploadFile}
        />
        {props.document.replace("_", " ")}
      </Button>
    </div>
  );
}
