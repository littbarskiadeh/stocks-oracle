// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

contract Stocks {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    //  quote structure
    struct Stock {
        uint256 price;
        uint256 volume;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call function");
        _;
    }

    // quotes by symbol
    mapping(bytes4 => Stock) stockQuote;

    /// Set the value of a stock
    function setStock(
        bytes4 symbol,
        uint256 price,
        uint256 volume
    ) public onlyOwner {
        Stock memory _stock = Stock({price: price, volume: volume});
        stockQuote[symbol] = _stock;
    }

    uint256 message = 10;

    function getMessage() public view returns (uint256) {
        // message = 5;
        return message;
    }

    function setMessage(uint256 _message) public {
        message = _message;
    }

    /// Get the value of a stock
    function getStockPrice(bytes4 symbol) public view returns (uint256) {
        return stockQuote[symbol].price;
    }

    /// Get the value of volume traded for a stock
    function getStockVolume(bytes4 symbol) public view returns (uint256) {
        return stockQuote[symbol].volume;
    }
}
