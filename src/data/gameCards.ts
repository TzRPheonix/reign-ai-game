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

// Cartes avec effets simplifiés (une stat positive +10, une stat négative -10)
const baseCards: Card[] = [
  {
    id: 19,
    title: "IA pour prédire les catastrophes climatiques",
    description: "L'IA analyse en temps réel les données météo pour prévoir inondations, tempêtes et canicules pour évacuer plus vites les populations",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 0,
      humanite: 10,
      ethique: -10
    },
    swipeDirection: "right",
    explanation: "Sauve des vies mais surveillance météo généralisée."
  },
  {
    id: 20,
    title: "Drones autonomes de surveillance urbaine",
    description: "Des drones équipés d'IA patrouilleraient les quartiers sensibles pour détecter comportements suspects et prévenir des délits.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 10,
      humanite: -10,
      ethique: 0
    },
    swipeDirection: "left",
    explanation: "Améliore la sécurité mais surveillance intrusive."
  },
  {
    id: 21,
    title: "Interdire les IA génératives gourmandes",
    description: "Certains modèles IA consomment plus d'électricité qu'un village entier ; faut-il les bannir pour protéger la planète ?",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 10,
      intelligenceArtificielle: -10,
      humanite: 0,
      ethique: 0
    },
    swipeDirection: "right",
    explanation: "Protège l'environnement mais freine l'innovation IA."
  },
  {
    id: 22,
    title: "Taxe carbone sur les modèles de langage",
    description: "Face à l'explosion de l'empreinte carbone des IA, certains politiciens proposent une taxe carbone spécifique.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 10,
      intelligenceArtificielle: -10,
      humanite: 0,
      ethique: 0
    },
    swipeDirection: "right",
    explanation: "Réduit l'impact environnemental mais ralentit le développement IA."
  },
  {
    id: 23,
    title: "Autoriser le transhumanisme",
    description: "Certains mouvements veulent hybrider le corps humain et la machine pour repousser les limites biologiques.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 10,
      humanite: -10,
      ethique: 0
    },
    swipeDirection: "left",
    explanation: "Repousse les limites humaines mais menace l'humanité naturelle."
  },
  {
    id: 24,
    title: "Édition génétique préventive",
    description: "Grâce à CRISPR, on pourrait corriger des maladies héréditaires sur les embryons.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 0,
      humanite: 10,
      ethique: -10
    },
    swipeDirection: "right",
    explanation: "Élimine les maladies héréditaires mais questions éthiques majeures."
  },
  {
    id: 25,
    title: "Villes ultra-denses pour la nature",
    description: "Des arcologies géantes permettraient de libérer la nature en concentrant tous les humains.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 10,
      intelligenceArtificielle: 0,
      humanite: -10,
      ethique: 0
    },
    swipeDirection: "right",
    explanation: "Protège la nature mais contraint la liberté humaine."
  },
  {
    id: 26,
    title: "IA pour détecter les épidémies",
    description: "Des modèles d'IA pourraient prédire la diffusion des maladies animales avant qu'elles ne contaminent l'homme.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 10,
      humanite: -10,
      ethique: 0
    },
    swipeDirection: "left",
    explanation: "Prévient les épidémies mais surveillance biologique généralisée."
  },
  {
    id: 27,
    title: "Refuser l'allongement de vie",
    description: "Des biotechnologies permettraient de vivre 150 ans, mais bouleverseraient l'équilibre social et écologique.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 0,
      humanite: -10,
      ethique: 10
    },
    swipeDirection: "left",
    explanation: "Préserve l'équilibre social mais limite les progrès médicaux."
  },
  {
    id: 28,
    title: "IA pour optimiser l'eau agricole",
    description: "Des modèles prédictifs intelligents pourraient réguler l'irrigation pour économiser l'eau tout en protégeant les cultures.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop",
    category: "environnement",
    statsChange: {
      environnement: 10,
      intelligenceArtificielle: 0,
      humanite: 0,
      ethique: -10
    },
    swipeDirection: "right",
    explanation: "Économise l'eau mais contrôle agricole centralisé."
  },
  {
    id: 29,
    title: "Coloniser Mars malgré l'écosystème",
    description: "La terraformation pourrait éradiquer la moindre trace de vie microbienne sur Mars.",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: -10,
      intelligenceArtificielle: 0,
      humanite: 10,
      ethique: 0
    },
    swipeDirection: "right",
    explanation: "Élargit l'horizon humain mais détruit l'écosystème martien."
  },
  {
    id: 30,
    title: "Bébés designers en laboratoire",
    description: "Grâce aux biotechnologies, on pourrait choisir la taille, l'intelligence ou la couleur des yeux d'un enfant.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 0,
      humanite: 10,
      ethique: -10
    },
    swipeDirection: "right",
    explanation: "Améliore le potentiel humain mais questions éthiques fondamentales."
  },
  {
    id: 31,
    title: "Encadrer l'IA publicitaire",
    description: "Les publicitaires seraient contraints de limiter l'usage des deepfakes et des textes IA pour protéger les consommateurs.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    category: "ethique",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: -10,
      humanite: 0,
      ethique: 10
    },
    swipeDirection: "right",
    explanation: "Protège les consommateurs mais limite l'innovation publicitaire."
  },
  {
    id: 32,
    title: "Amis virtuels IA contre la solitude",
    description: "Des chatbots émotionnels pourraient aider les personnes isolées à discuter 24/7.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    category: "humanite",
    statsChange: {
      environnement: 0,
      intelligenceArtificielle: 0,
      humanite: 10,
      ethique: -10
    },
    swipeDirection: "right",
    explanation: "Lutte contre la solitude mais remplace les relations humaines."
  },
  {
    id: 33,
    title: "IA pour coloniser la Lune",
    description: "Des robots IA construiraient des bases lunaires, au risque de détruire la surface vierge de la Lune.",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400&h=200&fit=crop",
    category: "intelligenceArtificielle",
    statsChange: {
      environnement: -10,
      intelligenceArtificielle: 10,
      humanite: 0,
      ethique: 0
    },
    swipeDirection: "left",
    explanation: "Développe l'exploration spatiale mais pollue la Lune."
  }
];

// Exporter les cartes mélangées
export const gameCards: Card[] = shuffleArray(baseCards); 