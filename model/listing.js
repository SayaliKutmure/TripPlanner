const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
 image: {
  filename: {
    type: String,
    default: "listingimage",
  },
  url: {
    type: String,
    default: "https://picsum.photos/500/300",
    set: (v) => (!v ? "https://picsum.photos/500/300" : v),
  },
},


  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref : "Review",
    }
  ],
  owner : {
      type : Schema.Types.ObjectId,
      ref: "User",
  },
  geometry: {
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number],
    default: [78.96288,  20.593684 ], // Default coords so map won't break
    required: true
  }
}

});


listingSchema.post("findOneAndDelete", async(listing) =>{
  if(listing){
    await Review.deleteMany({_id :{$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

 