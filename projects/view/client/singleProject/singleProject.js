Template.singleProject.helpers({
	linkTypeClass:function(linkType) {
		let linkTypeClass  = "link"; // Default to link icon

		switch (linkType) {
			case "facebook":
				linkTypeClass = "facebook";
				break;
			case "instagram":
				linkTypeClass = "instagram";
				break;
			case "linkedin":
				linkTypeClass = "linkedin";
				break;
			case "twitter":
				linkTypeClass = "twitter";
				break;
		}

		return linkTypeClass;
	}
});
