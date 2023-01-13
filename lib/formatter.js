'use strict';
/**
 * File contains functions for formatting the text
 */
const chalk = require('chalk');
const { textSync } = require('figlet')
const boxen = require('boxen');

/** Function displays the transaction details
* @param    {object} _transactionData   the transaction object
* @param    {integer} _transactionCount   the transaction count
*/
function printTransaction(_transactionData, _receiptData) {

  //Getting the relevant information from the transaction
  var transactionDetail = (` 
  Deployer address : ${_transactionData.from}\n     
  Contract address : ${_receiptData.contractAddress}
  `)

  //prints the transaction data
  printBoxedText(`New contract discovered - Transaction hash : ${_transactionData.hash}`, transactionDetail, "#FFFFFF", "#FFFF00")
}

/** Function displays title text as ascii art
* @param    {string} _titleText   the text to be displayed
* @param    {string} _hexCode   font color as hex code
*/
function printTitle(_titleText, _hexCode) {
  console.log(
    chalk.hex(_hexCode)(
      textSync(_titleText, { horizontalLayout: 'full' })
    )
  );
}

/** Function displays colored bold text
* @param    {string} _text   the text to be displayed
* @param    {string} _hexCode   font color as hex code
*/
function printBoldText(_text, _hexCode) {
  console.log(
    chalk.hex(_hexCode).bold(_text)
  );
}

/** Function displays colored bold text inside a box
* @param    {string} _title   the text to be displayed on the top of the box
* @param    {string} _text    text to be displayed inside the box
* @param    {string} _textHexCode   font color as hex code
* @param    {string} _borderHexCode   border color as hex code
* @param    {string} _padding   required padding
*/
function printBoxedText(_title, _text, _textHexCode, _borderHexCode, _padding = 1) {
  console.log(
    boxen(chalk.hex(_textHexCode).bold(_text), {
      title: _title,
      padding: _padding,
      borderColor: _borderHexCode,
      borderStyle: 'double'
    })
  );
}

module.exports = {
  printTransaction,
  printTitle,
  printBoldText,
  printBoxedText
}