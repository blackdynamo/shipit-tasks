var utils = require("shipit-utils"),
    chalk = require("chalk");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "nginx:enable", task).name;

    function task() {
        shipit.log("Configuring Nginx.");

        return createSymlink()
            .then(function () {
                shipit.log(chalk.green("Nginx configuration enabled."));
            });
    }

    function createSymlink() {
        var command = "sudo ln -s " + shipit.nginx.sitesAvailable + "/" + shipit.nginx.filename + " " + shipit.nginx.sitesEnabled;
        return shipit.remote(command);
    }
};
