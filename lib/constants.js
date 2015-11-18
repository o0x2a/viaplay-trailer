/**
 * Created by Mehdi on 2015-11-17.
 */
'use strict';
const constants = {
    port: 3000,
    movie_url_pattern: /https:\/\/content.viaplay.se\/web-se\/film\/.*/,
    req_param: 'movie_resource_url',
    api_path_imdb: ["_embedded","viaplay:blocks","0","_embedded","viaplay:product","content","imdb","id"],
    api_partial_path_imdb: ["_embedded", "viaplay:product", "content", "imdb","id"],
    movie_id_regex: /^https?:\/\/content.viaplay.se\/web-se\/film\/([^?&=\/]*).*$/,
    trailer_api: (imdb) => `http://api.traileraddict.com/?imdb=${imdb.replace('tt','')}&count=1&credit=no`
};

module.exports = constants;