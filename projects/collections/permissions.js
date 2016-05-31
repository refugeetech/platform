Projects.allow({
  insert: function () {
    return true;
  }
});

ProjectMedia.allow({
  download: function () {
    return true;
  },
  fetch: null
});

ProjectMedia.allow({
  update: function () {
    return true;
  }
});

