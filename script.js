$(document).ready(function () {
  var titleArr = [];
  var genreArray = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "Tv Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  var pickGenre;
  var pickMovie;
  // pick one genre from 2 user selected genres
  // pickGenre will show 1 or 2 (1=user1 genre choice/ 2=user2 genre choice)
  function pickRandomGenre() {
    pickGenre = Math.floor(Math.random() * 2 + 1);
    // select 1 movie from 20 movie lists
    pickMovie = Math.floor(Math.random() * 19);
  }
  // selected genre1 value
  $("#genre1").change(function () {
    pickRandomGenre();
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
    console.log($(".poster"));
    event.preventDefault();
    console.log("user" + pickGenre + " selected");
    console.log(pickMovie + "th movie picked from 20 movie lists");
    console.log($(".display-movie").data("title"));
    var user1Select = $("#genre1").val();
    var user2Select = $("#genre2").val();
    var genre = $(".genre-type").data("genre");
    var title = $(".display-movie").data("title");
    var imgUrl = $(".display-poster").data("src");
    // if both user select genres, hide '.welcome' section and show movie title
    if (user1Select != "" && user2Select != "") {
      $("#show-movie").show();
      $(".genre-type").text(genre);
      $(".display-movie").text(title);
      $(".welcome").hide();
      // if user clicks submit button, poster img will show up
      var displayImg = $("<img>").attr("src", imgUrl).attr("alt", title);
      $(".display-poster").append(displayImg);
      titleArr.push(title);
      console.log(titleArr);
      localStorage.setItem("title", JSON.stringify(titleArr));
    }
  });
  titleArr = JSON.parse(localStorage.getItem("title"));
  $("#local-storage-btn").on("click", function () {
    if(titleArr.length>3){
      var tempArr = [];
      for(var i=titleArr.length-1; i>titleArr.length-4; i--){
        tempArr.push(titleArr[i]);
      }
      titleArr=[];
      titleArr = tempArr;
    }
    $("#logs").text(titleArr);
  });
  $("#clear-btn").on("click", function () {
    $("#logs").empty();
    titleArr = [];
    localStorage.setItem("title", JSON.stringify(titleArr));
  });
  // if user clicks GO BACK button, display the first input section
  $("#goBack").on("click", function () {
    pickRandomGenre();
    $(".genre-type").empty();
    $(".display-movie").empty();
    $(".display-poster").empty();
    $("#show-movie").hide();
    $(".welcome").show();
    $("#genre1").val("");
    $("#genre2").val("");
  });
  // Hard coded google places API

  //$("#next").on("click", function (event){
  // document.getElementById("show-movie").style.display = "none"
  // event.preventDefault();

  // googleUrl =
  // "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyAyLbfGbyq8CGTJn2b932bCsj_DIeN18go&libraries=places";
  //$.ajax({
  //url: googleUrl,
  // method: "GET",
  //}).then(function (response3) {
  //console.log(response3);
  //var input = document.getElementById('autocomplete');
  //var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});
  //google.maps.event.addListener(autocomplete, 'place-changed', function(){
  //var place = autocomplete.getPlace();
  // })

  //});
  // });
  function initMap() {
    document.getElementById("pac-card").style.display = "inline";
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo("bounds", map);

    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      var address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            "",
        ].join(" ");
      }
      infowindowContent.children["place-icon"].src = place.icon;
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);
    });

    function setupClickListener(id, types) {
      const radioButton = document.getElementById(id);
      radioButton.addEventListener("click", () => {
        autocomplete.setTypes(types);
      });
    }
    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    document
      .getElementById("use-strict-bounds")
      .addEventListener("click", function () {
        console.log("Checkbox clicked! New state=" + this.checked);
        autocomplete.setOptions({ strictBounds: this.checked });
      });
  }
  $("#next").on("click", function () {
    document.getElementById("show-movie").style.display = "none";
    initMap();
    console.log(initMap());
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
