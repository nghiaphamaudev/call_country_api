'use strict';

const whereAmI = (lat, lng) => {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(reponse => {
      if (!reponse.ok)
        throw new Error(`Problem with geocoding ${reponse.status}`);
      return reponse.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are ${data.city}, ${data.country}`);
    })
    .catch(err => {
      console.error(`${err.message} 🎇🎆🎈`);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.4432526356243265342634);
