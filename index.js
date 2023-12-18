require('dotenv/config');
let fs = require('fs/promises');
let http = require('http');
let MongoClient = require('mongodb').MongoClient;
let port = 3000;

let Methods = require('./methods');
let routeHandler = require('./routeHandler');

async function handleRequest(request, response) {

    let mongoConn = await MongoClient.connect(process.env.MONGODB_CONNECTIONSTRING);
    let db = mongoConn.db('ProfilVecka');

    let url = new URL(request.url, 'http://' + request.headers.host);
    let path = url.pathname;
    let pathSegments = path.split('/').filter(function (element) {
        return element !== '';
    });

    if (pathSegments.length === 0) {
        let template = (await fs.readFile('templates/index.cars')).toString();
        result = await db.collection('cars').find().toArray();
        let cars = '';
        for (let i = 0; i < result.length; i++) {
            let obj = result[i];
            cars +=
                `
                    <li class="car-object">
                    ${obj.carModel}
                        <ul>
                            <li>Weight:      ${obj.weight}kg</li>
                            <li>Height:      ${obj.height}m</li>
                            <li>Width:       ${obj.width}m</li>
                            <li>Length:      ${obj.length}m</li>
                            <li>MaxVeclotiy: ${obj.maxVelocity}km/h</li>
                        </ul>
                    </li>
                    <br>
                `
        }
        template = template.replaceAll('KACHOWcarDetailsKACHOW', cars);
        
        Methods.sendResponse(200, 'text/html', template, response);
        return;
    }
    
    if (pathSegments.length > 0 
        && pathSegments[0] === 'static' 
        && request.method === 'GET'){
            staticFileHandler.handleStaticFileRoute(pathSegments, response);
            return;
    }
    routeHandler.handleRoute(url, pathSegments, db, request, response);
}

let app = http.createServer(handleRequest);

app.listen(port, function () {
    console.log(`Server listening on ${port}`);
});


//averageVelocity
//instantaneousVelocity
//laps
//lapTime


//Username = rasp123

//To Fix: 
//Proper loading.