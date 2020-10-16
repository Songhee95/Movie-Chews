$(document).ready(function () {
  // genres id object
  var genreArray = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 90,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    science_fiction: 878,
    tv_movie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
  };
  var genreId = 28;
  // movie API call (20 movie list)
  movieUrl =
    "https://api.themoviedb.org/3/discover/movie?with_genres=" +
    genreId +
    "&api_key=c1102486df029c0b4c5ea57290e906e6";
  $.ajax({
    url: movieUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

//1. When a user comes to site they will click on a genre from one of the genre inputs.
//2. A second user will also choose a genre.
//3. Any user will be able to press submit.
//4. Both users will view random genres populate on there screen as the website chooses the genre
//     of the winner which will be displayed on the screen.
//5. Any one of the users or both can enter their zipcode in the zipcode input.
//6. the genres will then disappear and then a list of stores with snacks will appear on screen
//    for the users that will go with their movie.
