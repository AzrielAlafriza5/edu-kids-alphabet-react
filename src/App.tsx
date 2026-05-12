import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CategoryMenu } from './components/CategoryMenu';
import { LevelSelection } from './components/LevelSelection';
import { GamePlay } from './components/GamePlay';
import { Category, WordConfig } from './data/words';
import { startBgm, stopBgm, playBlup } from './lib/audio';
import { Volume2, VolumeX } from 'lucide-react';

export type ScreenState = 'welcome' | 'categories' | 'levels' | 'game';
export type Language = 'id' | 'en' | 'es' | 'de';

const TRANSLATIONS = {
  id: {
    start: 'MULAI',
    choose: 'PILIH KATEGORI',
    categories: 'Kategori',
    back: 'KEMBALI',
    points: 'Poin',
    progress: 'Kemajuan',
    finish: 'SELESAI',
    next: 'LANJUT',
    select: 'Pilih',
    tiru: 'Tiru Kata',
    choose_lang: 'Pilih Bahasa',
    locked: 'Butuh',
  },
  en: {
    start: 'START',
    choose: 'CHOOSE CATEGORY',
    categories: 'Categories',
    back: 'BACK',
    points: 'Points',
    progress: 'Progress',
    finish: 'FINISH',
    next: 'NEXT',
    select: 'Select',
    tiru: 'Copy Words',
    choose_lang: 'Choose Language',
    locked: 'Need',
  },
  es: {
    start: 'EMPEZAR',
    choose: 'ELEGIR CATEGORÍA',
    categories: 'Categorías',
    back: 'ATRÁS',
    points: 'Puntos',
    progress: 'Progreso',
    finish: 'TERMINAR',
    next: 'SIGUIENTE',
    select: 'Seleccionar',
    tiru: 'Copiar Palabras',
    choose_lang: 'Elegir Idioma',
    locked: 'Necesitas',
  },
  de: {
    start: 'START',
    choose: 'KATEGORIE WÄHLEN',
    categories: 'Kategorien',
    back: 'ZURÜCK',
    points: 'Punkte',
    progress: 'Fortschritt',
    finish: 'BEENDEN',
    next: 'WEITER',
    select: 'Wählen',
    tiru: 'Wörter kopieren',
    choose_lang: 'Sprache wählen',
    locked: 'Benötigt',
  }
};

