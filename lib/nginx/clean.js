var utils = require("shipit-utils");

module.exports = function (shipit) {
    return utils.registerTask(shipit, "nginx:clean", task).name;

    function task() {
        return removeFile()
            .then(removeSymlink);
    }

    function removeFile() {
        return shipit.remote("sudo rm -rf " + shipit.nginx.sitesAvailable + "/" + shipit.nginx.filename);
    }

    function removeSymlink() {
        return shipit.remote("sudo rm -rf " + shipit.nginx.sitesEnabled + "/" + shipit.nginx.filename);
    }
};
