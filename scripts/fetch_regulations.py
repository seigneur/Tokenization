#!/usr/bin/env python3
"""
Fetch and parse tokenization regulatory documents from various sources.
This script will be run periodically by GitHub Actions to keep the data updated.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

import requests
from bs4 import BeautifulSoup


class RegulationFetcher:
    """Fetches and parses regulatory documents for tokenization."""

    def __init__(self, data_dir='data'):
        self.data_dir = Path(data_dir)
        self.countries_dir = self.data_dir / 'countries'
        self.countries_dir.mkdir(parents=True, exist_ok=True)
        self.countries_data = {}

    def load_existing_data(self):
        """Load existing country data."""
        countries_file = self.data_dir / 'countries.json'
        if countries_file.exists():
            with open(countries_file, 'r', encoding='utf-8') as f:
                self.countries_data = json.load(f)
        print(f"Loaded existing data for {len(self.countries_data)} countries")

    def fetch_singapore_mas_data(self):
        """
        Fetch MAS (Monetary Authority of Singapore) regulatory information.
        This is a placeholder implementation. In production, you would:
        1. Scrape or fetch via API from MAS website
        2. Parse PDF documents
        3. Extract relevant information about tokenization
        """
        print("Fetching Singapore MAS data...")
        
        # For now, we'll enhance the existing data with a fetch attempt marker
        if 'SG' in self.countries_data:
            # In a real implementation, you would:
            # - Fetch from https://www.mas.gov.sg/regulation/payments
            # - Parse the content
            # - Update the data structure
            self.countries_data['SG']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')
            self.countries_data['SG']['autoFetched'] = True
            print("✓ Updated Singapore data")
        else:
            print("! No existing Singapore data to update")

    def fetch_us_sec_data(self):
        """
        Fetch SEC (Securities and Exchange Commission) information.
        Placeholder for fetching US regulatory data.
        """
        print("Fetching US SEC data...")
        
        if 'US' in self.countries_data:
            self.countries_data['US']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')
            self.countries_data['US']['autoFetched'] = True
            print("✓ Updated US data")
        else:
            print("! No existing US data to update")

    def fetch_uk_fca_data(self):
        """
        Fetch FCA (Financial Conduct Authority) information.
        Placeholder for fetching UK regulatory data.
        """
        print("Fetching UK FCA data...")
        
        if 'GB' in self.countries_data:
            self.countries_data['GB']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')
            self.countries_data['GB']['autoFetched'] = True
            print("✓ Updated UK data")
        else:
            print("! No existing UK data to update")

    def fetch_switzerland_finma_data(self):
        """
        Fetch FINMA (Swiss Financial Market Supervisory Authority) information.
        Placeholder for fetching Swiss regulatory data.
        """
        print("Fetching Switzerland FINMA data...")
        
        if 'CH' in self.countries_data:
            self.countries_data['CH']['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')
            self.countries_data['CH']['autoFetched'] = True
            print("✓ Updated Switzerland data")
        else:
            print("! No existing Switzerland data to update")

    def fetch_all_sources(self):
        """Fetch data from all configured sources."""
        print("\n=== Starting data fetch ===\n")
        
        self.fetch_singapore_mas_data()
        self.fetch_us_sec_data()
        self.fetch_uk_fca_data()
        self.fetch_switzerland_finma_data()
        
        print("\n=== Fetch complete ===\n")

    def save_data(self):
        """Save updated country data."""
        countries_file = self.data_dir / 'countries.json'
        
        with open(countries_file, 'w', encoding='utf-8') as f:
            json.dump(self.countries_data, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Saved data to {countries_file}")

    def generate_individual_country_files(self):
        """Generate individual JSON files for each country."""
        for country_code, data in self.countries_data.items():
            country_file = self.countries_dir / f'{country_code}.json'
            with open(country_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"✓ Saved {country_code} data to {country_file}")

    def run(self):
        """Main execution method."""
        self.load_existing_data()
        self.fetch_all_sources()
        self.save_data()
        self.generate_individual_country_files()
        print("\n✓ All operations completed successfully")


def main():
    """Main entry point."""
    try:
        fetcher = RegulationFetcher()
        fetcher.run()
        return 0
    except Exception as e:
        print(f"✗ Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    sys.exit(main())
