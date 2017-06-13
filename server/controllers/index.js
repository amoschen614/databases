var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('CONTROLLER GET', models.messages.get());
      let getMsg = models.messages.get(res);
      getMsg.then((value) => {
        res.statusCode = 200;
        res.end(value);
      });
      getMsg.catch((err) => {
        throw err;
      });
      
    }, 
    post: function (req, res) {
      let messageObj = req.body;
      let insertMsg = models.messages.post(messageObj);
      getMsg.then((value) => {
        res.statusCode = 201;
        res.end();
      }); 
    }
  },

  users: {
    get: function (req, res) {
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

