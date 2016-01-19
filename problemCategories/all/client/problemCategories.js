Template.problemCategories.helpers({
	problemCategories: function() {
		var out = ProblemCategories.find().fetch();
		console.log(out);
		return out;
	}
});
