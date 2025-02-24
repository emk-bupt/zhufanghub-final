export function calcAndSortListings(listings) {
   const sortedListings = listings.map((listing) => {
     // Ensure reviews is an array; if not, default to empty array
     const reviews = listing.reviews || [];
     
     if (reviews.length === 0) {
       return { ...listing, avgRating: 0 };
     }
     
     const totalStars = reviews.reduce((sum, review) => {
       return sum + Number(review.stars);
     }, 0);
     
     const avgRating = totalStars / reviews.length;
     return { ...listing, avgRating: Number(avgRating.toFixed(2)) };
   })
   .sort((a, b) => b.avgRating - a.avgRating);
   
   return sortedListings;
 }
 