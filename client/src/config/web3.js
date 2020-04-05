import getWeb3 from "./getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import VotingContract from "../contracts/Voting.json";

const initSimpleStorageContract = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    return { web3, accounts, contract: instance };
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
    return { error };
  }
};

const initVotingContract = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = VotingContract.networks[networkId];
    const instance = new web3.eth.Contract(
      VotingContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    return { web3, accounts, contract: instance };
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
    return { error };
  }
};

export { initSimpleStorageContract, initVotingContract };
