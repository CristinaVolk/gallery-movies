import {ALL_MOVIES, FAVOURITE_MOVIES} from "../constants/movies.js";
import {getAllMovies, getFavouriteMovies, setAllMovies} from "../localStorage/setGetLocalStorage.js";

export function getNewListID(event) {
    const currentListID = event.target.nextElementSibling.id;
    let newListID;

    switch (currentListID) {
        case FAVOURITE_MOVIES: {
            newListID = ALL_MOVIES;
            break;
        }
        case ALL_MOVIES: {
            newListID = FAVOURITE_MOVIES;
            break;
        }
        default: {
            return;
        }
    }
    return newListID;
}

export function changeUI(event, newListID) {
    const movieListTitle = event.target.previousElementSibling;

    switch (newListID) {
        case FAVOURITE_MOVIES: {
            movieListTitle.innerHTML = 'Favourite Movies';
            event.target.textContent = 'Click me to see All Movies';

            break;
        }
        case ALL_MOVIES: {
            movieListTitle.innerHTML = 'All Movies';
            event.target.textContent = 'Click me to see Favourite Movies';

            break;
        }
        default: {
            return;
        }
    }
}

export function handleSaveToFavourites(event, movieListID) {
    const clickedBtnHeartIcon = event.target.closest('.movie-card-btn-icon');
    if (!clickedBtnHeartIcon) {
        return;
    }

    const clickedBtnHeartIconID = clickedBtnHeartIcon.parentElement.dataset.movieId;
    const allMovies = getAllMovies();

    const updatedMovies = allMovies.map(movie => {
        if (movie.id === Number(clickedBtnHeartIconID)) {
            return {
                ...movie,
                isFavourite: !movie.isFavourite
            }
        } else {
           return {...movie}
        }
    });

    setAllMovies(updatedMovies);

    switch (movieListID) {
        case FAVOURITE_MOVIES: {
            clickedBtnHeartIcon.parentElement.remove();

            const favouriteMovies = getFavouriteMovies();
            if (!favouriteMovies.length) {
                const container = document.querySelector('.movies-container-cards');
                const textContent = `<h1>Sorry you have not saved anything to favourites</h1>`
                handleUIIfListEmpty(container, textContent);
            }

            break;
        }
        case ALL_MOVIES: {
            const movieObj = updatedMovies.find(movie => movie.id === Number(clickedBtnHeartIconID))
            const {isFavourite} = movieObj;
            const heartIcon = isFavourite ? 'favourite.svg' : 'not-favourite.svg';
            clickedBtnHeartIcon.insertAdjacentHTML(
                'beforeend',
                `<img src="assets/icons/${heartIcon}" alt="heart icon"/>`
            );
            clickedBtnHeartIcon.children[0].remove();
            break;
        }
        default: {
            return;
        }
    }
}

export function handleUIIfListEmpty(container, textContent) {
    container.insertAdjacentHTML('afterbegin', textContent)
}

