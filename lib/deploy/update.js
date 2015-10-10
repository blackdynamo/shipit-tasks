var utils = require("shipit-utils"),
    path = require("path2/posix"),
    moment = require("moment"),
    chalk = require("chalk"),
    util = require("util"),
    Promise = require("bluebird");

module.exports = function (gruntOrShipit) {
    return utils.registerTask(gruntOrShipit, 'deploy:update', task).name;

    function task() {
        var shipit = utils.getShipit(gruntOrShipit);
        _.assign(shipit.constructor.prototype, require('shipit-deploy/lib/shipit'));

        return setPreviousRelease()
            .then(createReleasePath)
            .then(copyPreviousRelease)
            .then(remoteCopy)
            .then(function () {
                shipit.emit('updated');
            });

        function copyPreviousRelease() {
            if (!shipit.previousRelease) return Promise.resolve();

            return shipit.remote(util.format('cp -a %s/. %s', path.join(shipit.releasesPath, shipit.previousRelease), shipit.releasePath));
        }

        function createReleasePath() {
            shipit.releaseDirname = moment.utc().format('YYYYMMDDHHmmss');
            shipit.releasePath = path.join(shipit.releasesPath, shipit.releaseDirname);

            shipit.log('Create release path "%s"', shipit.releasePath);
            return shipit.remote('mkdir -p ' + shipit.releasePath)
                .then(function () {
                    shipit.log(chalk.green('Release path created.'));
                });
        }

        function remoteCopy() {
            var uploadDirPath = path.resolve(shipit.config.workspace, shipit.config.dirToCopy || '');

            shipit.log('Copy project to remote servers.');
            return shipit.remoteCopy(uploadDirPath + '/', shipit.releasePath, {rsync: '--del'})
                .then(function () {
                    shipit.log(chalk.green('Finished copy.'));
                });
        }

        function setPreviousRelease() {
            shipit.previousRelease = null;
            return shipit.getCurrentReleaseDirname()
                .then(function (currentReleasseDirname) {
                    if (currentReleasseDirname) {
                        shipit.log(chalk.green('Previous release found.'));
                        shipit.previousRelease = currentReleasseDirname;
                    }
                });
        }
    }
};
