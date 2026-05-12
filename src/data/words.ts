export type CategoryId = 'hewan' | 'sayuran' | 'cita-cita' | 'mainan' | 'buah' | 'kendaraan' | 'warna' | 'angka';

export interface WordConfig {
  id: string;
  en: string;
  es: string;
  de: string;
  emoji: string;
}

export interface Category {
  id: CategoryId;
  name: {
    id: string;
    en: string;
    es: string;
    de: string;
  };
  color: string;
  icon: string;
  requiredPoints: number;
  wordsUnder5: WordConfig[];
  wordsAbove5: WordConfig[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'hewan',
    name: { id: 'Hewan', en: 'Animals', es: 'Animales', de: 'Tiere' },
    color: 'bg-[#FFC1CC]',
    icon: '🦁',
    requiredPoints: 0,
    wordsUnder5: [
      { id: 'AYAM', en: 'CHICKEN', es: 'POLLO', de: 'HUHN', emoji: '🐔' },
      { id: 'BEBEK', en: 'DUCK', es: 'PATO', de: 'ENTE', emoji: '🦆' },
      { id: 'CICAK', en: 'LIZARD', es: 'LAGARTO', de: 'EIDECHSE', emoji: '🦎' },
      { id: 'DOMBA', en: 'SHEEP', es: 'OVEJA', de: 'SCHAF', emoji: '🐑' },
      { id: 'ELANG', en: 'EAGLE', es: 'ÁGUILA', de: 'ADLER', emoji: '🦅' },
      { id: 'GAJAH', en: 'ELEPHANT', es: 'ELEFANTE', de: 'ELEFANT', emoji: '🐘' },
      { id: 'IKAN', en: 'FISH', es: 'PEZ', de: 'FISCH', emoji: '🐟' },
      { id: 'SAPI', en: 'COW', es: 'VACA', de: 'KUH', emoji: '🐮' },
      { id: 'ZEBRA', en: 'ZEBRA', es: 'CEBRA', de: 'ZEBRA', emoji: '🦓' },
    ],
    wordsAbove5: [
      { id: 'HARIMAU', en: 'TIGER', es: 'TIGRE', de: 'TIGER', emoji: '🐯' },
      { id: 'JERAPAH', en: 'GIRAFFE', es: 'JIRAFA', de: 'GIRAFFE', emoji: '🦒' },
      { id: 'KAMBING', en: 'GOAT', es: 'CABRA', de: 'ZIEGE', emoji: '🐐' },
      { id: 'KELINCI', en: 'RABBIT', es: 'CONEJO', de: 'HASE', emoji: '🐰' },
      { id: 'KUCING', en: 'CAT', es: 'GATO', de: 'KATZE', emoji: '🐱' },
      { id: 'MONYET', en: 'MONKEY', es: 'MONO', de: 'AFFE', emoji: '🐒' },
    ],
  },
  {
    id: 'angka',
    name: { id: 'Angka', en: 'Numbers', es: 'Números', de: 'Zahlen' },
    color: 'bg-[#FFD8A8]',
    icon: '🔢',
    requiredPoints: 50,
    wordsUnder5: [
      { id: 'NOL', en: 'ZERO', es: 'CERO', de: 'NULL', emoji: '0️⃣' },
      { id: 'SATU', en: 'ONE', es: 'UNO', de: 'EINS', emoji: '1️⃣' },
      { id: 'DUA', en: 'TWO', es: 'DOS', de: 'ZWEI', emoji: '2️⃣' },
      { id: 'TIGA', en: 'THREE', es: 'TRES', de: 'DREI', emoji: '3️⃣' },
      { id: 'LIMA', en: 'FIVE', es: 'CINCO', de: 'FÜNF', emoji: '5️⃣' },
      { id: 'ENAM', en: 'SIX', es: 'SEIS', de: 'SECHS', emoji: '6️⃣' },
    ],
    wordsAbove5: [
      { id: 'EMPAT', en: 'FOUR', es: 'CUATRO', de: 'VIER', emoji: '4️⃣' },
      { id: 'TUJUH', en: 'SEVEN', es: 'SIETE', de: 'SIEBEN', emoji: '7️⃣' },
      { id: 'DELAPAN', en: 'EIGHT', es: 'OCHO', de: 'ACHT', emoji: '8️⃣' },
      { id: 'SEMBILAN', en: 'NINE', es: 'NUEVE', de: 'NEUN', emoji: '9️⃣' },
    ],
  },
  {
    id: 'kendaraan',
    name: { id: 'Kendaraan', en: 'Vehicles', es: 'Vehículos', de: 'Fahrzeuge' },
    color: 'bg-[#DDA0DD]',
    icon: '🚀',
    requiredPoints: 120,
    wordsUnder5: [
      { id: 'BUS', en: 'BUS', es: 'AUTOBÚS', de: 'BUS', emoji: '🚌' },
      { id: 'MOBIL', en: 'CAR', es: 'COCHE', de: 'AUTO', emoji: '🚗' },
      { id: 'TRUK', en: 'TRUCK', es: 'CAMIÓN', de: 'LKW', emoji: '🚚' },
      { id: 'TANK', en: 'TANK', es: 'TANQUE', de: 'PANZER', emoji: '🚜' },
      { id: 'MOTOR', en: 'BIKE', es: 'BICI', de: 'FAHRRAD', emoji: '🚲' },
    ],
    wordsAbove5: [
      { id: 'PESAWAT', en: 'AIRPLANE', es: 'AVIÓN', de: 'FLUGZEUG', emoji: '✈️' },
      { id: 'KAPAL', en: 'SHIP', es: 'BARCO', de: 'SCHIFF', emoji: '🚢' },
      { id: 'KERETA', en: 'TRAIN', es: 'TREN', de: 'ZUG', emoji: '🚂' },
      { id: 'SEPEDA', en: 'BICYCLE', es: 'BICICLETA', de: 'FAHRRAD', emoji: '🚲' },
      { id: 'ROKET', en: 'ROCKET', es: 'COHETE', de: 'RAKETE', emoji: '🚀' },
      { id: 'HELIKOPTER', en: 'HELICOPTER', es: 'HELICÓPTERO', de: 'HUBSCHRAUBER', emoji: '🚁' },
      { id: 'AMBULANS', en: 'AMBULANCE', es: 'AMBULANCIA', de: 'KRANKENWAGEN', emoji: '🚑' },
    ],
  },
  {
    id: 'warna',
    name: { id: 'Warna', en: 'Colors', es: 'Colores', de: 'Farben' },
    color: 'bg-[#B2F2BB]',
    icon: '🎨',
    requiredPoints: 200,
    wordsUnder5: [
      { id: 'BIRU', en: 'BLUE', es: 'AZUL', de: 'BLAU', emoji: '🔵' },
      { id: 'HIJAU', en: 'GREEN', es: 'VERDE', de: 'GRÜN', emoji: '🟢' },
      { id: 'MERAH', en: 'RED', es: 'ROJO', de: 'ROT', emoji: '🔴' },
      { id: 'UNGU', en: 'PURPLE', es: 'PÚRPURA', de: 'LILA', emoji: '🟣' },
    ],
    wordsAbove5: [
      { id: 'KUNING', en: 'YELLOW', es: 'AMARILLO', de: 'GELB', emoji: '🟡' },
      { id: 'ORANYE', en: 'ORANGE', es: 'NARANJA', de: 'ORANGE', emoji: '🟠' },
      { id: 'COKELAT', en: 'BROWN', es: 'MARRÓN', de: 'BRAUN', emoji: '🟤' },
      { id: 'HITAM', en: 'BLACK', es: 'NEGRO', de: 'SCHWARZ', emoji: '⚫' },
      { id: 'PUTIH', en: 'WHITE', es: 'BLANCO', de: 'WEISS', emoji: '⚪' },
    ],
  },
  {
    id: 'sayuran',
    name: { id: 'Sayuran', en: 'Vegetables', es: 'Verduras', de: 'Gemüse' },
    color: 'bg-[#C1E1C1]',
    icon: '🥕',
    requiredPoints: 280,
    wordsUnder5: [
      { id: 'BAYAM', en: 'SPINACH', es: 'ESPINACA', de: 'SPINAT', emoji: '🌿' },
      { id: 'CABAI', en: 'CHILI', es: 'CHILE', de: 'CHILI', emoji: '🌶️' },
      { id: 'KUBIS', en: 'CABBAGE', es: 'REPOLLO', de: 'KOHL', emoji: '🥬' },
      { id: 'LABU', en: 'PUMPKIN', es: 'CALABAZA', de: 'KÜRBIS', emoji: '🎃' },
      { id: 'TOMAT', en: 'TOMATO', es: 'TOMATE', de: 'TOMATE', emoji: '🍅' },
      { id: 'TIMUN', en: 'CUCUMBER', es: 'PEPINO', de: 'GURKE', emoji: '🥒' },
    ],
    wordsAbove5: [
      { id: 'BROKOLI', en: 'BROCCOLI', es: 'BRÓCOLI', de: 'BROKKOLI', emoji: '🥦' },
      { id: 'JAGUNG', en: 'CORN', es: 'MAÍZ', de: 'MAIS', emoji: '🌽' },
      { id: 'KANGKUNG', en: 'WATER SPINACH', es: 'ESPINACA DE AGUA', de: 'WASSERSIPNAT', emoji: '🥬' },
      { id: 'KENTANG', en: 'POTATO', es: 'PAPA', de: 'KARTOFFEL', emoji: '🥔' },
      { id: 'MENTIMUN', en: 'CUCUMBER', es: 'PEPINO', de: 'GURKE', emoji: '🥒' },
      { id: 'TERONG', en: 'EGGPLANT', es: 'BERENJENA', de: 'AUERGINE', emoji: '🍆' },
      { id: 'WORTEL', en: 'CARROT', es: 'ZANAHORIA', de: 'MÖHRE', emoji: '🥕' },
      { id: 'BAWANG', en: 'ONION', es: 'CEBOLLA', de: 'ZWIEBEL', emoji: '🧅' },
      { id: 'SELEDRI', en: 'CELERY', es: 'APIÓ', de: 'SELLERIE', emoji: '🌿' },
    ],
  },
  {
    id: 'mainan',
    name: { id: 'Mainan', en: 'Toys', es: 'Juguetes', de: 'Spielzeug' },
    color: 'bg-[#FDFD96]',
    icon: '🧸',
    requiredPoints: 400,
    wordsUnder5: [
      { id: 'BALON', en: 'BALLOON', es: 'GLOBO', de: 'BALLON', emoji: '🎈' },
      { id: 'BOLA', en: 'BALL', es: 'PELOTA', de: 'BALL', emoji: '⚽' },
      { id: 'LEGO', en: 'LEGO', es: 'LEGO', de: 'LEGO', emoji: '🧱' },
      { id: 'MOBIL', en: 'CAR', es: 'COCHE', de: 'AUTO', emoji: '🚗' },
      { id: 'ROBOT', en: 'ROBOT', es: 'ROBOT', de: 'ROBOTER', emoji: '🤖' },
      { id: 'TRUK', en: 'TRUCK', es: 'CAMIÓN', de: 'LKW', emoji: '🚚' },
      { id: 'YOYO', en: 'YOYO', es: 'YOYO', de: 'JOJO', emoji: '🪀' },
      { id: 'DINO', en: 'DINO', es: 'DINO', de: 'DINO', emoji: '🦖' },
      { id: 'RUBIK', en: 'RUBIK', es: 'RUBIK', de: 'RUBIK', emoji: '🧊' },
    ],
    wordsAbove5: [
      { id: 'BONEKA', en: 'DOLL', es: 'MUÑECA', de: 'PUPPE', emoji: '🧸' },
      { id: 'GASING', en: 'SPINNING TOP', es: 'PEONZA', de: 'KREISEL', emoji: '🌀' },
      { id: 'LAYANGAN', en: 'KITE', es: 'COMETA', de: 'DRACHEN', emoji: '🪁' },
      { id: 'PUZZLE', en: 'PUZZLE', es: 'PUZZLE', de: 'PUZZLE', emoji: '🧩' },
      { id: 'KERETA', en: 'TRAIN', es: 'TREN', de: 'ZUG', emoji: '🚂' },
      { id: 'PESAWAT', en: 'AIRPLANE', es: 'AVIÓN', de: 'FLUGZEUG', emoji: '✈️' },
    ],
  },
  {
    id: 'buah',
    name: { id: 'Buah', en: 'Fruits', es: 'Frutas', de: 'Früchte' },
    color: 'bg-[#FFD580]',
    icon: '🍎',
    requiredPoints: 500,
    wordsUnder5: [
      { id: 'APEL', en: 'APPLE', es: 'MANZANA', de: 'APFEL', emoji: '🍎' },
      { id: 'JERUK', en: 'ORANGE', es: 'NARANJA', de: 'ORANGE', emoji: '🍊' },
      { id: 'LABU', en: 'PUMPKIN', es: 'CALABAZA', de: 'KÜRBIS', emoji: '🎃' },
      { id: 'PISANG', en: 'BANANA', es: 'PLÁTANO', de: 'BANANE', emoji: '🍌' },
      { id: 'NANAS', en: 'PINEAPPLE', es: 'PIÑA', de: 'ANANAS', emoji: '🍍' },
      { id: 'MELON', en: 'MELON', es: 'MELÓN', de: 'MELONE', emoji: '🍈' },
    ],
    wordsAbove5: [
      { id: 'ANGGUR', en: 'GRAPE', es: 'UVA', de: 'TRAUBE', emoji: '🍇' },
      { id: 'DURIAN', en: 'DURIAN', es: 'DURIÁN', de: 'DURIAN', emoji: '🍈' },
      { id: 'MANGGA', en: 'MANGO', es: 'MANGO', de: 'MANGO', emoji: '🥭' },
      { id: 'PEPAYA', en: 'PAPAYA', es: 'PAPAYA', de: 'PAPAYA', emoji: '🍈' },
      { id: 'SEMANGKA', en: 'WATERMELON', es: 'SANDÍA', de: 'WASSERMELONE', emoji: '🍉' },
      { id: 'STROBERI', en: 'STRAWBERRY', es: 'FRESA', de: 'ERDBEERE', emoji: '🍓' },
      { id: 'ALPUKAT', en: 'AVOCADO', es: 'AGUACATE', de: 'AVOCADO', emoji: '🥑' },
    ],
  },
  {
    id: 'cita-cita',
    name: { id: 'Cita-Cita', en: 'Aspiration', es: 'Aspiraciones', de: 'Berufe' },
    color: 'bg-[#89CFF0]',
    icon: '🧑‍🚀',
    requiredPoints: 600,
    wordsUnder5: [
      { id: 'GURU', en: 'TEACHER', es: 'MAESTRO', de: 'LEHRER', emoji: '🧑‍🏫' },
      { id: 'PILOT', en: 'PILOT', es: 'PILOTO', de: 'PILOT', emoji: '🧑‍✈️' },
      { id: 'KOKI', en: 'CHEF', es: 'CHEF', de: 'KOCH', emoji: '🧑‍🍳' },
      { id: 'ATLET', en: 'ATHLETE', es: 'ATLETA', de: 'ATHLET', emoji: '🏃' },
    ],
    wordsAbove5: [
      { id: 'DOKTER', en: 'DOCTOR', es: 'DOCTOR', de: 'ARZT', emoji: '🧑‍⚕️' },
      { id: 'POLISI', en: 'POLICE', es: 'POLICÍA', de: 'POLIZEI', emoji: '👮' },
      { id: 'TENTARA', en: 'SOLDIER', es: 'SOLDADO', de: 'SOLDAT', emoji: '🪖' },
      { id: 'PEMADAM', en: 'FIREMAN', es: 'BOMBERO', de: 'FEUERWEHR', emoji: '🚒' },
      { id: 'PETANI', en: 'FARMER', es: 'GRANJERO', de: 'BAUER', emoji: '🧑‍🌾' },
      { id: 'ASTRONOT', en: 'ASTRONAUT', es: 'ASTRONAUTA', de: 'ASTRONAUT', emoji: '🧑‍🚀' },
      { id: 'PERAWAT', en: 'NURSE', es: 'ENFERMERA', de: 'PFLEGER', emoji: '👩‍⚕️' },
      { id: 'MASINIS', en: 'DRIVER', es: 'CONDUCTOR', de: 'FAHRER', emoji: '🚂' },
      { id: 'PROGRAMMER', en: 'PROGRAMMER', es: 'PROGRAMADOR', de: 'ENTWICKLER', emoji: '💻' },
      { id: 'PENYANYI', en: 'SINGER', es: 'CANTANTE', de: 'SÄNGER', emoji: '🎤' },
      { id: 'ARSITEK', en: 'ARCHITECT', es: 'ARQUITECTO', de: 'ARCHITEKT', emoji: '📏' },
    ],
  },
];
