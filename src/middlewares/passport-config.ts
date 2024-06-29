import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

const configurePassport = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET as string,
      },
      (jwtPayload, done) => {
        const user = { id: jwtPayload.userId };
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  );

  return passport;
};

export default configurePassport;
