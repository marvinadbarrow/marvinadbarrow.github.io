const {v4: uuid} = require('uuid');
const {format} = require('date-fns');
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss')); 
const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path');





const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `\n ${dateTime} \t${uuid()} \t${message} `;
    console.log(logItem)
    try {
if(!fs.existsSync(path.join(__dirname, 'logs'))){
    await fsPromises.mkdir(path.join(__dirname, 'logs'));
}        
await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)

    } catch (err) {
        console.log(err)
    }
}
// import uuid 
module.exports = logEvents;

