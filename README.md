# Global Tokenization Regulations Map

An interactive world map for exploring country-specific tokenization regulations and guidelines.

## 🌍 Overview

This project provides a visual interface to explore tokenization regulatory frameworks across different countries. Click on any country on the interactive map to view detailed information about:

- Regulatory framework and key legislation
- Licensing requirements
- Compliance obligations
- Regulatory authorities
- Source documentation

## 🚀 Features

- **Interactive World Map**: Click on countries to view their tokenization regulations
- **Color-Coded Status**: Visual indicators showing regulatory clarity
  - 🟢 **Green**: Clear and well-defined tokenization regulations
  - 🟡 **Yellow**: Unclear or evolving regulatory framework
  - ⚫ **Black**: Tokenization prohibited or not allowed
  - ⚪ **Light Purple**: No data available yet
- **Comprehensive Data**: Regulatory information for major jurisdictions
- **Automated Updates**: GitHub Actions workflow periodically fetches latest regulatory documents
- **Responsive Design**: Works on desktop and mobile devices
- **Easy to Extend**: Simple JSON-based data structure for adding new countries

## 📂 Project Structure

```
.
├── index.html              # Main HTML page
├── styles.css              # Styling
├── app.js                  # JavaScript application logic
├── map.svg                 # Interactive SVG world map
├── data/
│   ├── countries.json      # Main country data file
│   ├── metadata.json       # Data update metadata
│   └── countries/          # Individual country JSON files
├── scripts/
│   ├── fetch_regulations.py    # Script to fetch regulatory documents
│   └── update_metadata.py      # Script to update metadata
└── .github/
    └── workflows/
        └── update-data.yml     # GitHub Actions workflow for automated updates

```

## 🎯 Usage

### Viewing the Site

1. Open `index.html` in a web browser, or
2. Visit the GitHub Pages URL (if deployed)

### Adding New Country Data

To add or update a country's regulatory information:

1. Edit `data/countries.json`
2. Add a new country entry with the country code (ISO 3166-1 alpha-2) as the key:

```json
{
  "XX": {
    "status": "clear",
    "overview": "Brief overview of the country's tokenization regulatory framework",
    "regulations": [
      {
        "title": "Regulation Name",
        "description": "Brief description"
      }
    ],
    "requirements": [
      "List of key requirements"
    ],
    "authorities": [
      "List of regulatory authorities"
    ],
    "sources": [
      {
        "name": "Source Name",
        "url": "https://source-url.com"
      }
    ],
    "lastUpdated": "YYYY-MM-DD"
  }
}
```

**Status Field Values:**
- `"clear"` - Country has clear, well-defined tokenization regulations (displays as green on map)
- `"unclear"` - Country has unclear or evolving regulations (displays as yellow on map)
- `"prohibited"` - Tokenization is prohibited or not allowed (displays as black on map)

3. Update the SVG map in `map.svg` to include the country (if not already present)

### Automated Data Updates

The GitHub Action workflow (`.github/workflows/update-data.yml`) runs weekly to:

1. Fetch latest regulatory documents from configured sources
2. Parse and extract relevant information
3. Update the data files
4. Commit changes back to the repository

You can also trigger the workflow manually from the Actions tab.

## 🛠️ Development

### Running Locally

Simply open `index.html` in a web browser. For better development experience, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Customizing the Map

The world map is an SVG file (`map.svg`) with clickable country paths. Each country has:
- `class="country"` - For styling
- `data-country="XX"` - Country code
- `data-name="Country Name"` - Display name

### Extending Data Sources

To add new data sources for automated fetching:

1. Edit `scripts/fetch_regulations.py`
2. Add a new method like `fetch_countryname_authority_data()`
3. Implement the fetching and parsing logic
4. Call the method in `fetch_all_sources()`

## 📊 Currently Covered Jurisdictions

- 🇸🇬 Singapore (MAS)
- 🇺🇸 United States (SEC, CFTC)
- 🇬🇧 United Kingdom (FCA)
- 🇨🇭 Switzerland (FINMA)
- 🇦🇪 United Arab Emirates (VARA, SCA)

More jurisdictions are continuously being added.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Add or update regulatory information
3. Test your changes locally
4. Submit a pull request

Please ensure:
- Data is accurate and from official sources
- Sources are properly cited
- JSON is properly formatted
- Country codes follow ISO 3166-1 alpha-2 standard

## 📝 License

This project is open source and available for educational and informational purposes.

## ⚠️ Disclaimer

This information is provided for educational purposes only and should not be considered legal or financial advice. Always consult with qualified legal professionals for regulatory compliance matters.

## 🔗 Resources

- [MAS Digital Payment Tokens](https://www.mas.gov.sg/regulation/payments)
- [SEC Digital Assets](https://www.sec.gov/digital-assets)
- [FCA Cryptoassets](https://www.fca.org.uk/firms/cryptoassets)
- [FINMA Token Guidance](https://www.finma.ch/en/finma-topics/finma-tokens/)
- [VARA Dubai Virtual Assets](https://www.vara.ae)
- [UAE Securities and Commodities Authority](https://www.sca.gov.ae)

---

**Last Updated**: December 2024