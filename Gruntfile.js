var rewrite = require( "connect-modrewrite" );

module.exports = function(grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    opts: {
      path: '.',
      name: 'learnot'
    },
    connect: {
      options: { //http://stackoverflow.com/a/26308563/1239621
        middleware: function ( connect, options, middlewares ) {
          var rules = [
              "!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|" +
                "\\.png|\\.gif|\\.eot|\\.ttf|\\.woff$ /index.html"
          ];
          middlewares.unshift( rewrite( rules ) );
          return middlewares;
        }
      },
      server: {
        options: {
          keepalive: false,
          port: 8000,
          base: '<%= opts.path %>'
        }
      }
    },
    browserify: {
      dev: {
        files: {
          '<%= opts.path %>/dist/<%= opts.name %>.js': ['<%= opts.path %>/scripts/index.js'],
        }
      }
    },
    stylus: {
      compile: {
        options: {
          compress: false,
          use: [ require('nib') ],
          "include css": true
        },
        files: {
          '<%= opts.path %>/dist/<%= opts.name %>.css': '<%= opts.path %>/css/index.styl'
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      dev: {
        files: [
          '<%= opts.path %>/scripts/**/*.js',
          '<%= opts.path %>/css/**/*.styl'
        ],
        tasks: ['stylus', 'browserify']
      }
    }
  });

  grunt.registerTask('default', ['stylus', 'browserify', 'connect', 'watch']);
};
