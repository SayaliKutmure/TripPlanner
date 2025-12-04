/*const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../model/listing.js");
const {isLoggedIn} = require("../middleware.js");
const {  saveRedirectUrl, isOwner , validateListing } = require("../middleware");

const listingController = require("../controllers/listing.js");

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn, 
  validateListing , 
  wrapAsync(listingController.createListing));

// new routs
router.get("/new", isLoggedIn ,listingController.renderNewForm); 

router.route("/")  
.get(listingController.showListings)
.put( validateListing ,
      isLoggedIn , 
      isOwner , 
      wrapAsync ,
      listingController.updateListing)
.delete(isLoggedIn,isOwner , listingController.destroyListing);
          //EDIT ROUT
router.get("/:id/edit",  isLoggedIn ,isOwner , listingController.renderEditForm);
module.exports= router;*/


const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../model/listing.js"); 
const { isLoggedIn, saveRedirectUrl, isOwner, validateListing } = require("../middleware");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage })

//  INDEX & CREATE ROUTES 
router
  .route("/")
  .get(wrapAsync(listingController.index)) // INDEX Route (Show All Listings)
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
     validateListing,
    wrapAsync(listingController.createListing) // CREATE Route
  );
//NEW ROUTE - 
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SHOW, UPDATE, & DELETE ROUTES ( /:id )
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings)) 
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing) 
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing) 
  );

// ✏️ EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;
