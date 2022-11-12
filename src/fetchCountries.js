const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    let data = response.json();
    return data;
  });
};

export default fetchCountries;
