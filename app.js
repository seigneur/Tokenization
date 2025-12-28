// Country data management
let countryData = {};
let selectedCountry = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadCountryData();
    await loadMap();
    updateLastUpdated();
    setupEventListeners();
});

// Load the world map
async function loadMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '<p class="loading">Loading map...</p>';

    try {
        const response = await fetch('map.svg');
        if (!response.ok) {
            throw new Error('Map not found');
        }
        const svgText = await response.text();
        mapContainer.innerHTML = svgText;

        // Add click handlers to countries
        const countries = mapContainer.querySelectorAll('.country');
        countries.forEach(country => {
            country.addEventListener('click', () => handleCountryClick(country));
            
            // Add has-data class if data exists
            const countryCode = country.getAttribute('data-country');
            if (countryData[countryCode]) {
                country.classList.add('has-data');
            }
        });
    } catch (error) {
        mapContainer.innerHTML = `<div class="error">Error loading map: ${error.message}</div>`;
    }
}

// Load country regulation data
async function loadCountryData() {
    try {
        const response = await fetch('data/countries.json');
        if (!response.ok) {
            console.warn('Country data not found, using sample data');
            countryData = getSampleData();
            return;
        }
        countryData = await response.json();
    } catch (error) {
        console.warn('Error loading country data:', error);
        countryData = getSampleData();
    }
}

// Handle country click
function handleCountryClick(countryElement) {
    // Remove previous selection
    document.querySelectorAll('.country.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Select new country
    countryElement.classList.add('selected');
    
    const countryCode = countryElement.getAttribute('data-country');
    const countryName = countryElement.getAttribute('data-name') || countryCode;
    
    selectedCountry = countryCode;
    displayCountryInfo(countryCode, countryName);
}

// Display country information
function displayCountryInfo(countryCode, countryName) {
    const infoPanel = document.getElementById('info-panel');
    const countryNameElement = document.getElementById('country-name');
    const infoContent = document.getElementById('info-content');

    countryNameElement.textContent = countryName;

    const data = countryData[countryCode];

    if (!data) {
        infoContent.innerHTML = `
            <p class="placeholder">No information available for ${countryName} yet.</p>
            <p class="placeholder">Check back later as we continue to add more countries.</p>
        `;
        return;
    }

    let html = `
        <div class="country-info">
            <h3>Overview</h3>
            <p>${data.overview || 'No overview available.'}</p>
    `;

    if (data.regulations && data.regulations.length > 0) {
        html += `
            <h3>Main Rules</h3>
            <ul>
                ${data.regulations.map(reg => `<li><strong>${reg.title}</strong>: ${reg.description}</li>`).join('')}
            </ul>
        `;
    }

    if (data.requirements && data.requirements.length > 0) {
        html += `
            <h3>Requirements</h3>
            <ul>
                ${data.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        `;
    }

    if (data.authorities && data.authorities.length > 0) {
        html += `
            <h3>Who's in Charge</h3>
            <ul>
                ${data.authorities.map(auth => `<li>${auth}</li>`).join('')}
            </ul>
        `;
    }

    if (data.sources && data.sources.length > 0) {
        html += `
            <h3>Sources</h3>
        `;
        data.sources.forEach(source => {
            html += `<a href="${source.url}" target="_blank" class="source-link">${source.name}</a> `;
        });
    }

    if (data.lastUpdated) {
        html += `<p style="margin-top: 1.5rem; font-size: 0.9rem; color: #9ca3af;">Last updated: ${data.lastUpdated}</p>`;
    }

    html += '</div>';
    infoContent.innerHTML = html;

    // Scroll to top of info panel
    infoPanel.scrollTop = 0;
}

// Setup event listeners
function setupEventListeners() {
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.country.selected').forEach(el => {
            el.classList.remove('selected');
        });
        selectedCountry = null;
        document.getElementById('country-name').textContent = 'Select a Country';
        document.getElementById('info-content').innerHTML = `
            <p class="placeholder">Click on any country on the map to see its digital token rules.</p>
        `;
    });
}

// Update last updated timestamp
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    // Try to fetch metadata
    fetch('data/metadata.json')
        .then(response => response.json())
        .then(metadata => {
            lastUpdatedElement.textContent = metadata.lastUpdated || new Date().toLocaleDateString();
        })
        .catch(() => {
            lastUpdatedElement.textContent = new Date().toLocaleDateString();
        });
}

