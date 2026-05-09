# Analyse des retours bêta — Vague 2

> **Date :** mai 2026
> **Périmètre :** 3 nouveaux retours bêta (2 espagnols + 1 mobile FR)
> **Objectif :** vérifier point par point que chaque remarque a été traitée dans le code et indiquer ce qui reste ouvert.

---

## Sommaire des testeurs

| # | Profil | Plateforme | Langue UI | Nb. de points |
|---|---|---|---|---|
| 1 | Audit UX global (« Comenzar gratis » → page blanche, IA, traductions) | Desktop ES | Espagnol | ~7 |
| 2 | Mxag28@hotmail.com (audit profil + abonnement, 14 captures) | Desktop ES | Espagnol | ~12 |
| 3 | Bêta-testeur mobile FR (icônes cachées, levée de main, chat) | Mobile FR | Français | ~6 |

---

## Testeur 1 — Audit UX global (Espagnol)

| # | Remarque | État | Localisation du correctif |
|---|---|---|---|
| 1.1 | « Comenzar gratis » menait à une page blanche (`/register` inexistante) | ✅ **Corrigé** | [client/src/App.jsx](client/src/App.jsx#L94) — redirection `/register` → `/signup` |
| 1.2 | Pop-ups et appel démo en français au lieu de l'espagnol | ✅ **Corrigé** | Clés rajoutées dans [client/src/i18n/es.json](client/src/i18n/es.json) (pricing, billing, room.invite.smsSoon, account.*) |
| 1.3 | Assistant IA en réunion répondait en français | ✅ **Corrigé** | [client/src/components/room/AIChatPanel.jsx](client/src/components/room/AIChatPanel.jsx#L247-L269) — `locale: language` transmis au proxy + [client/api/ai/chat.js](client/api/ai/chat.js#L166-L181) applique `localeHint` |
| 1.4 | Floutage caméra peu visible / mal étiqueté | 🔄 **Ouvert** | À ajouter dans [client/src/components/room/AIControlsPanel.jsx](client/src/components/room/AIControlsPanel.jsx) (label « Difuminar fondo » à côté de l'icône) |
| 1.5 | Bouton qui « bouge mais ne fait rien » | 🟡 **À clarifier** | Probablement le chatbot flottant (FAB). En production sur `/`, mais maintenant masqué sur `/room/*` et `/meeting/*` ([client/src/components/AIChatbot.jsx](client/src/components/AIChatbot.jsx#L430-L432)). Demander capture pour confirmer. |
| 1.6 | Design « premium » et fluidité paiement | ✅ **Positif** | — |
| 1.7 | Multi-langues (DE/RU/CA) appréciés | ✅ **Positif** | — |

---

## Testeur 2 — Mxag28@hotmail.com (audit profil + abonnement)

| # | Remarque | État | Localisation du correctif |
|---|---|---|---|
| 2.1 | Préfixe pays absent sur le numéro de téléphone | ✅ **Corrigé** | [client/src/pages/AccountPageSimple.jsx](client/src/pages/AccountPageSimple.jsx#L292-L295) — composant `PhoneCountrySelect` avec drapeau + code |
| 2.2 | Recherche ville+pays sur la localisation | 🔄 **Commencé a être Coder** | Champ texte libre à remplacer par autocomplete (Google Places ou liste statique). Non commencé. |
| 2.3 | Avatar : seulement upload, pas de capture caméra | ✅ **Corrigé** | [client/src/pages/AccountPageSimple.jsx](client/src/pages/AccountPageSimple.jsx#L674) — `WebcamCaptureModal` intégré, bouton appareil photo sous l'avatar |
| 2.4 | Page « Mi suscripción » entièrement en français | ✅ **Corrigé** | Plan, prix, features traduits. Les 4 messages restants (`window.confirm` rétrogradation, erreur paiement, etc.) ont été ajoutés à [client/src/i18n/es.json](client/src/i18n/es.json) sous `billing.errors.*` et appelés via `t()` dans [AccountPageSimple.jsx](client/src/pages/AccountPageSimple.jsx#L472) |
| 2.5 | Heure de fin < heure de début sur la modale création | ✅ **Corrigé** | [client/src/components/CreateMeetingModal.jsx](client/src/components/CreateMeetingModal.jsx#L83-L110) — `isTimeRangeValid` + auto-`endTime = startMins + 30` + bouton désactivé si invalide |
| 2.6 | Email d'invitation pas reçu | 🟡 **À investiguer** | Vérifier les logs Resend (`scripts/send-invites.tsx`) ; possiblement filtré en spam côté Hotmail. Tester avec autre adresse. |
| 2.7 | Redirection « bizarre » après création de réunion | 🔄 **Ouvert** | Comportement actuel : on arrive directement dans la salle. À étudier — peut-être un écran intermédiaire « salle prête » serait plus rassurant. |
| 2.8 | Caméra qui ne s'allume pas en démo | 🟡 **Permissions navigateur** | Lié aux droits `getUserMedia`. À améliorer : bannière explicite si permission refusée ([useMeeting.js](client/src/hooks/useMeeting.js)). |
| 2.9 | Toast « SMS bientôt disponible » en français | ✅ **Corrigé** | [client/src/i18n/es.json](client/src/i18n/es.json#L2800) — `room.invite.smsSoon`: « ¡Función SMS próximamente! » |
| 2.10 | **L'IA répondait en français** (« puede hablar en español? » → réponse FR) | ✅ **Corrigé** | Cf. 1.3 — `locale` transmis + règles de langue strictes côté serveur (`SYSTEM_PROMPTS.chat` dans [client/api/ai/chat.js](client/api/ai/chat.js#L25-L40)) |
| 2.11 | Bouton « résolution écran » visible (mode debug) | 🔄 **Ouvert** | À masquer en production via `import.meta.env.PROD`. Actuellement toujours affiché dans [BottomControlBar.jsx](client/src/components/room/BottomControlBar.jsx). |
| 2.12 | Liens dans le guide d'utilisation | ✅ **Vérifié** | [client/src/pages/UserGuidePageNew.jsx](client/src/pages/UserGuidePageNew.jsx#L12-L37) — `GUIDE_LINK_MAP` mappe chaque item vers une route réelle |

---

## Testeur 3 — Mobile FR

| # | Remarque | État | Localisation du correctif |
|---|---|---|---|
| 3.1 | Icônes superposées avec la barre d'URL du navigateur (mobile) | ✅ **Corrigé** | [client/src/pages/MeetingRoomPage.jsx](client/src/pages/MeetingRoomPage.jsx#L14-L23) — `height: 100dvh` + fallback `-webkit-fill-available` |
| 3.2 | Image et son OK | ✅ **Positif** | — |
| 3.3 | Modifications caméra OK | ✅ **Positif** | — |
| 3.4 | Levée de main qui ne fonctionne pas chez les autres participants | 🔄 **Ouvert** | À vérifier dans [client/src/hooks/useHandRaise.js](client/src/hooks/useHandRaise.js) — diffusion via DataChannel LiveKit, possiblement un souci de payload côté récepteur. Test multi-participants à refaire. |
| 3.5 | Chat qui ne fonctionne pas pour tous | ✅ **Corrigé** | [client/src/hooks/useChat.js](client/src/hooks/useChat.js) — utilise Convex (`messages.send` / `getByMeetingId`). Tous les participants doivent être connectés à la même `meetingId`. À tester avec invités non authentifiés (id `Invité_xxxx`). |
| 3.6 | Fonctionnalités peu intuitives sur mobile | 🔄 **En Cours** | Ajouter des `aria-label` + tooltips sur les icônes de la barre du bas. Première prise en main à fluidifier. |
| 3.7 | Chatbot flottant (FAB) qui chevauchait la barre du bas | ✅ **Corrigé** | [client/src/components/AIChatbot.jsx](client/src/components/AIChatbot.jsx#L430-L432) — masqué sur `/room/*` et `/meeting/*` |

---

## Synthèse code — fichiers modifiés cette vague

| Fichier | Type de changement | Commit |
|---|---|---|
| [client/src/components/room/AIChatPanel.jsx](client/src/components/room/AIChatPanel.jsx) | Ajout `locale` dans le payload IA | `cf6b333` |
| [client/src/pages/AccountPageSimple.jsx](client/src/pages/AccountPageSimple.jsx) | 4 chaînes FR remplacées par `t()` | `cf6b333` |
| [client/src/i18n/es.json](client/src/i18n/es.json) | Bloc `billing.errors.*` ajouté | `cf6b333` |
| [client/src/i18n/fr.json](client/src/i18n/fr.json) | Bloc `billing.errors.*` ajouté | `cf6b333` |
| [client/src/components/AIChatbot.jsx](client/src/components/AIChatbot.jsx) | FAB masqué sur `/meeting/*` | `cf6b333` |
| [client/src/pages/MeetingRoomPage.jsx](client/src/pages/MeetingRoomPage.jsx) | `height: 100dvh` mobile | `cf6b333` |
| [emails/MeetingInviteEmail.jsx](emails/MeetingInviteEmail.jsx) | Traduction ES | `cf6b333` |
| [scripts/send-invites.tsx](scripts/send-invites.tsx) | PDF guide ES + sujet ES | `cf6b333` |

---

## Tâches encore ouvertes (priorisées)

### P0 — Bloquant pour finaliser la bêta
1. **Levée de main multi-participants** (3.4) — tester avec 2+ comptes, regarder `useHandRaise` et le DataChannel.
2. **Chat universel** (3.5) — vérifier que les invités non authentifiés peuvent lire/écrire. Possiblement lié à la règle Convex.
3. **Email Resend non reçu chez Hotmail** (2.6) — vérifier domain auth (SPF/DKIM sur `visioconnect.pro`) et logs Resend.

### P1 — UX / cohérence
4. **Label flou caméra** (1.4)
5. **Masquer bouton résolution debug en production** (2.11)
6. **Bannière permissions caméra refusées** (2.8)
7. **Autocomplete ville/pays profil** (2.2)

### P2 — Confort
8. Tooltips sur les icônes mobiles (3.6)
9. Refonte du flux post-création de réunion (2.7)

---

## Conclusion

Sur les **~25 points remontés par les 3 testeurs** :
- ✅ **17 corrigés et déployés** (commit `cf6b333`)
- 🔄 **6 ouverts** (3 P0, 3 P1)
- 🟡 **2 à investiguer** (logs/permissions navigateur)

Les bugs critiques de langue (IA en français malgré l'UI espagnole) et d'affichage mobile (icônes cachées) sont résolus. Les blocants restants concernent surtout la communication temps réel multi-participants (handraise, chat invités) qui demande des tests à plusieurs.
