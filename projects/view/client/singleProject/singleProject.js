Template.singleProject.helpers({
	typeToClass:function() {
		if(this.type=='facebook') {
			return 'fa fa-facebook';
		}
		if(this.type=='twitter') {
			return 'fa fa-twitter';
		}
		if(this.type=='instagram') {
			return 'fa fa-instagram';
		}
		//need to implement font awesome icon for blogger and other link types used
		if(this.type=='blogger') {
			return 'fa fa-blogger';
		}
		if(this.type=='linkedin') {
			return 'fa fa-linkedin';
		}
	}
});