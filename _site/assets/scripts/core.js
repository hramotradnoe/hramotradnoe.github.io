function json(method, url, handler) {
  var http = new XMLHttpRequest();
  http.open(method, url, true);
  http.onreadystatechange = function() {
    if (http.readyState != 4 /* complete */) return console.log('HTTP incomplete'); 
    if (http.status != 200) return console.log('HTTP not ready status');
    console.log(http.responseText);
    handler(JSON.parse(http.responseText));
  }
  http.send();
}
