var utils = require("shipit-utils"),
    chalk = require("chalk");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "nginx:reload", task).name;

    function task() {
        shipit.log("Reloading Nginx.");

        return shipit.remote("sudo service nginx reload")
            .then(function () {
                shipit.log(chalk.green("Nginx reloaded."));
            });
    }
};
