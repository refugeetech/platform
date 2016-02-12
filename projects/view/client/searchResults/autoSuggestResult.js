Template.autoSuggestProjectResult.events({
  'click.result':function(e) {
    FlowRouter.go(/projects/+this._id);
    $('#searchbar input').blur();
    $('#searchbar input').val(this.name);
    Session.set('willShowAutoSuggestion',false);
  }
});
