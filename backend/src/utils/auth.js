const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const config = require("./const")

// Setup work and export for the JWT passport strategy
function auth() {
  // console.log("entered auth");
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret,
  };
  // console.log(opts);
  passport.use(
    new JwtStrategy(opts, (payload, callback) => {
      // console.log("entered auth");
      // console.log(payload);
      callback(null, payload);
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", {
  session: false,
});
