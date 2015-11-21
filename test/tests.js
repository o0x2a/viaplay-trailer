/**
 * Created by Mehdi on 2015-11-17.
 */
"use strict";

var expect = require('expect.js');
var cache = require('../lib/cache.js');
var utils = require('../lib/utils.js');
var request = require('request');
var fetch = require('../lib/fetch.js');


let viaplay_url = 'https://content.viaplay.se/web-se/film/farval-till-maffian-2013';
let movie_id = utils.getMovieIdFromUrl(viaplay_url);

/**
 * @desc End to end system test to check if our api works
 */
describe('end2end api system test',() => {
    before(function( done ){
        cache.remove(movie_id)
            .then(()=>done())
            .catch(()=>done());
    });

    it('consume the api', (done) => {
        let options = {
            method: 'POST',
            url: 'http://127.0.0.1:3000/api',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let postData = `{"movie_resource_url": "${viaplay_url}"}`;
        request(options, (err,resp,body)=>{
            if(err && err.code === 'ECONNREFUSED') {
                expect().fail('In order to perform the e2e test, the server should be already running.');
            }
            expect(resp.statusCode).to.eql(200);
            expect(JSON.parse(body).trailer_id).to.eql(80628);
            done();
        }).write(postData);

    });
});

describe('internal components',() => {
    let viaplay_url = 'https://content.viaplay.se/web-se/film/farval-till-maffian-2013';
    let movie_id = utils.getMovieIdFromUrl(viaplay_url);

    beforeEach(function( done ){
        cache.remove(movie_id)
            .then(()=>done())
            .catch(()=>done());
    });

    it('get the IMDB id using ViaPlay movie resource url', function(done){
        fetch.imdb(viaplay_url)
            .then((result)=> { expect(result).to.be('tt2404311'); done() })
            .catch((err)=> expect().fail("Failed getting imdb id with error " + err));
    });

    it('get the TrailerAddict id using IMDB id', function(done){
        fetch.trailer('tt2404311')
            .then((result) => { expect(result.trailer_id).to.be("80628"); done()})
            .catch((err)=> expect().fail("Failed getting TrailerAddit it with error " + err));
    });

    it('check if the key deleted from the cache store successfully', (done) => {
        cache.exists(movie_id).then(() =>
            expect().fail("After deleting a key it still exists")
        ).catch(() => done());
    });

    it('persists data on data store', () => {
        cache.store('temp', {'obj1': 123})
            .then(()=>cache.retrieve('temp'))
            .then((result)=>expect(result.obj1).to.eql(123))
            .catch((err)=> expect().fail("Failed storing retrieving data to and from redis. " + err))
            .then(cache.remove('temp'))
            .then(cache.exists('temp')).then(()=> expect().fail("After deleting a key it still exists"))
            .catch(() => done());

    });
});



describe('using redis as data cache store',() => {

});
