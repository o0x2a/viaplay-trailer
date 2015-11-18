"use strict";

var express = require('express')
    , router = express.Router()
    , utils = require('../lib/utils')
    , fetch = require('../lib/fetch')
    , cache = require('../lib/cache')
    , constants = require('../lib/constants.js');


router.post('/', (req, res) => {
  if(!utils.isRequestValid(req.body)) {
    return res.status(400).send({error: 'Bad Request'});
  }


  let movie_url = req.body[constants.req_param];
  let movieId = utils.getMovieIdFromUrl(movie_url);

  cache.retrieve(movieId)
      .then((result) => res.send(result)).catch(()=> {
        fetch.imdb(movie_url)
            .then(fetch.trailer)
            .then((result)=> {
              cache.store(movieId, result);
              res.send(result);
            })
            .catch((error) => {
              res.status(403).send({error: error});
            });
  });
});


/* Some wisdom on silence */
router.get('/', (req, res) => {
  if(!res.headersSent) {
    res.append("Content-Type", "text/plain");
  }
  res.send(utils.getQuote());
});

module.exports = router;
