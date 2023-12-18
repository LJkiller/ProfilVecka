let fs = require('fs/promises');
let Methods = require('./methods');

exports.handleStaticFileRoute = async function (pathSegments, response) {

    pathSegments[0] = 'public'
    let path = pathSegments.join('/');

    let fileContents;
    try {
        fileContents = await fs.readFile(path);
    } catch (err) {
        if (err.code === 'ENOENT') {
            Methods.sendResponse(404, 'text/plain', '404 Not Found', response);
        } else {
            Methods.sendResponse(500, 'text/plain', '500 Internal Server Error', response);
        }

        return;
    }

    let dotIndex = filePath.lastIndexOf('.');
    if (dotIndex === -1) {
        Methods.sendResponse(400, 'text/plain', '400 Bad Request', response);
        return;
    }
    let ext = path.substring(dotIndex + 1);

    let contentType;
    switch (ext) {
        case 'html':
            contentType = 'text/html';
            break;
        case 'css':
            contentType = 'text/css';
            break;
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'jpg':
        case 'jpeg':
            contentType = 'image/jpeg';
            break;
        default:
            Methods.sendResponse(500, 'text/plain', '500 Internal Server Error', response);
            return;
    }

    Methods.sendResponse(200, contentType, fileContents, response);
}