const LEVEL_BACKGROUNDS = [
  'bg-[#FBCFE8]', // Soft Pink
  'bg-[#DCFCE7]', // Light Green
  'bg-[#FEF9C3]', // Pale Yellow
  'bg-[#E0F2FE]', // Sky Blue
  'bg-[#FFEDD5]', // Peach
  'bg-[#F3E8FF]', // Lavender
  'bg-[#FFFBEB]', // Cream
  'bg-[#ECFDF5]', // Mint
  'bg-[#FFE4E6]', // Rose
  'bg-[#F0FDFA]', // Teal
  'bg-[#ECFEFF]', // Cyan
  'bg-[#E0E7FF]', // Indigo
  'bg-[#EDE9FE]', // Violet
  'bg-[#FDF4FF]', // Fuchsia
  'bg-[#F8FAFC]', // Slate-50
];

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [language, setLanguage] = useState<Language>('id');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentWord, setCurrentWord] = useState<WordConfig | null>(null);
  const [isBgmOn, setIsBgmOn] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());
  const [points, setPoints] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('pintar_alfabet_lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedLevels = localStorage.getItem('pintar_alfabet_completed');
    if (savedLevels) {
      try {
        setCompletedLevels(new Set(JSON.parse(savedLevels)));
      } catch (e) {
        console.error('Failed to load completed levels', e);
      }
    }

    const savedPoints = localStorage.getItem('pintar_alfabet_points');
    if (savedPoints) {
      const parsedPoints = parseInt(savedPoints, 10);
      setPoints(isNaN(parsedPoints) ? 0 : parsedPoints);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('pintar_alfabet_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pintar_alfabet_completed', JSON.stringify(Array.from(completedLevels)));
  }, [completedLevels]);

  useEffect(() => {
    localStorage.setItem('pintar_alfabet_points', points.toString());
  }, [points]);

  useEffect(() => {
    const handleGlobalClick = () => {
      playBlup();
    };
    window.addEventListener('pointerdown', handleGlobalClick);
    return () => window.removeEventListener('pointerdown', handleGlobalClick);
  }, []);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isBgmOn) {
      if (screen === 'game' && selectedCategory) {
        startBgm(selectedCategory.id);
      } else {
        startBgm(screen); // 'welcome' or 'menu'
      }
    } else {
      stopBgm();
    }
  }, [isBgmOn, screen, selectedCategory]);

  const toggleBgm = () => {
    setIsBgmOn(!isBgmOn);
  };

  const handleStart = () => {
    setScreen('categories');
    // Auto-enable BGM on first interaction
    if (!isBgmOn) {
      setIsBgmOn(true);
      setTimeout(() => startBgm('categories'), 100);
    }
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setScreen('levels');
    if (isBgmOn) startBgm('menu'); // Reuse menu bgm for level selection
  };

  const handleSelectWord = (word: WordConfig) => {
    setCurrentWord(word);
    setScreen('game');
  };

  const handleBackToHome = () => {
    setScreen('welcome');
  };

  const handleBackToCategories = () => {
    setScreen('categories');
  };

  const handleBackToLevels = () => {
    setScreen('levels');
  };

  const handleWordComplete = (categoryId: string, word: string) => {
    const key = `${categoryId}:${word}`;
    if (!completedLevels.has(key)) {
      setPoints(prev => prev + 10); // Exactly 10 points per new word
    }
    setCompletedLevels(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  // Get current level index (1-15) for background
  const getCurrentLevelIndex = () => {
    if (!selectedCategory || !currentWord) return 0;
    const allWords = [...selectedCategory.wordsUnder5, ...selectedCategory.wordsAbove5];
    return allWords.findIndex(w => w.id === currentWord.id);
  };

  const bgColor = getCurrentLevelIndex() >= 0 ? LEVEL_BACKGROUNDS[getCurrentLevelIndex() % LEVEL_BACKGROUNDS.length] : 'bg-[#E0F2FE]';

  return (
    <div className={`min-h-screen font-sans ${screen === 'game' ? bgColor : 'bg-[#E0F2FE]'} bg-pattern text-slate-800 flex flex-col relative overflow-hidden select-none transition-colors duration-500`}>
      
      {/* Global Sound Toggle for the welcome screen only */}
      {screen === 'welcome' && (
        <div className="absolute top-4 right-4 z-[100]">
          <button 
            onClick={toggleBgm}
            className="p-2 md:p-3 bg-white/90 backdrop-blur rounded-full text-slate-500 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {isBgmOn ? <Volume2 size={20} className="md:w-6 md:h-6" /> : <VolumeX size={20} className="md:w-6 md:h-6" />}
          </button>
        </div>
      )}

      <div className={`relative z-10 min-h-screen w-full max-w-5xl mx-auto flex flex-col ${screen === 'welcome' ? 'items-center justify-center p-4 md:p-6' : 'items-center justify-start'}`}>
        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <WelcomeScreen 
              key="welcome" 
              onStart={handleStart} 
              t={t}
              language={language}
              setLanguage={setLanguage}
            />
          )}
          {screen === 'categories' && (
            <CategoryMenu 
              key="categories" 
              onSelect={handleSelectCategory} 
              onBack={handleBackToHome}
              progress={completedLevels}
              points={points}
              isBgmOn={isBgmOn}
              toggleBgm={toggleBgm}
              language={language}
              t={t}
            />
          )}
          {screen === 'levels' && selectedCategory && (
            <LevelSelection 
              key="levels"
              category={selectedCategory}
              completedLevels={completedLevels}
              onSelect={handleSelectWord}
              onBack={handleBackToCategories}
              points={points}
              isBgmOn={isBgmOn}
              toggleBgm={toggleBgm}
              language={language}
              t={t}
            />
          )}
          {screen === 'game' && currentWord && selectedCategory && (
            <GamePlay 
              key={`${selectedCategory.id}-${currentWord.id}`}
              category={selectedCategory} 
              wordConfig={currentWord} 
              onBack={handleBackToLevels}
              onWordComplete={() => handleWordComplete(selectedCategory.id, currentWord.id)}
              points={points}
              isBgmOn={isBgmOn}
              toggleBgm={toggleBgm}
              language={language}
              t={t}
              onNext={() => {
                const allWords = [...selectedCategory.wordsUnder5, ...selectedCategory.wordsAbove5];
                const currentIndex = allWords.findIndex(w => w.id === currentWord.id);
                if (currentIndex < allWords.length - 1) {
                  handleSelectWord(allWords[currentIndex + 1]);
                } else {
                  handleBackToLevels();
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
