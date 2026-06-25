#!/usr/bin/env python3
"""
Convertit HTML → PDF via Playwright (optionnel, plus advanced).
Nécessite: pip install playwright && playwright install chromium

Si ce script échoue, utilisez plutôt la méthode manuelle :
  1. Ctrl+P sur le fichier HTML
  2. "Enregistrer en PDF"
"""

import sys
import asyncio
from pathlib import Path
from datetime import datetime

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("❌ Playwright non installé")
    print("\nInstallation:")
    print("  pip install playwright")
    print("  playwright install chromium")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
HTML_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.html"
PDF_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.pdf"

async def convert_html_to_pdf():
    """Convertit HTML en PDF via Playwright."""
    print("=" * 70)
    print("  VisiConnect — Convertisseur HTML → PDF (Playwright)")
    print("=" * 70)
    
    if not HTML_PATH.exists():
        print(f"❌ Fichier HTML non trouvé: {HTML_PATH}")
        return False
    
    print(f"📖 Lecture: {HTML_PATH.name}")
    print(f"💾 Sortie: {PDF_PATH.name}")
    
    try:
        async with async_playwright() as p:
            print("🌐 Lancement du navigateur Chromium...")
            browser = await p.chromium.launch()
            page = await browser.new_page()
            
            print("📄 Chargement de la page...")
            await page.goto(f"file:///{HTML_PATH}", wait_until="networkidle")
            
            print("🎨 Rendu PDF...")
            await page.pdf(
                path=str(PDF_PATH),
                format="A4",
                margin={
                    "top": "2cm",
                    "bottom": "2cm",
                    "left": "2cm",
                    "right": "2cm",
                },
                print_background=True,
                prefer_css_page_size=True,
            )
            
            await browser.close()
            
            if PDF_PATH.exists():
                size_mb = PDF_PATH.stat().st_size / (1024 * 1024)
                pages_est = int(size_mb * 6.5)  # Estimation basée sur taille
                print(f"✅ PDF généré avec succès!")
                print(f"📊 Taille: {size_mb:.2f} MB")
                print(f"📖 Pages estimées: ~{pages_est}")
                print(f"📍 Emplacement: {PDF_PATH}")
                return True
            else:
                print(f"❌ Le fichier PDF n'a pas été créé")
                return False
    
    except Exception as e:
        print(f"❌ Erreur lors de la conversion: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(convert_html_to_pdf())
    sys.exit(0 if success else 1)
