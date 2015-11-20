

/**
 * Created by Mehdi on 2015-11-18.
 */

'use strict';

var redis = require("redis")
    , cache = {}
    , client;

var connectRedis = () => {
    if (client == null || !client.connected) {
        client = redis.createClient();
    }
};

cache.store = (key, value) => {
    return new Promise((resolve, reject) => {
        connectRedis();
        client.hmset(key, value, (err, obj) => {
            if(err !== null && err.code) {
                reject(err.code);
            }
            else if(obj === null)
                reject('NOTFOUND');
            else if(obj)
                resolve(obj)
        });
    });
};

cache.retrieve = (key) => {
    return new Promise((resolve, reject) => {
        connectRedis();
        client.hgetall(key, (err, obj) => {
            if(err !== null && err.code) {
                reject(err.code);
            }
            else if(obj === null)
                reject('NOTFOUND');
            else if(obj)
                resolve(obj)
        });
    });
};

cache.remove = (key) => {
    return new Promise((resolve,reject) => {
        connectRedis();
        client.del(key, function(err, reply) {
            if(err != null) {
                reject(err)
            } else { //if (reply === 1) //resolve anyway
                resolve(reply);
            }
        });
    });
};

cache.exists = (key) => {
    return new Promise((resolve, reject) => {
        connectRedis();
        client.exists(key, function(err, reply) {
            if(err != null) {
                reject(err)
            } else if (reply === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

module.exports = cache;
