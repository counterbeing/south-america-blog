import fs from 'fs-extra'
import yamlFront from 'yaml-front-matter'
import marked from 'marked'
import Promise from 'bluebird'
import path from 'path'
import ms from 'minimal-sitemap'
import axios from 'axios'

Promise.promisifyAll(fs)

export function run() {
  fs.ensureDirSync('../public/destinations/')
  fs.readdirAsync('./data/')
    .filter((element) => {
      return /\d{7}/.test(element)
    })
    .map(function(fileName) {
      return {
        id: fileName,
        markdownPath: `data/${fileName}/post.md`,
        flickrCachePath: `data/${fileName}/flickr.cache`,
      }
    })

    .map((destination) => {
      return readAndProcess(destination)
        .then( (destination) => {
          writeJson(
            path.join('../public/destinations/', (destination.id + '.json')),
            destination
          )
          return destination
        })
        .then((destination) => {
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
    })
    .tap((destinations) => {
      let ids = destinations.map(function(destination) {
        return destination.id
      })
      ms.toSiteMapFile({
        urls: ids,
        prefix: 'https://www.corylogan.com/sa/destination/',
        file: '../public/sitemap.xml',
      })
    })
    .then((destinations) => {
      writeJson(
        path.join('../public', 'destinations.json'),
        destinations
      )
    })
}


var writeJson = (file, data) => {
  return fs.writeJson(
    file,
    {data: data},
    {spaces: 2}
  )
}

let readAndProcess = (destination) => {
  return fs.readFileAsync(destination.markdownPath)
    .then(yamlFront.loadFront)
    .then(async function (val) {

      console.log(`https://s3.amazonaws.com/south-america-blog/${val.flickr_link}/index.json`)
      console.log('---------------------------')
      let flickrCache = await axios.get(`https://s3.amazonaws.com/south-america-blog/${val.flickr_link}/index.json`)      
      return {
        'type': 'destination',
        'id': destination.id,
        'attributes': {
          'latitude': val.latitude,
          'longitude': val.longitude,
          'date': val.date,
          'city': val.city,
          'country': val.country,
          'flickr-link': val.flickr_link,
          'body': marked(val.__content),
          'flickr-cache': flickrCache.data
        }
      }
    })
    .catch(SyntaxError, function () {
      console.error('invalid yaml in file')
    })
    .catch(function (err) {
      console.error('unable to read file')
      // console.log(err)
    })
}

run()
