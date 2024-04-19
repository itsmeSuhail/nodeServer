import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../dev.env";
const GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);



passport.serializeUser((user, done) => {

  done(null, user);
});

passport.deserializeUser((user, done) => {


  done(null, user);
});
//   ----------------------------------------------------
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: process.env.Auth_Failure_Link, }),
  async (req, res) => {
    const { user } = req;
    if (user) {
      try {
        const isuser = await User.findOne({ username: user.displayName });

        if (isuser) {
          if (!decrypt(isuser.password, user.id)) {
            res.redirect(process.env.Auth_Failure_Link);
          } else {
            res.redirect(process.env.Auth_Failure_Link)
          }
        }
        else {
          const newUser = await User.create({
            username: user.displayName,
            email: user["_json"]["email"],
            img: user["_json"]["picture"],
            password: encrypt(user["_json"]["email"])
          });
          const mailOptions = {
            from: `Hireme <spidy12k@gmail.com>`,
            to: user["_json"]["email"], // Recipient email address
            subject: 'Congratulations! here is your account details',
            html: `
                <p>username: <strong>${user.displayName}</strong>,</p>
                <p>pasword: <strong>${user["_json"]["email"]}</strong>,</p>
  
                <p>Congratulations! Now you  became a member of hireme</p>
                <p>Please don't share this details with anyone.</p>
              `,
          };
          const dres = await transporter.sendMail(mailOptions);

          if (dres) {
            const { password, ...data } = newUser._doc;
            const obj = {
              id: data._id,
              user: data.username,
              isSeller: data.isSeller
            }
            res.redirect(process.env.Auth_Failure_Link)
          }
        }

      } catch (error) {
        res.redirect(process.env.Auth_Failure_Link);

      }
    }
    else {
      res.redirect(process.env.Auth_Failure_Link);

    }
  }
);
