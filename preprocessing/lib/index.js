'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _yamlFrontMatter = require('yaml-front-matter');

var _yamlFrontMatter2 = _interopRequireDefault(_yamlFrontMatter);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import path from 'path'
_bluebird2.default.promisifyAll(_fsExtra2.default);

var destination = {
  id: '20121222_california_san_francisco',
  markdownPath: 'data/20121222_california_san_francisco/post.md',
  flickrCachePath: 'data/20121222_california_san_francisco/flickr.cache'
};

var readAndProcess = function readAndProcess(destination) {
  return _fsExtra2.default.readFileAsync(destination.markdownPath).then(_yamlFrontMatter2.default.loadFront).then(function (val) {
    return {
      'type': 'destination',
      'id': destination.id,
      'attributes': {
        'latitude': val.latitude,
        'longitude': val.longitude,
        'date': val.date,
        'city': val.city,
        'country': val.country,
        'flickr_link': val.flickr_link,
        'body': (0, _marked2.default)(val.__content),
        'flickr_cache': _fsExtra2.default.readFileSync(destination.flickrCachePath, { encoding: 'utf-8' })
      }
    };
  }).catch(SyntaxError, function () {
    console.error('invalid yaml in file');
  }).catch(function () {
    console.error('unable to read file');
  });
};

var result = readAndProcess(destination);
result.then(function (out) {
  console.log(out);
});