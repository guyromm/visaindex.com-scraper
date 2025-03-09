const l = console.log

let data;

function extractDataCompare() {
  data = [...document.querySelectorAll('.detailedResultsRow')].map(e => ({
    requirement: e.querySelector('.requirement').textContent.trim(),
    countryName: e.querySelector('.detailedResultsCountryName').textContent.trim()
  }));
}

function extractData() {
    data = [...document.querySelectorAll('div.py-3')].map(s=>({title:s.querySelector('div.col-title').textContent.trim(),countries:[...s.parentNode.querySelectorAll('.country-name')].map(cn => cn.textContent.trim())}))


    // Extract country names from URL
    const urlParams = new URL(window.location.href);
    //alert(`pathname is ${urlParams.pathname}`);
    const match = window.location.pathname.match(/\/country\/([^/]+)-passport-ranking/);

    //const compareMatch = window.location.href.match(/between=(.*)-passport-ranking-and-(.*)-passport-ranking/);
    //const sourceCountry = match ? match[1] : 'source';
    //const destinationCountry = match ? match[2] : 'destination';
    const country = decodeURIComponent(match[1]);
    
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
}

// Run extraction after the page loads
window.addEventListener('load', extractData);
