import React from "react";

import PropTypes from "prop-types";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import StarsIcon from "@material-ui/icons/Stars";

import {
  Button,
  Box,
  Grid,
  Typography,
  IconButton
} from "../components/materialComponents";
import CreateElectionDialog from "../components/modals/CreateElection";
import CreateCandidateDialog from "../components/modals/CreateCandidate";
import CreateVoterDialog from "../components/modals/CreateVoter";
import MediaCard from "../components/MediaCard";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

class Election extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Welcome",
      account: {},
      election: {
        title: "",
        startDate: "",
        endDate: ""
      },
      candidates: [],
      voters: [],
      candidate_modal: false,
      election_modal: false,
      voter_modal: false
    };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  render() {
    const {
      candidates,
      voters,
      voter_modal,
      election,
      election_modal,
      candidate_modal,
      elect
    } = this.state;
    const styles = {
      root: {
        display: "flex",
        flexWrap: "wrap"
      },
      textField: {
        margin: 20,
        width: "25ch"
      },
      left: {
        backgroundColor: "#233449",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      },
      right: {
        backgroundColor: "#E0E7EE",
        display: "flex",
        padding: 50
      },
      logo: {
        width: 100
      },
      input: {
        margin: 20
      },
      noElection: {
        margin: 20
      }
    };

    return (
      <Grid container>
        <Grid style={styles.left} item xs={1}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 20,
              alignItems: "center"
            }}
          >
            <Box style={{ margin: 30, height: 120 }}>
              <img style={styles.logo} src={require("../img/logo1.png")} />
            </Box>
          </Box>
        </Grid>

        <Grid style={styles.right} item xs={11}>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            container
          >
            {elect ? (
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="h2" component="span">
                      {election.title}
                    </Typography>
                    <StarsIcon color="primary" fontSize="large" />
                  </Box>
                  <Typography variant="h5" component="span">
                    {`Starts: ${election.startDate} - Ends: ${election.endDate}`}
                  </Typography>
                </Box>

                <Box>
                  {/* CANDIDATES */}
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h4" component="span">
                      {`Candidates (${candidates.length})`}
                    </Typography>
                    <IconButton
                      onClick={this.toggleModal("candidate_modal")}
                      color="primary"
                      aria-label="Add Candidate"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Box>

                  <Grid container style={{ margin: 20 }} spacing={3}>
                    {candidates.length > 0 &&
                      candidates.map((candidate, index) => (
                        <Grid key={index} item xs={3}>
                          <MediaCard
                            title={candidate.name}
                            index={index}
                            imgURL={`https://i.pravatar.cc/300?img=${index +
                              0}`}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>

                <Box>
                  {/* VOTERS */}
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h4" component="span">
                      {`Voters (${voters.length})`}
                    </Typography>
                    <IconButton
                      onClick={this.toggleModal("voter_modal")}
                      color="primary"
                      aria-label="Add voter"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Box>
                  <Grid container style={{ margin: 20 }} spacing={3}>
                    {voters.length > 0 &&
                      voters.map((voter, index) => (
                        <Grid key={index} item xs={3}>
                          {voter.name}
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h3" component="span">
                    No Election!
                  </Typography>
                  <Typography variant="body1" component="span">
                    Start by creating an election
                  </Typography>
                  <Button
                    style={styles.noElection}
                    onClick={this.toggleModal("election_modal")}
                    variant="outlined"
                    size="large"
                    disableElevation
                  >
                    New Election
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        <CreateElectionDialog
          election={election}
          changeElectionInfo={this.onChange}
          open={election_modal}
          cancel={this.cancelCreation}
          validate={this.validate}
        />

        <CreateCandidateDialog
          open={candidate_modal}
          cancel={this.cancelCreation}
          validate={this.addCandidate}
        />

        <CreateVoterDialog
          open={voter_modal}
          cancel={this.cancelCreation}
          validate={this.addVoter}
        />
      </Grid>
    );
  }

  loadBlockchainData = async () => {
    const { account } = this.state;
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts()
    console.log("Election -> loadBlockchainData -> accounts", accounts)
    console.log("Election -> loadBlockchainData -> network", network);
  };

  addVoter = name => () => {
    this.setState(state => ({
      ...state,
      voters: [...state.voters, { name, voted: false }],
      voter_modal: false
    }));
  };

  addCandidate = name => () => {
    this.setState(state => ({
      ...state,
      candidates: [...state.candidates, { name, description: "" }],
      candidate_modal: false
    }));
  };

  addCandidateDescription = index => event => {
    const { value } = event.target;
    const { candidates } = this.state;

    candidates[index].description = value;
    this.setState(state => ({
      ...state,
      candidates
    }));
  };

  onChangeCandidateName = index => event => {
    const { value } = event.target;
    const { candidates } = this.state;

    candidates[index].name = value;
    this.setState(state => ({
      ...state,
      candidates
    }));
  };

  onChange = name => event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      election: { ...state.election, [name]: value }
    }));
  };

  toggleModal = name => () => {
    this.setState(state => ({
      ...state,
      [name]: !state[name]
    }));
  };

  validate = (title, startDate, endDate) => {
    /* Blockchain Call */
    this.setState(state => ({
      ...state,
      election: { ...state.election, title, startDate, endDate },
      elect: true
    }));

    this.toggleModal("election_modal")();
  };

  cancelCreation = () => {
    this.setState(state => ({
      ...state,
      modal: false,
      election: {
        title: "",
        startDate: "",
        endDate: ""
      },
      elect: false
    }));
  };
}

export default Election;

/* Election.defaultProps = {};

Election.PropTypes = {}; */
