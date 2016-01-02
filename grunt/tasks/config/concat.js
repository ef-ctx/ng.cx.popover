module.exports = {

    source: {

        options: {
            banner: '<%= banner %>',
            process: function removeUseStrictStatement(src, filePath){
                'use strict';

                return src.replace(/'use\ strict';/g,'');
            }
        },

        src: '<%= files.lib.js %>',
        dest: '<%= dist.js %>'
    }

};
