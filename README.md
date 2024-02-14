# Blaskup Smart Contract Overview

The Blaskup smart contract is a sophisticated and versatile platform designed to revolutionize the way digital assets and shares are managed, traded, and interacted with on the blockchain. At its core, Blaskup facilitates a dynamic and user-centric marketplace for digital shares, including a unique mechanism for creating, binding, and fulfilling wishes related to digital assets. This document provides an overview of the main features and functionalities of the Blaskup contract.

## Key Features

### 1. Digital Shares Management

Blaskup introduces a novel approach to handling digital shares, including the issuance, trading, and tracking of ownership. This is achieved through a comprehensive mapping of shares against subjects (assets) and their holders, ensuring a transparent and secure ledger of digital share transactions.

### 2. Wish List Creation and Binding

A standout feature of Blaskup is the Wish List system, allowing users to express their desires for specific digital shares even before they are available in the market. Users can create a "Wish Pass" for a reserved quantity of shares, establishing an intent to purchase or acquire shares upon certain conditions being met.

### 3. Dynamic Pricing Model

The contract incorporates a dynamic pricing model for buying and selling shares, taking into account the current supply and demand dynamics. Prices are calculated based on a formula that ensures fairness and market responsiveness, enabling users to trade shares at fair market value.

### 4. Fee Management

Blaskup integrates a sophisticated fee management system, including protocol fees, subject fees, and rewards. This system ensures the platform's sustainability while incentivizing users and subjects (assets) within the ecosystem.

### 5. Non-Reentrancy for Secure Transactions

Security is paramount in Blaskup, with the contract employing a non-reentrancy guard to prevent re-entrant attacks during transactions. This ensures the integrity of trades and operations within the platform.

### 6. Decentralized Operator and DAO Integration

The contract allows for decentralized governance through the appointment of an operator and integration with a Decentralized Autonomous Organization (DAO). These roles can manage certain aspects of the platform, such as fee parameters and wish list bindings, ensuring a community-driven approach.

## Main Interactions

- **Creating and Binding Wishes**: Users can express interest in acquiring shares through the Wish List system, binding their wishes to specific subjects (assets) once available.
- **Trading Shares**: The platform supports buying and selling of shares with a dynamic pricing model, accommodating the fluid nature of digital asset valuation.
- **Fee and Reward Distribution**: Through its integrated fee system, Blaskup ensures fair compensation for platform maintenance, asset creators, and users, fostering a balanced ecosystem.

# Functions and Events in Blaskup Contract

The Blaskup smart contract is equipped with a variety of functions and events designed to facilitate the seamless creation, trading, and management of digital shares and wishes. This section outlines the key functions and events within the contract, providing insight into their operation and utility.

## Functions

### 1. init()

- **Description**: Initializes the contract, setting initial values for protocol fee destination, fee percentages, and the operator. This function can only be called once.
- Parameters: None.

### 2. newWishPass(address wisher, uint256 reservedQuantity)

- **Description**: Creates a new wish pass for a user, reserving a specified quantity of shares.
- Parameters:
  - wisher: The address of the user making the wish.
  - reservedQuantity: The quantity of shares to reserve for the wisher.

### 3. bindWishPass(address sharesSubject, address wisher)

- Description: Binds a wish pass to a specific subject, linking the reserved shares to the subject's available shares.
- Parameters:
  - sharesSubject: The subject (asset) to which the wish is bound.
  - wisher: The address of the wisher whose wish pass is being bound.

### 4. claimReservedWishPass()

- Description: Allows the wisher to claim their reserved shares once the wish pass is bound to a subject.
- Parameters: None.Uses msg.sender to determine the caller.

### 5. buyShares(address sharesSubject, uint256 amount)

- Description: Facilitates the purchase of shares for a given subject.
- Parameters:
  - sharesSubject: The subject of the shares being purchased.
  - amount: The amount of shares to buy.

### 6. sellShares(address sharesSubject, uint256 amount)

- Description: Enables a holder to sell shares back to the contract.
- Parameters:
  - sharesSubject: The subject of the shares being sold.
  - amount: The amount of shares to sell.

## Events

### 1. Trade

