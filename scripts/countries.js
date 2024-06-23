const getCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return await data;
};

const countriesFull = await getCountries();
let countries = [...countriesFull];

const search = (text) => {
  countries = countries.filter((country) => {
    let name = country.name.common.toLowerCase();
    return name.includes(text.toLowerCase());
  });
};

const reset = () => {
  countries = [...countriesFull];
};

export { getCountries, countries, search, reset };
