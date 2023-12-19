require('dotenv/config');
let http = require('http');
let MongoClient = require('mongodb').MongoClient;
let port = 3000;

let routeHandler = require('./routeHandler');
let staticFileHandler = require('./staticFileHandler');


async function handleRequest(request, response){

    let mongoConn = await MongoClient.connect(process.env.MONGODB_CONNECTIONSTRING);
    let db = mongoConn.db('carRace');

    let url = new URL(request.url, 'http://' + request.headers.host);
    let path = url.pathname;
    let pathSegments = path.split('/').filter(function(element){
        return element !== '';
    });

    if (pathSegments.length > 0 
    && pathSegments[0] === 'static' 
    && request.method === 'GET'){
        staticFileHandler.handleStaticFileRoute(pathSegments, response);
        return;
    }
    routeHandler.handleRoute(db, url, pathSegments, request, response);
}

let app = http.createServer(handleRequest);

app.listen(port, function(){
    console.log(`Server listeing on ${port}`);
});


//averageVelocity
//instantaneousVelocity
//laps
//lapTime


//Username = rasp123

//To Fix: 
