const l = console.log

let data;
let allCountries = new Set();
let visitedCountries = new Set();

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
}

function extractDataCompare() {
  data = [...document.querySelectorAll('.detailedResultsRow')].map(e => ({
    requirement: e.querySelector('.requirement').textContent.trim(),
    countryName: e.querySelector('.detailedResultsCountryName').textContent.trim()
  }));
}

function navigateToNextCountry() {
  // Find the next unvisited country
  for (const country of allCountries) {
    if (!visitedCountries.has(country)) {
      const formattedCountry = country.toLowerCase().replace(/\s+/g, '-');
      const nextUrl = `/country/${formattedCountry}-passport-ranking/`;
      l('Navigating to next country:', country, nextUrl);
      window.location.href = nextUrl;
      return;
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

    //const compareMatch = window.location.href.match(/between=(.*)-passport-ranking-and-(.*)-passport-ranking/);
    //const sourceCountry = match ? match[1] : 'source';
    //const destinationCountry = match ? match[2] : 'destination';
    const country = decodeURIComponent(match[1]);
    
    // Mark this country as visited
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
	l('status=',status,'countries=',countries)
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
