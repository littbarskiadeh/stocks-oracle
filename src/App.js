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

        const contractInstance = new web3.eth.Contract(ABI,CONTRACT_ADDRESS)
        
        // Set the stock values
        // convert the symbol text to Hex
        const symbol = web3.utils.utf8ToHex("ABC");
        const price = 100;
        const volume = 200000;
        contractInstance.methods.setStock(symbol, price, volume)
            .send({from: accounts[0]}).on('receipt', () => {
                console.log('set stock done!');
            })
        
        const stockPrice = await contractInstance.methods.getStockPrice(symbol).call();
        console.log('stock price', stockPrice);
        this.setState({stockPrice})

        // const symbol = ["0x41","0x42","0x43","0x44"];
        await contractInstance.methods.setMessage(80).call();
        const stocksMessage = await contractInstance.methods.getMessage().call();
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
                <h4>Stock Price: {this.state.stockPrice}</h4><br/>
                
                <h2>Accounts</h2><br/>
                <ul>
                    {this.state.accounts.map(account => <li key={account}>{account}</li> )}
                </ul>
            </div>
        );
    }
}
 
export default App;