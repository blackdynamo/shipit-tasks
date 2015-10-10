var utils = require("shipit-utils"),
    _ = require("lodash");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "nginx:init", task).name;

    function task() {
        shipit.nginx = _.assign({}, shipit.config.nginx, {
            currentPath: shipit.currentPath,
            sitesAvailable: "/etc/nginx/sites-available",
            sitesEnabled: "/etc/nginx/sites-enabled"
        });
    }
};
