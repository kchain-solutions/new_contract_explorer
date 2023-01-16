
'use strict';

const Web3 = require('web3')
const { printTransaction } = require('./formatter')

/** Function sets the newBlockHeaders subscriber using the wss endpoint
* @param    {String} _wssEndpoint   wss endpoint of the node
*/
function setSubscriber(_wssEndpoint) {
    const web3 = new Web3(_wssEndpoint) //creating a web3 object using wss endpoint
    //using the eth.subscribe function to  
    //subscribe to the stream of all newBlocks 
    console.log("Application running...");
    web3.eth.subscribe('newBlockHeaders', function (error, blockHeader) {
        if (!error) {
            processBlockHeader(blockHeader, web3);

        } else {
            console.error(`Subscription error : ${error}`)
        }
    })


}

/** Function gets the transaction using the blockHeader provided by the subscribe method
* @param    {object} _blockHeader blockHeader object
* @param    {object} _web3Object web3 object
*/
function processBlockHeader(_blockHeader, _web3Object) {
    _web3Object.eth.getBlockTransactionCount(_blockHeader.number, async function (error, transactionsCount) {
        if (!error) {
            for (let i = 0; i < transactionsCount; i++) {
                try {
                    const transaction = await _web3Object.eth.getTransactionFromBlock(_blockHeader.number, i);
                    const receipt = await _web3Object.eth.getTransactionReceipt(transaction.hash);
                    if ((!transaction.to || transaction.to == "0x0") && receipt.contractAddress) {
                        printTransaction(transaction, receipt);
                    }
                } catch (error) {
                    console.error(`Transaction || receipt error: ${error}`);
                }
            }
        }
        else {
            console.error(`getBlockTransactionCount error: ${error}`);
        }
    });
}

module.exports = {
    setSubscriber
}