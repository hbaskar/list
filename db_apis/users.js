const oracledb = require('oracledb');
const database = require('../services/database.js');
 
const baseQuery = 
 `select id "id",
    firstname "firstname",
    lastname "lastname",
    email "email",
    password "password",
    username "username"
  from list_user`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.id = context.id;
 
    query += `\nwhere id = :id`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;

const createSql =
 `insert into list_user (
    firstname,
    lastname,
    email,
    username,
    password
  ) values (
    :firstname,
    :lastname,
    :email,
    :username,
    :password
  ) returning id
  into :id`;
 
async function create(usr) {
  const user = Object.assign({}, usr);
 
  user.user_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
 
  const result = await database.simpleExecute(createSql, user);
 
  user.id = result.outBinds.id[0];
 
  return user;
}
 
module.exports.create = create;
const updateSql =
 `update list_user
  set firstname = :firstname,
    lastname = :lastname,
    email = :email,
    username = :username,
    password = :password
  where id = :id`;
 
async function update(usr) {
  const user = Object.assign({}, usr);
  const result = await database.simpleExecute(updateSql, user);
if (result.rowsAffected && result.rowsAffected === 1) { 
    return user;
  } else {
    return null;
  }
}
 
module.exports.update = update;
const deleteSql =
 `begin
 
    delete from list_user
    where id = :id;
 
 
    :rowcount := sql%rowcount;
 
  end;`
 
async function del(id) {
  const binds = {
    id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);
 
  return result.outBinds.rowcount === 1;
}
 
module.exports.delete = del;
