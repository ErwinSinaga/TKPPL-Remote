/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'public/index.html': 'src/index.html',    
        }
      },
      dev: {                                       // Another target
        files: {
          'public/index.html': 'src/index.html',
        }
      }
    },
    stylus: {
      src: {
        options: {
          compress: false
        },
        files: {
          'public/css/css.css': 'src/css/css.styl'
        }
      }
    },
    watch: {
      src: {
        files: 'src/**',
        tasks: 'default'
      }
    },
    clean: {
      public: {
        src: 'public/**/*'
      }
    },
    copy: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**', '!**/*.jade', '!**/*.styl'],
          dest: 'public/'
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 8100,
          base: 'public',
          keepalive: true
        }
      }
    },
    parallel: {
      grunt: {
        grunt: true,
        tasks: ['connect', 'watch']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Default task.
  grunt.registerTask('default', ['clean', 'htmlmin', 'stylus', 'copy']);
  grunt.registerTask('server', ['default', 'connect']);
  grunt.registerTask('dev', ['parallel']);

};
