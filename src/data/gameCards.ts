import { Card } from '../types/gameTypes';

// Fonction pour mélanger un tableau
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Cartes avec effets mixtes (toutes ont des aspects positifs et négatifs)
const baseCards: Card[] = [
  {
    id: 1,
    title: "IA pour la Conservation",
    description: "Le peuple demande une IA qui analyse les images satellites pour détecter la déforestation illégale. Investir dans cette technologie ?",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 8,
      intelligenceArtificielle: 5,
      humanite: -2,
      ethique: -3
    },
    swipeDirection: "right",
    explanation: "Protège l'environnement mais peut être utilisée pour la surveillance."
  },
  {
    id: 2,
    title: "Chatbot Éducatif",
    description: "Les écoles demandent un chatbot qui aide les enfants défavorisés à apprendre les mathématiques. Déployer cette solution ?",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: -1,
      intelligenceArtificielle: 4,
      humanite: 7,
      ethique: -2
    },
    swipeDirection: "right",
    explanation: "Améliore l'éducation mais réduit l'interaction humaine."
  },
  {
    id: 3,
    title: "IA de Traitement des Déchets",
    description: "Les municipalités demandent une IA qui optimise le tri des déchets dans les centres de recyclage. Investir ?",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 9,
      intelligenceArtificielle: 3,
      humanite: -3,
      ethique: -1
    },
    swipeDirection: "right",
    explanation: "Améliore le recyclage mais peut remplacer des emplois."
  },
  {
    id: 4,
    title: "IA pour l'Agriculture Précise",
    description: "Les agriculteurs demandent une IA qui optimise l'utilisation d'eau et de pesticides. Adopter cette technologie ?",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 6,
      intelligenceArtificielle: 4,
      humanite: -2,
      ethique: -4
    },
    swipeDirection: "right",
    explanation: "Réduit l'impact environnemental mais dépendance technologique."
  },
  {
    id: 5,
    title: "IA de Diagnostic Médical",
    description: "Les hôpitaux réclament une IA qui aide à diagnostiquer les maladies rares. Faire confiance à l'IA pour la santé ?",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: -2,
      intelligenceArtificielle: 6,
      humanite: 8,
      ethique: -3
    },
    swipeDirection: "right",
    explanation: "Sauve des vies mais peut remplacer les médecins."
  },
  {
    id: 6,
    title: "IA pour les Énergies Renouvelables",
    description: "Les entreprises d'énergie demandent une IA qui optimise la production solaire et éolienne. Implémenter ?",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 7,
      intelligenceArtificielle: 5,
      humanite: -1,
      ethique: -2
    },
    swipeDirection: "right",
    explanation: "Accélère la transition énergétique mais contrôle centralisé."
  },
  {
    id: 7,
    title: "IA pour la Mobilité Durable",
    description: "Les villes demandent une IA qui optimise les transports publics et réduit les embouteillages. Adopter ?",
    image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 6,
      intelligenceArtificielle: 4,
      humanite: 3,
      ethique: -3
    },
    swipeDirection: "right",
    explanation: "Améliore la mobilité mais surveillance des déplacements."
  },
  {
    id: 8,
    title: "IA de Détection de Fake News",
    description: "Les médias demandent une IA qui détecte automatiquement les fausses informations. Déployer cette solution ?",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 5,
      humanite: 6,
      ethique: -4
    },
    swipeDirection: "right",
    explanation: "Combat la désinformation mais peut censurer la liberté d'expression."
  },
  {
    id: 9,
    title: "IA pour la Recherche Médicale",
    description: "Les laboratoires demandent une IA qui accélère la découverte de nouveaux médicaments. Investir ?",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: -3,
      intelligenceArtificielle: 6,
      humanite: 7,
      ethique: -2
    },
    swipeDirection: "right",
    explanation: "Accélère les découvertes mais tests sur animaux augmentés."
  },
  {
    id: 10,
    title: "IA de Gestion des Ressources",
    description: "Les villes demandent une IA qui optimise la consommation d'eau et d'électricité. Implémenter ?",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 8,
      intelligenceArtificielle: 4,
      humanite: -2,
      ethique: -3
    },
    swipeDirection: "right",
    explanation: "Économise les ressources mais surveillance des habitudes."
  },
  {
    id: 11,
    title: "Surveillance Urbaine IA",
    description: "La population exige une IA de surveillance pour la sécurité urbaine. Doit-on sacrifier la vie privée pour la sécurité ?",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 2,
      intelligenceArtificielle: 6,
      humanite: -8,
      ethique: -7
    },
    swipeDirection: "left",
    explanation: "Améliore la sécurité mais menace les libertés individuelles."
  },
  {
    id: 12,
    title: "IA de Trading Automatisé",
    description: "Les investisseurs réclament une IA de trading pour maximiser les profits financiers. Autoriser cette technologie ?",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    category: "intelligenceArtificielle",
    statsChange: {
      environnement: -3,
      intelligenceArtificielle: 8,
      humanite: -6,
      ethique: -5
    },
    swipeDirection: "left",
    explanation: "Améliore l'efficacité financière mais crée des inégalités."
  },
  {
    id: 13,
    title: "IA de Création de Contenu",
    description: "Les médias exigent une IA qui génère automatiquement des articles et vidéos. Utiliser pour l'information ?",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    category: "intelligenceArtificielle",
    statsChange: {
      environnement: -1,
      intelligenceArtificielle: 7,
      humanite: -5,
      ethique: -4
    },
    swipeDirection: "left",
    explanation: "Augmente la productivité mais menace les emplois créatifs."
  },
  {
    id: 14,
    title: "IA de Manipulation Sociale",
    description: "Les partis politiques demandent une IA qui analyse et influence les comportements électoraux. Autoriser ?",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: -2,
      intelligenceArtificielle: 8,
      humanite: -9,
      ethique: -8
    },
    swipeDirection: "left",
    explanation: "Améliore l'analyse politique mais menace la démocratie."
  },
  {
    id: 15,
    title: "IA de Surveillance Biométrique",
    description: "Les forces de l'ordre exigent une IA de reconnaissance faciale pour la sécurité. Implémenter cette surveillance ?",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    category: "intelligenceArtificielle",
    statsChange: {
      environnement: 1,
      intelligenceArtificielle: 7,
      humanite: -7,
      ethique: -6
    },
    swipeDirection: "left",
    explanation: "Améliore la sécurité mais surveillance généralisée."
  },
  {
    id: 16,
    title: "IA de Recrutement Automatisé",
    description: "Les entreprises demandent une IA qui sélectionne automatiquement les candidats. Autoriser cette pratique ?",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 6,
      humanite: -6,
      ethique: -5
    },
    swipeDirection: "left",
    explanation: "Améliore l'efficacité mais renforce les discriminations."
  },
  {
    id: 17,
    title: "IA de Trading Haute Fréquence",
    description: "Les banques demandent une IA qui fait du trading ultra-rapide. Autoriser cette technologie ?",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    category: "intelligenceArtificielle",
    statsChange: {
      environnement: -4,
      intelligenceArtificielle: 9,
      humanite: -7,
      ethique: -6
    },
    swipeDirection: "left",
    explanation: "Maximise les profits mais instabilité financière."
  },
  {
    id: 18,
    title: "IA de Scoring Social",
    description: "Le gouvernement demande une IA qui évalue le comportement social des citoyens. Autoriser ?",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 7,
      humanite: -10,
      ethique: -9
    },
    swipeDirection: "left",
    explanation: "Améliore la gouvernance mais contrôle social total."
  }
];

// Exporter les cartes mélangées
export const gameCards: Card[] = shuffleArray(baseCards); 