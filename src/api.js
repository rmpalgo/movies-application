const keys = require('./keys');
console.log(keys.OMBD_KEY);

module.exports = {

  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  addMovie: (movieObj) => {
    return fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(movieObj),
    })
        .then( response => response.json() )
        .catch( error => console.log(error));
  },
  editMovie: (movieObj, id) => {
    fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieObj),
    })
        .then( response => console.log(response) )
        .catch( error => console.log(error) );
  },

  getOMBDData: (addMovieTitle) => {
    return fetch(`http://www.omdbapi.com?s=${addMovieTitle}&apikey=${keys.OMBD_KEY}`)
        .then( response => response.json() );
  }
};
