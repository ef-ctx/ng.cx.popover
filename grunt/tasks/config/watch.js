module.exports = {

    options: {
        livereload: false
    },

    gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfiles'],
    },

    js: {
        files: '<%= files.lib.js %>',
        tasks: ['jshint:src', 'karma:unit', 'concat', 'wrap', 'uglify']
    },

    less: {
        files: '<%= files.lib.less.all %>',
        tasks: ['less:normal']
    },

    test: {
        files: ['<%= files.test %>'],
        tasks: ['jshint:test', 'karma:unit']
    }

};
