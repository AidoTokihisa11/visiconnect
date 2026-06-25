#!/usr/bin/env python3
"""
Génère un PDF professionnel avec reportlab (plus portable que weasyprint).
"""

import sys
from pathlib import Path
from datetime import datetime

try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import cm
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
    from reportlab.lib import colors
    from reportlab.pdfgen import canvas
    import markdown
    print("✅ Dépendances disponibles (reportlab + markdown)")
except ImportError as e:
    print(f"❌ Dépendance manquante: {e}")
    print("\nInstallation requise:")
    print("  pip install reportlab markdown")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DOSSIER_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.md"
OUTPUT_PATH = PROJECT_ROOT / "dossiers" / "03_DOSSIER_PROJET.pdf"

def read_markdown(path):
    """Lit le fichier Markdown."""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def generate_pdf_simple():
    """Génère un PDF simple avec reportlab."""
    print(f"📖 Lecture du fichier: {DOSSIER_PATH}")
    markdown_text = read_markdown(DOSSIER_PATH)
    
    # Convertir Markdown en HTML simple
    print("🔄 Conversion Markdown → HTML")
    html_content = markdown.markdown(
        markdown_text,
        extensions=['markdown.extensions.tables', 'markdown.extensions.fenced_code']
    )
    
    # Parser HTML simple (extraction du texte)
    import re
    # Enlever les tags HTML
    text = re.sub(r'<[^>]+>', '', html_content)
    # Remplacer les entités HTML courantes
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&lt;', '<')
    text = text.replace('&gt;', '>')
    text = text.replace('&amp;', '&')
    
    # Créer le PDF
    print("📄 Génération du PDF avec ReportLab")
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
        title="VisiConnect — Dossier Projet",
        author="Théo GARCES"
    )
    
    # Styles
    styles = getSampleStyleSheet()
    story = []
    
    # Cover page
    cover_title = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontSize=32,
        textColor=colors.HexColor('#1a365d'),
        spaceAfter=0.5*cm,
        alignment=1,  # center
    )
    
    cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#2c5282'),
        spaceAfter=1*cm,
        alignment=1,
    )
    
    cover_text = ParagraphStyle(
        'CoverText',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.HexColor('#666'),
        spaceAfter=0.3*cm,
        alignment=1,
    )
    
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("🎥 <b>VisiConnect</b>", cover_title))
    story.append(Paragraph("Dossier Projet", cover_subtitle))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Concepteur Développeur d'Applications (RNCP37873)", cover_text))
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph(f"<b>Candidat:</b> Théo GARCES", cover_text))
    story.append(Paragraph(f"<b>Centre:</b> CODA Orléans", cover_text))
    story.append(Paragraph(f"<b>Session:</b> 3 juillet 2026", cover_text))
    story.append(Paragraph(f"<b>Date:</b> {datetime.now().strftime('%d %B %Y')}", cover_text))
    story.append(PageBreak())
    
    # Contenu principal (100 premières lignes de texte)
    lines = text.split('\n')
    for line in lines[:500]:  # Limiter pour test
        if line.strip():
            story.append(Paragraph(line[:200], styles['Normal']))
            story.append(Spacer(1, 0.2*cm))
    
    # Générer le PDF
    try:
        doc.build(story)
        
        if OUTPUT_PATH.exists():
            size_mb = OUTPUT_PATH.stat().st_size / (1024 * 1024)
            print(f"✅ PDF généré avec succès!")
            print(f"📍 Localisation: {OUTPUT_PATH}")
            print(f"📊 Taille: {size_mb:.2f} MB")
            return True
        else:
            print(f"❌ Erreur: Le fichier PDF n'a pas été créé")
            return False
    except Exception as e:
        print(f"❌ Erreur lors de la génération: {e}")
        return False

if __name__ == "__main__":
    print("=" * 70)
    print("  VisiConnect — Générateur PDF (ReportLab)")
    print("=" * 70)
    
    if not DOSSIER_PATH.exists():
        print(f"❌ Fichier source non trouvé: {DOSSIER_PATH}")
        sys.exit(1)
    
    try:
        success = generate_pdf_simple()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Erreur critique: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
