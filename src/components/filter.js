import AbstractComponent from './abstract-component';

const createFilterItem = (filter) => {
  const {name, count} = filter;
  return (
    `<a href="#${name.toLocaleLowerCase()}"  class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFiltersTemplate = (filters) => {

  const filterItems = filters.map((it) => createFilterItem(it)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all"  class="main-navigation__item   main-navigation__item--active">All movies</ a>
        ${filterItems}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}

export default Filters;
