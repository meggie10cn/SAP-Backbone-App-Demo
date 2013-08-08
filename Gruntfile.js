module.exports = function(grunt) {

  // Application files (order is important)
  var jsFiles = [
    'src/js/app.js',
    'src/js/helper/api.js',
    'src/js/models/auth-model.js',
    'src/js/models/user-model.js',
    'src/js/views/app-view.js',
    'src/js/views/autologout-view.js',
    'src/js/views/error-view.js',
    'src/js/views/footer-view.js',
    'src/js/views/header-view.js',
    'src/js/views/link1-view.js',
    'src/js/views/link2-view.js',
    'src/js/views/loading-view.js',
    'src/js/views/login-view.js',
    'src/js/views/logout-view.js',
    'src/js/views/notfound-view.js',
    'src/js/views/welcome-view.js',
    'src/js/routers/router.js',
    'src/js/setup.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        multistr: true,
        noempty: false,
        globals: {
          jQuery: true,
          $: true,
          _: true,
          Backbone: true,
          App: true,
          JST: true,
          console: true
        }
      },
      files: jsFiles
    },

    jslint: {
      all: {
        directives: {
          browser: true,
          nomen: true,
          unparam: true,
          white: true,
          predef: ['jQuery', '$', '_', 'Backbone', 'App', 'JST', 'console']
        },
        src: jsFiles
      }
    },

    clean: {
      before: {
        src: ['dist', 'tmp']
      },
      after: {
        src: ['tmp']
      },
      docs: {
        src: ['docs']
      }
    },

    uglify: {
      options: {
        beautify: false
      },
      tempjs: {
        files: {
          'tmp/<%= pkg.name %>.min.js': jsFiles
        }
      },
      templates: {
        files: {
          'tmp/templates.min.js': 'tmp/templates.js'
        }
      }
    },

    concat: {
      dist: {
        src: ['tmp/templates.min.js', 'tmp/<%= pkg.name %>.min.js'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      debug: {
        src: ['src/copyright.txt', 'tmp/templates.js', jsFiles],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'src/', src: ['index.html', 'img/**'], dest: 'dist/' }
        ]
      },
      lib: {
        files: [
          { expand: true, cwd: 'src/lib/', src: ['**/**'], dest: 'dist/' }
        ]
      },
      distToNginx: {
        files: [
          { expand: true, cwd: 'dist/', src: ['**/**'], dest: '/opt/local/share/nginx/html/demo/' }
        ]
      }
    },

    jst: {
      compile: {
        options: {
          namespace: 'JST',
          processName: function (filename) {
            return filename.split('/').pop().split('.')[0];
          },
          templateSettings: {variable: 'dict'}
        },
        files: {
          'tmp/templates.js': ['src/templates/*.html']
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'src/css/',
        src: ['<%= pkg.name %>.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jslint');

  // Build tasks
  grunt.registerTask('dist', ['jshint', 'jslint', 'clean:before', 'jst', 'uglify:tempjs', 'uglify:templates', 'concat:dist', 'copy:dist', 'copy:lib', 'cssmin', 'clean:after', 'copy:distToNginx']);
  grunt.registerTask('debug', ['jshint', 'jslint', 'clean:before', 'jst', 'concat:debug', 'copy:dist', 'copy:lib', 'cssmin', 'clean:after', 'copy:distToNginx']);

};