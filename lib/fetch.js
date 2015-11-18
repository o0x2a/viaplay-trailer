/**
 * Created by Mehdi on 2015-11-17.
 */

'use strict';

var request = require('request')
    , JSONStream = require('JSONStream')
    , es = require('event-stream')
    , sax = require('sax')
    , constants = require('../lib/constants')
    , utils = require('../lib/utils');

var fetch  = {};

fetch.imdb = (url) => {
    return new Promise((resolve,reject) => {
        if(utils.getMovieIdFromUrl(url) === null) {
            return reject(`The given url ${url} is not valid`);
        }

        let json_path = url.indexOf('partial=true') >= 0 ?
            constants.api_partial_path_imdb : constants.api_path_imdb;

        var stream = request({url: url}, (err) => {
                if(err != null) {
                    return reject(`Could not fetch data from ViaPlay api service. ${err.code}`)
                }
            })
            .pipe(JSONStream.parse(json_path))
            .pipe(es.mapSync(function (data) {
                resolve(data);
                stream.destroy();
            }));
        stream.on('end', ()=>
            reject("Could not find IMDB movie id in the ViaPlay API response."))
        ;
    });
};

fetch.trailer = (imdb) => {
    return new Promise((resolve,reject) => {
        let saxStream = sax.createStream(true, {
                    trim: true,
                    normalize: true,
                    lowercase:true
                })
            , currentNode
            , result
            , stream = request({url: constants.trailer_api(imdb)}, (err) => {
                    if(err != null) {
                        return reject(`Could not fetch data from trailer addict api service. ${err.code}`)
                    }
                    else if(result == null) {
                        return reject('Trailer-addict does not have any trailer for the requested movie.')
                    }

                    return resolve({trailer_id: result, trailer_url: `https://v.traileraddict.com/${result}`})
        });

        saxStream.on("opentag", (node) => {
            currentNode = node.name;
        });

        saxStream.on("text", (text) => {
            if(currentNode === 'trailer_id') {
                result = text;
                stream.destroy();
            }
        });

        stream.pipe(saxStream);
    });
};

module.exports = fetch;