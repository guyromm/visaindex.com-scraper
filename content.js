const l = console.log

let data;
let allCountries = new Set();
let visitedCountries = new Set();

// Function to normalize country names (remove accents, special chars)
function normalizeCountryName(name) {
  // Special case handling
  if (name === "Guinea-Bissau") {
    return "guinea-bissau";
  }
  if (name === "Myanmar") {
    return "myanmar-burma";
  }
  if (name === "Timor-Leste") {
    return "timor-leste";
  }
  if (name === "American Samoa") {
    return "samoa";
  }
  
  return name
    .normalize('NFD')                 // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
    .replace(/[^\w\s]/g, '')          // Remove non-alphanumeric chars except spaces
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .toLowerCase();                    // Convert to lowercase
}

const countriesToVisit = [...new Set([
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Dem. Rep.)",
    "Costa Rica",
    "Côte d’Ivoire (Ivory Coast)",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territories",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Vincent and the Grenadines",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Dem. Rep.)",
    "Costa Rica",
    "Côte d’Ivoire (Ivory Coast)",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territories",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Vincent and the Grenadines",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Afghanistan",
    "Albania",
    "Algeria",
    //"American Samoa",
    "Andorra",
    "Angola",
    //"Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    //"Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    //"Bermuda",
    "Bhutan",
    "Bolivia",
    //"Bonaire, St. Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    //"British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    //"Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Dem. Rep.)",
    //"Cook Islands",
    "Costa Rica",
    "Côte d’Ivoire (Ivory Coast)",
    "Croatia",
    "Cuba",
    //"Curacao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    //"Falkland Islands",
    //"Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    //"French Guiana",
    //"French Polynesia",
    //"French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    //"Gibraltar",
    "Greece",
    //"Greenland",
    "Grenada",
    //"Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    //"Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    //"Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    //"New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    //"Niue",
    //"Norfolk Island",
    "North Korea",
    "North Macedonia",
    //"Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territories",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    //"Puerto Rico",
    "Qatar",
    //"Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    //"St. Helena",
    //"St. Maarten",
    //"St. Pierre and Miquelon",
    "St. Vincent and the Grenadines",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    //"Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    //"US Virgin Islands",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    //"Wallis and Futuna",
    "Yemen",
    "Zambia",
    "Zimbabwe"
])]

l(countriesToVisit.length,'to visit in total.')
// Load visited countries from localStorage
function loadVisitedCountries() {
  const visited = localStorage.getItem('visitedCountries');
  if (visited) {
    visitedCountries = new Set(JSON.parse(visited));
    l('Loaded visited countries:', Array.from(visitedCountries));
  }
}

// Save visited countries to localStorage
function saveVisitedCountries() {
    localStorage.setItem('visitedCountries', JSON.stringify(Array.from(visitedCountries)));
    l('visitedCountries=',visitedCountries)
}

function extractDataCompare() {
  data = [...document.querySelectorAll('.detailedResultsRow')].map(e => ({
    requirement: e.querySelector('.requirement').textContent.trim(),
    countryName: e.querySelector('.detailedResultsCountryName').textContent.trim()
  }));
}

function navigateToNextCountry() {
  // Normalize all visited countries for comparison
  const normalizedVisited = [...visitedCountries].map(country => normalizeCountryName(country));
  
  // Find the next unvisited country
  for (const country of countriesToVisit) {
    const normalizedCountry = normalizeCountryName(country);
      //l('checking if visitedCountries has', country);
    
    if (!normalizedVisited.includes(normalizedCountry)) {
      // Format country for URL - normalize to handle special characters
      const formattedCountry = normalizeCountryName(country);
      
      // Validate that we have a non-empty country name before navigating
      if (formattedCountry && formattedCountry.trim() !== '') {
        const nextUrl = `/country/${formattedCountry}-passport-ranking/`;
        l('Navigating to next country:', country, nextUrl);
        window.location.href = nextUrl;
        return;
      } else {
        l('Warning: Empty country name detected for:', country);
        // Skip this country and continue to the next one
        continue;
      }
    }
  }
  
  l('All countries have been visited!');
  alert('All countries have been processed!');
}

function extractData() {
    data = [...document.querySelectorAll('div.py-3')].map(s=>({title:s.querySelector('div.col-title').textContent.trim(),countries:[...s.parentNode.querySelectorAll('.country-name')].map(cn => cn.textContent.trim())}))

    // Collect all countries for navigation
    data.forEach(item => {
      item.countries.forEach(country => {
        allCountries.add(country);
      });
    });
    
    l('All countries found:', allCountries.size);

    // Extract country names from URL
    const urlParams = new URL(window.location.href);
    //alert(`pathname is ${urlParams.pathname}`);
    const match = window.location.pathname.match(/\/country\/([^/]+)-passport-ranking/);

    // Validate that we have a valid match and country name
    if (!match || !match[1] || match[1].trim() === '') {
      l('Error: Invalid country in URL:', window.location.pathname);
      // Wait a moment and then navigate to the next country
      setTimeout(() => {
        navigateToNextCountry();
      }, 1000);
      return;
    }

    //const compareMatch = window.location.href.match(/between=(.*)-passport-ranking-and-(.*)-passport-ranking/);
    //const sourceCountry = match ? match[1] : 'source';
    //const destinationCountry = match ? match[2] : 'destination';
    const country = decodeURIComponent(match[1]);
    
    // Mark this country as visited - properly capitalize the country name
    const normalizedCountry = country.replace(/-/g, ' ')
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
    visitedCountries.add(normalizedCountry);
    saveVisitedCountries();
    l('Marked as visited:', normalizedCountry);
    
    //const fileName = `visa_data_${sourceCountry}_to_${destinationCountry}.json`;
    const fileName = `visa_data_${country}.tsv`
    let output=["src\tdst\tstatus"];
    for (let item of data)
    {
	let status = item.title
	let countries = item.countries
	//l('status=',status,'countries=',countries)
	for (let dst of countries)
	{
	    output.push(`${country}\t${dst}\t${status}`);
	}
    }
    let outputStr = output.join("\n")

    const blob = new Blob([outputStr], { type: 'text/csv' }); // ;charset=utf-8;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Wait a moment before navigating to the next country
    setTimeout(() => {
      navigateToNextCountry();
    }, 2000);
}

// Run extraction after the page loads
window.addEventListener('load', () => {
  loadVisitedCountries();
  extractData();
});
