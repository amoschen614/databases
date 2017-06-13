var db = require('../db');

var connection = db.dbConnection;
connection.connect();

module.exports = {
  messages: {
    get: function () {
      console.log('CONTROLLER!!');
      connection.query('select * from messages', (err, results) => {
        console.log(results);
      });
    }, // a function which produces all the messages
    post: function (messageObj) {
      console.log('inside models/post: messageObj==', messageObj);
      // get uid, roomid
      let uid = module.exports.getUserId(messageObj.username);
      let roomid = module.exports.getRoomId(messageObj.roomname);
      let message = {userId: uid, roomid: roomid, content: messageObj.message};
      console.log('MESSAGE to PERSIST:', message);
      connection.query('INSERT INTO messages SET ?', message, (err, results) => {
        console.log(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log('inside model:users:get ');
      connection.query('select * from users', (err, results) => {
        console.log(results);
      });
    },
    post: function (username) {
      console.log('inside models:users:post ', username);
      //connection.query('INSERT INTO users(name) VALUES(' + username + ')', (err, results) => {
        //console.log(results);
      let user = {name: username};
      connection.query('INSERT INTO users SET ?', user, (err, results) => {
        console.log(results);
      });
    }
  },

  getUserId: function(username) {
    connection.query('select uid from users where name=?', username, (err, results) => {
      console.log('USERID=', results);
    }); 
  },

  getRoomId: function(roomname) {
    connection.query('select id from rooms where name=?', roomname, (err, results) => {
      console.log('ROOM ID=', results);

    }); 
  }

};

