const express = require("express");
const passport = require("passport");
const router = express.Router();

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.redirect("/login")
}


router.get("/", (req, res) => {
    res.send('<a href="/login/auth/google">Authnticate with Google</a>')
})

// what authentication we want to use and what scope do we want to retrieve (both email and profile)
router.get("/auth/google", 
    passport.authenticate('google', {scope: ['email', 'profile']}))

router.get("/google/callback", 
    passport.authenticate("google",{
        successRedirect: "/login/protected",
        failureRedirect: "/login/failure"
    }))

router.get("/failure", (req, res) => {
    res.send("Something went wrong...."); 
})

router.get("/protected", isLoggedIn,  async (req, res) => {
    const session = req.store.openSession();
    try{
        let user = await session.query({ collection: 'Users' })
            .whereEquals('userId', req.user.id)
            .singleOrNull();

        if (!user) {
            user = {
              displayName: req.user.displayName,
              email: req.user.email,
              collection: 'Users'
            };
            await session.store(user, req.user.id);
            await session.saveChanges();
        }

    }catch(error){
        console.log(error);
    }
    res.send(`Hello ${req.user.displayName}`);
})

router.get("/logout", (req, res) => {
    // logout requires a callback
    // we can pass an empty callback if we have nothing to do after
    // logout 
    req.logout(()=>{});
    req.session.destroy();
    res.send("Goodbye!"); 
})
 

module.exports = router;