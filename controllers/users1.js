const users = require('../db_apis/users.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await users.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;
function getUserFromRec(req) {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
   id: req.body.id
  };
 
  return user;
}
 
async function post(req, res, next) {
  try {
    let user = getUserFromRec(req);
 
    user = await users.create(user);
 
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
 
module.exports.post = post;
async function put(req, res, next) {
  try {
    let employee = getUserFromRec(req);
 
    user.id = parseInt(req.params.id, 10);
 
    user = await users.update(user);
 
    if (user !== null) {
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.put = put;
async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
 
    const success = await users.delete(id);
 
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.delete = del;
