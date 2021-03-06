import {getFilmsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

const EXTRA_FILMS_NUM = 2;

export default class Films {
  constructor() {
    this._films = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];

    this._activeFilter = FilterType.ALL;
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilter);
  }

  getFilmsAll() {
    return this._films;
  }

  getCommentedFilms() {
    const films = this.getFilmsAll();
    const isNoComments = films.map((film) => film.comments.length).every((film) => film === 0);

    if (isNoComments) {
      return [];
    }

    return films
      .slice()
      .filter((film) => film.comments.length > 0)
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_FILMS_NUM);
  }

  getRatedFilms() {
    const films = this.getFilmsAll();
    const isNoRating = films.map((film) => film.rating).every((film) => film === 0);

    if (isNoRating) {
      return [];
    }

    return films
      .slice()
      .filter((film) => film.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, EXTRA_FILMS_NUM);
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, newFilm) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeComment(commentId, film) {
    const index = film.comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      return false;
    }

    film.comments = [].concat(film.comments.slice(0, index), film.comments.slice(index + 1));

    return this.updateFilm(film.id, film);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  addComment(comment, film) {
    film.comments = [].concat(film.comments, comment);

    return this.updateFilm(film.id, film);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
