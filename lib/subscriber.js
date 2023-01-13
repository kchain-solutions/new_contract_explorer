
'use strict';
/**
 * The file contains functions that handles pending transaction subscriptions
 * using the wss endpoint of a blockchain node
 */
const Web3 = require('web3')
const { printTransaction } = require('./formatter')

var TransactionCount //a variable to keep track of the number of transactions

/** Function sets the pendingTransaction subscriber using the wss endpoint
* @param    {String} _wssEndpoint   wss endpoint of the node
*/
function setSubscriber(_wssEndpoint) {
    TransactionCount = 0 //set the count to zero
    const web3 = new Web3(_wssEndpoint) //creating a web3 object using wss endpoint
    //using the eth.subscribe function to  
    //subscribe to the stream of all pending transactions 
    //running through the connected node's mempool.
    web3.eth.subscribe('newBlockHeaders', function (error, blockHeader) {
        if (!error) {
            //pass the transaction hash in order to retrieve and 
            // display the transaction
            processBlockHeader(blockHeader, web3)

        } else {
            console.error(`Subscription error : ${error}`)
        }
    })


}

/** Function gets the transaction using the transaction hash provided by the subscribe method
* @param    {String} _transactionHash  hash of a transaction
* @param    {object} _web3Object web3 object
*/
function processBlockHeader(_blockHeader, _web3Object) {
    _web3Object.eth.getBlockTransactionCount(_blockHeader.number, async function (error, transactionsCount) {
        if (!error) {
            for (let i = 0; i < transactionsCount; i++) {
                try {
                    const transaction = await _web3Object.eth.getTransactionFromBlock(_blockHeader.number, i);
                    const receipt = await _web3Object.eth.getTransactionReceipt(transaction.hash);
                    if (!transaction.to && receipt.contractAddress) {
                        printTransaction(transaction, receipt);
                    }
                } catch (error) {
                    console.error(`Transaction error: ${error}`);
                }
            }
        }
        else {
            console.error(`Blockheader error: ${error}`);
        }
    });
}

module.exports = {
    setSubscriber
}