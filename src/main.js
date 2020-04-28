import UserProfileComponent from './components/user-profile.js';
import FiltersComponent from './components/filter.js';
import SortingComponent from './components/sorting';
import FilmBoardComponent from './components/film-board.js';
import FooterStatisticsComponent from './components/footer-statistics.js';

import PageController from './controllers/page.js';

import {generateFilms} from './mock/film.js';
import {generateUser} from './mock/user.js';
import {generateFilters} from './mock/filter.js';
import {generateFilmsInside} from './mock/filmsInside.js';

import {render} from './utils/render.js';

const FILMS_COUNT = 50;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const user = generateUser();
const filters = generateFilters();

render(siteHeaderElement, new UserProfileComponent(user));
render(siteMainElement, new FiltersComponent(filters));

const sortingComponent = new SortingComponent();
const filmBoardComponent = new FilmBoardComponent();
const films = generateFilms(FILMS_COUNT);

render(siteMainElement, sortingComponent);
render(siteMainElement, filmBoardComponent);

const pageController = new PageController(filmBoardComponent, sortingComponent);

pageController.render(films);

const footerStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);
const filmsInside = generateFilmsInside();

render(footerStatisticsElement, new FooterStatisticsComponent(filmsInside));
