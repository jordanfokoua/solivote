import React from "react";

import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

class Voters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Welcome"
    };
  }

  render() {
    const { msg } = this.state;
    return <div>{msg}</div>;
  }
}

export default Voters;

// Voters.defaultProps = {};

// Voters.PropTypes = {};
