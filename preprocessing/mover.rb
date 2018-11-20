require 'flickraw'
require 'pry'
require 'json'
require 'awesome_print'
require 'open-uri'


def flickr
  @flickr ||= FlickRaw::Flickr.new(
    api_key: ENV['FLICKRAW_API_KEY'],
    shared_secret: ENV['FLICKRAW_SHARED_SECRET']
  )
end

def user_id
  @user_id ||= flickr.people.findByEmail(find_email: 'counterbeing@gmail.com').nsid
end

def albums
  @albums ||= flickr.photosets.getList(user_id: user_id)
end

def get_photos_from_album(album, folder)
  photos = flickr.photosets.getPhotos(photoset_id: album['id'], user_id: user_id).photo.map do |photo|
    info = flickr.photos.getInfo(photo_id: photo.id)

    versions = download_photo_versions(photo, folder, info.originalformat)
    {
      title: info.title,
      taken: info.dates.taken,
      description: info.description,
      versions: versions,
    }
  end
  data = {
    photos: photos,
    title: album.title
  }
  File.write(File.join(folder, 'index.json'), data.to_json)
end

def download_photo_versions(photo, folder, extension)
  flickr.photos.getSizes(photo_id: photo.id).map do |version|
    file_name = [photo.id, "#{version.width}x#{version.height}", version.label]
                .join('-') + '.' + extension

    file_path = File.join(folder, file_name)
    IO.copy_stream(open(version.source), file_path) unless File.exist?(file_path)
    print '.'
    {
      name: file_name,
      path: file_path,
      width: version.width,
      height: version.height,
      label: version.label
    }
  end
end

album_list = albums.map do |album|
  ap album
  folder_name = File.join('tmp', album.id)
  FileUtils.mkdir_p folder_name
  get_photos_from_album(album, folder_name)
end

File.write('tmp/index.json', album_list.to_json)
