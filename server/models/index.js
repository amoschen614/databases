var Sequelize = require('sequelize');
var db = new Sequelize('chatdb', 'root', 'plantlife');

var User = db.define('User', {
  uid: { type: Sequelize.INTEGER, primaryKey: true },
  name: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

var Message = db.define('Message', {
  msgId: { type: Sequelize.INTEGER, primaryKey: true }, 
  userid: {type: Sequelize.INTEGER, references: {model: User, key: 'uid'}},
  content: Sequelize.STRING,
  //roomname: Sequelize.STRING
  roomid: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

User.hasMany(Message, {foreignKey: 'userid'});
Message.belongsTo(User, {foreignKey: 'userid'});
module.exports = {
  messages: {
    get: function () {
      return new Promise( (resolve, reject) => {
        Message.sync()
          .then(function(value) {
            let msgs = Message.findAll({ attributes: ['content'], include: [{ model: User, attributes: ['name'] }]});
            msgs.then((value) => {
              msgs = value.map((instance) => {
                return { name: instance.dataValues.User.name, content: instance.dataValues['content'] };
              });
              resolve(JSON.stringify(msgs));
            });
            
          });
      });
    } //add comma later
  /*  // Uncomment after refactoring to Sequelize
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
    } */
  } //add comma later
// Uncomment after refactoring to Sequelize
/*
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
  } */
};