// Sample data for demonstration
function getSampleData() {
    return {
        'SG': {
            overview: 'Singapore has established comprehensive regulations for tokenization through the Monetary Authority of Singapore (MAS). The Payment Services Act regulates digital payment tokens, while securities tokens fall under the Securities and Futures Act.',
            regulations: [
                {
                    title: 'Payment Services Act (PSA)',
                    description: 'Governs digital payment token services including exchanges and wallet providers'
                },
                {
                    title: 'Securities and Futures Act (SFA)',
                    description: 'Applies to tokens that constitute securities or derivatives'
                },
                {
                    title: 'MAS Guidelines on Digital Tokens',
                    description: 'Provides guidance on the application of securities laws to token offerings'
                }
            ],
            requirements: [
                'License required for operating digital payment token services',
                'AML/CFT compliance mandatory',
                'Technology risk management standards must be met',
                'Consumer protection measures required'
            ],
            authorities: [
                'Monetary Authority of Singapore (MAS)'
            ],
            sources: [
                {
                    name: 'MAS Digital Payment Tokens',
                    url: 'https://www.mas.gov.sg/regulation/payments'
                }
            ],
            lastUpdated: '2024-01-15'
        },
        'US': {
            overview: 'The United States has a complex regulatory framework for tokenization involving multiple agencies. The SEC regulates security tokens, while the CFTC oversees certain digital commodities. State-level regulations also apply.',
            regulations: [
                {
                    title: 'Securities Act of 1933',
                    description: 'Security tokens must comply with registration or exemption requirements'
                },
                {
                    title: 'Howey Test',
                    description: 'Determines whether a token qualifies as a security'
                }
            ],
            requirements: [
                'SEC registration or exemption for security tokens',
                'State money transmitter licenses may be required',
                'AML/KYC compliance under Bank Secrecy Act',
                'CFTC oversight for certain tokens'
            ],
            authorities: [
                'Securities and Exchange Commission (SEC)',
                'Commodity Futures Trading Commission (CFTC)',
                'FinCEN',
                'State regulators'
            ],
            sources: [
                {
                    name: 'SEC Framework for Digital Assets',
                    url: 'https://www.sec.gov/digital-assets'
                }
            ],
            lastUpdated: '2024-01-20'
        },
        'GB': {
            overview: 'The United Kingdom regulates tokenization through the Financial Conduct Authority (FCA). Security tokens are regulated as specified investments, while certain crypto assets fall under e-money or payment services regulations.',
            regulations: [
                {
                    title: 'Financial Services and Markets Act 2000',
                    description: 'Primary legislation governing financial services including security tokens'
                },
                {
                    title: 'Money Laundering Regulations 2017',
                    description: 'Applies to cryptoasset exchange providers and custodian wallet providers'
                }
            ],
            requirements: [
                'FCA authorization required for security token activities',
                'Registration for cryptoasset businesses',
                'AML/CTF compliance mandatory',
                'Consumer protection and disclosure requirements'
            ],
            authorities: [
                'Financial Conduct Authority (FCA)',
                'Bank of England',
                'HM Treasury'
            ],
            sources: [
                {
                    name: 'FCA Cryptoassets Guidance',
                    url: 'https://www.fca.org.uk/firms/cryptoassets'
                }
            ],
            lastUpdated: '2024-01-18'
        },
        'CH': {
            overview: 'Switzerland, particularly through FINMA, has developed a progressive and clear regulatory framework for tokenization. The country distinguishes between payment tokens, utility tokens, and asset tokens.',
            regulations: [
                {
                    title: 'DLT Act',
                    description: 'Blockchain and DLT-specific framework introduced in 2021'
                },
                {
                    title: 'FINMA ICO Guidelines',
                    description: 'Classification framework for tokens and regulatory treatment'
                }
            ],
            requirements: [
                'License requirements depend on token classification',
                'AML compliance for financial intermediaries',
                'Prospectus requirements for asset tokens',
                'Banking license may be required for certain activities'
            ],
            authorities: [
                'Swiss Financial Market Supervisory Authority (FINMA)'
            ],
            sources: [
                {
                    name: 'FINMA Token Guidance',
                    url: 'https://www.finma.ch/en/finma-topics/finma-tokens/'
                }
            ],
            lastUpdated: '2024-01-10'
        }
    };
}
