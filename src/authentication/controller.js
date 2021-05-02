import { Router } from 'express';
import passport from 'passport';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import otp from 'otplib';

// import { SECRET_KEY } from '~/env';

// import { UserColl } from './model';
// import service from './service';

const controller = (() => {
  const router = Router();

  /**
   * @name profile - User profile
   *
   * @example GET /authentication/profile Header { Authorization: `Bearer ${token}` }
   */
  router.get('/profile', async (req, res) => {
    const { user } = req;

    res.status(200).json({ data: user });
  });

  /**
   * Social Login
   */

  /**
   * URL /authentication/facebook/login
   * @example <a href="<HOST_NAME>/authentication/facebook/login">
   */
  router.get('/google/login', (req, res, next) => {
    // set data in session
    // req.session
    passport.authenticate('google')(req, res, next);
  });

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:3000/login',
    }),
    (req, res) => {
      if (req.user && req.user.permissions.length === 0) {
        res.redirect('http://localhost:3000/settings');
      }
      res.redirect('http://localhost:3000/main');
    },
  );

  /**
   * @name google-auth
   * @return {Object<{ user: Object }>}
   *
   * @example POST /authentication/google/token { access_token: ${accessToken} }
   */
  router.post('/google/token', passport.authenticate('google-token'), (req, res) => {
    res.json({ user: req.user });
  });

  return router;
})();

controller.prefix = '/authentication';

export default controller;
