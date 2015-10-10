var utils = require("shipit-utils"),
    chalk = require("chalk"),
    verifyNodeVersion = require("tasks/verify-node-version");


module.exports = function (shipit) {
    return utils.registerTask(shipit, "node:init", task).name;

    function task() {
        shipit.log("Initializing Node.");

        return verifyNodeVersion(shipit.config)
            .then(function(version){
                return shipit.remote("nvm install " + version);
            })
            .then(function(){
                return shipit.log(chalk.green("Initialized Node."));
            });
    }
};
