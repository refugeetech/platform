loadContent();

function loadContent() {
  var request = $.getJSON('data/content/content.json', function(data) {
    Session.set('content',data);
  });
}