const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const AppError = require("./utils/AppError");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  })
  .promise();

exports.correctPassword = async (pass, origPass) =>
  await bcrypt.compare(pass, origPass);

exports.generateMailOtp = async (roll, otp) =>
  await pool.query("UPDATE user SET otp=? WHERE roll=?", [otp, roll]);

exports.setResetToken = async (passwordResetToken, expiresIn, id) => {
  if (passwordResetToken == 0) {
    passwordResetToken = null;
    expiresIn = null;
  }
  await pool.query("UPDATE user SET password_reset_token=?, reset_token_expires_in=? WHERE roll=?", [passwordResetToken, expiresIn, id]);
}

exports.findUserWithPasswordToken = async (passwordResetToken) => {
  const [rows] = await pool.query("SELECT roll FROM user WHERE password_reset_token=? AND reset_token_expires_in > ROUND(UNIX_TIMESTAMP(CURTIME(4)))", [passwordResetToken]);
  return rows[0];
}

exports.resetDbPassword = async (id, password) => {
  const hash_pass = await bcrypt.hash(password, 12);
  const [rows] = await pool.query("UPDATE user SET password=?, password_reset_token=NULL, reset_token_expires_in=NULL WHERE roll=?", [hash_pass, id]);
  return rows.affectedRows;
}

exports.changedPasswordAfter = function(userTime, jwtTime) {
  if (userTime === undefined) return false;

  const pwdTime = new Date(userTime);
  const iatTime = new Date(jwtTime * 1000);
  return pwdTime > iatTime;
};

exports.listUsers = async () => {
  const [rows] = await pool.query("SELECT first_name, last_name, roll, email, phone, address FROM user");
  return rows;
};

exports.listUser = async (id) => {
  const [rows] = await pool.query("SELECT first_name, last_name, roll, email, phone, address, is_validated FROM user WHERE roll=?", [id]);
  return rows[0];
};

exports.listCompleteUser = async (id) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE roll=?", [id]);
  return rows[0];
};

exports.createUser = async (
  first_name,
  last_name,
  roll,
  email,
  phone,
  address,
  password,
  otp
) => {
  const hash_pass = await bcrypt.hash(password, 12);
  first_name = first_name.toLowerCase();
  last_name = last_name.toLowerCase();
  address = address.toLowerCase();
  roll = roll.toLowerCase();


  await pool.query("INSERT INTO user VALUES(?, ?, ?, ?, ?, ?, ?, ?, 'user', null, null, null, false)", [
    first_name,
    last_name,
    roll,
    otp,
    email,
    phone,
    address,
    hash_pass,
  ]);
  return this.listUser(roll);
};

exports.removeUser = async (id) => {
  const res = await pool.query(`DELETE FROM user WHERE roll=?`, [id]);
  return res[0].affectedRows;
};


exports.modifyUser = async (id, email, phone, address, is_validated) => {
  address = address.toLowerCase();
  await pool.query("UPDATE user SET email=?, phone=?, address=?, is_validated=? WHERE roll=?", [email, phone, address, is_validated, id]);
  return this.listUser(id);
};

exports.validateUser = async (id, otp) => {
  let [rows] = await pool.query('SELECT otp FROM user WHERE roll=?', [id]);
  console.log(rows[0].otp);
  if (otp !== rows[0].otp)
    return new AppError("Invalid otp submitted");
  [rows] = await pool.query('UPDATE user SET is_validated=true WHERE roll=?', [id]);
  return rows;
}

exports.modifyPassword = async (id, password) => {
  const hash_pass = await bcrypt.hash(password, 12);
  await pool.query("UPDATE user SET password = ?, password_changed_at = CURRENT_TIMESTAMP() WHERE roll = ?", [hash_pass, id]);
  const user = await this.listUser(id);
  return user;
}

exports.makeFavourite = async (user_id, product_id) => {
  const res = await pool.query("INSERT INTO favourites VALUES(?, ?)", [user_id, product_id]);
  return res[0].affectedRows;
}

exports.deleteFavourite = async (user_id, product_id) => {
  const res = await pool.query("DELETE FROM favourites WHERE user_id = ? AND product_id = ?", [user_id, product_id]);
  return res[0].affectedRows;
}

exports.listFavourites = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM favourites WHERE user_id = ?", [user_id]);
  return rows;
}
