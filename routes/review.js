const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const { reviewSchema} = require("../schema.js");
const listing = require("../model/listing.js");
const Review = require("../model/review.js");
const {validateReview , isLoggedIn , isReviewAuthor} =require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//reviews // post routs
router.post("/",isLoggedIn, validateReview , wrapAsync(reviewController.createReview));

//Delete review rout
router.delete("/:reviewId",isLoggedIn , isReviewAuthor , wrapAsync(reviewController.destroyReview));

module.exports= router;