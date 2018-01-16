var get = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function() {


    if (xhr.readyState != xhr.DONE)
      return;

    var status = xhr.status;
    var headers = xhr.getAllResponseHeaders();
    var text = xhr.responseText;

    callback(status, headers, text);
  }

  xhr.send();
}

var appendImage = function(url) {
  var imgEl = document.createElement('img');

  imgEl.src = url;

  imgEl.onerror = function() {
    this.style.display = "none";
  }
  document.getElementById('images').appendChild(imgEl);
}

var getImages = function(args) {
  var limit = args.limit;
  var category = args.category;

  if (limit == undefined) {
    limit = 100;
  }
  if (category == undefined) {
    category = 'cats';
  }

  var url = 'https://www.reddit.com/r/pics/search.json?q=';
  url += category;
  url += '&limit=' + limit;

  get(url, function(status, headers, body) {
    var response = JSON.parse(body);

    _.each(response.data.children, function(child) {
      var url = child.data.url;

      appendImage(url);

    });

  });
}
var buttonClick = function() {

  var $limit = document.querySelector("#limit").value;
  var $keyword = document.querySelector("#category").value;

  var obj = {
    limit: $limit,
    category: $keyword
  };

  if (isNaN($limit)) {
    alert("Input number!");
  } else {
    getImages(obj);
  }

}

var button = document.querySelector(".button");
button.addEventListener("click", buttonClick);