$(document).ready(function () {
  // pick one genre from 2 user selected genres
  // pickGenre will show 1 or 2 (1=user1 genre choice/ 2=user2 genre choice)
  var pickGenre = Math.floor(Math.random()*2 +1);
  // selected genre1 value
  $("#genre1").change(function () {
    var genreId1 = $(this).val();
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
      if(pickGenre==1){
        var user1Title = response1.results[0].title;
        $('.display-movie').data('title',user1Title);
      }
      console.log(response1);
    });
  });
  // movie API call for user select1 (20 movie list)
  $("#genre2").change(function () {
    var genreId2 = $(this).val();
    movieUrl =
      "https://api.themoviedb.org/3/discover/movie?with_genres=" +
      genreId2 +
      "&api_key=c1102486df029c0b4c5ea57290e906e6";
    $.ajax({
      url: movieUrl,
      method: "GET",
    }).then(function (response2) {
      // if pickGenre ==2, add selected movie title as a data attribute
      if(pickGenre==2){
        var user2Title =response2.results[0].title;
        $('.display-movie').data('title',user2Title);
      }
      console.log(response2);
    });
  });
  // if user clicks submit button, display movie title
  $('#submit').on('click',function(){
    console.log('user'+pickGenre+" selected");
    console.log($(".display-movie").data('title'));
    var title = $('.display-movie').data('title');
    $('.display-movie').text(title);
  })

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