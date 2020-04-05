import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import Box from "@material-ui/core/Box";

// ROUTER
import Home from "../pages/Home";
import Candidates from "../pages/Candidates";
import Admin from "../pages/Admin";
import Voters from "../pages/Voters";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  render() {
    return (
      <Router>
        <Box>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/candidates" component={Candidates} />
            <Route path="/voters" component={Voters} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Box>
      </Router>
    );
  }
}

export default Navigation;
