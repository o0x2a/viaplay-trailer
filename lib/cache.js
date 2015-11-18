

/**
 * Created by Mehdi on 2015-11-18.
 */

'use strict';

var redis = require("redis")
    , cache = {};

cache.store = (key, value) => {
    return new Promise((resolve, reject) => {
        let client = redis.createClient();
        client.hmset(key, value, (err, obj) => {
            if(err !== null && err.code) {
                reject(err.code);
            }
            else if(obj === null)
                reject('NOTFOUND');
            else if(obj)
                resolve(obj)
        });
        client.quit();
    });
};

cache.retrieve = (key) => {
    return new Promise((resolve, reject) => {
        let client = redis.createClient();
        client.hgetall(key, (err, obj) => {
            if(err !== null && err.code) {
                reject(err.code);
            }
            else if(obj === null)
                reject('NOTFOUND')
            else if(obj)
                resolve(obj)
        });
        client.quit();
    });
};

cache.remove = (key) => {
    return new Promise((resolve,reject) => {
        let client = redis.createClient();
        client.del(key, function(err, reply) {
            if(err != null) {
                reject(err)
            } else { //if (reply === 1) //resolve anyway
                resolve(reply);
            }
        });
        client.quit();
    });
};

cache.exists = (key) => {
    return new Promise((resolve, reject) => {
        let client = redis.createClient();
        client.exists(key, function(err, reply) {
            if(err != null) {
                reject(err)
            } else if (reply === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        client.quit();
    });
};

module.exports = cache;