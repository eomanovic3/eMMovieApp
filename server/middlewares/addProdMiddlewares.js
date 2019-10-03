const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  const whitelist = ['http://localhost:3000', 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'];
  const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
      if(whitelist.includes(origin))
        return callback(null, true)

      callback(new Error('Not allowed by CORS'));
    }
  }

  app.use(cors(corsOptions));  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(outputPath, 'index.html')),
  );
};
