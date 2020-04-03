import React from "react";

import PropTypes from "prop-types";

import Box from '@material-ui/core/Box';

class Candidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Welcome"
    };
  }

  render() {
    const { msg } = this.state;
    return <Box>{msg}</Box>;
  }
}

export default Candidates;

/* Candidates.defaultProps = {};

Candidates.PropTypes = {}; */
