const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user.model');

// Konfigurasi Passport - Strategi Lokal
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findUnique({ where: { username: username } });

        if (!user) {
          console.log('user not found ');
          return done(null, false, {
            message: 'Invalid username',
          });
        }

        console.log('username: ' + user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log('match: ' + isMatch);
          return done(null, user);
        } else {
          console.log('password mismatch');
          return done(null, false, { message: 'Incorrect password.' });
        }
      } catch (err) {
        console.log('error saat autentikasi: ' + err);
        return done(err);
      }
    }
  )
);

// Serialisasi dan Deserialisasi User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findUnique({ where: { id: id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
