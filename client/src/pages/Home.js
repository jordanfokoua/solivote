import React from "react";

import { Button, Box, Container, Grid } from "../components/materialComponents";

import PropTypes from "prop-types";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Welcome"
    };
  }

  render() {
    const { msg } = this.state;

    const styles = {
      leftHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10
      },
      rightHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10
      },
      logo: {
        width: 150
      },
      feature: {
        paddingLeft: 35,
        paddingRight: 35
      }
    };

    return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box style={styles.leftHeader}>
              <img style={styles.logo} src={require("../img/logo.png")} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box style={styles.rightHeader}>
              <Button
                onClick={this.goToElection}
                variant="contained"
                color="primary"
                disableElevation
              >
                Get started
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid style={{ display: "flex", padding: 20 }} container spacing={3}>
          <Grid item xs={6}>
            <h1>SoliVote is a Secure Online Voting System</h1>
            <p>
              Optimize your election with a blockchain-based online voting tool.
              It is easy to set up and use and no specific training or IT
              literacy is needed.
            </p>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              size="large"
              style={{ marginTop: 50 }}
              onClick={this.goToElection}
            >
              Get started
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img
              style={{ width: 300, marginLeft: 30 }}
              src={require("../img/voters.png")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 10
            }}
            item
            xs={12}
          >
            <h1>SoliVote features</h1>
          </Grid>
          <Grid style={styles.feature} item xs={4}>
            <h2>Immutable and anonymous</h2>
            <p>
              SoliVote is based on blockchain technology, which makes voting
              100% secure and immutable. Voter anonymity is guaranteed by
              transparent crypto algorithms.
            </p>
          </Grid>
          <Grid style={styles.feature} item xs={4}>
            <h2>Easy to organize, easy to vote</h2>
            <p>
              With SoliVote, creating a vote is intuitive, easy and fast. No
              coding knowledge is required. Voting can be conducted on the go on
              a smartphone or tablet.
            </p>
          </Grid>
          <Grid style={styles.feature} item xs={4}>
            <h2>Transparent and auditable</h2>
            <p>
              One of the main characteristics of blockchain technology is its
              transparency. The crypto algorithms that we use on top of it are
              merely mathematics.
            </p>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
          >
            <Button
              style={{ margin: 30 }}
              variant="outlined"
              size="large"
              color="primary"
              disableElevation
            >
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }

  goToElection = () => {
    const { history } = this.props;
    history.push("/admin");
  };
}

export default Home;

// Home.defaultProps = {};

// Home.PropTypes = {};
