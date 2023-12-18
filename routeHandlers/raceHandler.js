let fs = require('fs/promises');
let Methods = require('../methods');

exports.handleRaceRoute = async function (db, url, pathSegments, request, response) {

    if (pathSegments.length === 1) {
        let template = (await fs.readFile('templates/race.cars')).toString();
        Methods.sendResponse(200, 'text/html', template, response);
        return;
    }
    else{
        Methods.sendResponse(404, 'text/plain', '404 Not Found', response);
        return;
    }


}