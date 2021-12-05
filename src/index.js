import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from "./fetch_countries";

const input = document.querySelector('#search-box')
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))



function onSearch() {
  const inputValue = input.value.trim();
  if (inputValue === '') { cleanCountryCont();  return}

  fetchCountries(inputValue).then((country) => {

    if (country.length === 1) {
      cleanCountryCont(); countryInfo.innerHTML = renderMarcupSingeCountry(country)
  
    } else if (country.length > 10) {
      Notify.info("Too many matches found. Please enter a more specific name.")

    } else { cleanCountryCont();  countryList.innerHTML = renderMarcupCountriList(country)}
  }).catch(error => Notify.failure("Oops, there is no country with that name"))
};



function renderMarcupCountriList(array) {
    
    return array.map(({flag, name}) =>
     `<li>
     <div class="country">
        <img
      class="country-flag"
      src="${flag}"
      alt="flag", width = 50px,
    />
        <p class="country-name">${name}</p>
        </div>
  </li>
`).join('')
};
    

function renderMarcupSingeCountry(array) {

    
    return array.map(({ flag, name, capital, population, languages }) =>
        
     `
      <div class="country">
        <img
      class="country-flag"
      src="${flag}"
      alt="flag",
    />
        <p class="country-name_single">${name}</p>
        </div>
        <div>
        <p class="country_subtitle">Capital:<span class="subtitle_value">${capital}</span></p>
        <p class="country_subtitle">Population:<span class="subtitle_value">${population}</span></p>
        <p class="country_subtitle">Languages:<span class="subtitle_value">${languages.map(lang => {return lang.name })}</span></p>
        </div>
  
`).join('')
};


function cleanCountryCont() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};




