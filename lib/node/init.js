var utils = require("shipit-utils"),
    chalk = require("chalk");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "node:init", task).name;

    function task() {
        shipit.log("Verifying Node.");

        return verifyNode()
            .then(function(){
                return shipit.log(chalk.green("Node Installed."));
            })
            .catch(function(){
                return Promise.reject("Node is not installed.");
            });

        function verifyNode(){
            return shipit.remote("node --version");
        }
    }
};