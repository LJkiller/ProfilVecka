class Methods {
    static sendResponse(statusCode, contentType, contentText, response) {
      response.writeHead(statusCode, { 'Content-Type': contentType });
      response.write(contentText);
      response.end();
    }

    static sendBug(){
        console.log('It loaded properly.');
    }

}
  
module.exports = Methods;