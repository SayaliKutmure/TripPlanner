
const { model } = require("mongoose");
const listing = require("../model/review.js");
const Review = require("../model/review.js");

module.exports.createReview = async(req ,res) => {
  console.log(req.params.id);
   let foundListing = await listing.findById(req.params.id);
   let newReview = new Review(req.body.review);
   newReview.author = req.user._id;
  
    foundListing.reviews.push(newReview);
      await newReview.save();
      await foundListing.save();
      req.flash("success", "New Review Created");
    res.redirect(`/listings/${foundListing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "New Review Deleted!!");
  res.redirect(`/listings/${id}`);
};

