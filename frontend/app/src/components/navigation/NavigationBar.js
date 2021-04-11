import React, { useState } from "react";
import MyDrawer from "./Drawer";
import MyToolbar from "./ToolBar";
import { withStyles } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

function Nav({ classes }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Hotel Buildings Energy Consumption");
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        setTitle={setTitle}
        variant="persistent"
      />
    </div>
  );
}
export default withStyles(styles)(Nav);
