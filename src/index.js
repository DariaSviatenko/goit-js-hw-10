import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(e => {
    const value = e.target.value.trim();
    if (!value) {
      return clearMarkup();
    }
    fetchCountries(value)
      .then(data => {
        if (data.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (data.length > 1 && data.length <= 10) {
          return renderList(data);
        }
        if (data.length === 1) {
          return renderSingle(data);
        }
      })
      .catch(error => {
        clearMarkup();
        Notiflix.Notify.failure(error.message);
      });
  }, DEBOUNCE_DELAY)
);

function renderList(data) {
  const markup = data
    .map(country => {
      return `<li><p><img width="30" height="20" src="${country.flags.svg}" /> ${country.name}</p></li>`;
    })
    .join('');
  countryInfo.innerHTML = '';
  countryList.innerHTML = markup;
}

function renderSingle(data) {
  const markup = data
    .map(country => {
      return `<div>
            <h1> <img width="30" height="20" src="${country.flags.svg}" /> ${
        country.name
      }</h1>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${country.languages
              .map(lang => lang.name)
              .join(', ')}</p>
          </div>`;
    })
    .join('');
  countryList.innerHTML = '';
  countryInfo.innerHTML = markup;
}

function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
