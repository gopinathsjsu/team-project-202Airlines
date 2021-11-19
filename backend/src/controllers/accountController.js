const conn = require("../utils/dbConnector");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getLogin = (req, res) => {
  console.log("Get Login");
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
    console.log(res);
  } else {
    res.send({ loggedIn: false });
  }
};
const signin = (req, res) => {
  console.log("Entered");
  const emailid = req.body.emailid;
  const password = req.body.password;

  if (req.session.user) {
    res.send({ message: "already logged in" });
  } else {
    conn.query(
      "SELECT * FROM Customer WHERE emailid = ?;",
      emailid,
      (err, result) => {
        if (err) return;
        else if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              setSession(req, res, emailid, result[0].customer_id);
              // res.cookie("cookie", JSON.stringify(result[0].customer_id), {
              //   maxAge: 2 * 60 * 60 * 1000,
              //   httpOnly: false,
              // });
              // res.writeHead(200, {
              //   "Content-Type": "text/plain",
              // });
              console.log("successfully logged in", result);
              // console.log("successfully logged in", res);
              // res.end(JSON.stringify(result));
            } else {
              res.writeHead(401, {
                "Content-Type": "text/plain",
              });
              res.end("UnSuccessful Login");
            }
          });
        } else {
          res.status(404).send({ err: "User doesn't exist" });
        }
      }
    );
  }
};

const setSession = (req, res, email_id, customer_id, membership_type) => {
  req.session.user = {
    email_id: email_id,
    customer_id: customer_id,
  };
  res.send({
    email_id: email_id,
    customer_id: customer_id,
  });
};

const registerUser = (req, res) => {
  console.log("register");

  const {
    customer_first_name,
    customer_last_name,
    address,
    city,
    state,
    zip_code,
    passportid,
    gender,
    password,
    emailid,
    role,
    sec_ques,
    sec_ans,
  } = req.body;
  // Hash password before store in db
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return;
    } else {
      if (err) {
        return;
      }
      var sql =
        "INSERT INTO Customer (  customer_first_name, customer_last_name, address,city,state,zip_code,passportid,gender, password,emailid,role,sec_ques,sec_ans) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
      conn.query(
        sql,
        [
          customer_first_name,
          customer_last_name,
          address,
          city,
          state,
          zip_code,
          passportid,
          gender,
          hash,
          emailid,
          role,
          sec_ques,
          sec_ans,
        ],
        (err, result) => {
          if (err) throw err;
          console.log(result);
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(JSON.stringify(result));
        }
      );
    }
  });
};

const signout = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    req.session = null;
    res.send("hello");
  }
};

module.exports = { signin, registerUser, signout, getLogin };
