var utils = require("shipit-utils"),
    chalk = require("chalk");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "pm2:start", task).name;

    function task() {
        shipit.log("Starting current release.");

        return shipit.remote("cd " + shipit.currentPath + " && NODE_ENV=" + process.env.NODE_ENV + " pm2 start index.js --name \"" + shipit.config.application + "\"")
            .then(function () {
                return shipit.log(chalk.green("Current release started."));
            });
    }
};
