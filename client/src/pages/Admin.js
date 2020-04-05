import React from "react";

import moment from "moment";
import PropTypes from "prop-types";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";

import {
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "../components/materialComponents";
import CreateCandidateDialog from "../components/modals/CreateCandidate";
import CreateVoterDialog from "../components/modals/CreateVoter";
import VotersTable from "../components/VotersTable";
import MediaCard from "../components/MediaCard";

import { initVotingContract } from "../config/web3";

class Election extends React.Component {
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
        startDate: moment(moment().format("YYYY-MM-DD")).format("X"),
        endDate: moment(moment().add(1, "days").format("YYYY-MM-DD")).format(
          "X"
        ),
      },
      candidates: [],
      voters: [],
      votersVoted: [],
      totalVotes: 0,
      candidate_modal: false,
      election_modal: false,
      voter_modal: false,
      see_result: false,
    };
  }

  componentDidMount = async () => {
    initVotingContract().then((response) => {
      this.setState(
        (state) => ({ ...state, ...response }),
        () => this.loadData(response.contract)
      );
    });
  };

  loadData = async () => {
    const { accounts, contract } = this.state;
    // contract.options.address = accounts[0]
    const electionResponse = await contract.methods
      .getElection()
      .call({ from: accounts[0] });
    const candidateCountResponse = await contract.methods
      .getNumberCandidates()
      .call({ from: accounts[0] });
    const voterCountResponse = await contract.methods
      .getNumberVoters()
      .call({ from: accounts[0] });

    if (voterCountResponse > 0) {
      this.getVoters(voterCountResponse);
    }
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

  render() {
    const {
      web3,
      candidates,
      voters,
      totalVotes,
      voter_modal,
      election,
      election_modal,
      candidate_modal,
      elect,
      see_result,
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
          <Typography variant="h2" component="span">
            Loading Web3, accounts, and contract...
          </Typography>
        ) : (
          <Grid container>
            <Grid style={styles.left} item xs={1}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 20,
                  alignItems: "center",
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
                        <IconButton
                          onClick={this.toggleModal("election_modal")}
                          color="primary"
                          aria-label="Add Candidate"
                        >
                          <EditIcon fontSize="large" />
                        </IconButton>
                      </Box>
                      <Typography variant="h5" component="span">
                        {`Starts: ${moment
                          .unix(election.startDate)
                          .format("MM/DD/YYYY")} - Ends: ${moment
                          .unix(election.endDate)
                          .format("MM/DD/YYYY")}`}
                      </Typography>

                      <Box>
                        <Button
                          onClick={() => this.toggleResult()}
                          color="primary"
                        >
                          See results
                        </Button>
                      </Box>
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
                      {see_result && (
                        <Box
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <Typography variant="body1" component="span">
                            {`${totalVotes} person(s) voted`}
                          </Typography>
                        </Box>
                      )}

                      <Grid container style={{ margin: 20 }} spacing={3}>
                        {candidates.length > 0 &&
                          candidates.map((candidate, index) => (
                            <Grid key={index} item xs={3}>
                              <MediaCard
                                candidate={candidate}
                                voters={totalVotes}
                                index={index}
                                results={see_result}
                                imgURL={`https://i.pravatar.cc/300?img=${
                                  index + 0
                                }`}
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
                      {/* <Grid container style={{ margin: 20 }} spacing={3}>
                        {voters.length > 0 &&
                          voters.map((voter, index) => (
                            <Grid key={index} item xs={3}>
                              {voter.name}
                            </Grid>
                          ))}
                      </Grid> */}
                      <VotersTable voters={voters} />
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
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

            {/* <CreateElectionDialog
              election={election}
              changeElectionInfo={this.onChange}
              open={election_modal}
              cancel={this.cancelCreation}
              validate={this.validate}
            /> */}

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

            <div>
              <Dialog
                open={election_modal}
                // TransitionComponent={Transition}
                keepMounted
                onClose={this.cancelCreation}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth={"md"}
              >
                <DialogTitle id="alert-dialog-slide-title">
                  <Typography variant="h4" component="span">
                    New Election
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <Grid spacing={2} container>
                      <Grid item xs={12}>
                        <TextField
                          onChange={this.onChange("title")}
                          value={election.title}
                          id="title"
                          label="Title"
                          variant="outlined"
                          placeholder="Municpal Election"
                          helperText="The name of the election"
                          margin="normal"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="date"
                          label="Start Date"
                          type="date"
                          defaultValue={moment().format("YYYY-MM-DD")}
                          variant="outlined"
                          value={moment
                            .unix(election.startDate)
                            .format("YYYY-MM-DD")}
                          onChange={this.onChange("startDate")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="date"
                          label="End Date"
                          type="date"
                          defaultValue={moment()
                            .add(1, "days")
                            .format("YYYY-MM-DD")}
                          variant="outlined"
                          value={moment
                            .unix(election.endDate)
                            .format("YYYY-MM-DD")}
                          onChange={this.onChange("endDate")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.cancelCreation} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={() => this.validate()} color="primary">
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        )}
      </Box>
    );
  }

  toggleResult = () => {
    this.setState((state) => ({ ...state, see_result: !state.see_result }));
  };

  getTotalVotes = async () => {
    const { accounts, contract, voters } = this.state;

    const totalVotes = await contract.methods
      .getVotes()
      .call({ from: accounts[0] });
    console.log("getTotalVotes -> totalVotes", totalVotes);
    this.setState((state) => ({
      ...state,
      totalVotes,
    }));
  };

  getVoters = async (count) => {
    const { accounts, contract } = this.state;
    const voterList = [];
    const votersVoted = [];
    for (let i = 0; i < count; i++) {
      const response = await contract.methods
        .getVoter(i)
        .call({ from: accounts[0] });
      voterList.push(response);
      if (response.voted) votersVoted.push(response);
    }
    this.getTotalVotes();
    this.setState((state) => ({ ...state, voters: voterList, votersVoted }));
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

  addVoter = (address) => () => {
    const { accounts, contract, voters } = this.state;

    contract.methods
      .addVoter(address)
      .send({ from: accounts[0] })
      .then(() => {
        this.getVoters(voters.length + 1);
        this.setState((state) => ({
          ...state,
          voter_modal: false,
        }));
      });
  };

  addCandidate = (name) => () => {
    const { accounts, contract } = this.state;

    contract.methods
      .addCandidate(name)
      .send({ from: accounts[0] })
      .then(() => {
        this.setState((state) => ({
          ...state,
          candidates: [...state.candidates, { name, description: "" }],
          candidate_modal: false,
        }));
      });
  };

  onChangeCandidateName = (index) => (event) => {
    const { value } = event.target;
    const { candidates } = this.state;

    candidates[index].name = value;
    this.setState((state) => ({
      ...state,
      candidates,
    }));
  };

  onChange = (name) => (event) => {
    const { value } = event.target;
    this.setState((state) => ({
      ...state,
      election: {
        ...state.election,
        [name]: name.includes("Date") ? moment(value).format("X") : value,
      },
    }));
  };

  toggleModal = (name) => () => {
    this.setState((state) => ({
      ...state,
      [name]: !state[name],
    }));
  };

  validate = () => {
    /* Blockchain Call */
    const { accounts, contract, election } = this.state;
    const { title, startDate, endDate } = election;
    contract.methods
      .createElection(title, startDate, endDate)
      .send({ from: accounts[0] })
      .then(() => {
        this.setState((state) => ({
          ...state,
          election: { ...state.election, title, startDate, endDate },
          elect: true,
        }));

        this.toggleModal("election_modal")();
      })
      .catch((error) => console.log("Error adding election", error));
  };

  cancelCreation = () => {
    this.setState((state) => ({
      ...state,
      election_modal: false,
      // election: {
      //   title: "",
      //   startDate: "",
      //   endDate: "",
      // },
      // elect: false,
    }));
  };
}

export default Election;

/* Election.defaultProps = {};

Election.PropTypes = {}; */
