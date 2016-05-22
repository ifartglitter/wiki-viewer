var $searchForm = $('#search-form')
var $searchResults = $('#search-results')
var $searchButton = $('#searchButton')

var searchString

var resultDiv = '<div class="result"></div>'
var resultTitle = '<h2 class="searchtitle"></h2>'
var resultText = '<p></p>'

$searchButton.on('click', function(event) {
  event.preventDefault()
  $.ajax( {
    url: "http://en.wikipedia.org/w/api.php?",
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      action: 'query',
      generator: 'search',
      gsrlimit: 10,
      format: 'json',
      prop: 'extracts',
      exintro: 1,
      explaintext: 1,
      exsentences: 1,
      exlimit: 'max',
      gsrsearch: $('#search').val()
    },
    xhrFields: { withCredentials: true },
    success: function(result) {
      $searchResults.children().remove()
      for(var ele in result.query.pages) {
        console.log(ele, result.query.pages[ele])
        resultTitle = '<h2 class="searchtitle">' + result.query.pages[ele].title + '</h2>'
        resultText = '<p>' + result.query.pages[ele].extract + '</p>'
        resultDiv = '<div class="result material-shadow">' + resultTitle + resultText + '</div>'
        resultLink = '<a href="https://en.wikipedia.org/?curid=' + result.query.pages[ele].pageid + '" target="_blank">' + resultDiv + '</a>'
        $searchResults.append(resultLink)
      }

    }
  })
})
