#!/usr/bin/env python3
"""
Update metadata file with current timestamp and statistics.
"""

import json
import sys
from datetime import datetime
from pathlib import Path


def update_metadata():
    """Update the metadata file with current information."""
    data_dir = Path('data')
    metadata_file = data_dir / 'metadata.json'
    countries_file = data_dir / 'countries.json'

    # Load existing metadata
    metadata = {}
    if metadata_file.exists():
        with open(metadata_file, 'r', encoding='utf-8') as f:
            metadata = json.load(f)

    # Load countries data to get count
    total_countries = 0
    if countries_file.exists():
        with open(countries_file, 'r', encoding='utf-8') as f:
            countries_data = json.load(f)
            total_countries = len(countries_data)

    # Update metadata
    metadata['lastUpdated'] = datetime.now().strftime('%Y-%m-%d')
    metadata['totalCountries'] = total_countries
    metadata['dataSource'] = 'Automated periodic updates and manual curation'
    
    # Save updated metadata
    with open(metadata_file, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)

    print(f"✓ Updated metadata: {total_countries} countries, last updated {metadata['lastUpdated']}")


def main():
    """Main entry point."""
    try:
        update_metadata()
        return 0
    except Exception as e:
        print(f"✗ Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    sys.exit(main())
