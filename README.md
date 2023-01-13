# New Contract Explorer

## Requirement

Please create a program that listens for new blocks (or takes a block number as an input) in an EVM-compatible blockchain and identifies transactions creating new smart contracts.

Suppose you go on the ‘listen to new blocks direction’. In that case, usually, developers use a WebSocket connection to a node and the following method in the web3.js library to listen to new block headers.

— [https://docs.chainstack.com/api/ethereum/web3js-subscriptions#subscribe-newblockheaders](https://docs.chainstack.com/api/ethereum/web3js-subscriptions#subscribe-newblockheaders)

The program needs to be built using a web3 library, such as Web3.js, Ethers.js, or Web3.py, and should have the following functionality:
Connect to a node and listen for new blocks (or takes a block number as input)
Identify transactions that create new smart contracts
Extract the relevant information:
- New smart contract address
- Address that deployed it
- Transaction hash
Prints the information in the console.
Here is an example of a similar repository.  
[https://github.com/SethuRamanOmanakuttan/MemExplorer](https://github.com/SethuRamanOmanakuttan/MemExplorer)

## Tutorial

Prerequisite: 
- Install NodeJS. The code is tested with v18.12.1 
- Create a Chainstack developer account

### Step 1 - Create a Chainstack node
1. Access to the the [Chainstack console](https://console.chainstack.com/) and create a new project ![](./img/new_project1.png) ![](./img/new_project2.png)
2. Click into the project and select **Join network**, now you can configure your client node. In the case of this tutotial It was selected an Ethereum mainnet node ![](./img/select_network.png) Default parameters will works fine when you access to the node deployment step. In this session you just have to select the clound infrastructure where you want deploy the node![](img/network_deployment_parameters.png) 
3. When the node is up&running you can click on it and copy the WSS endpoint. ![](./img/node1.png) ![](./img/node2.png) 

### Step 2 - WSS API
From the console interface of Chainstack you have to copy the WSS endpoint and paste in the ```config.json```

```json
{
    "ethereum": {
        "wss": "wss://ws-nd-482-375-229.p2pify.com/6c20000000000000000000000c3d0"
    },
    "polygon": {
        "wss": "WSS_ENDPOINT_HERE"
    },
    "name_of_evm_network_here": {
        "wss": "WSS_ENDPOINT_HERE"
    }
}
```
### Step 3 - Lunch the application
```
```
### Step 4
### Step 5

## How it works

---

The following code helps the user fetch and analyze pending transactions from a list of different blockchain networks. Pending transactions are the transactions that are yet to be part of a block. They are stored in an in-memory cache of a blockchain node called the mempool (Hence the name MemExplorer :D ). The user can access these transactions by connecting to a node that is part of a particular blockchain network and "subscribing" to the stream of pending transactions running through the node's memory pool. The code aims to enable easy access to these transactions and also helps the user analyze these transactions by displaying the relevant information regarding these transactions.

## Project Details

---

The code makes use of the wss node endpoint and the web3.js library to access the pending transactions. The project aims to keep the accessing process as general and modular as possible to allow the users to connect to several different nodes that are part of several different networks. The user can use this code to connect to the nodes belonging to any EVM-based platforms like Ethereum, Polygon, Binance Smart Chain, Avalanche, fantom, etc.

The project structure is as follows :

```
    ├── config.json
    ├── index.js
    ├── lib
    │   ├── formatter.js
    │   ├── parser.js
    │   ├── prompter.js
    │   └── subscriber.js
    ├── package.json
    └── README.md
```

| Filename      | Usage                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------ |
| config.json   | Contains the platform names and the wss endpoints of nodes in the platforms                |
| formatter.js  | Functions for formatting the text for display                                              |
| parser.js     | Functions for reading,parsing and validating the contents of config.json file              |
| prompter.js   | Functions for helping the user select between the platforms for accessing the transactions |
| subscriber.js | Functions for setting up subscribers for pending transactions                              |

## Running the program

---

### Prerequisites

Make sure you have the following prerequisites in your system.

* Node   ^v12.22.7
* NPM    ^6.14.15

### Install Dependencies

Go to the root project folder and run

    npm install

### Edit config.json

The config file is one of the key components of the whole project. It contains the names of the blockchain networks and also the wss endpoint of a single node that is part of the blockchain network. The data is structured in nested-json format and the user is free to add the information regarding multiple networks and its corresponding nodes . The general template of the file is as follows :
```
    {
        "name-of-network" : {
            "wss" : "wss-endpoint-of-the-node"
        }
    }

```
a sample config.json file looks like this :

```
    {
        "polygon":
            {
                "wss": "wss://polygon-mainnet.g.com/1234567"
            },
        "ethereum":
            {
                "wss":"wss://mainnet.ethereum.io/9ae5c24092fc"
            }
    }

```
The program use this file in order to connect to various networks and their nodes. So,while editing the file, make sure that

  * You don't change the name of the file
  * you don't change the location of the file
  * you always add the "wss" keyword for supplying the endpoint details
  
If there is a change in the name or location of the file, then you need to make corresponding changes to code before you can run it.

### Execute the file

Once you complete all the previous steps,  go to the root folder and run
```
 npm start
```
If you have multiple networks given in your config.json, you can run multiple instances of the program in separate terminals, each accessing the nodes belonging to separate networks.

---

Thanks to [SethuRamanOmanakuttan](https://github.com/SethuRamanOmanakuttan/MemExplorer)