- Description: Emitted when a trade is executed, providing details of the transaction.
- Parameters:
  - trader: Address of the trader.
  - subject: Subject of the trade.
  - isBuy: Whether the trade was a buy or sell.
  - amount: Amount of shares traded.
  - price: Price of the trade.
  - supply: Current supply of the subject's shares.
  - subjectType: Type of the subject (WISH, BIND, KEY).

### 2. WishCreated

- Description: Emitted when a new wish pass is created.
- Parameters:
  - wisher: Address of the wisher.
  - reservedQuantity: Quantity of shares reserved.

### 3. WishBound

- Description: Emitted when a wish pass is bound to a subject.
- Parameters:
  - sharesSubject: Subject to which the wish is bound.
  - wisher: Address of the wisher.

## Contract Relationship Structure

The Blaskup contract establishes a multi-faceted relationship structure, encompassing owners, operators, wishers, and subjects. Here's a brief overview:

- **Owners and Operators**: The contract is owned and initially operated by the deployer, but it allows for decentralized governance through the appointment of an operator and integration with a DAO for certain administrative functions.
- **Wishers**: Users who express their intent to acquire shares through the creation of wish passes. Wishers can reserve shares for future acquisition.
- **Subjects**: Digital assets or shares available for trading within the Blaskup ecosystem. Subjects can be bound to wish passes, linking reserved shares to actual shares for trading.

This architecture enables a robust and flexible platform for digital asset management, combining traditional share trading mechanisms with innovative blockchain-based features like wish lists and dynamic pricing.

# Deploying and Testing the Blaskup Contract

## 1.Setting Up the Environment

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

- Make sure Node.js is installed on your computer.

- Install Hardhat:

```sehll
npm install hardhat  -g
```

- Verify that hardhat is installed on your computer：

```shell
npx hardhat help
```

## 2.Configuring Hardhat

To deploy and test your contract, you'll need to configure Hardhat to connect to an Ethereum network. Edit your hardhat.config.js file to include network configurations. Here's an example configuration for the Rinkeby test network,you can edit `hardhat.config.js`like this:

```javascript
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  allowUnlimitedContractSize: true,
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: ["YOUR_PRIVATE_KEY"],
    },
  },
};
```

Replace YOUR_INFURA_PROJECT_ID with your Infura project ID and YOUR_PRIVATE_KEY with the private key of the account you'll use for deploying the contract. Make sure this account has enough ETH for deployment.

## 3.Running Tests

Hardhat allows you to write and run tests for your smart contract. Tests are typically written in JavaScript and located in the test folder. to run your tests, use the following command:

```shell
npx hardhat test
```

This command will execute all test files in the test folder.Now you can get output like:

<pre style="font-size: 10px;">
Blaskup contract
Deployment
    ✔ Should set the right owner
Contract data query methods that do not involve transactions
    The key:0x90F79bf6EB2c4f870365E785982E1f101E93b906,current price for 1 key(s):22500000000000000
    ✔ Get the current price for a specific key amount
    The key:0x90F79bf6EB2c4f870365E785982E1f101E93b906,current supply:30
    ✔ Get the current supply for a specific key
Sequential key trade actions
    transaction:0x9b6ce898c09068679031a64d4fccbe9e84ca4d3aa5c6b883d759c0997a3e0b6f,buy price:0
    ✔ The key's owner buy the first key
    transaction:0x2edeaf92a807619add757d3a1571ff94d95529cba5e1dd5baabc8f930d78a45e,buy price:128250000000000000
    ✔ Another buy user's key
    transaction:0xdd04c85349957f43cd875538a4fbf565f79ebc37f8be0a96590e9a7c49760f34,sell price:91375000000000000
    ✔ Player sell user's key
Wish List functionality
    ✔ should allow creating a new wish pass
    ✔ should allow binding a wish pass to a subject
    ✔ should allow claiming reserved wish pass
  9 passing (990ms)
</pre>

## 4.Deploying to a Test Network

To deploy your contract to a test network like Rinkeby, use the deploy script with the following command:

```shell
npx hardhat run scripts/deploy.js --network rinkeby
```

This will compile your contract, deploy it to the Rinkeby test network, and print the contract's address.

## Conclusion

Blaskup is more than just a smart contract; it's a comprehensive ecosystem for digital share management, trading, and fulfillment of user aspirations. By leveraging blockchain technology, Blaskup aims to create a transparent, secure, and user-friendly platform that caters to the evolving needs of digital asset enthusiasts and investors.