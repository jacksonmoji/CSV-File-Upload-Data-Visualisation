import React, { Fragment, useReducer } from "react";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Nav from "../components/navigation/NavigationBar";
import { Upload } from "../pages/uploads/Upload";
import Buildings from "../pages/buildings/Buildings";
import Statistics from "../pages/statistics/Statistics";
import Loader from "../components/Loader";

const LoaderState = {
  loading: false,
};

function LoaderReducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "close":
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return LoaderState;
  }
}

export const LoaderContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(LoaderReducer, LoaderState);

  return (
    <Container maxWidth="md">
      <Nav />
      <LoaderContext.Provider value={{ state, dispatch }}>
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              {!state.loading ? (
                <Buildings />
              ) : (
                <Loader loading={state.loading} type="circle" />
              )}
            </Fragment>
          )}
        />
        <Route
          exact
          path="/energy_consumption"
          render={() => (
            <Fragment>
              {!state.loading ? (
                <Statistics />
              ) : (
                <Loader loading={state.loading} type="circle" />
              )}
            </Fragment>
          )}
        />
        <Route
          exact
          path="/upload"
          render={() => (
            <Fragment>
              {!state.loading ? (
                <Upload />
              ) : (
                <Loader loading={state.loading} type="circle" />
              )}
            </Fragment>
          )}
        />
      </LoaderContext.Provider>
    </Container>
  );
}
export default App;
