let Methods = require('./methods');
let fs = require('fs/promises');
let raceHandler = require('./routeHandlers/raceHandler');

exports.handleRoute = async function(db, url, pathSegments, request, response){
    console.log(pathSegments);
    
    let template;
    let result;
    //Index
    if (pathSegments.length === 0) {
        template = (await fs.readFile('templates/index.cars')).toString();
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
    else{
        switch(pathSegments[0]){
            case 'race':
                raceHandler.handleRaceRoute(db, url, pathSegments, request, response);
                break;
            default:
                Methods.sendResponse(500, 'text/plain', '500 Internal Server Error', response);
                return;
        }
    }

}