/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie} = require('./api.js');

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

            movies.forEach(({title, rating, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                HTML += `<div class="card" style="width: 12rem;">
                            <img src="..." class="card-img-top" alt="...">
                            <div class="card-body">
                                 <p>${id}</p>
                                 <p>${title}</p>
                                 <p>${rating}</p>
                            </div>
                          </div>`
            });

            $('#movies-display').html(HTML);

        }).catch((error) => {
            console.log(error);
        });
    }

    //Initialize Page
    ( () => { renderLoading();
        displayMoviesFromJSON();
    })();




    function addMovieToJSON () {
        let movieTitleValue = $('#add-title').val();
        let ratingValue = $('#rate-movie').val();
        addMovie(
            {
                "title": movieTitleValue,
                "rating": ratingValue
            }
        ).then( response => {
         console.log(response);
         activateDisplay();
        })

    }

    function renderLoading () {
        $('#movies-display').html('<p id="loading" class="mt-5 text-center">Loading<span>.</span><span>.</span><span>.</span></p>')
    }




});


