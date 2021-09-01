const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const errors = document.getElementById('errors');
const countryDetails = document.getElementById('country-details');
const loader = document.getElementById('loader');

searchBtn.addEventListener('click', () =>{
    const search = searchInput.value;
    // clear dom and innerHtml
    errors.innerText = " "
    // error check
    if(search === ""){
        errors.innerText = "Search field cannot be empty"
        return;
    }
    countryContainer.textContent = "";
    countryDetails.textContent = "";

    const apiUrl = `https://restcountries.eu/rest/v2/name/${search}`;
    loader.classList.remove('d-none')
    fetch(apiUrl)
    .then(res => res.json())
    .then(countries => showData(countries))
    .finally(() => {
        searchInput.value = ""
        loader.classList.add('d-none')
    });
});

function showData(countries){
    // error handle
    if(countries.status === 404) {
        errors.innerText = "No Result found";
    }
    else{
        errors.innerText = "";
    }
    countries.forEach(country => {
        console.log(country);
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
      <div class="rounded overflow-hidden border p-2">
        <img
          src="${country.flag}"
          class="w-100"
          alt=""
        />
      </div>
      <div class="py-2
      d-flex
      justify-content-between
      align-items-center
      d-md-block
      text-md-center ">
            <h1>${country.name}</h1>
            <button onclick="showDetails('${country.alpha3Code}')" class="btn btn-dark">Learn More</button>
            </div> 
        `
        countryContainer.appendChild(div);
    });
}

function showDetails(countryCode){
    fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
    .then(res => res.json())
    .then(data => {
        countryDetails.innerHTML =`
        <div class="col-md-12">
            <h1>${data.name}</h1>
            <p>Capital: ${data.capital}</p>
            <p>Currency Name: ${data.currencies[0].name}</p>
            <p>Currency Symbol: ${data.currencies[0].symbol}</p>
        </div>
        `
    });
}