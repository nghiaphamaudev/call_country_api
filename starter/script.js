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
          <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
      </div>
  </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbour = country => {
//   //Ajax conutrty 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);

//     //render country
//     renderCountry(data);
//     //get nneighbour country2

//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('usa');

// const getCountryData = country => {
//   fetch(`https://restcountries.com/v2/name/${country}`) //Hàm tìm nạp trả về 1 promise
//     .then(response => {
//       //thành cong sẽ thực hiện then nhưng muốn đọc đc dữ liệu phải chuyển sang json.parse
//       console.log(response);
//       return response.json(); //Bản thân json() cũng trả ra 1 promise
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('portugal');

const renderError = message => {
  //thêm 1 đoạn text vào trc nút button
  countriesContainer.insertAdjacentText('beforeend', message);
};
const getJson = (url, errorMess = 'Something with wrong') => {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(` .${errorMess} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = country => {
  getJson(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJson(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(` ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('portugal');
});

// const whereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(reponse => {
//       if (!reponse.ok)
//         throw new Error(`Problem with geocoding ${reponse.status}`);
//       return reponse.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`)
//         .then(response => {
//           if (!response.ok)
//             throw new Error(`Country not found (${response.status})`);
//           return response.json();
//         })
//         .then(data => renderCountry(data[0]));
//     })
//     .catch(err => {
//       console.error(`${err.message} 🎇🎆🎈`);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
