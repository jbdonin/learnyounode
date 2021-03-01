const http = require('http')
url = require('url')
port = process.argv[2]

//Fonction permettant d'avoir un format d'objet contenant l'heure, les minutes et les secondes
formatDate = date => {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
}
//Fonction permettant d'avoir un format d'objet contenant le temps unix 
formatUnix = date => {
  return {
    unixtime: date.getTime(),
  };
}
//creation d'un serveur avec le module http
const server = http.createServer((request, response) => {
  let data = undefined

  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  // créer une url de base pour utiliser new url
  var baseURL = 'http://' + request.headers.host + '/';
  // new url permet d'avoir un object représentant l'url
  const urlContent = new URL(request.url, baseURL)
  //recuperer le pathname
  const route = urlContent.pathname;
    //recuperer le la date dans searchParams
  const date = new Date(urlContent.searchParams.get('iso'));
  if (route == '/api/parsetime') {
    data = formatDate(date)
  } else if (route == '/api/unixtime') {
    data = formatUnix(date)
  }
  response.end(JSON.stringify(data))
});

server.listen(port);
