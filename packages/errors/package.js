Package.describe({
  name: 'buddha:errors',
  version: '1.0.0',
  summary: 'A pattern to display application errors to the user',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api, where) {
  api.versionsFrom('0.9.0');
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if(api.export){
    api.export('Errors');
  }
});

Package.onTest(function(api, where) {
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.use('tinytest');
  api.use('buddha:errors');
  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
});
