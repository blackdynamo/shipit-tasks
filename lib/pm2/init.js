var utils = require("shipit-utils"),
    chalk = require("chalk"),
    verifyNodeVersion = require("tasks/verify-node-version");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "pm2:init", task).name;

    function task() {
        shipit.log("Initializing PM2.");

        return verifyNodeVersion(shipit.config)
            .then(createPM2Context)
            .then(verifyPM2)
            .then(installPM2)
            .then(function () {
                return shipit.log(chalk.green("PM2 Initialized."));
            });
    }

    function createPM2Context(nodeVersion) {
        return Promise.resolve({
            nodeVersion: nodeVersion
        });
    }

    function verifyPM2(context) {
        return new Promise(function (resolve, reject) {
            shipit.remote("nvm exec " + context.nodeVersion + " which pm2")
                .then(function () {
                    return resolve(context);
                })
                .catch(function (err) {
                    if (err.toString().indexOf("no pm2") > -1) {
                        context.installPM2 = true;
                        return resolve(context);
                    }

                    reject(err);
                })
            ;
        });
    }

    function installPM2(context) {
        return new Promise(function (resolve, reject) {
            if (!context.installPM2) return resolve(context);

            shipit.remote("nvm exec " + context.nodeVersion + " npm install -g pm2")
                .then(function () {
                    return resolve(context);
                })
                .catch(reject)
            ;
        });
    }
};
