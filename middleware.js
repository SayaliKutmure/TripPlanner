
const Listing = require("./model/listing");
const ExpressErr = require("./utils/ExpressErr.js");
const {listingSchema , reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.path, "..", req.originalUrl);

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listings!");
        return res.redirect("/login");
    }

    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listingData = await Listing.findById(id);

    if (!listingData.owner.equals(req.user._id)) {
        req.flash("error", "You are not a owner of the listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
module.exports.validateListing = (req ,res , next) =>{
    let {error} =listingSchema.validate(req.body);
    if(error){
        let errMsg =error.details.map((el) => el.message).join(",");
       // throw Deprecation.new(400 , errMsg);
       throw new ExpressErr(400, errMsg);
    }else{
        next();
    }
}
module.exports.validateReview=(req ,res , next) =>{
    let {error} =reviewSchema.validate(req.body);
    if(error){
        let errMsg =error.details.map((el) => el.message).join(",");
        throw new Deprecation.new(400 , errMsg);
    }else{
        next();
    }
}
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id , reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (review.author.owner.equals(req.user._id)) {
        req.flash("error", "You are not a author of this Review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

