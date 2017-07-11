import fs from 'fs-extra'
import yamlFront from 'yaml-front-matter'
import marked from 'marked'
import Promise from 'bluebird'
import path from 'path'
Promise.promisifyAll(fs)

var writeJson = (file, data) => {
  return fs.writeJson(
    file,
    {data: data},
    {spaces: 2}
  )
}


export function run() {
  fs.readdirAsync('./data/')
  .map(function(fileName) {
    return {
      id: fileName,
      markdownPath: `data/${fileName}/post.md`,
      flickrCachePath: `data/${fileName}/flickr.cache`,
    }
  })
  .map((destination) => {
    readAndProcess(destination)
    .then( (destination) => {
      writeJson(
        path.join('../public/destinations/', (destination.id + '.json')),
        {'data': destination}
      )
    })
    let attributes = destination.attributes
    return {
      'type': 'destination',
      'id': destination.id,
      'attributes': {
        'latitude': attributes.latitude,
        'longitude': attributes.longitude,
        'date': attributes.date,
      }
    }
  })
  .then((destinations) => {
    writeJson(
      path.join('../public', 'index.json'),
      {'data': destinations }
    )
  })
}


let readAndProcess = (destination) => {
  return fs.readFileAsync(destination.markdownPath)
  .then(yamlFront.loadFront)
  .then(function (val) {
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
        'body': marked(val.__content),
        'flickr_cache': fs.readFileSync(destination.flickrCachePath, {encoding: 'utf-8'})
      }
    }
  })
  .catch(SyntaxError, function () {
    console.error('invalid yaml in file')
  })
  .catch(function () {
    console.error('unable to read file')
  })
}


this.run()
