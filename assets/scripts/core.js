var http = new XMLHttpRequest();

function json(method, url, handler) {
  if(!http) return;
  http.open(method, url, true);
  http.onreadystatechange = function() {
    if (http.readyState != 4 /* complete */) return; 
    if (http.status != 200) return;
    console.log(http.responseText);
    handler(JSON.parse(http.responseText));
  }
  http.send();
}
