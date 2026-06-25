#!/usr/bin/env python3
"""
Génère un HTML professionnel convertible en PDF via le navigateur.
Plus portable que reportlab/weasyprint sur Windows.
"""

import sys
from pathlib import Path
from datetime import datetime

try:
    import markdown
    print("✅ Markdown disponible")
except ImportError:
    print("❌ Markdown manquant")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DOSSIER_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.md"
OUTPUT_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.html"

def read_markdown(path):
    """Lit le fichier Markdown."""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def generate_html():
    """Génère un HTML professionnel."""
    print(f"📖 Lecture du fichier: {DOSSIER_PATH}")
    markdown_text = read_markdown(DOSSIER_PATH)
    
    # Convertir Markdown en HTML
    print("🔄 Conversion Markdown → HTML")
    html_content = markdown.markdown(
        markdown_text,
        extensions=[
            'markdown.extensions.tables',
            'markdown.extensions.fenced_code',
            'markdown.extensions.toc',
            'markdown.extensions.extra',
        ]
    )
    
    # Template HTML professionnel
    html_template = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Théo GARCES">
    <meta name="description" content="Dossier Projet VisiConnect - Concepteur Développeur d'Applications">
    <title>VisiConnect — Dossier Projet (RNCP37873)</title>
    <style>
        @page {{
            size: A4;
            margin: 2cm;
            @bottom-center {{
                content: "Page " counter(page) " / " counter(pages);
                font-size: 10pt;
                color: #999;
            }}
            @top-right {{
                content: "VisiConnect — Dossier Projet";
                font-size: 9pt;
                color: #ccc;
            }}
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        html {{
            font-size: 16px;
            line-height: 1.6;
        }}

        body {{
            font-family: 'Segoe UI', 'Trebuchet MS', Arial, sans-serif;
            color: #222;
            background: white;
            padding: 0;
            line-height: 1.7;
        }}

        /* Cover Page */
        .cover-page {{
            page-break-after: always;
            text-align: center;
            padding-top: 4cm;
            padding-bottom: 2cm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 100vh;
            border-bottom: 3px solid #2d3748;
        }}

        .cover-page h1 {{
            font-size: 48px;
            color: #1a365d;
            margin-bottom: 0.5cm;
            font-weight: 700;
        }}

        .cover-page h2 {{
            font-size: 28px;
            color: #2c5282;
            margin-bottom: 1cm;
            font-weight: 600;
        }}

        .cover-page .subtitle {{
            font-size: 14px;
            color: #666;
            margin-bottom: 2cm;
        }}

        .cover-page .meta {{
            font-size: 12px;
            color: #555;
            margin-top: 3cm;
            line-height: 2;
            text-align: center;
        }}

        .cover-page .meta p {{
            margin: 0.5cm 0;
        }}

        /* Page Break Before H1 */
        h1 {{
            page-break-before: always;
            font-size: 28pt;
            color: #1a365d;
            border-bottom: 3px solid #3182ce;
            padding-bottom: 0.5cm;
            margin-top: 1.5cm;
            margin-bottom: 0.8cm;
            font-weight: 700;
        }}

        h1:first-child {{
            page-break-before: avoid;
        }}

        h2 {{
            font-size: 20pt;
            color: #2c5282;
            margin-top: 1.2cm;
            margin-bottom: 0.5cm;
            border-left: 4px solid #63b3ed;
            padding-left: 0.5cm;
            page-break-after: avoid;
            font-weight: 600;
        }}

        h3 {{
            font-size: 14pt;
            color: #2d3748;
            margin-top: 0.8cm;
            margin-bottom: 0.3cm;
            page-break-after: avoid;
            font-weight: 600;
        }}

        h4 {{
            font-size: 12pt;
            color: #4a5568;
            margin-top: 0.6cm;
            margin-bottom: 0.2cm;
            font-weight: 600;
        }}

        p {{
            margin-bottom: 0.5cm;
            text-align: justify;
            line-height: 1.7;
        }}

        a {{
            color: #3182ce;
            text-decoration: underline;
        }}

        a:visited {{
            color: #2c5282;
        }}

        strong {{
            font-weight: 700;
            color: #1a202c;
        }}

        em {{
            font-style: italic;
            color: #2d3748;
        }}

        /* Code */
        code {{
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 3px;
            padding: 2px 4px;
            font-family: 'Courier New', 'Consolas', monospace;
            font-size: 13px;
            color: #c53030;
        }}

        pre {{
            background: #f7fafc;
            border: 1px solid #cbd5e0;
            border-radius: 4px;
            padding: 0.8cm;
            margin: 0.5cm 0;
            overflow-x: auto;
            page-break-inside: avoid;
            font-size: 11px;
            line-height: 1.4;
        }}

        pre code {{
            background: none;
            border: none;
            padding: 0;
            color: #222;
            font-size: 11px;
        }}

        /* Lists */
        ul, ol {{
            margin-bottom: 0.5cm;
            margin-left: 1.5cm;
            padding-left: 0.5cm;
        }}

        li {{
            margin-bottom: 0.2cm;
            line-height: 1.6;
        }}

        li:first-child {{
            page-break-after: avoid;
        }}

        /* Blockquote */
        blockquote {{
            border-left: 4px solid #4299e1;
            margin: 0.5cm 0;
            padding-left: 0.8cm;
            padding-right: 0;
            padding-top: 0.2cm;
            padding-bottom: 0.2cm;
            color: #4a5568;
            font-style: italic;
            background: #f7fafc;
            page-break-inside: avoid;
        }}

        /* Table */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 0.8cm 0;
            page-break-inside: avoid;
            font-size: 11px;
            line-height: 1.4;
        }}

        table th {{
            background: #2d3748;
            color: white;
            padding: 0.4cm;
            text-align: left;
            font-weight: 700;
            border: 1px solid #1a202c;
        }}

        table td {{
            border: 1px solid #cbd5e0;
            padding: 0.4cm;
            vertical-align: top;
        }}

        table tr:nth-child(even) {{
            background: #f7fafc;
        }}

        table tr:hover {{
            background: #edf2f7;
        }}

        /* TOC */
        .toc {{
            page-break-after: always;
            margin-bottom: 1cm;
        }}

        .toc h2 {{
            margin-top: 0;
            border: none;
            padding: 0;
            color: #1a365d;
        }}

        .toc ul {{
            margin: 0.5cm 0;
            padding-left: 1.5cm;
        }}

        .toc li {{
            margin-bottom: 0.3cm;
        }}

        .toc a {{
            text-decoration: none;
            color: #3182ce;
        }}

        .toc a:hover {{
            text-decoration: underline;
        }}

        /* HR */
        hr {{
            border: none;
            border-top: 2px solid #cbd5e0;
            margin: 1cm 0;
            page-break-after: avoid;
        }}

        /* Sections annexes */
        .annexe {{
            page-break-before: always;
            margin-top: 2cm;
        }}

        /* Print styles */
        @media print {{
            body {{
                background: white;
                color: #222;
            }}

            a {{
                color: #3182ce;
                text-decoration: underline;
            }}

            h1, h2, h3, h4 {{
                page-break-after: avoid;
                page-break-inside: avoid;
            }}

            table, blockquote, pre {{
                page-break-inside: avoid;
            }}

            ul, ol, p {{
                page-break-inside: avoid;
            }}
        }}
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover-page">
        <h1>🎥 VisiConnect</h1>
        <h2>Dossier Projet</h2>
        <div class="subtitle">
            <p>Concepteur Développeur d'Applications — RNCP37873</p>
        </div>
        <div class="meta">
            <p><strong>Candidat:</strong> Théo GARCES</p>
            <p><strong>Email:</strong> theo.garces.aido@gmail.com</p>
            <p><strong>Centre de formation:</strong> CODA Orléans</p>
            <p><strong>Session d'examen:</strong> 3 juillet 2026</p>
            <p><strong>Date du rapport:</strong> {datetime.now().strftime("%d %B %Y")}</p>
            <p><strong>URL production:</strong> https://visioconnect.pro</p>
            <p><strong>Dépôt GitHub:</strong> https://github.com/AidoTokihisa11/visiconnect</p>
        </div>
    </div>

    <!-- Contenu Principal -->
    {html_content}

    <!-- Footer -->
    <footer style="margin-top: 2cm; padding-top: 1cm; border-top: 1px solid #cbd5e0; font-size: 10px; color: #999; text-align: center;">
        <p>Dossier Projet VisiConnect — {datetime.now().strftime("%d %B %Y")} — Théo GARCES © 2026</p>
    </footer>
