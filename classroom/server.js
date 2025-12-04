const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOption ={
        secret:"mysupersecretstring",
        resave :false ,
        saveUninitialized:true
    }

app.use(session(sessionOption));
app.use(flash())

app.get("/register",(req ,res)=>{
    let{ name = "anonous" } =req.query;
    req.session.name = name;
    if(name ==="anonous"){
        req.flash("error", "user not ragister");
    }else{
        req.flash("succes","user ragistered succesfully");
    }
    
    res.redirect("/hello");

});
app.get("/hello" ,(req ,res) =>{
   res.locals.succes = req.flash("succefully");
   res.locals.error = req.flash('error');
    res.render("page.ejs",{name: req.session.name  });
});

/*app.get("/reqcount",(req, res) => {
    if( req.session.count >1 ){
         req.session.count++;
    }else{
         req.session.count =1;
    }
    
    res.send(`you send a request ${req.session.count} times`);
})

app.get("/test",(req, res) => {
    res.send("test succesfully");
})*/










/*app.use(cookieParser("secretcode"));

app.get("/getsignedcookie" , (req ,res) =>{
    res.cookie("Made-in","india",{signed :true});
    res.send("signed cookie sent");
});

app.get("/verify" , (req ,res) =>{
    console.log(req.cookies);
    res.send("verified");
})

app.get("/getcookies",(req ,res) =>{
    res.cookie("greet","hello");
    res.cookie("madeIn","india");
    res.send("sent your some cookies");
})
app.get("/",(req ,res) =>{
    let {name ="anonyous"} =req.cookies;
    res.send(`Hi , ${name}`);
})

app.get("/", (req ,res) => {
    console.dir(req.cookies);
    res.send("hii , i amr root");
})
app.use("/users", users);
app.use("/posts", posts);*/

app.listen(3000, () =>{
    console.log("hi , i am listning 3000");
});
