/**
 * SmartNotesService - Génération de résumés IA via OpenRouter
 *
 * Utilise les modèles gratuits:
 * - meta-llama/llama-3.1-8b-instruct:free
 * - mistralai/mistral-7b-instruct:free
 */

import { apiFetch } from '../../lib/apiClient';

const AI_ENDPOINT = '/api/ai/chat';

// Modèles gratuits disponibles sur OpenRouter
export const FREE_MODELS = {
  LLAMA: 'meta-llama/llama-3.1-8b-instruct:free',
  MISTRAL: 'mistralai/mistral-7b-instruct:free',
  QWEN: 'qwen/qwen-2-7b-instruct:free',
};

class SmartNotesService {
  constructor() {
    this.preferredModel = FREE_MODELS.LLAMA;
  }

  /**
   * Génère un résumé de réunion à partir du transcript et/ou chat
   */
  async generateMeetingSummary({ transcript, chatMessages, meetingTitle, duration }) {
    // Prépare le contexte
    let context = `# Contexte de la réunion\n`;
    context += `Titre: ${meetingTitle || 'Réunion VisioConnect'}\n`;
    context += `Durée: ${duration || 'Non spécifiée'}\n\n`;

    if (transcript && transcript.length > 0) {
      context += `## Transcription\n`;
      context += transcript
        .map((entry) => {
          const time = new Date(entry.timestamp).toLocaleTimeString('fr-FR');
          return `[${time}] ${entry.speaker || 'Participant'}: ${entry.text}`;
        })
        .join('\n');
      context += '\n\n';
    }

    if (chatMessages && chatMessages.length > 0) {
      context += `## Messages du chat\n`;
      context += chatMessages.map((msg) => `${msg.sender || 'Anonyme'}: ${msg.text}`).join('\n');
    }

    if (!transcript?.length && !chatMessages?.length) {
      throw new Error('Aucun contenu à résumer');
    }

    const response = await apiFetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: `Résume cette réunion de manière structurée:\n\n${context}`,
          },
        ],
        purpose: 'summary',
        model: this.preferredModel,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur API: ${error}`);
    }

    const data = await response.json();
    return {
      summary: data.content,
      model: data.provider || 'openrouter',
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Génère des points d'action à partir du résumé
   */
  async extractActionItems(summaryOrTranscript) {
    const content =
      typeof summaryOrTranscript === 'string'
        ? summaryOrTranscript
        : summaryOrTranscript.map((e) => e.text).join(' ');

    const response = await apiFetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `Tu es un assistant qui extrait les actions à faire d'une réunion.
Format de sortie JSON:
{
  "actions": [
    {"task": "...", "assignee": "...", "deadline": "...", "priority": "high|medium|low"}
  ]
}
Réponds UNIQUEMENT avec le JSON, sans texte autour.`,
          },
          {
            role: 'user',
            content: `Extrais les actions à faire de ce contenu:\n\n${content}`,
          },
        ],
        model: this.preferredModel,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'extraction des actions");
    }

    const data = await response.json();

    try {
      // Parse le JSON de la réponse
      const jsonMatch = data.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.warn('[SmartNotes] Parsing JSON échoué, retour texte brut');
    }

    return { actions: [], rawText: data.content };
  }

  /**
   * Génère des notes clés
   */
  async generateKeyNotes(transcript) {
    const text = transcript.map((e) => e.text).join(' ');

    const response = await apiFetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `Tu es un assistant qui identifie les points clés d'une discussion.
Retourne une liste à puces des 5-10 points les plus importants.
Sois concis et précis.`,
          },
          {
            role: 'user',
            content: `Identifie les points clés:\n\n${text}`,
          },
        ],
        model: this.preferredModel,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération des notes clés');
    }

    const data = await response.json();
    return data.content;
  }

  /**
   * Exporte le résumé dans différents formats
   */
  exportSummary(summary, format = 'markdown') {
    const { summary: content, generatedAt } = summary;
    const header = `# Compte-rendu de réunion\n_Généré le ${new Date(generatedAt).toLocaleString('fr-FR')}_\n\n`;

    if (format === 'markdown') {
      return header + content;
    }

    if (format === 'html') {
      return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Compte-rendu de réunion</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; }
    h1 { color: #1e40af; }
    h2 { color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; }
    ul { padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <h1>Compte-rendu de réunion</h1>
  <p><em>Généré le ${new Date(generatedAt).toLocaleString('fr-FR')}</em></p>
  ${content
    .replace(/\n/g, '<br>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')}
</body>
</html>`;
    }

    // Plain text
    return header.replace(/[#_]/g, '') + content.replace(/[#*_]/g, '');
  }

  /**
   * Change le modèle préféré
   */
  setModel(model) {
    this.preferredModel = model;
  }
}

// Singleton
let instance = null;

export const getSmartNotesService = () => {
  if (!instance) {
    instance = new SmartNotesService();
  }
  return instance;
};

export default SmartNotesService;
