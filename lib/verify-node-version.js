"use strict";

module.exports = function (config) {
    return new Promise(function (resolve, reject) {
        if (!config.nodeVersion) return reject(new Error("Node Version is required"));

        resolve(config.nodeVersion);
    });
};
