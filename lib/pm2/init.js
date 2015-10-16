var utils = require("shipit-utils"),
    chalk = require("chalk");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "pm2:init", task).name;

    function task() {
        shipit.log("Verifying PM2.");

        return verifyPM2()
            .then(function () {
                return shipit.log(chalk.green("PM2 Installed."));
            })
            .catch(function(){
                return Promise.reject("PM2 is not installed.");
            });
    }

    function verifyPM2() {
        return shipit.remote("which pm2");
    }
};
