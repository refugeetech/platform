// Ensure 'name' field is unique;
// i.e. tag name should exist only once in collection
Tags._ensureIndex({name: 1}, {unique: 1});
