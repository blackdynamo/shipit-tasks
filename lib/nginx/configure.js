var utils = require("shipit-utils"),
    chalk = require("chalk"),
    fs = require("fs"),
    path = require("path"),
    _ = require("lodash"),
    Promise = require("bluebird");

var templateTypes = {
    server: "server",
    location: "location"
};

module.exports = function (shipit) {
    return utils.registerTask(shipit, "nginx:configure", task).name;

    function task() {
        shipit.log("Configuring Nginx.");

        return readTemplate()
            .then(renderTemplate)
            .then(createFile)
            .then(uploadFile)
            .then(moveFile)
            .then(function () {
                shipit.log(chalk.green("Configured Nginx."));
            });
    }

    function readTemplate() {
        return new Promise(function (resolve, reject) {
            var type = _.result(templateTypes, shipit.nginx.type, templateTypes.server);

            fs.readFile(path.resolve(__dirname, "templates/" + type + "-template.txt"), {encoding: "utf8"}, function (err, data) {
                if (err) return reject(err);

                resolve(data);
            });
        });
    }

    function renderTemplate(template) {
        template = _.template(template);

        return Promise.resolve(template(_.defaults(shipit.nginx, {secure: false})));
    }

    function createFile(template) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(shipit.nginx.filename, template, function (err) {
                if (err) return reject(err);

                resolve();
            });
        });
    }

    function uploadFile() {
        return shipit.remoteCopy(shipit.nginx.filename, shipit.currentPath);
    }

    function moveFile() {
        var command = "sudo mv " + shipit.currentPath + "/" + shipit.nginx.filename + " " + shipit.nginx.sitesAvailable;
        return shipit.remote(command);
    }
};
