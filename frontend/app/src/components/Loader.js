import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

const useProgressStyles = makeStyles((theme) => ({
  progress: { margin: theme.spacing(2) },
}));

const Loader = ({ loading }) => {
  const classes = useProgressStyles();
  return loading ? <LinearProgress className={classes.progress} /> : null;
};

export default Loader;
