const User = require("../model/user.js");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
}
/*module.exports.signup = async (req, res, next) => { 
    try {
        let { username, email, password } = req.body; 
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password); // Corrected arguments
         console.log(registerUser); // Log the registered user
         req.login(registerUser , (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect(req.session.redirectUrl); 
         })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup"); 
  }};*/
  module.exports.signup = async (req, res, next) => { 
    try {
        let { username, email, password } = req.body; 
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        
        req.login(registerUser , (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            
            // ✅ FIX: Define a safe redirect URL with a fallback
            let redirectUrl = req.session.redirectUrl || "/listings"; 
            
            // Optionally, clear the session variable after use
            delete req.session.redirectUrl; 

            // Redirect to the safe URL
            res.redirect(redirectUrl); 
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup"); 
    }
};

module.exports.renderLoginForm = (req ,res) =>{
    res.render("users/login.ejs");
}  
module.exports.login = async(req,res) =>{
       req.flash("success","Welcome to back WanderLust!");
       let redirectUrl = res.locals.redirectUrl || "/listings"; // Use a default if none is set
       res.redirect(redirectUrl); 
}
module.exports.logout =(req ,res , next) =>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logout !");
        res.redirect("/listings");
    })};