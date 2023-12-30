'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = country => {
  const request = new XMLHttpRequest(); // Tạo 1 đối tượng XMLhttp để thực hiện các yêu cầu HTTP
  request.open('GET', `https://restcountries.com/v2/name/${country}`); // mở 1 kết nối với http với phương thức GET đến URL chứa thông tin về quốc gia
  request.send(); //Gửi yêu cầu HTTP đến API để lấy dữ liệu.
  console.log(request.responseText); //In ra màn hình , nhưng lưu ý rằng dòng này được gọi trước khi dữ liệu thực sự được nhận được. Do đó, nó có thể hiển thị undefined hoặc không đầy đủ thông tin.

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
    </article>
        `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
