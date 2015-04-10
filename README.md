## [Hippopogram](http://i-hate-farms.github.io/hippopogram) a loving fork of webogram

[Hippopogram](http://i-hate-farms.github.io/hippopogram) adds features to our beloved [webogram](https://github.com/zhukov/webogram), the web application for [telegram](telegram.org)

More information on the [original application](README-ori.md)

## Features: 
  - [x] [support markdown](https://github.com/I-hate-farms/hippopogram/issues/2) syntax using [marked](https://github.com/chjj/marked)
  ![sample](doc/markdown.png)
  - [x] [replace old school western emoticons](https://github.com/I-hate-farms/hippopogram/issues/1) like :) with unicode modern ones :smile:
  ![sample](doc/emoticons.png) 
  - [ ] enable sent message editing *planned*
  - [ ] better link management (link to images, imgur, etc) *planned*

For more information about webogram, read the [original documentation](README-ori.md)

## How to run 

``` 
git clone https://github.com/I-hate-farms/hippopogram.git
cd hippopogram
npm install 
make package
make build
node server.js

```

open http://localhost:8000/app/index.html

## How to run 
To code with livereload and watched files, run 
```
make dev
```

## How to publish 
Run 
```
make local_publish
```
and push the file in `dist/` into to the `gh-pages` branch. 
## [Changelog](CHANGELOG.md)
