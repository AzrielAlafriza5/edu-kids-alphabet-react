export type CategoryId = 'hewan' | 'sayuran' | 'cita-cita' | 'mainan' | 'buah' | 'kendaraan' | 'warna' | 'angka';

export interface WordConfig {
  id: string;
  en: string;
  emoji: string;
}

export interface Category {
  id: CategoryId;
  name: {
    id: string;
    en: string;
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
    name: { id: 'Hewan', en: 'Animals' },
    color: 'bg-[#FFC1CC]',
    icon: '🦁',
    requiredPoints: 0,
    wordsUnder5: [
      { id: 'AYAM', en: 'CHICKEN', emoji: '🐔' },
      { id: 'BEBEK', en: 'DUCK', emoji: '🦆' },
      { id: 'CICAK', en: 'LIZARD', emoji: '🦎' },
      { id: 'DOMBA', en: 'SHEEP', emoji: '🐑' },
      { id: 'ELANG', en: 'EAGLE', emoji: '🦅' },
      { id: 'GAJAH', en: 'ELEPHANT', emoji: '🐘' },
      { id: 'IKAN', en: 'FISH', emoji: '🐟' },
      { id: 'SAPI', en: 'COW', emoji: '🐮' },
      { id: 'ZEBRA', en: 'ZEBRA', emoji: '🦓' },
    ],
    wordsAbove5: [
      { id: 'HARIMAU', en: 'TIGER', emoji: '🐯' },
      { id: 'JERAPAH', en: 'GIRAFFE', emoji: '🦒' },
      { id: 'KAMBING', en: 'GOAT', emoji: '🐐' },
      { id: 'KELINCI', en: 'RABBIT', emoji: '🐰' },
      { id: 'KUCING', en: 'CAT', emoji: '🐱' },
      { id: 'MONYET', en: 'MONKEY', emoji: '🐒' },
    ],
  },
  {
    id: 'angka',
    name: { id: 'Angka', en: 'Numbers' },
    color: 'bg-[#FFD8A8]',
    icon: '🔢',
    requiredPoints: 50,
    wordsUnder5: [
      { id: 'NOL', en: 'ZERO', emoji: '0️⃣' },
      { id: 'SATU', en: 'ONE', emoji: '1️⃣' },
      { id: 'DUA', en: 'TWO', emoji: '2️⃣' },
      { id: 'TIGA', en: 'THREE', emoji: '3️⃣' },
      { id: 'LIMA', en: 'FIVE', emoji: '5️⃣' },
      { id: 'ENAM', en: 'SIX', emoji: '6️⃣' },
    ],
    wordsAbove5: [
      { id: 'EMPAT', en: 'FOUR', emoji: '4️⃣' },
      { id: 'TUJUH', en: 'SEVEN', emoji: '7️⃣' },
      { id: 'DELAPAN', en: 'EIGHT', emoji: '8️⃣' },
      { id: 'SEMBILAN', en: 'NINE', emoji: '9️⃣' },
    ],
  },
  {
    id: 'kendaraan',
    name: { id: 'Kendaraan', en: 'Vehicles' },
    color: 'bg-[#DDA0DD]',
    icon: '🚀',
    requiredPoints: 120,
    wordsUnder5: [
      { id: 'BUS', en: 'BUS', emoji: '🚌' },
      { id: 'MOBIL', en: 'CAR', emoji: '🚗' },
      { id: 'TRUK', en: 'TRUCK', emoji: '🚚' },
      { id: 'TANK', en: 'TANK', emoji: '🚜' },
      { id: 'MOTOR', en: 'BIKE', emoji: '🚲' },
    ],
    wordsAbove5: [
      { id: 'PESAWAT', en: 'AIRPLANE', emoji: '✈️' },
      { id: 'KAPAL', en: 'SHIP', emoji: '🚢' },
      { id: 'KERETA', en: 'TRAIN', emoji: '🚂' },
      { id: 'SEPEDA', en: 'BICYCLE', emoji: '🚲' },
      { id: 'ROKET', en: 'ROCKET', emoji: '🚀' },
      { id: 'HELIKOPTER', en: 'HELICOPTER', emoji: '🚁' },
      { id: 'AMBULANS', en: 'AMBULANCE', emoji: '🚑' },
    ],
  },
  {
    id: 'warna',
    name: { id: 'Warna', en: 'Colors' },
    color: 'bg-[#B2F2BB]',
    icon: '🎨',
    requiredPoints: 200,
    wordsUnder5: [
      { id: 'BIRU', en: 'BLUE', emoji: '🔵' },
      { id: 'HIJAU', en: 'GREEN', emoji: '🟢' },
      { id: 'MERAH', en: 'RED', emoji: '🔴' },
      { id: 'UNGU', en: 'PURPLE', emoji: '🟣' },
    ],
    wordsAbove5: [
      { id: 'KUNING', en: 'YELLOW', emoji: '🟡' },
      { id: 'ORANYE', en: 'ORANGE', emoji: '🟠' },
      { id: 'COKELAT', en: 'BROWN', emoji: '🟤' },
      { id: 'HITAM', en: 'BLACK', emoji: '⚫' },
      { id: 'PUTIH', en: 'WHITE', emoji: '⚪' },
    ],
  },
  {
    id: 'sayuran',
    name: { id: 'Sayuran', en: 'Vegetables' },
    color: 'bg-[#C1E1C1]',
    icon: '🥕',
    requiredPoints: 280,
    wordsUnder5: [
      { id: 'BAYAM', en: 'SPINACH', emoji: '🌿' },
      { id: 'CABAI', emoji: '🌶️', en: 'CHILI' },
      { id: 'KUBIS', emoji: '🥬', en: 'CABBAGE' },
      { id: 'LABU', emoji: '🎃', en: 'PUMPKIN' },
      { id: 'TOMAT', emoji: '🍅', en: 'TOMATO' },
      { id: 'TIMUN', emoji: '🥒', en: 'CUCUMBER' },
    ],
    wordsAbove5: [
      { id: 'BROKOLI', emoji: '🥦', en: 'BROCCOLI' },
      { id: 'JAGUNG', emoji: '🌽', en: 'CORN' },
      { id: 'KANGKUNG', emoji: '🥬', en: 'WATER SPINACH' },
      { id: 'KENTANG', emoji: '🥔', en: 'POTATO' },
      { id: 'MENTIMUN', emoji: '🥒', en: 'CUCUMBER' },
      { id: 'TERONG', emoji: '🍆', en: 'EGGPLANT' },
      { id: 'WORTEL', emoji: '🥕', en: 'CARROT' },
      { id: 'BAWANG', emoji: '🧅', en: 'ONION' },
      { id: 'SELEDRI', emoji: '🌿', en: 'CELERY' },
    ],
  },
  {
    id: 'mainan',
    name: { id: 'Mainan', en: 'Toys' },
    color: 'bg-[#FDFD96]',
    icon: '🧸',
    requiredPoints: 400,
    wordsUnder5: [
      { id: 'BALON', en: 'BALLOON', emoji: '🎈' },
      { id: 'BOLA', en: 'BALL', emoji: '⚽' },
      { id: 'LEGO', en: 'LEGO', emoji: '🧱' },
      { id: 'MOBIL', en: 'CAR', emoji: '🚗' },
      { id: 'ROBOT', en: 'ROBOT', emoji: '🤖' },
      { id: 'TRUK', en: 'TRUCK', emoji: '🚚' },
      { id: 'YOYO', en: 'YOYO', emoji: '🪀' },
      { id: 'DINO', en: 'DINO', emoji: '🦖' },
      { id: 'RUBIK', en: 'RUBIK', emoji: '🧊' },
    ],
    wordsAbove5: [
      { id: 'BONEKA', en: 'DOLL', emoji: '🧸' },
      { id: 'GASING', en: 'SPINNING TOP', emoji: '🌀' },
      { id: 'LAYANGAN', en: 'KITE', emoji: '🪁' },
      { id: 'PUZZLE', en: 'PUZZLE', emoji: '🧩' },
      { id: 'KERETA', en: 'TRAIN', emoji: '🚂' },
      { id: 'PESAWAT', en: 'AIRPLANE', emoji: '✈️' },
    ],
  },
  {
    id: 'buah',
    name: { id: 'Buah', en: 'Fruits' },
    color: 'bg-[#FFD580]',
    icon: '🍎',
    requiredPoints: 500,
    wordsUnder5: [
      { id: 'APEL', en: 'APPLE', emoji: '🍎' },
      { id: 'JERUK', en: 'ORANGE', emoji: '🍊' },
      { id: 'LABU', en: 'PUMPKIN', emoji: '🎃' },
      { id: 'PISANG', en: 'BANANA', emoji: '🍌' },
      { id: 'NANAS', en: 'PINEAPPLE', emoji: '🍍' },
      { id: 'MELON', en: 'MELON', emoji: '🍈' },
    ],
    wordsAbove5: [
      { id: 'ANGGUR', en: 'GRAPE', emoji: '🍇' },
      { id: 'DURIAN', en: 'DURIAN', emoji: '🍈' },
      { id: 'MANGGA', en: 'MANGO', emoji: '🥭' },
      { id: 'PEPAYA', en: 'PAPAYA', emoji: '🍈' },
      { id: 'SEMANGKA', en: 'WATERMELON', emoji: '🍉' },
      { id: 'STROBERI', en: 'STRAWBERRY', emoji: '🍓' },
      { id: 'ALPUKAT', en: 'AVOCADO', emoji: '🥑' },
    ],
  },
  {
    id: 'cita-cita',
    name: { id: 'Cita-Cita', en: 'Aspiration' },
    color: 'bg-[#89CFF0]',
    icon: '🧑‍🚀',
    requiredPoints: 600,
    wordsUnder5: [
      { id: 'GURU', en: 'TEACHER', emoji: '🧑‍🏫' },
      { id: 'PILOT', en: 'PILOT', emoji: '🧑‍✈️' },
      { id: 'KOKI', en: 'CHEF', emoji: '🧑‍🍳' },
      { id: 'ATLET', en: 'ATHLETE', emoji: '🏃' },
    ],
    wordsAbove5: [
      { id: 'DOKTER', en: 'DOCTOR', emoji: '🧑‍⚕️' },
      { id: 'POLISI', en: 'POLICE', emoji: '👮' },
      { id: 'TENTARA', en: 'SOLDIER', emoji: '🪖' },
      { id: 'PEMADAM', en: 'FIREMAN', emoji: '🚒' },
      { id: 'PETANI', en: 'FARMER', emoji: '🧑‍🌾' },
      { id: 'ASTRONOT', en: 'ASTRONAUT', emoji: '🧑‍🚀' },
      { id: 'PERAWAT', en: 'NURSE', emoji: '👩‍⚕️' },
      { id: 'MASINIS', en: 'DRIVER', emoji: '🚂' },
      { id: 'PROGRAMMER', en: 'PROGRAMMER', emoji: '💻' },
      { id: 'PENYANYI', en: 'SINGER', emoji: '🎤' },
      { id: 'ARSITEK', en: 'ARCHITECT', emoji: '📏' },
    ],
  },
];
