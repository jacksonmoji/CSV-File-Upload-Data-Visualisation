import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  withStyles,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import PublishIcon from "@material-ui/icons/Publish";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  activeListItem: {
    color: theme.palette.primary.main,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarMargin: theme.mixins.toolbar,

  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, setTitle }) => (
    <Drawer variant={variant} open={open} onClose={onClose}>
      <div
        className={clsx({
          [classes.toolbarMargin]: variant === "persistent",
        })}
      />
      <List>
        <ListItem
          component={NavLink}
          button
          to="/"
          onClick={() => {
            setTitle("Buildings");
            onClose();
          }}
        >
          <ListItemIcon>
            <LocationCityIcon />
          </ListItemIcon>
          <ListItemText>Buildings</ListItemText>
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/energy_consumption"
          onClick={() => {
            setTitle("Statistics");
            onClose();
          }}
        >
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText>Statistics</ListItemText>
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/upload"
          onClick={() => {
            setTitle("Upload File");
            onClose();
          }}
        >
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText>Upload File</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
);

export default MyDrawer;
