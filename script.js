$(document).ready(function () {
  var genreArray = {
    28:"Action",
    12:"Adventure",
    16:"Animation",
    35:"Comedy",
    80:"Crime",
    99:"Documentary",
    18:"Drama",
    10751:"Family",
    14:"Fantasy",
    36:"History",
    27:"Horror",
    10402:"Music",
    9648:"Mystery",
    10749:"Romance",
    878:"Science Fiction",
    10770:"Tv Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  }
  // pick one genre from 2 user selected genres
  // pickGenre will show 1 or 2 (1=user1 genre choice/ 2=user2 genre choice)
  var pickGenre = Math.floor(Math.random() * 2 + 1);
  // select 1 movie from 20 movie lists
  var pickMovie = Math.floor(Math.random() * 19);

  // selected genre1 value
  $("#genre1").change(function () {
    var genreId1 = $(this).val();
    var chosenGenre1 = genreArray[genreId1];
    // movie API call for user select1 (20 movie list)
    movieUrl =
      "https://api.themoviedb.org/3/discover/movie?with_genres=" +
      genreId1 +
      "&api_key=c1102486df029c0b4c5ea57290e906e6";
    $.ajax({
      url: movieUrl,
      method: "GET",
    }).then(function (response1) {
      // if pickGenre == 1, add selected movie title as a data attribute;
      if (pickGenre == 1) {
        var user1Title = response1.results[pickMovie].title;
        var user1Poster = response1.results[pickMovie].poster_path;
        $(".display-movie").data("title", user1Title);
        $(".display-poster").data(
          "src",
          "http://image.tmdb.org/t/p/w185/" + user1Poster
        );
        $(".genre-type").data("genre", chosenGenre1);
      }
      console.log(response1);
    });
  });
  // movie API call for user select1 (20 movie list)
  $("#genre2").change(function () {
    var genreId2 = $(this).val();
    var chosenGenre2 = genreArray[genreId2];
    movieUrl =
      "https://api.themoviedb.org/3/discover/movie?with_genres=" +
      genreId2 +
      "&api_key=c1102486df029c0b4c5ea57290e906e6";
    $.ajax({
      url: movieUrl,
      method: "GET",
    }).then(function (response2) {
      // if pickGenre ==2, add selected movie title as a data attribute
      if (pickGenre == 2) {
        var user2Title = response2.results[pickMovie].title;
        var user2Poster = response2.results[pickMovie].poster_path;
        $(".display-movie").data("title", user2Title);
        $(".display-poster").data(
          "src",
          "http://image.tmdb.org/t/p/w185/" + user2Poster
        );
        $(".genre-type").data("genre", chosenGenre2);
      }
      console.log(response2);
    });
  });
  // if user clicks submit button, display movie title
  $("#submit").on("click", function (event) {
    $("#show-movie").show();
    console.log($(".poster"));
    event.preventDefault();
    console.log("user" + pickGenre + " selected");
    console.log(pickMovie + "th movie picked from 20 movie lists");
    console.log($(".display-movie").data("title"));
    var user1Select = $("#genre1").val();
    var user2Select = $("#genre2").val();
    var genre = $(".genre-type").data('genre');
    var title = $(".display-movie").data("title");
    var imgUrl = $(".display-poster").data("src");
    // if both user select genres, hide '.welcome' section and show movie title
    if (user1Select != "" && user2Select != "") {
      $(".genre-type").text(genre);
      $(".display-movie").text(title);
      $(".welcome").empty();
      // if user clicks submit button, poster img will show up
      var displayImg = $("<img>").attr("src", imgUrl).attr("alt", title);
      $(".display-poster").append(displayImg);
    }
  });
  // Hard coded google places API
  $("#next").on("click", function (event){
    event.preventDefault();
    googleUrl =
  "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0045056,-80.9795584&radius=1500&type=restaurant&keyword=bar&key=AIzaSyAyLbfGbyq8CGTJn2b932bCsj_DIeN18go";
$.ajax({
  url: googleUrl,
  method: "GET",
}).then(function (response3) {
  console.log(response3);
});
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

//1. When a user picks a movie, then they enter their zipcode to find local snacks.
//2. When the user initiates the yelp api call, local businesses are retrieved related to said snack.
//3. When the API call is initiated, divs appear containing the store information.
//4. When the store information shows, then the user gets a picture, description, and proximity.

var workingCallback = (position) => {
  console.log(position);
};

var errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(workingCallback, errorCallback, {
  enableHighAccuracy: true,
  timeout: 5000,
});


