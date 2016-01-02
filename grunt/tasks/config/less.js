module.exports = {

    normal: {

        options: {
            compress: false
        },

        files: {
            '<%= dist.css %>': '<%= files.lib.less.main %>'
        }

    },

    min: {

        options: {
            compress: true
        },

        files: {
            '<%= dist.css_min %>': '<%= files.lib.less.main %>'
        }

    }

};
