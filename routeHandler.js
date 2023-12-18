const path = require('path');
let Methods = require('./methods');
let fs = require('fs/promises');

exports.handleRoute = async function(db, url, pathSegments, request, response){
    console.log(pathSegments);
    
    //Index
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
    else{
        Methods.sendResponse(404, 'text/plain', '404 Not Found', response);
        return;
    }

}