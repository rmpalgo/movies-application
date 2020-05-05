/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');
/**
 * require style imports
 */
const {getMovies, addMovie, getOMBDData, editMovie, deleteMovie} = require('./api.js');

$(document).ready( () => {
    console.log("DOM IS READY!");

    $('#button-add').click( (e) => {
        e.preventDefault();
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
                                <span>
                                <i class="fas fa-ellipsis-h three-dots"></i>
                                </span>
                                <div class="dropdown-content">
                                    <p class="edit-title" data-id="${title}/${id}">Edit</p>
                                    <p class="delete-button" data-id="${id}" >Delete</p>
                                </div>
                            </div>
                            <img src="${poster}" class="card-img-top" alt="...">
                            <p class="pt-1"><span>${title}</span> <span>${rating}</span></p>
                         </div>`
            });
            $('#movies-display').html(HTML);
            editMovieForm();
            deleteMovieFromJSON();

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
            let dataID = $(this).attr('data-id').split("/");
            let title = dataID[0];
            let uniqueID = dataID[1];
            console.log(uniqueID);

            console.log("DATA ID", title);
            $(this).parent().parent().next().next().html(`<input class="input-text bg-transparent border-0" type="text" value="${title}" autofocus>
                                       <select class="movie-rating mt-2">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select><button class="mt-2 save-button" data-id="${uniqueID}" id="${uniqueID}">Save</button>`)

            //activate click listener for save button
            $('.save-button').on('click', (e) => {
                e.preventDefault();
                console.log("CLICKED");
                let newTitle =  $(this).parents().eq(2).children().last().children().first().val();
                console.log(newTitle);
                let newRating = $(this).parents().eq(2).children().last().children().first().next().val();
                console.log(newRating);
                getOMBDAndEditMovie(newTitle, newRating, uniqueID);
            });
        });
    }

    function deleteMovieFromJSON () {
        $('.delete-button').on('click', function (e) {
            e.preventDefault();
            renderLoading();
            let dataID = $(this).attr('data-id');
            console.log(dataID);
            console.log('CLICKED DELETE BUTTON');
            deleteMovie(dataID).then( response => {
                console.log(response);
                displayMoviesFromJSON();
            });

        })
    }


    function addMovieToJSON () {
        let movieTitleValue = $('#add-title').val();
        let ratingValue = $('#rate-movie').val();
        getOMBDMovieDataFromAPI(movieTitleValue, ratingValue);
    }

    function getOMBDAndEditMovie (newTitle, newRating, uniqueID) {
        renderLoading();
        getOMBDData( newTitle ).then( movieData => {
            let newMoviePoster = movieData.Search[0].Poster;
            let newMovieObj = {
                title: newTitle,
                rating: newRating,
                poster: newMoviePoster
            }
            editMovie(newMovieObj, uniqueID).then( response => {
                 console.log(response);
                 displayMoviesFromJSON();
            })
                .catch( error => console.log(error) );
        });
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


