var utils = require("shipit-utils"),
    chalk = require("chalk");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "pm2:stop", task).name;

    function task() {
        shipit.log("Stopping previous.");

        return shipit.remote("pm2 delete " + shipit.config.application)
            .then(function () {
                return shipit.log(chalk.green("Release stopped."));
            })
            .catch(function (err) {
                //Eat the delete error
            });
    }
};
