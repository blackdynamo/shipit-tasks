var utils = require('shipit-utils');

module.exports = function (gruntOrShipit) {
    return utils.registerTask(gruntOrShipit, 'deploy:clean', task).name;

    function task() {
        var shipit = utils.getShipit(gruntOrShipit);

        return cleanOldReleases()
            .then(function () {
                shipit.emit('cleaned');
            });

        /**
         * Remove old releases.
         */

        function cleanOldReleases() {
            shipit.log('Keeping "%d" last releases, cleaning others', shipit.config.keepReleases);
            var command = '(ls -rd ' + shipit.releasesPath +
                '/*|head -n ' + shipit.config.keepReleases + ';ls -d ' + shipit.releasesPath +
                '/*)|sort|uniq -u|xargs rm -rf';
            return shipit.remote(command);
        }
    }
};
