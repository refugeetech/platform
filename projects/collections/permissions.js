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

