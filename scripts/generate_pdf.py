#!/usr/bin/env python3
"""
Génère un PDF professionnel à partir du Dossier Projet Markdown.
Utilise markdown2 + weasyprint ou reportlab.
"""

import sys
from pathlib import Path
from datetime import datetime

try:
    import markdown
    from weasyprint import HTML, CSS
    print("✅ Dépendances disponibles (markdown + weasyprint)")
except ImportError as e:
    print(f"❌ Dépendance manquante: {e}")
    print("\nInstallation requise:")
    print("  pip install markdown weasyprint")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DOSSIER_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.md"
OUTPUT_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.pdf"
CSS_PATH = SCRIPT_DIR / "pdf_style.css"

def read_markdown(path):
    """Lit le fichier Markdown."""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def create_css():
    """Crée le CSS professionnel pour le PDF."""
    css_content = """
@page {
    size: A4;
    margin: 2cm;
    @bottom-center {
        content: "Page " counter(page) " / " counter(pages);
        font-size: 10pt;
        color: #666;
    }
    @top-right {
        content: "VisiConnect — Dossier Projet";
        font-size: 9pt;
        color: #999;
    }
}

html {
    font-family: 'Segoe UI', 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

body {
    background: white;
    color: #222;
}

h1 {
    page-break-before: always;
    font-size: 32pt;
    color: #1a365d;
    border-bottom: 3px solid #3182ce;
    padding-bottom: 0.5cm;
    margin-top: 1cm;
    margin-bottom: 0.5cm;
}

h2 {
    font-size: 18pt;
    color: #2c5282;
    margin-top: 1.5cm;
    margin-bottom: 0.5cm;
    border-left: 4px solid #63b3ed;
    padding-left: 0.5cm;
}

h3 {
    font-size: 14pt;
    color: #2d3748;
    margin-top: 1cm;
    margin-bottom: 0.3cm;
}

p {
    margin: 0.4cm 0;
    text-align: justify;
}

code {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 1px 3px;
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    color: #c53030;
}

pre {
    background: #f7fafc;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    padding: 0.5cm;
    overflow-x: auto;
    font-size: 8pt;
    line-height: 1.4;
    page-break-inside: avoid;
}

pre code {
    background: none;
    border: none;
    color: #222;
    font-size: 8pt;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.5cm 0;
    page-break-inside: avoid;
}

table th {
    background: #2d3748;
    color: white;
    padding: 0.3cm;
    text-align: left;
    font-weight: bold;
    font-size: 10pt;
}

table td {
    border: 1px solid #cbd5e0;
    padding: 0.3cm;
    font-size: 9pt;
}

table tr:nth-child(even) {
    background: #f7fafc;
}

blockquote {
    border-left: 4px solid #4299e1;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0.5cm;
    padding-right: 0;
    font-style: italic;
    color: #4a5568;
}

ul, ol {
    margin: 0.3cm 0;
    padding-left: 1.5cm;
}

li {
    margin: 0.2cm 0;
}

a {
    color: #3182ce;
    text-decoration: underline;
}

strong {
    font-weight: bold;
    color: #1a202c;
}

em {
    font-style: italic;
}

/* Tableau contenu */
.toc {
    page-break-after: always;
    border-bottom: 2px solid #cbd5e0;
    padding-bottom: 0.5cm;
}

/* Cover page */
.cover {
    page-break-after: always;
    text-align: center;
    padding-top: 3cm;
}

.cover h1 {
    page-break-before: avoid;
    font-size: 36pt;
    margin: 1cm 0;
    border: none;
}

.cover p {
    font-size: 14pt;
    color: #666;
    margin: 0.5cm 0;
}

.cover .meta {
    margin-top: 3cm;
    font-size: 11pt;
    color: #999;
}

/* Section de titre */
.section-break {
    page-break-before: always;
}

/* Code blocks avec coloration */
.lang-javascript,
.lang-typescript,
.lang-python {
    display: block;
}

/* Icons placeholders */
.emoji {
    font-size: 1.2em;
}

/* Listes avec emojis */
li::before {
    margin-right: 0.3cm;
}
"""
    return css_content

def markdown_to_html(markdown_text):
    """Convertit Markdown en HTML."""
    # Extensions markdown
    extensions = [
        'markdown.extensions.tables',
        'markdown.extensions.fenced_code',
        'markdown.extensions.codehilite',
        'markdown.extensions.toc',
    ]
    
    html = markdown.markdown(markdown_text, extensions=extensions)
    
    # HTML wrapper
    wrapper = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisiConnect — Dossier Projet</title>
    <style>
{create_css()}
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover">
        <h1>🎥 VisiConnect</h1>
        <h2>Dossier Projet</h2>
        <p>Concepteur Développeur d'Applications (RNCP37873)</p>
        <div class="meta">
            <p><strong>Candidat:</strong> Théo GARCES</p>
            <p><strong>Centre:</strong> CODA Orléans</p>
            <p><strong>Session d'examen:</strong> 3 juillet 2026</p>
            <p><strong>Date du rapport:</strong> {datetime.now().strftime("%d %B %Y")}</p>
        </div>
    </div>

    <!-- Table of Contents (placé mais pas généré auto) -->
    <h2>Table des matières</h2>
    <div class="toc">
        <ol>
            <li>Présentation du candidat</li>
            <li>Contexte entreprise & service</li>
            <li>Présentation du projet</li>
            <li>Cahier des charges</li>
            <li>Gestion de projet</li>
            <li>Spécifications fonctionnelles</li>
            <li>Conception technique</li>
            <li>Modèle de données</li>
            <li>Réalisation logicielle</li>
            <li>Tests et qualité</li>
            <li>Mise en œuvre de la qualité et sécurité</li>
            <li>Déploiement</li>
            <li>Veille technologique</li>
            <li>Maintenance</li>
            <li>Conformité RGPD</li>
            <li>Bilan personnel</li>
            <li>Bibliographie</li>
            <li>Annexes</li>
        </ol>
    </div>

    <!-- Contenu principal -->
    {html}
</body>
</html>"""
    return wrapper

def generate_pdf(markdown_path, output_path):
    """Génère le PDF à partir du Markdown."""
    print(f"📖 Lecture du fichier: {markdown_path}")
    markdown_text = read_markdown(markdown_path)
    
    print("🔄 Conversion Markdown → HTML")
    html_content = markdown_to_html(markdown_text)
    
    print("📄 Génération du PDF avec WeasyPrint")
    HTML(string=html_content).write_pdf(str(output_path))
    
    # Vérifier le fichier
    if output_path.exists():
        size_mb = output_path.stat().st_size / (1024 * 1024)
        print(f"✅ PDF généré avec succès!")
        print(f"📍 Localisation: {output_path}")
        print(f"📊 Taille: {size_mb:.2f} MB")
        return True
    else:
        print(f"❌ Erreur: Le fichier PDF n'a pas été créé")
        return False

if __name__ == "__main__":
    print("=" * 70)
    print("  VisiConnect — Générateur PDF Dossier Projet")
    print("=" * 70)
    
    if not DOSSIER_PATH.exists():
        print(f"❌ Fichier source non trouvé: {DOSSIER_PATH}")
        sys.exit(1)
    
    try:
        success = generate_pdf(DOSSIER_PATH, OUTPUT_PATH)
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Erreur lors de la génération: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
