import axios from "axios";

console.log('Hallo daar!');// test op npm werkt




//     Schrijf een asynchrone functie voor GET-request juiste endpoint. Niet weergeven op webpagina.
async function allCountries() {
    try {
        const countries = await axios.get('https://restcountries.com/v2/all');
        console.log(countries.data);
    } catch(e) {
        console.error(e);
    }
}

allCountries();

//     Schrijf een asynchrone functie voor GET-request juiste endpoint. naam en populatie
// fetch betekend halen
async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v2/all'); // data ophalen van API
        const countries = response.data; // de data in een variabele zetten
      /*  console.log(response.data[0].name);//naam van het allereerste land, proberen of hij werkt
        console.log(response.data[0].population); proberen of het werkt*/

        // de variablen te gebruiken methode te maken waar een functie in zit om de lijst te sorteren op population property
        countries.sort((a, b) => {
          return a.population - b.population;
        });

        // geef de gesorteerde data array mee aan de functie die de elementen op de pagina injecteert
        createListItems(countries);
    } catch(e) {
        console.error(e);
    }
}
fetchCountries();

//functie maken om alle items via map() cosmetisch aan te passen en op pagina weer te geven
function createListItems (countries) {
    // Het 'anker' id ophalen uit het html bestand
    const countryList = document.getElementById('country-item');



//  land wordt weergegeven als <li>-tag
// populatie daaronder weergegeven
    countryList.innerHTML = countries.map((country) => {
        return `
        <li>
            <img src="${country.flag}" alt=" Vlag van ${country.name}" class="flag"/>
            <span class ="${getRegionClass(country.region)}">${country.name}</span> 
            <div class="population">Has a population of ${country.population} people</div>
        </li>
        `;
    }).join(' ');

}


//  aparte functie die één regio-naam verwacht, en op basis van deze regio de correcte kleur-naam als string teruggeeft. Gebruik deze, om de naam van het land in de juiste kleur weer te geven op de pagina. Tip: zorg ervoor dat je CSS-classes maakt voor alle regio-kleuren!


// de currentRegion data komt van country.region opgevraagd in de map() in de functie createListItems
function getRegionClass(currentRegion){
    switch (currentRegion){
        case 'Africa':
            return'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return'purple';
        default:
            return 'default';
    }
}