</body>
</html>
"""
    
    # Écrire le fichier
    print("💾 Écriture du fichier HTML")
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    if OUTPUT_PATH.exists():
        size_kb = OUTPUT_PATH.stat().st_size / 1024
        print(f"✅ HTML généré avec succès!")
        print(f"📍 Localisation: {OUTPUT_PATH}")
        print(f"📊 Taille: {size_kb:.1f} KB")
        print(f"\n💡 Ensuite, pour convertir en PDF:")
        print(f"   1. Ouvrez le fichier dans votre navigateur:")
        print(f"      file:///{OUTPUT_PATH}")
        print(f"   2. Appuyez sur Ctrl+P (imprimer)")
        print(f"   3. Sélectionnez 'Enregistrer en PDF'")
        print(f"   4. Cliquez sur 'Enregistrer'")
        return True
    else:
        print(f"❌ Erreur: Le fichier HTML n'a pas été créé")
        return False

if __name__ == "__main__":
    print("=" * 70)
    print("  VisiConnect — Générateur HTML (convertible PDF)")
    print("=" * 70)
    
    if not DOSSIER_PATH.exists():
        print(f"❌ Fichier source non trouvé: {DOSSIER_PATH}")
        sys.exit(1)
    
    try:
        success = generate_html()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Erreur critique: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
