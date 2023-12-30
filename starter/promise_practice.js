'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = (data, className = '') => {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 100;
};

const getJSON = (url, errMess = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMess} ${response.status}`);
    return response.json();
  });
};

const renderError = message => {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getCountryData = country => {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0];
      if (!neighbour) throw new Error('Smething went wrong!!!');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => renderError(`${err.message}. Try again!`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
