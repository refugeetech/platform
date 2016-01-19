Template.autoSuggestProjectResult.events({
    'click.result':function(e) {
        FlowRouter.go(FlowRouter.current().path+"/"+this._id);
    }
});