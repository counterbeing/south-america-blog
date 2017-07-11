'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _yamlFrontMatter = require('yaml-front-matter');

var _yamlFrontMatter2 = _interopRequireDefault(_yamlFrontMatter);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_fsExtra2.default);

function run() {
  _fsExtra2.default.ensureDirSync('../public/destinations/');
  _fsExtra2.default.readdirAsync('./data/').filter(function (element) {
    return (/\d{7}/.test(element)
    );
  }).map(function (fileName) {
    return {
      id: fileName,
      markdownPath: 'data/' + fileName + '/post.md',
      flickrCachePath: 'data/' + fileName + '/flickr.cache'
    };
  }).map(function (destination) {
    return readAndProcess(destination).then(function (destination) {
      writeJson(_path2.default.join('../public/destinations/', destination.id + '.json'), { 'data': destination });
      return destination;
    }).then(function (destination) {
      var attributes = destination.attributes;
      return {
        'type': 'destination',
        'id': destination.id,
        'attributes': {
          'latitude': attributes.latitude,
          'longitude': attributes.longitude,
          'date': attributes.date
        }
      };
    }).then(function (destinations) {
      writeJson(_path2.default.join('../public', 'index.json'), { 'data': destinations });
    });
  });
}

var writeJson = function writeJson(file, data) {
  return _fsExtra2.default.writeJson(file, { data: data }, { spaces: 2 });
};

var readAndProcess = function readAndProcess(destination) {
  return _fsExtra2.default.readFileAsync(destination.markdownPath).then(_yamlFrontMatter2.default.loadFront).then(function (val) {
    var flickrCache = _fsExtra2.default.existsSync(destination.flickrCachePath) ? _fsExtra2.default.readFileSync(destination.flickrCachePath, { encoding: 'utf-8' }) : '';
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
        'flickr_cache': flickrCache
      }
    };
  }).catch(SyntaxError, function () {
    console.error('invalid yaml in file');
  }).catch(function (err) {
    console.error('unable to read file');
    console.log(err);
  });
};

run();