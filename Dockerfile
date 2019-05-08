FROM node:10.15.3-stretch

RUN apt-get update && apt-get install -y libvips-dev python libxss1 git rsync
