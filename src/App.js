import React, { Component } from 'react'
import Web3 from 'web3'


import {CONTRACT_ADDRESS, ABI, URL} from './config.js'

class App extends Component {
    
    componentDidMount() {
        this.loadBlockchainData()
    }
  
    async loadBlockchainData() {
        // const web3 = new Web3(Web3.givenProvider || URL)
        const web3 = new Web3(new Web3.providers.HttpProvider(URL));

        const accounts = await web3.eth.getAccounts()
        this.setState({ accounts: accounts })
        // console.log(accounts)

        const stocks = new web3.eth.Contract(ABI,CONTRACT_ADDRESS)
        this.setState({ stocks })
        // stocks.methods.setStock(["0x41","0x42","0x43","0x44"], 100, 2000).call()
        // const symbol = ["0x41","0x42","0x43","0x44"];
        await stocks.methods.setMessage(80).call();
        const stocksMessage = await stocks.methods.getMessage().call();
        this.setState({ message: stocksMessage })

        console.log('CONTRACT: ----->>>>> ', stocksMessage)
        console.log('ABI ----->>>>> ',ABI)
    }
  
    constructor(props) {
      super(props)
      this.state = {
          accounts: [],
          message: '',
        }
    }

    async clickHandler(e) {
        e.preventDefault(); 

        let result = await fetch("http://localhost:8000/");
        let json = await result.json();
        console.log(`Price: ${json.price}`);
    }

    render(){
        return (
            <div className="value">
                <button onClick={this.clickHandler}> Click me! </button>

                <h2>Contract message: {this.state.message}</h2><br/>
                
                <ul>
                    {this.state.accounts.map(account => <li key={account}>{account}</li> )}
                </ul>
            </div>
        );
    }
}
 
export default App;