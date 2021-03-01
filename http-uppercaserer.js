const http = require('http');

// decomposition du process.argv 
const [_node, _path_, port] = process.argv;
// creation du serveur avec le http.createServer
const server = http.createServer((request, response) => {
  let body = ''
  //Condition si la requête n'est pas un post
  if (request.method !== 'POST') {
    return response.end('ce n\'ai pas un post')
  }
  //ajouter dans body les data
  request.on('data', function (data) {
    body += data.toString();
  });

  request.on('end', function () {
    //terminé l'envoie de la requête
    response.end(body.toUpperCase());
  });
})
server.listen(port)
