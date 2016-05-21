var $searchForm = $('#search-form')
var $searchResults = $('#search-results')
var $searchButton = $('#searchButton')

var searchString

var resultDiv = '<div class="result"></div>'
var resultTitle = '<h2 class="searchtitle"></h2>'
var resultText = '<p></p>'

function fillResults() {
  $searchResults.children().remove();
  json["query"]["search"].forEach(function (elem) {
    resultTitle = '<h2 class="searchtitle">'+elem["title"]+'</h2>'
    resultText = '<p>'+elem["snippet"]+'</p>'
    resultDiv = '<div class="result">'+resultTitle+resultText+'</div>'
  //elem["size"]
    $searchResults.append(resultDiv)
  })
}

$searchButton.on('click', function(event) {
  event.preventDefault()
  //var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=" + $('#search').val()
  $.ajax( {
    url: "http://en.wikipedia.org/w/api.php?",
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      action: 'query',
      list: 'search',
      format: 'json',
      utf8: 1,
      indexpageids:1,
      srsearch: $('#search').val()
    },
    xhrFields: { withCredentials: true },
    success: function(result) {
      $searchResults.children().remove()
      result["query"]["search"].forEach(function (elem) {
        resultTitle = '<h2 class="searchtitle">'+elem["title"]+'</h2>'
        resultText = '<p>'+elem["snippet"]+'</p>'
        resultDiv = '<div class="result material-shadow">'+resultTitle+resultText+'</div>'
      //elem["size"]
        $searchResults.append(resultDiv)
      })
    }
  })
})
