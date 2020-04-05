import React from "react";

import moment from "moment";

import {
  Box,
  Grid,
  Typography,
  Button,
} from "../components/materialComponents";
import MediaCard from "../components/MediaCard";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { initVotingContract } from "../config/web3";

class Voters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      error: null,
      account: {},
      election: {
        title: "",
        startDate: "",
        endDate: "",
      },
      voted: false,
      candidates: [],
      voters: [],
      delegateTo: null,
    };
  }

  componentDidMount = async () => {
    initVotingContract().then((response) => {
      this.setState(
        (state) => ({ ...state, ...response }),
        () => this.loadData(response.contract)
      );
      this.getVoters();
    });
  };

  loadData = async () => {
    const { accounts, contract } = this.state;
    const electionResponse = await contract.methods
      .getElection()
      .call({ from: accounts[0] });
    const candidateCountResponse = await contract.methods
      .getNumberCandidates()
      .call({ from: accounts[0] });

    if (candidateCountResponse > 0) {
      this.getCandidates(candidateCountResponse);
    }

    if (
      electionResponse &&
      electionResponse._electionName.length > 0 &&
      electionResponse._ongoingElection
    ) {
      const election = {
        title: electionResponse._electionName,
        startDate: electionResponse._startDate,
        endDate: electionResponse._endDate,
      };
      this.setState((state) => ({ ...state, election, elect: true }));
    }
  };

  getCandidates = async (count) => {
    const { accounts, contract } = this.state;
    const candidateList = [];
    for (let i = 0; i < count; i++) {
      const response = await contract.methods
        .getCandidate(i)
        .call({ from: accounts[0] });
      candidateList.push(response);
    }
    this.setState((state) => ({ ...state, candidates: candidateList }));
  };

  render() {
    const {
      web3,
      candidates,
      election,
      voted,
      voters,
      delegateTo,
    } = this.state;
    const styles = {
      root: {
        display: "flex",
        flexWrap: "wrap",
      },
      textField: {
        margin: 20,
        width: "25ch",
      },
      left: {
        backgroundColor: "#233449",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: "100vh",
      },
      right: {
        backgroundColor: "#E0E7EE",
        display: "flex",
        padding: 50,
        minHeight: "100vh",
      },
      logo: {
        width: 100,
      },
      input: {
        margin: 20,
      },
      noElection: {
        margin: 20,
      },
    };

    return (
      <Box>
        {!web3 ? (
          <Box my={50}>
            <Typography variant="h2" component="span">
              Loading Web3, accounts, and contract...
            </Typography>
          </Box>
        ) : election.title == "" ? (
          <Box my={50}>
            <Typography variant="h3" component="span">
              No ongoing Election!
            </Typography>
          </Box>
        ) : (
          <Grid container>
            <Grid style={styles.left} item xs={1}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 20,
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
                  alignItems: "center",
                }}
                container
              >
                <Grid item xs={12}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h2" component="span">
                        {election.title}
                      </Typography>
                    </Box>
                    <Typography variant="h5" component="span">
                      {`${moment
                        .unix(election.startDate)
                        .format("MM/DD/YYYY")} - ${moment
                        .unix(election.endDate)
                        .format("MM/DD/YYYY")}`}
                    </Typography>
                    {voted && (
                      <Typography variant="h5" component="span">
                        You've voted
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    {/* CANDIDATES */}
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h4" component="span">
                        {`Candidates (${candidates.length})`}
                      </Typography>
                    </Box>

                    <Grid container style={{ margin: 20 }} spacing={3}>
                      {candidates.length > 0 &&
                        candidates.map((candidate, index) => (
                          <Grid key={index} item xs={3}>
                            <MediaCard
                              candidate={candidate}
                              index={index}
                              voted={voted}
                              voteAction={this.vote(index)}
                              imgURL={`https://i.pravatar.cc/300?img=${
                                index + 0
                              }`}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>

                  <Typography variant="h4" component="span">
                    Delegate your vote to:
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <FormControl style={{ minWidth: 450 }}>
                      <InputLabel id="demo-simple-select-label">
                        Voter's address
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={delegateTo}
                        onChange={this.onChange}
                      >
                        {voters.map((voter, index) => (
                          <MenuItem key={index} value={voter.voter_address}>
                            {voter.voter_address}
                          </MenuItem>
                        ))}
                      </Select>
                      <Button
                        style={{ marginTop: 10 }}
                        variant="contained"
                        color="primary"
                        onClick={() => this.delegateVote()}
                        disableElevation
                      >
                        Confirm
                      </Button>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    );
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState((state) => ({
      ...state,
      delegateTo: value,
    }));
  };

  getVoters = () => {
    const { accounts, contract } = this.state;
    const voterList = [];

    contract.methods
      .getNumberVoters()
      .call({ from: accounts[0] })
      .then((voterCountResponse) => {
        for (let i = 0; i < voterCountResponse; i++) {
          contract.methods
            .getVoter(i)
            .call({ from: accounts[0] })
            .then((response) => {
              voterList.push(response);
            });
        }
        this.setState((state) => ({ ...state, voters: voterList }));
      });
  };

  vote = (index) => () => {
    console.log("Voters -> vote -> index", index);
    const { accounts, contract } = this.state;

    contract.methods
      .getNumberVoters()
      .call({ from: accounts[0] })
      .then((voterCountResponse) => {
        if (voterCountResponse > 0) {
          contract.methods
            .vote(index)
            .send({ from: accounts[0] })
            .then((res) => {
              this.setState((state) => ({
                ...state,
                voted: true,
              }));
            });
        }
      });
  };

  delegateVote = () => {
    const { accounts, contract, delegateTo } = this.state;

    contract.methods
      .delegateVote(delegateTo)
      .send({ from: accounts[0] })
      .then((res) => {
        this.setState((state) => ({
          ...state,
          voted: true,
        }));
      });
  };
}

export default Voters;

/* Election.defaultProps = {};

Election.PropTypes = {}; */
