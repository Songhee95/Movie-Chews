$(document).ready(function () {
  // selected genre1 value
  $('#genre1').change(function(){
    var genreId1 = $(this).val();
    console.log(genreId1);
  })
  // selected genre2 value
  $('#genre2').change(function(){
    var genreId2 = $(this).val();
    console.log(genreId2);
  })

  // movie API call (20 movie list)
  var genreId = 28;
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
