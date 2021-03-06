// connect.js
// ------------------------------------------------------------------
//
// Copyright 2017 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// created: Sat Apr 29 10:16:13 2017
// last saved: <2017-December-08 13:19:05>

var common = require('./common');

describe('Connect', function() {
  this.timeout(common.testTimeout);
  describe('connect-success', function() {
    it('should connect to an org', function(done) {
      var options = Object.assign({}, config);

      // var options = {
      //       mgmtServer: config.mgmtServer,
      //       org : config.org,
      //       user: config.user,
      //       password: config.password
      //     };

      apigeeEdge.connect(options, function(e, org){
        assert.isNull(e, JSON.stringify(e));
        //utility.logWrite(org.conn);
        assert.equal(org.conn.orgname, config.org);
        done();
      });
    });
  });

  describe('connect-fail', function() {
    it('should fail to connect to an org - wrong password', function(done) {
      //var options = Object.assign({}, config);
      var options = {
            mgmtServer: config.mgmtServer,
            org : config.org,
            user: "dchiesa@google.com",
            password: faker.random.alphaNumeric(12),
            no_token : true
          };

      apigeeEdge.connect(options, function(e, conn){
        assert.isNotNull(e, "the expected error did not occur");
        done(!e);
      });
    });

    it('should fail to connect to an org - unknown org', function(done) {
      var options = {
            mgmtServer: config.mgmtServer,
            org : faker.random.alphaNumeric(11),
            user: "dchiesa@google.com",
            password: faker.random.alphaNumeric(16),
            no_token : true
          };

      apigeeEdge.connect(options, function(e, conn){
        assert.isNotNull(e, "the expected error did not occur");
        done(!e);
      });
    });

    it('should fail to connect to an org - unknown user', function(done) {
      var options = {
            mgmtServer: config.mgmtServer,
            org : config.org,
            user: faker.random.alphaNumeric(11),
            password: faker.random.alphaNumeric(16)
          };

      apigeeEdge.connect(options, function(e, conn){
        assert.isNotNull(e, "the expected error did not occur");
        done(!e);
      });
    });

  });

});
