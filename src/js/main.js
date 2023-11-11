import {getAllMovies, getFavouriteMovies, setAllMovies} from "./localStorage/setGetLocalStorage.js";
import {ALL_MOVIES, FAVOURITE_MOVIES} from "./constants/movies.js";
import {createMovieCard} from "./movieCard/createMovieCard.js";
import {changeUI, getNewListID, handleSaveToFavourites, handleUIIfListEmpty} from './movieList/actions.js'


const btnSwitchLists = document.querySelector('.movies-container-switch-list');
btnSwitchLists.addEventListener('click', (event)=> {
    // get new list id
    const newListID = getNewListID(event);
    // changeUI
    changeUI(event, newListID);
    // render container
    const movieContainer = createMovieContainer(newListID);
    // attach container
    attachContainer(movieContainer, event.target);
})
// set all movies
setAllMovies();

// create Movie container
const movieContainer = createMovieContainer();
// attach container to target element
attachContainer(movieContainer, btnSwitchLists);

function createMovieContainer(movieListID = FAVOURITE_MOVIES) {
    let moviesList;

    switch (movieListID) {
        case FAVOURITE_MOVIES: {
            moviesList = getFavouriteMovies();
            break;
        }
        case ALL_MOVIES: {
            moviesList = getAllMovies();
            break;
        }
        default: {
            return;
        }
    }



    const movieContainer = document.createElement('div');
    movieContainer.id = movieListID;
    movieContainer.className = 'movies-container-cards';

    if (!moviesList.length) {
        const textContent = `<h1>Sorry you have not saved anything to favourites</h1>`;
        handleUIIfListEmpty(movieContainer, textContent);

        return movieContainer;
    }

    moviesList.forEach(movie => {
        const movieCard = createMovieCard(movie);

        movieContainer.insertAdjacentHTML(
            'afterbegin',
            movieCard
        );
    });

    movieContainer.addEventListener('click', (event) => {
        handleSaveToFavourites(event, movieListID);
    })

    return movieContainer;
}

function attachContainer(container, targetElement) {
    const oldMovieContainer = document.querySelector('.movies-container-cards');
    if (oldMovieContainer) {
        oldMovieContainer.remove();
    }

    targetElement.insertAdjacentElement(
        'afterend',
        container
    )
}


