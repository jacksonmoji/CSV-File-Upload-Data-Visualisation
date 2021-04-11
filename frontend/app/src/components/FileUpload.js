import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadRounded from "@material-ui/icons/CloudUploadRounded";
import React, { useState } from "react";
import FileStream from "../services/FileStream";

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
  const [loading, setLoading] = useState(false);

  const uploadFile = ({ target: { files } }) => {
    setLoading(true);
    //console.log(files[0]);
    let data = new FormData();
    data.append("file", files[0]);

    FileStream("post", props.document, data).then((documentList) => {
      console.log(documentList.data);
      setLoading(false);
    });
  };

  if (loading) {
    return <progress loading={loading} type="circular" />;
  } else {
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
}
