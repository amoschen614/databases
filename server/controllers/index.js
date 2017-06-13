var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('CONTROLLER GET', models.messages.get());
      res.statusCode = 200;
      res.end(JSON.stringify(models.messages.get()));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST messages, ', req.body);
      let messageObj = req.body;
      models.messages.post(messageObj);
      res.statusCode = 201;
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('CONTROLLER GET');
      res.statusCode = 200;
      res.end(models.users.get());
    },
    post: function (req, res) {
      models.users.post(req.body.username);
      res.statusCode = 201;
      res.end();
    }
  }
};

