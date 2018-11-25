import React, { Component } from "react";
import MarketPlaceContract from "./contracts/MarketPlace.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  state = { listingCount: 0, listings: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(MarketPlaceContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const count = (await contract.listingCount()).toNumber();
    const listings = [];

    for (let i = 1; i <= count; i++) {
      const listing = await contract.listings(i);
      listings.push({
        id: listing[0],
        name: listing[1],
        link: listing[2],
      });
    }

    // Update state with the result.
    this.setState({ listingCount: count, listings });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    
    return (
      <div className="App">
        <h1>listings</h1>
        <ul>
          {
            this.state.listings.map(x => 
              <li><a href={x.link}>{x.name}</a></li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;
