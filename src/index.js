/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
/**
 * require style imports
 */
const {getMovies, addMovie, getOMBDData} = require('./api.js');

$(document).ready( () => {
    console.log("DOM IS READY!");

    $('#button-add').click( (e) => {
        e.preventDefault();
        renderLoading();
        addMovieToJSON();
    });

    function displayMoviesFromJSON() {
        getMovies().then((movies) => {
            console.log('Here are all the movies:');
            let HTML = ``;

            movies.forEach(({title, rating, poster, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                HTML += `<div class="card mt-6 bg-transparent" style="width: 11rem;">
<div class="dropdown">
  <span><i class="fas fa-ellipsis-h three-dots" ></i></span>
  <div class="dropdown-content">
  <p class="edit-title" data-id="${title}">Edit</p>
  <p>Delete</p>
  </div>
</div>
 <img src="${poster}" class="card-img-top" alt="..."><p class="pt-1"><span>${title}</span> <span>${rating}</span></p></div>`
            });
            $('#movies-display').html(HTML);
            editMovieForm();
        }).catch((error) => {
            console.log(error);
        });
    }

   // Initialize Page
    ( () => { renderLoading();
        displayMoviesFromJSON();
    })();

    function editMovieForm() {
        $('.edit-title').on('click', function (e) {
            e.preventDefault();
            let titleMovie = $(this).attr('data-id');
            console.log("DATA ID", titleMovie);
            $(this).parent().parent().next().next().html(`<input class="input-text bg-transparent border-0" type="text" value="${titleMovie}" autofocus>
                                       <select class="movie-rating mt-2">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select><button id="save-button" class="mt-2">Save</button>`)
        });
    }


    function addMovieToJSON () {
        let movieTitleValue = $('#add-title').val();
        let ratingValue = $('#rate-movie').val();
        getOMBDMovieDataFromAPI(movieTitleValue, ratingValue);
    }

    function renderLoading () {
        $('#movies-display').html('<p id="loading" class="mt-5 text-center">Loading<span>.</span><span>.</span><span>.</span></p>')
    }

    function getOMBDMovieDataFromAPI (movieTitleValue, ratingValue) {
        renderLoading();
        getOMBDData( movieTitleValue ).then( movieData => {
            console.log(movieData);
            let moviePoster = movieData.Search[0].Poster;
            console.log(moviePoster);
            addMovie( {
                title: movieTitleValue,
                rating: ratingValue,
                poster: movieData.Search[0].Poster
            }).then( result => {
                console.log(result)
                displayMoviesFromJSON();
            });
        }).catch( error => console.log(error) );
    }





});


