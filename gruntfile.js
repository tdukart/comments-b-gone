module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-bookmarklet-thingy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    uglify: {
      generate: {
        files: [
          {
            dest: 'build',
            src: ['**/*.js', '**/*.json', '!lib/**/*'],
            cwd: 'src',
            expand: true,
            filter: 'isFile'
          }
        ]
      }
    },
    bookmarklet: {
      generate: {
        body: 'build/hideComments.js',
        out: 'build/bookmarklet.txt',
        timestamp: true
      }
    },
    html: {
      generate: {
        files: [
          {
            dest: 'dist',
            src: ['**/*.html'],
            cwd: 'src',
            expand: true,
            filter: 'isFile'
          }
        ]
      }
    }
  });

  grunt.registerMultiTask('html', "Generate HTML file", function () {
    var options = this.options(),
      fs = require('fs'),
      cheerio = require('cheerio'),
      bookmarklet = fs.readFileSync('build/bookmarklet.txt').toString();

    this.files.forEach(function (file) {
      var src = file.src[0];

      if (!src) {
        return;
      }

      var $ = cheerio.load(grunt.file.read(src));

      $('.bookmarklet a').attr('href', bookmarklet);

      var result = $.html();

      grunt.file.write(file.dest, result);
      grunt.verbose.writeln('Wrote ' + file.dest);
    });
  });

  grunt.registerTask('default', ['uglify','bookmarklet','html']);

};