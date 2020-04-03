pragma solidity >=0.5.0 <0.7.0;


contract Voting {
    /* <------ VARIABLES ------>*/
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        string name;
        string email;
        string password;
        bool authorized;
        bool voted;
        uint256 vote;
    }

    address payable public owner;
    string public electionName;
    bool public ongoingElection;
    uint256 public endDate;

    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    Voter[] public votersList;
    uint256 public totalVotes;

    /* <------ CONSTRUCTOR ------>*/
    constructor() public {
        owner = msg.sender;
        ongoingElection = false;
    }

    /* <------ MODIFIERS ------>*/
    modifier ownerOnly() {
        require(msg.sender == owner, "Not authorized.");
        _;
    }

    modifier checkElection() {
        _;
        bytes memory tmpElectionName = bytes(electionName);
        require(tmpElectionName.length != 0, "Please enter an election name");
        require(
            candidates.length > 2,
            "Your election must have at least 2 candidates"
        );
        require(
            votersList.length > 2,
            "Your election must have at least 2 voters"
        );
        require(endDate > 0, "Please enter an end date for your election");
    }

    /* <------ FUNCTIONS ------>*/
    function startElection(string memory _electionName, uint256 _date)
        public
        checkElection
    {
        electionName = _electionName;
        endDate = _date;
        ongoingElection = true;
    }

    function addCandidate(string memory _name) public ownerOnly {
        candidates.push(Candidate({name: _name, voteCount: 0}));
    }

    function removeCandidate() public /* uint256 _voteIndex */
    {
        candidates.pop();
    }

    function addVoter(
        string memory _name,
        string memory _email,
        string memory _password
    ) public ownerOnly {
        votersList.push(Voter({ name: _name, authorized: true, voted: false, vote: 0, email: _email, password: _password}));
    }

    function getNumberCandidates() public view returns (uint256) {
        return candidates.length;
    }

    function authorize(address _person) public ownerOnly {
        voters[_person].authorized = true;
    }

    function vote(uint256 _voteIndex) public {
        require(!voters[msg.sender].voted, "Already voted");
        require(voters[msg.sender].authorized, "Not authorized to vote");
        require(
            ongoingElection,
            "The election has ended or has not started yet"
        );

        voters[msg.sender].vote = _voteIndex;
        voters[msg.sender].voted = true;

        candidates[_voteIndex].voteCount += 1;
        totalVotes += 1;
    }

    function end() public ownerOnly {
        selfdestruct(owner);
    }
}
