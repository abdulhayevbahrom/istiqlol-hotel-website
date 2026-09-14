export const rooms = [
  { name: 'Standard xona', price: '350 000 so‘mdan', guests: '1-2 mehmon', text: 'Qisqa safar va ish bilan kelgan mehmonlar uchun tinch, ixcham xona.' },
  { name: 'Deluxe xona', price: '520 000 so‘mdan', guests: '2 mehmon', text: 'Kengroq joy, qulay yotoq va uzoqroq qolish uchun yoqimli muhit.' },
  { name: 'Family xona', price: '720 000 so‘mdan', guests: '3-4 mehmon', text: 'Oila yoki kichik guruhlar uchun joylashuv va qulaylik bir joyda.' },
];

export const services = {
  main: [
    'Nonushta bufeti: 07:00 - 10:00',
    'Bino oldida 15 ta joyli ochiq avtoturargoh',
    'Butun hudud bo‘ylab bepul Wi-Fi',
    '24 soatlik qabulxona',
  ],
  extra: [
    'Kir yuvish xizmati: qo‘shimcha haq evaziga',
    'Transfer yoki taksi chaqirish: so‘rov bo‘yicha',
    'Room Service',
    'Mehmonlarga yordam va axborot ko‘magi',
  ],
  stayServices: [
    {
      title: 'Nonushta "Bufet"',
      image: '/assets/banner-5.png',
      text: 'Keng va yorug‘ zalda mehmonlar har xil didga mos taomlarni tanlashlari mumkin. Nonushta kunni yoqimli muhit va mazali taomlar bilan boshlashga yordam beradi.',
    },
    {
      title: 'Avtoturargoh',
      image: '/assets/banner-1.png',
      text: 'Keng, tartibli va yaxshi yoritilgan ochiq avtoturargoh mehmonlar qulayligi uchun mo‘ljallangan. Hudud 24 soatlik videokuzatuv ostida.',
    },
    {
      title: 'Kir yuvish',
      image: '/assets/banner-4.png',
      text: 'Buyumlarining tozaligi va saranjomligini qadrlaydigan mehmonlar uchun qulay kir yuvish xizmati mavjud. Xizmat qabulxonada so‘rov bo‘yicha ko‘rsatiladi.',
    },
  ],
  amenities: [
    'Hammom aksessuarlari',
    'Konditsioner',
    'Shahar manzarasi',
    'Alohida hammom',
    'Ovqatlanish stoli',
    'Yozuv stoli',
    'Bir kishilik to‘shak',
    'Dush',
    'Kiyim javoni',
    'Soch quritgich',
    'Shippak',
    'Choynak',
    'Televizor',
    'Tekis ekranli televizor',
    'Smart TV',
    'Xalqaro rozetka',
    'Elektron qulflar',
    'Wi-Fi',
    'Internet',
    'Bide',
    'Vanna',
    'Ikkita bir kishilik to‘shak',
    'King size yotoq',
    'Uy hayvonlari bilan mumkin emas',
  ],
};

export const specialOffers = [
  {
    title: 'Uzoq muddatli yashash 3',
    badge: '3+ kecha',
    discount: '10%',
    image: '/assets/banner-2.png',
    text: 'Istiqlol Hotel mehmonxonasida 3 kecha yoki undan ko‘proq qolishni rejalashtirgan mehmonlar uchun qulay tarif.',
    terms: [
      'Minimal yashash muddati 3 kecha',
      'Standart tarifdan 10% chegirma',
      'Zamonaviy xonalarda qulay yashash',
      'Nonushta narxga kiritilgan: 07:00 - 10:00',
    ],
    advantages: ['Bepul Wi-Fi', 'Namanganda qulay joylashuv', 'Ish safari va uzoq safarlar uchun mos'],
  },
  {
    title: 'Uzoq muddatli yashash 5',
    badge: '5+ kecha',
    discount: '12%',
    image: '/assets/banner-3.png',
    text: 'Namanganda ko‘proq vaqt o‘tkazadigan mehmonlar uchun yanada foydali narx va barqaror qulaylik.',
    terms: [
      'Minimal yashash muddati 5 kecha',
      'Standart tarifdan 12% chegirma',
      'To‘liq jihozlangan shinam xonalar',
      'Nonushta narxga kiritilgan: 07:00 - 10:00',
    ],
    advantages: ['Uzoq muddatli yashash uchun qulay', 'Bepul Wi-Fi', 'Ish safarlari uchun ideal'],
  },
  {
    title: 'Erta bron qilish',
    badge: 'Oldindan bron',
    discount: '8%',
    image: '/assets/banner-4.png',
    text: 'Safarni oldindan rejalashtiring va kelish sanasidan kamida 5 kun oldin bron qilib, maqbul narxni saqlab qoling.',
    terms: [
      'Kelish sanasidan kamida 5 kun oldin bron qilish',
      'Standart tarifdan 8% chegirma',
      'Taklif xonalar mavjud bo‘lganda amal qiladi',
    ],
    advantages: ['Nonushta kiritilgan: 07:00 - 10:00', 'Oldindan rejalashtirish uchun qulay', 'Zamonaviy xonalar va bepul Wi-Fi'],
  },
];

export const bannerImages = [
  ['/assets/banner-1.png', 'Istiqlol Hotel binosi'],
  ['/assets/banner-2.png', 'Istiqlol Hotel mehmon xonasi'],
  ['/assets/banner-3.png', 'Istiqlol Hotel yotoq xonasi'],
  ['/assets/banner-4.png', 'Istiqlol Hotel yotoq va televizor qismi'],
  ['/assets/banner-5.png', 'Istiqlol Hotel qabulxonasi'],
].map(([src, alt]) => ({ src, alt }));

export const hotelFacts = [
  ['Xonalar', 'Standarddan lyuksgacha qulay toifalar'],
  ['Nonushta', 'Har kuni 07:00 - 10:00, bufet usulida'],
  ['Avtoturargoh', 'Bino oldida 15 ta avtomobil uchun joy'],
  ['Xizmatlar', '24/7 qabulxona, videokuzatuv va kir yuvish xizmati'],
];
