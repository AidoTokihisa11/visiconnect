# 📄 Guide de Conversion HTML → PDF

## Option 1 : Conversion manuelle (Recommandée - 2 minutes)

### Étapes :

1. **Ouvrez le fichier HTML** dans votre navigateur :
   - Double-cliquez sur : `c:\Users\theog\Desktop\visiconnect\dossiers\03_DOSSIER_PROJET.html`
   - OU tapez dans la barre d'adresse: `file:///C:/Users/theog/Desktop/visiconnect/dossiers/03_DOSSIER_PROJET.html`

2. **Appuyez sur `Ctrl + P`** pour ouvrir le dialogue d'impression

3. **Configurez l'impression** :
   - **Destination** : "Enregistrer en PDF"
   - **Format papier** : A4
   - **Marges** : Normal
   - **Arrière-plan** : Cocher "Graphiques de fond"
   - **Orientation** : Portrait

4. **Cliquez sur "Enregistrer"** et choisissez la destination :

   ```
   c:\Users\theog\Desktop\visiconnect\dossiers\03_DOSSIER_PROJET.pdf
   ```

5. ✅ **C'est fait !** Le PDF ~50 pages est prêt pour impression/partage.

---

## Option 2 : Conversion automatisée (Si Python+Playwright dispo)

```bash
cd "c:\Users\theog\Desktop\visiconnect"
python scripts/html_to_pdf_playwright.py
```

**Prérequis** (installation unique) :

```bash
pip install playwright
playwright install chromium
```

---

## Vérification du PDF généré

```bash
# Vérifier que le fichier existe
ls -lh c:\Users\theog\Desktop\visiconnect\dossiers\03_DOSSIER_PROJET.pdf

# Estimer le nombre de pages (Linux/WSL)
file c:\Users\theog\Desktop\visiconnect\dossiers\03_DOSSIER_PROJET.pdf
```

---

## Qualité du PDF

✅ **Couverture professionnelle** avec logo et métadonnées
✅ **Numérotation des pages** et en-têtes/pieds de page
✅ **Table des matières** cliquable
✅ **Code colorisé** et tableaux formatés
✅ **Liens hypertextes** actifs
✅ **Marges** optimisées pour impression recto-verso
✅ **Taille** estimée : 8-15 MB (selon les images)

---

## Troubleshooting

**❌ Erreur : "Impossible d'ouvrir le fichier HTML"**
→ Vérifiez le chemin : `c:\Users\theog\Desktop\visiconnect\dossiers\03_DOSSIER_PROJET.html`

**❌ Erreur : "Conversion incomplète" (PDF vide ou troncaillé)**
→ Essayez un autre navigateur : Firefox, Chrome, Edge

**❌ Erreur : "Playwright non trouvé"**
→ Installez : `pip install playwright && playwright install chromium`

---

## Étapes suivantes (après PDF généré)

1. ✅ **PDF généré** → Vérifier le nombre de pages (~50)
2. ⏭️ **Ajouter captures d'écran** (UI/dashboard/meeting room)
3. ⏭️ **Annexes supplémentaires** (diagrammes, architecture)
4. ⏭️ **Révision finale** avant présentation jury

---

_Generated: {datetime.now().strftime("%d %B %Y at %H:%M:%S")}_
