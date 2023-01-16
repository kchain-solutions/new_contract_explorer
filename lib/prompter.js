'use strict';
/**
 * The file contains functions that prompts the user
 * to select the platform that they would like to explore.
 * The prompt is dynamically created according to the details that 
 * the user provides in the config file
 */

const { prompt } = require("inquirer")
const { setSubscriber } = require("./subscriber.js")
const { printTitle, printBoxedText } = require('./formatter')
/** Function prompts the user for selecting the platform and 
*  then, based on the choice, invokes the set subscription function
*  on that platform node 
* @param    {object} _config   the configuration object
*/
function promptUser(_config) {
  printTitle('New Contract Explorer', "#FFFF00") //display title

  //creates the prompts based on the options given
  prompt([
    {
      type: "list",
      name: "Platform",
      message: "Select a platform",
      choices: Object.keys(_config)
    }
  ])
    .then((_answer) => { //receives the user option 
      var platform = _answer.Platform //the selected platform
      var wssEndpoint = _config[platform]["wss"] // wss endpoint of the particular platform node as given in the config file
      var infoStatement = `Platform : ${platform}\nNode Endpoint [wss] : ${wssEndpoint}\n\nPress ctrl + c to exit`
      printBoxedText("INFO", infoStatement, "#FFFF00", "#FFFF00", 1)
      setSubscriber(wssEndpoint) //setting subscription
    }).catch(function (error) {
      console.log(`Prompt Error : ${error}`)
      exit(0)
    });
}

module.exports = {
  promptUser
}