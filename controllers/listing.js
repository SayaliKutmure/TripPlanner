const listing = require("../model/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken =process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req ,res) => {
  const allListings= await listing.find({});
  res.render("listings/index.ejs", {allListings});
};
module.exports.renderNewForm =  (req, res) => {
    res.render("new.ejs")
 };

 module.exports.showListings = async (req, res) => {
     let { id } = req.params;
     const flisting = await listing.findById(id)
         .populate({
             path: "reviews" ,
             populate: {
             path:"author",
         },
     })
         .populate("owner");
     if (!flisting) {
         req.flash("error", "Listing you requested does not exist!");
         return res.redirect("/listings"); // return to stop execution
     }
     console.log(flisting);
     res.render("listings/show.ejs", { listing: flisting });
 };

 module.exports.createListing = async(req, res , next) => {
  let response = await  geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send()
  
  
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image = {url , filename};
    newListing.geometry = response.body.features[0].geometry;
   let saveListing =  await newListing.save();
   console.log(saveListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
 };

 module.exports.renderEditForm = async (req, res) => {
     let { id } = req.params;
     const flisting = await listing.findById(id);
     if(!flisting) {
        req.flash("error","Listing you requested does not exist!" );
     }
     let originalImageurl = flisting.image.url;
     originalImageurl = originalImageurl.replace("/upload","/upload/h_20 ,w_250");;
    // res.render("listings/edit.ejs", {  flisting , originalImageurl });
    res.render("listings/edit.ejs", { listing: flisting, originalImageurl });
 };

 module.exports.updateListing = (async(req,res) => {
      let { id } = req.params;
      let newlisting =  await listing.findByIdAndUpdate(id , { ...req.body.listing });
     
      if(typeof req.file != "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      newlisting.image =  {url , filename};
      await newlisting.save();
      }
      req.flash("success", " Listing Updated!"); 
      res.redirect(`/listings/${id}`); 
 });
 module.exports.destroyListing = async(req,res) => {
     let { id } = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", " Listing Deleted!!");
     res.redirect("/listings"); 
 };
 