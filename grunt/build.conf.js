module.exports = {

    build: {
        root: 'build/',
        js: 'build/src/**/*.js'
    },

    dist: {
        js: 'dist/<%= pkg.name %>.js',
        js_min: 'dist/<%= pkg.name %>.min.js',
        css: 'dist/<%= pkg.name %>.css',
        css_min: 'dist/<%= pkg.name %>.min.css'
    },

    coverage: {
        root: 'coverage'
    },

    // SOURCES

    files: {

        lib: {
            js: ['src/**/*.js', '!src/**/*.spec*.js'],
            less: {
                main: 'src/cxPopover.less',
                all: ['src/**/*.less']
            }
        },

        grunt: ['Gruntfile.js', 'grunt/**/*.js'],

        test: ['src/**/*.spec*.js'],

        vendor: 'vendor/angular/angular.js',

        testVendor: 'vendor/angular-mocks/angular-mocks.js'

    },

    banner: '/**********************************************************' +
        '\n * ' +
        '\n * <%= pkg.name %> - v<%= pkg.version %>' +
        '\n * ' +
        '\n * Release date : <%= grunt.template.today("yyyy-mm-dd : HH:MM") %>' +
        '\n * Author       : <%= pkg.author.name %> ' +
        '\n * License      : <%= pkg.license.type %> ' +
        '\n * ' +
        '\n **********************************************************/' +
        '\n\n\n\n'

};
