const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const {format} = require('date-fns');
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))

const logEvents = require('./log_events')
const EventsEmitter = require('events');
class Emitter extends EventsEmitter{};
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT  =  process.env.PORT || 5000; // hosted port or home port

const serveFile = async (filePath, contentType, response) =>{
   try{
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8' : '');

        const data = contentType === 'application/json'
        ? JSON.parse(rawData): rawData;
        response.writeHead(
          filePath.includes('404.html') ? 404: 200,
            {'Content-Type': contentType})
response.end(contentType === 'application/json'? JSON.stringify(data): data
);
    } catch (err) {
console.log(err);
myEmitter.emit('log', `${err.name}: ${err.msg}`, 'errLog.txt')
response.statusCode = 500;
response.end();
    }
}


const server = http.createServer((req, res) => {
//console.log(req.url, req.method)
myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')
const extension = path.extname(req.url);
let contentType; 

switch(extension){
    case '.css':
        contentType = 'text/css';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    
        case '.json':
        contentType = 'application/json';
        break;

        case '.jpg':
        contentType ='image/jpeg';
        break;

        case '.png':
        contentType = 'image/png';
        break;

        case '.txt':
        contentType = 'text/plain';
        break;
        
         default:
         contentType = 'text/html';
}

let filePath = 
contentType === 'text/html' && req.url === '/'
? path.join(__dirname, 'index.html')
: contentType === 'text/html' && req.url.slice(-1) === '/'
? path.join(__dirname, req.url, 'index.html')
: contentType === 'text/html'
? path.join(__dirname, req.url)
:path.join(__dirname, req.url);

// check for if content type is not html. 
if(extension && contentType !== 'text/html'){
filePath = path.join(__dirname, req.url);}
console.log(` JS:84 file path: ${filePath}`)


// if no extension exists
if(!extension && req.url.slice(-1) !== '/'){filePath += '.html'};
const fileExists = fs.existsSync(filePath);

if(fileExists){
    // serve the file
    serveFile(filePath, contentType, res)
}else{// serve 301
switch(path.parse(filePath).base){
    case 'old.html': res.writeHead(301, {'Location': '/new-page.html'});
    res.end();
    break;
    case 'www-page.html':  res.writeHead(301, {'Location': '/'});
    res.end();
    break;
    default: // serve a 404 response;
    serveFile(path.join(__dirname, '404.html'), 'text/html', res)
}
}
});



server.listen(PORT, () => console.log(`server running on ${PORT}`));


// git update test
