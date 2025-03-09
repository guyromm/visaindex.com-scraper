# VisaIndex Scraper

## Overview
VisaIndex Scraper is a Chrome extension that automatically collects visa requirement data from the [Visa Index website](https://visaindex.com). It systematically visits country passport ranking pages and extracts visa requirement information, saving it as TSV (Tab-Separated Values) files for further analysis.

## Features
- Automatically navigates through passport ranking pages for different countries
- Extracts visa requirement data for each country
- Saves data in TSV format with source country, destination country, and visa status
- Tracks visited countries to avoid duplicates
- Handles special characters and country name normalization

## How It Works
1. The extension loads on any page matching `https://visaindex.com/country/*/`
2. It extracts visa requirement data from the current country page
3. Saves the data as a TSV file named `visa_data_[country].tsv`
4. Marks the country as "visited" in local storage
5. Automatically navigates to the next unvisited country

## Installation
1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension is now installed and will activate when you visit a matching URL

## Data Format
The extension generates TSV files with the following structure:
```
src     dst     status
country1        country2        visa_requirement_status
```

Where:
- `src`: The source country (passport holder)
- `dst`: The destination country
- `status`: Visa requirement status (e.g., "Visa-free", "Visa on arrival", etc.)

## Usage
1. Navigate to any country page on Visa Index (e.g., https://visaindex.com/country/united-states-of-america-passport-ranking/)
2. The extension will automatically start collecting data
3. Downloaded TSV files can be imported into spreadsheet software or databases for analysis

## Customization
You can modify the list of countries to visit by editing the `countriesToVisit` array in `content.js`.

## Requirements
- Google Chrome browser
- Internet connection
