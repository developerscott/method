// Generated on 2014-01-09 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman         : {
            // configurable paths
            app : require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch          : {
            views     : {
                files  : ['<%= yeoman.app %>/index.html', '<%= yeoman.app %>/views/{,*/}*.html'],
                tasks  : ['htmlmin', 'browserify:test', 'concat:scripts', 'karma'],
                options: {
                    livereload: true
                }
            },
            js        : {
                files  : ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks  : ['newer:jshint:all', 'replace:dev', 'copy:scripts', 'browserify:test', 'concat:scripts', 'karma'],
                options: {
                    livereload: true
                }
            },
            jsTest    : {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass   : {
                files  : ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
                tasks  : ['compass:server'],
                options: {
                    livereload: true
                }
            },
            gruntfile : {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files  : [
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.app %>/translations/{,*/}*.json',
                    '<%= yeoman.app %>/scripts/themeSettings.json'
                ]
            }
        },

        // The actual grunt server settings
        connect        : {
            options   : {
                port      : 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname  : 'localhost',
                livereload: 35729
            },
            rules     : [
                { from: '^/(bower_components|fonts|images|scripts|styles|translations|views)(/.*)$', to: '/$1$2' },
                { from: '^/404.html', to: '/404.html' },
                { from: '^/(.*)$', to: '/index.html' }
            ],
            livereload: {
                options: {
                    open      : true,
                    base      : [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect, options) {
                        var middlewares = [];

                        // RewriteRules support
                        middlewares.push(rewriteRulesSnippet);

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function (base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test      : {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist      : {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint         : {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all    : [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test   : {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src    : ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean          : {
            dist  : {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            target: {
                src: [
                    '<%= yeoman.app %>/index.html'  // .html support...
                    //'app/views/**/*.jade',        // .jade support...
                    //'app/styles/main.scss',       // .scss & .sass support...
                    //'app/config.yml'              // and .yml & .yaml support out of the box!
                ],

                // Optional:
                // ---------
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '<%= yeoman.app %>/'
            }
        },

        // Depticated Bower install configuration
//        'bowerInstall': {
//            app: {
//                src       : '<%= yeoman.app %>/index.html',
//                ignorePath: '<%= yeoman.app %>/',
//                exclude   : ['bootstrap.js'],
//                fileTypes : {
//                    html: {
//                        replace: {
//                            js : '<script src="/{{filePath}}"></script>',
//                            css: '<link rel="stylesheet" href="/{{filePath}}" />'
//                        }
//                    }
//                }
//            }
//        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass        : {
            options: {
                sassDir                : '<%= yeoman.app %>/styles',
                cssDir                 : '.tmp/styles',
                generatedImagesDir     : '.tmp/images/generated',
                imagesDir              : '<%= yeoman.app %>/images',
                javascriptsDir         : '<%= yeoman.app %>/scripts',
                fontsDir               : '<%= yeoman.app %>/fonts',
                importPath             : [
                    '<%= yeoman.app %>/bower_components',
                    '<%= yeoman.app %>/bower_components/bootstrap-sass-official/vendor/assets/stylesheets'
                ],
                httpImagesPath         : '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath          : '/fonts',
                relativeAssets         : false,
                assetCacheBuster       : false,
                raw                    : 'Sass::Script::Number.precision = 10\n'
            },
            dist   : {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server : {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev            : {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '!<%= yeoman.dist %>/styles/overrides.css',
                        '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare  : {
            html   : '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin       : {
            html   : ['<%= yeoman.dist %>/{,*/}*.html'],
            css    : ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },
// Depricated module configuration
//        usemin         : {
//            html   : ['<%= yeoman.dist %>/{,*/}*.html'],
//            css    : ['<%= yeoman.dist %>/styles/{,*/}*.css'],
//            options: {
//                assetsDirs: ['<%= yeoman.dist %>'],
//                patterns  : {
//                    js : [
//                        [/src=([^ >]+)/g, 'Update template js to reference revved images']
//                    ],
//                    css: [
//                        [
//                            /(?:src=|url\(\s*)['"]?(?:\.\.)?([^'"\)(\?|#)]+)['"]?\s*\)?/gm,
//                            'Update template CSS to reference revved images, accomodate for ../'
//                        ]
//                    ]
//                }
//            },
//            js     : ['<%= yeoman.dist %>/scripts/*.scripts.js']
//        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin       : {
            dist: {
                options: {
                    cache: true
                },
                files  : [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>/images',
                        src   : '**/*.{png,jpg,jpeg,gif}',
                        dest  : '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>/images',
                        src   : '**/*.svg',
                        dest  : '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        // TODO: Investigate using the simple default configuration
//        htmlmin      : {
//            dist: {
//                options: {
//                    collapseWhitespace       : true,
//                    collapseBooleanAttributes: true,
//                    removeCommentsFromCDATA  : true,
//                    removeOptionalTags       : true
//                },
//                files  : [
//                    {
//                        expand: true,
//                        cwd   : '<%= yeoman.dist %>',
//                        src   : ['*.html', 'views/{,*/}*.html'],
//                        dest  : '<%= yeoman.dist %>'
//                    }
//                ]
//            }
//        },
        htmlmin: {
            options       : {
                collapseBooleanAttributes    : true,
                collapseWhitespace           : true,
                removeAttributeQuotes        : true,
                removeComments               : true, // Only if you don't use comment directives!
                removeCommentsFromCDATA      : true,
                removeEmptyAttributes        : false,
                removeOptionalTags           : true,
                removeRedundantAttributes    : true,
                removeScriptTypeAttributes   : true,
                removeStyleLinkTypeAttributes: true
            },
            views         : {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>',
                        src   : 'views/{,*/}*.html',
                        dest  : '.tmp/scripts'
                    }
                ]
            },
            componentViews: {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>',
                        src   : 'bower_components/**/*.html',
                        dest  : '.tmp'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        // TODO: Add concate and configure it as default
        ngmin  : {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd   : '.tmp/scripts',
                        src   : '*.js',
                        dest  : '.tmp/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify : {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        // TODO : Refactor the copy module configuration closer to default config.
        copy   : {
            dist      : {
                files: [
                    {
                        expand: true,
                        dot   : true,
                        cwd   : '<%= yeoman.app %>',
                        dest  : '<%= yeoman.dist %>',
                        src   : [
                            '*.{ico,png,txt}',
                            'web.config',
                            '*.html',
                            'bower_components/**',
                            'images/**/*.{gif,jpeg,jpg,png,svg,webp}',
                            'fonts/*',
                            'translations/{,*/}*.json',
                            'scripts/themeSettings.json',
                            'styles/overrides.css'
                        ]
                    },
                    {
                        expand: true,
                        cwd   : '.tmp/images',
                        dest  : '<%= yeoman.dist %>/images',
                        src   : ['generated/*']
                    }
                ]
            },
            scripts   : {
                expand: true,
                cwd   : '<%= yeoman.app %>',
                src   : ['scripts/{,*/}*.js'],
                dest  : '.tmp'
            },
            components: {
                expand: true,
                cwd   : '<%= yeoman.app %>',
                src   : [
                    'bower_components/**',
                    '!bower_components/**/*.html'
                ],
                dest  : '.tmp'
            },
            overrides : {
                expand: true,
                cwd   : '<%= yeoman.app %>',
                src   : [
                    'styles/overrides.css'
                ],
                dest  : '.tmp/styles'
            }
        },

        // TODO: Understand how this is used. Where is concat:generated ??
        concat: {
            scripts: {
                dest: '.tmp/scripts/scripts.js',
                src : [
                    '.tmp/scripts/scripts.js',
                    '.tmp/scripts/**/*.js',
                    '!.tmp/scripts/app.js',
                    '!.tmp/scripts/bower_components'
                ]
            }
        },

        // TODO: Remove ugly (usemin does uglyification & concatenation in generator-angular default gruntfile.
        uglify: {
            vendor : {
                files: {
                    '<%= yeoman.dist %>/scripts/vendor.js': ['.tmp/concat/scripts/vendor.js']
                }
            },
            scripts: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': ['.tmp/scripts/scripts.js']
                }
            }
        },

        replace: {
            dev : {
                options: {
                    patterns: [
                        {
                            json: grunt.file.readJSON('./config/env/dev.json')
                        }
                    ]
                },
                files  : {
                    '.tmp/scripts/services/config.js': ['./config/config.js']
                }
            },
            prod: {
                options: {
                    patterns: [
                        {
                            json: grunt.file.readJSON('./config/env/prod.json')
                        }
                    ]
                },
                files  : {
                    '.tmp/scripts/services/config.js': ['./config/config.js']
                }
            }
        },

        // Test settings
        karma  : {
            unit: {
                configFile: 'karma.conf.js',
                singleRun : true
            }
        },

        // TODO: Remove browserify
        browserify: {
            dist: {
                files: {
                    '.tmp/scripts/scripts.js': ['.tmp/scripts/app.js']
                }
            },
            test: {
                options: {
                    debug: true
                },
                files  : {
                    '.tmp/scripts/scripts.js': ['.tmp/scripts/app.js']
                }
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'newer:jshint',
            'clean:server',
            'replace:dev',
            'bowerInstall',
            'compass:server',
            'copy:scripts',
            'copy:overrides',
            'copy:components',
            'htmlmin',
            'browserify:test',
            'concat:scripts',
            'configureRewriteRules',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'replace:dev',
        'compass:server',
        'copy:scripts',
        'copy:components',
        'htmlmin',
        'browserify:test',
        'concat:scripts',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean',
        'replace:prod',
        'bowerInstall',
        'useminPrepare',
        'compass:dist',
        'imagemin',
        'svgmin',
        'concat:generated',
        'copy:scripts',
        'copy:overrides',
        'copy:components',
        'htmlmin',
        'ngmin',
        'browserify:dist',
        'concat:scripts',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);


    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
// TODO: Clean up Gruntfile task (remove this)
//    grunt.registerTask('default', [
//        'serve'
//    ]);
};
