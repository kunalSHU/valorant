// This file is run before all other files when running Mocha tests

before(() => {
  //Allow should to be used by all tests
  global.should = require('chai').should();
});
