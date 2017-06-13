var db = require('../db');

var connection = db.dbConnection;
connection.connect();

module.exports = {
  messages: {
    get: function (res) {
      return new Promise( (resolve, reject) => {
        connection.query('select * from messages', (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.stringify(results));
          }
        });
      });
    }, 
    post: function (messageObj) {
      return new Promise( (resolve, reject) => { 
        // get uid, roomid
        let message, userid, roomid;

        let dbUserId, dbRoomId;
        dbUserId = module.exports.getUserId(messageObj.username)
          .then((value) => {
            userid = JSON.parse(JSON.stringify(value[0])).uid;
            dbRoomId = module.exports.getRoomId(messageObj.roomname)
              .then((value) => {
                roomid = JSON.parse(JSON.stringify(value[0])).id;
                if (!(userid && roomid)) {
                  console.log('ERROR in MESSAGE POST');
                }
                message = {userid: userid, roomid: roomid, content: messageObj.message};
                let queryString = 'INSERT INTO messages(userid,roomid,content) values(' 
                  + userid + ',' + roomid + ',"' + messageObj.message + '");';
                connection.query(queryString, (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  } 
                });
              });
          });
      });
    }
  },

  users: {
    get: function () {
      connection.query('select * from users', (err, results) => {
      });
    },
    post: function (username) {
      let user = {name: username};
      connection.query('INSERT INTO users SET ?', user, (err, results) => {
      });
    }
  },

  getUserId: function(username) {
    return new Promise( (resolve, reject) => {
      connection.query('select uid from users where name=?', username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    }); 
  },

  getRoomId: function(roomname) {
    return new Promise((resolve, reject) => {
      connection.query('select id from rooms where name=?', roomname, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    }); 
  }
};


