var http = require('http'),
    should = require('should'),
    sysInfo = require('../lib/sysinfo.js'),
    keyProcessor = require('../lib/keyprocessor.js'),
    hock = require('hock');

describe('node-env/sdk/environment', function (done) {
  var context = {};

  before(function (done) {
    done();
  }),

  it("Can list system environment variables", function () {
    var env = sysInfo.sysInfo();
    should.exist(env);
    env.length.should.be.equal(5);
  });

  it("Key processor leaves values unchanged", function () {
    var result = keyProcessor.procKey('Name', 'VALUE');
    result.should.be.equal('VALUE');
  });

  it("Key processor replaces \\r with an empty space", function () {
    var result = keyProcessor.procKey('Name', 'VALUE\r');
    result.should.be.equal('VALUE');
  });

  it("Key processor replaces \\n with a <br/> tag", function () {
    var result = keyProcessor.procKey('Name', 'VALUE\n');
    result.should.be.equal('VALUE<br/>');
  });

  it("Key processor generates a <span> tag for the path variable", function () {
    var result = keyProcessor.procKey('path', 'VALUE');
    result.should.not.be.equal('VALUE');
  });

  it("Key processor generates a <span> tag for the path variable", function () {
    var result = keyProcessor.procKey('vmc_app_instance', '{"app_name" : "VALUE"}');
    result.should.not.be.equal('VALUE');
  });
});
