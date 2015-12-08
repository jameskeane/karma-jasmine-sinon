var path = require('path');

var createPattern = function(file) {
  return {pattern: file, included: true, served: true, watched: false};
};

var init = function(files) {
  // need to insert jasmine-sinon after jasmine.js
  for (var i = 0; i < files.length; i++){
    if (/adapter\.js$/.test(files[i].pattern)) {
      files.splice(i + 1, 0, createPattern(require.resolve('jasmine-sinon')));
    }
  }

  // include sinon
  var sinonPath = path.dirname(require.resolve('sinon')) + '/../pkg';
  files.unshift(createPattern(sinonPath + '/sinon.js'));
};

init.$inject = ['config.files'];

module.exports = {
    'framework:jasmine-sinon': ['factory', init]
};
