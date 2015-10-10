var utils = require("shipit-utils"),
    init = require("shipit-deploy/lib/init");

module.exports = function (gruntOrShipit) {
    return utils.registerTask(gruntOrShipit, "deploy:init", task).name;

    function task() {
        init(utils.getShipit(gruntOrShipit)).emit("deploy");
    }
};
