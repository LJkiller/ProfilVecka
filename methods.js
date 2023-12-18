class Methods {
  static sendResponse(statusCode, contentType, contentText, response) {
    response.writeHead(statusCode, { 'Content-Type': contentType });
    response.write(contentText);
    response.end();
  }

  static sendBug() {
    console.log('It loads properly.');
  }

  static getBody(request) {
    return new Promise(function (resolve, reject) {
      let chunks = [];

      request.on('data', function (chunk) {
        chunks.push(chunk);
      });

      request.on('error', function (err) {
        reject(err);
      });

      request.on('end', async function () {
        let data = Buffer.concat(chunks).toString();

        resolve(data);
      });
    });
  }

}

module.exports = Methods;