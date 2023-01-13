'use strict';
/**
 * The entry point of the app
 * The following program reads the config file, retrieves the config object
 * and passes the config object to the prompt function.
 * The file path was explicitly stated so as to make the program interaction seamless
 * the user need only edit the config.json file and run the index file
 * no modification to the code is required
 */
const {parseConfigFile} = require('./lib/parser')
const {promptUser} = require('./lib/prompter')

const CONFIG_FILE_PATH = "config.json" //config file location


var configObj = parseConfigFile(CONFIG_FILE_PATH) //retrieves the config object from the config.json file
promptUser(configObj) //passes the config object to the prompt function
