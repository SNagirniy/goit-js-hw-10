const fetchCountries = (name) => {
   
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`)
        .then(response => response.json()
        ).then(countries => { return countries });
};

export { fetchCountries };


//"Oops, there is no country with that name"