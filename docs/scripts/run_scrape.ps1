$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "Creating Python virtual environment..."
if (-not (Test-Path ".venv")) {
    python -m venv .venv
}

Write-Host "Activating virtual environment..."
. .\.venv\Scripts\Activate.ps1

Write-Host "Installing requirements..."
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

Write-Host "Running Dragoman public site scraper..."
python .\scripts\scrape_dragoman_public.py --output site_mirror --seed-csv data\discovered_urls.csv --max-pages 300

Write-Host "Done. Check the site_mirror folder."
