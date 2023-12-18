let Methods = require('./methods');
let fs = require('fs/promises');
let raceHandler = require('./routeHandlers/raceHandler');

exports.handleRoute = async function (db, url, pathSegments, request, response) {
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
                <table class="car-object">
                    <tr class="car-model">
                        <th colspan="2">${obj.carModel}</th>
                    </tr>
                    <tr class="car-weight">
                        <td>Weight:</td>
                        <td>${obj.weight} kg</td>
                    </tr>
                    <tr class="car-height">
                        <td>Height:</td>
                        <td>${obj.height} m</td>
                    </tr>
                    <tr class="car-width">
                        <td>Width:</td>
                        <td>${obj.width} m</td>
                    </tr>
                    <tr class="car-length">
                        <td>Length:</td>
                        <td>${obj.length} m</td>
                    </tr>
                    <tr class="car-max-velocity">
                        <td>Max Velocity:</td>
                        <td>${obj.maxVeclocity} km/h</td>
                    </tr>
                </table>
                `
        }
        template = template.replaceAll('KACHOWcarDetailsKACHOW', cars);

        Methods.sendResponse(200, 'text/html', template, response);
        return;
    }
    else {
        switch (pathSegments[0]) {
            case 'race':
                raceHandler.handleRaceRoute(db, url, pathSegments, request, response);
                break;
            default:
                Methods.sendResponse(500, 'text/plain', '500 Internal Server Error', response);
                return;
        }
    }

}