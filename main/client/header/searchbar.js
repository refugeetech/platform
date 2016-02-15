Template.searchbar.events({
  'keyup #searchbar [type=text]': function(event, template) {
    // Mimic a search
    $('#spinner').removeClass('hidden'); // Show the spinner icon

    window.setTimeout(function() { // Remove spinner icon after a while
      $('#spinner').addClass('hidden')
    }, 1500);
  },
  'blur input':function(event,template) {
    $('#searchbar').removeClass('active'); //hide the searchbar when input blurs
  }
});
