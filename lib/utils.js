/**
 * Created by Mehdi on 2015-11-17.
 */

'use strict';

var constants = require('../lib/constants');

var utils = {};

utils.isRequestValid = (body) => {
    try {
        return body != null && body != "" && body != {} &&
            body[constants.req_param] != undefined &&
            constants.movie_url_pattern.test(body[constants.req_param]);
    } catch(e){
        return false;
    }
};
utils.getMovieIdFromUrl = (url) => {
    let regexp = constants.movie_id_regex;
    let regexResult = regexp.exec(url);
    return regexResult == null ||  regexResult.length < 2 ? null : regexResult[1];
};

/* Do you like to read code?
   so please enjoy some quotes :-D */
utils.getQuote = () =>
     [`
          Only silence perfects silence.
                           ~A. R. Ammons`,`
          Silence is golden when you can't
          think of a good answer.
                           ~Muhammad Ali`,`
          To communicate through silence is
          a link between the thoughts of man.
                           ~Marcel Marceau`,`
          Silence is better than unmeaning
          words.
                           ~Pythagoras`,`
          Who tells a finer tale than any
          of us. Silence does.
                           ~Isak Dinesen`
    ][Math.floor((Math.random() * 5))];

module.exports = utils;