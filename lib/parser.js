'use strict';
/**
 * The File contains functions for parsing and validating the config file
 */
const { readFileSync } =  require ('fs');
const { exit } = require('process');


/** The function reads the config file,
 *  converts the content into a json object
 *  and validates the contents of the object
 * @param    {string} _configFilePath   the file path
 **/
function parseConfigFile(_configFilePath){
    try{
    var obj = JSON.parse(readFileSync(_configFilePath, 'utf8')); //read and parse data 
    validateConfig(obj) //validate object
    }catch (e){///if the config file is not properly defined, exit the program
        console.log(`Error in config file : ${e}`)
        exit(0)
    }
    return obj
}
/** The function validates json object.
 * In future iterations, this can be done using
 * schema based validation
 * @param    {object} _jsonObject   the config json object
 **/
function validateConfig(_jsonObject){
    var platformNames = Object.keys(_jsonObject) //retrieves the platformNames in the object
    if(platformNames.length == 0){
        throw new Error('No Platforms Provided ! Please add the platform details in the config file')
    }
    platformNames.forEach((platform) => { //checks the details associated with platform
        if(typeof _jsonObject[platform] != 'object'){
            throw new Error(`Type Error ! ${_jsonObject[platform]} is not an object`)
        }
        if(!_jsonObject[platform].hasOwnProperty('wss')){ //checks if the wss property is given 
            throw new Error(`Property error ! wss property missing in ${platform} platform`)

        }
    })

}

module.exports =  {
    parseConfigFile
}