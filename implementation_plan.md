# Intégration de l'Assistant IA Gemini

Ce document détaille le plan technique pour ajouter un assistant virtuel basé sur Google Gemini à votre site.

## Objectif

Ajouter une bulle de discussion flottante (chatbot) présente sur toutes les pages, capable de :

1. Répondre aux questions concernant le festival, les formations Nann-K, et l'aspect culturel de Podor.
2. Répondre à d'autres questions d'ordre général avec courtoisie.
3. Rediriger l'utilisateur vers l'adresse e-mail de contact `contact@levillagepodor.com` s'il ne connaît pas la réponse ou s'il s'agit d'une demande complexe.

> [!IMPORTANT]
> **User Review Required**
> Vous devrez créer une clé API sur [Google AI Studio](https://aistudio.google.com/) et l'ajouter à vos variables d'environnement Cloudflare (`GEMINI_API_KEY`). Veuillez confirmer que vous êtes prêt à le faire.

## Open Questions

- Quel nom souhaitez-vous donner à cet assistant ? (Ex: _Assistant The Village_, _Guide Nann-K_, etc.)
- Quelle couleur souhaitez-vous pour la bulle de chat ? (Aux couleurs du site, ou une autre couleur spécifique ?)

## Proposed Changes

### Configuration et Dépendances

- **[NEW]** Installation du SDK `@google/generative-ai` pour communiquer avec l'API Gemini depuis le serveur.

---

### Backend (Serveur Cloudflare via TanStack Start)

La communication avec Gemini doit se faire côté serveur pour ne pas exposer votre clé API au public.

#### **[NEW]** `src/lib/ai.ts`

Création d'un module serveur avec une fonction `createServerFn` (`envoyerMessageIA`) qui :

- Reçoit l'historique des messages de l'utilisateur.
- Initialise le modèle Gemini (ex: `gemini-1.5-flash`).
- Injecte un **Prompt Système** très précis. Ce prompt indiquera à l'IA son rôle, ses connaissances de base sur le site, et lui ordonnera de rediriger vers l'e-mail de contact en cas de doute.

---

### Frontend (Interface Utilisateur)

L'interface doit être élégante et s'intégrer au design existant de votre site.

#### **[NEW]** `src/components/ChatWidget.tsx`

- Une bulle flottante en bas à droite de l'écran.
- Au clic, elle ouvre une fenêtre de discussion.
- Affiche l'historique de la conversation actuelle.
- Un champ de saisie pour poser des questions.
- Des animations fluides d'ouverture/fermeture utilisant `framer-motion` (déjà présent sur le projet).

#### **[MODIFY]** `src/routes/__root.tsx`

- Import et ajout du composant `<ChatWidget />` dans la structure principale du site pour qu'il soit accessible sur toutes les pages.

## Verification Plan

### Tests Manuels

1. S'assurer que le widget apparaît correctement sur ordinateur et sur mobile.
2. Poser une question sur le festival et vérifier que la réponse est pertinente.
3. Poser une question hors sujet ou très complexe et vérifier que l'IA propose bien de contacter l'e-mail `contact@levillagepodor.com`.
4. Vérifier que les variables d'environnement fonctionnent correctement en local et en production.
