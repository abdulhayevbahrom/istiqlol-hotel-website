import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  ru: {
    'Xonalar': 'Номера', 'Xizmatlar': 'Услуги', 'Takliflar': 'Предложения', 'Biz haqimizda': 'О нас',
    'Mehmonxona haqida': 'Об отеле', "Ma'lumot": 'Информация', 'Sodiqlik dasturi': 'Программа лояльности',
    'Fotogalereya': 'Фотогалерея', 'Restoran': 'Ресторан', 'Bron': 'Бронирование', 'Aloqa': 'Контакты',
    'Asosiy menyu': 'Главное меню', 'Istiqlol Hotel bosh sahifa': 'Главная страница Istiqlol Hotel',
    'Mehmonlar uchun qulay joylashuv': 'Удобное размещение для гостей',
    'Shaharda sokin tunash, toza xonalar va tezkor bron qilish uchun ishonchli mehmonxona.': 'Надёжный отель для спокойного отдыха, чистых номеров и быстрого бронирования.',
    'Xona band qilish': 'Забронировать номер', 'Qo‘ng‘iroq qilish': 'Позвонить', 'Banner rasmlari': 'Изображения баннера',
    'Bron qilish': 'Забронировать', 'Kelish': 'Заезд', 'Ketish': 'Выезд', 'Mehmonlar': 'Гости', 'Topish': 'Найти',
    'Online bron': 'Онлайн-бронирование', 'Modalni yopish': 'Закрыть окно', 'Ism': 'Имя', 'Familiya': 'Фамилия',
    'Telefon': 'Телефон', 'Kelish sanasi': 'Дата заезда', 'Ketish sanasi': 'Дата выезда', 'Xona kategoriyasi': 'Категория номера',
    'Izoh': 'Комментарий', 'Yuborilmoqda...': 'Отправка...', 'Bron yuborish': 'Отправить бронь',
    'Kategoriyalar bazadan olinmadi, vaqtincha standart ro‘yxat ko‘rsatildi.': 'Не удалось загрузить категории из базы; временно показан стандартный список.',
    'Hozir bronni yuborib bo‘lmadi. Iltimos, qayta urinib ko‘ring.': 'Не удалось отправить бронь. Пожалуйста, попробуйте ещё раз.',
    'Xabarni yopish': 'Закрыть сообщение', 'Bron qabul qilindi': 'Бронь принята',
    'Xonangiz muvaffaqiyatli band qilindi': 'Ваш номер успешно забронирован', 'Mehmon': 'Гость', 'Xona': 'Номер',
    'Bu xabar 4 sekunddan so‘ng avtomatik yopiladi.': 'Это сообщение автоматически закроется через 4 секунды.',
    'Safaringizga mos xona kategoriyasini tanlang': 'Выберите категорию номера для своей поездки',
    'Ko‘rsatilgan narxlar chet ellik mehmonlar uchun bazadagi xona narxlari asosida chiqadi.': 'Указанные цены рассчитаны по тарифам для иностранных гостей.',
    'Xonalar yuklanmoqda...': 'Номера загружаются...',
    'Xonalarni yuklashda xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko‘ring.': 'Не удалось загрузить номера. Пожалуйста, попробуйте немного позже.',
    'Narx admin panelda kiritilmagan': 'Цена не указана в панели управления', 'Rasmlarni ko‘rish': 'Посмотреть фото',
    '1 kecha uchun': 'за 1 ночь', 'Yopish': 'Закрыть', 'Oldingi rasm': 'Предыдущее фото', 'Keyingi rasm': 'Следующее фото',
    'Google Maps’da ochish': 'Открыть в Google Maps', 'Telefon: +998 78 223 00 15': 'Телефон: +998 78 223 00 15',
    'Manzil: Namangan Province, Namangan': 'Адрес: Наманганская область, Наманган',
    'Qulaylik va iliq mehmondo‘stlik bir joyda': 'Комфорт и тёплое гостеприимство в одном месте',
    'Sayyohlar va ishbilarmon mehmonlar uchun Namangan shahridagi zamonaviy turar joy.': 'Современное размещение в Намангане для туристов и деловых гостей.',
    'Namanganda qulay yashash uchun zamonaviy mehmonxona': 'Современный отель для комфортного проживания в Намангане',
    'Istiqlol Hotel Namangan shahrida sayyohlar va ishbilarmon mehmonlar uchun komfortli joylashuvni taklif etadi. Qulay manzil, puxta o‘ylangan servis va maqbul narxlar mehmonxonani shaharda qolish uchun ishonchli tanlovga aylantiradi.': 'Istiqlol Hotel предлагает комфортное размещение туристам и деловым гостям в Намангане. Удобный адрес, продуманный сервис и разумные цены делают отель надёжным выбором.',
    'Mehmonlar standart xonalardan lyuksgacha bo‘lgan turli toifadagi shinam xonalardan foydalanishlari mumkin. Har bir xonada dam olish va ishlash uchun zarur sharoitlar, jumladan konditsioner, Wi-Fi va alohida hammom mavjud.': 'Гостям доступны уютные номера разных категорий — от стандартных до люксов. В каждом номере есть всё необходимое для отдыха и работы, включая кондиционер, Wi-Fi и отдельную ванную комнату.',
    'Har kuni ertalab 07:00 dan 10:00 gacha bufet usulida nonushta beriladi. Istiqlol Hotel qisqa safar uchun ham, uzoq muddatli yashash uchun ham sokin muhit va kerakli qulayliklarni bir joyda jamlaydi.': 'Каждое утро с 07:00 до 10:00 сервируется завтрак «шведский стол». Istiqlol Hotel подходит как для коротких поездок, так и для длительного проживания.',
    'Xonalar': 'Номера', 'Standarddan lyuksgacha qulay toifalar': 'Комфортные категории от стандарта до люкса',
    'Nonushta': 'Завтрак', 'Har kuni 07:00 - 10:00, bufet usulida': 'Ежедневно 07:00–10:00, шведский стол',
    'Avtoturargoh': 'Парковка', 'Bino oldida 15 ta avtomobil uchun joy': '15 парковочных мест перед зданием',
    '24/7 qabulxona, videokuzatuv va kir yuvish xizmati': 'Стойка 24/7, видеонаблюдение и прачечная',
    'Mehmonlar uchun asosiy ma\'lumotlar': 'Основная информация для гостей',
    'Istiqlol Hotel shahar ichida qulay joylashgan. Aeroport va asosiy manzillarga yetib borish oson, qabulxona esa mehmonlarga kunu tun yordam beradi.': 'Istiqlol Hotel удобно расположен в городе. До аэропорта и основных мест легко добраться, а стойка регистрации помогает гостям круглосуточно.',
    'Kelish vaqti': 'Время заезда', "14:00 dan boshlab ro'yxatdan o'tish": 'Регистрация с 14:00', 'Chiqish vaqti': 'Время выезда',
    "12:00 gacha ro'yxatdan chiqish": 'Выезд до 12:00', 'Manzil': 'Адрес', "Namangan viloyati, Davlatobod tumani, Islom Karimov ko'chasi 20-uy": 'Наманганская область, Давлатабадский район, ул. Ислама Каримова, 20',
    'Har safar ko\'proq foyda': 'Больше выгоды с каждой поездкой',
    "Doimiy mehmonlar uchun sodiqlik dasturi mavjud. Mehmonxonada ko'proq tunagan sari daraja oshadi va keyingi bandlovlarda chegirmalar yanada qulaylashadi.": 'Для постоянных гостей действует программа лояльности. Чем больше ночей вы проводите в отеле, тем выше уровень и выгоднее скидки.',
    "10% chegirma": 'Скидка 10%', "12% chegirma": 'Скидка 12%', "15% chegirma": 'Скидка 15%',
    "Doimiy mehmonlar uchun boshlang'ich imtiyoz.": 'Начальная привилегия для постоянных гостей.', "5 kecha va undan ko'p jamg'argan mehmonlar uchun.": 'Для гостей, накопивших 5 и более ночей.', "10 kecha va undan ko'p jamg'argan mehmonlar uchun.": 'Для гостей, накопивших 10 и более ночей.',
    'Xonalar va mehmonxona muhitidan lavhalar': 'Номера и атмосфера отеля', 'Kun mazali nonushta bilan boshlanadi': 'День начинается со вкусного завтрака',
    "Mehmonxonada har kuni 07:00 dan 10:00 gacha bufet usulida nonushta taqdim etiladi. Yorug' va shinam zalda mehmonlar o'z didiga mos taomlarni tanlab, kunni yoqimli muhitda boshlashlari mumkin.": 'Каждый день с 07:00 до 10:00 в отеле сервируется завтрак «шведский стол». В светлом уютном зале гости могут выбрать блюда по вкусу.',
    'Restoran qismi qisqa dam olish, ish uchrashuvi oldidan nonushta qilish yoki safar davomida xotirjam ovqatlanish uchun qulay.': 'Ресторан подходит для короткого отдыха, завтрака перед деловой встречей или спокойного приёма пищи во время поездки.',
    'Yashash sharoitlari': 'Условия проживания', 'Safaringizning har bir lahzasi uchun o‘ylangan': 'Продумано для каждого момента вашей поездки',
    'Har bir mehmon uchun osoyishta muhit, e’tibor va samarali dam olishga mos qulayliklar yaratilgan.': 'Для каждого гостя созданы спокойная атмосфера, забота и удобства для полноценного отдыха.',
    'Kelishda ro‘yxatdan o‘tish': 'Регистрация при заезде', 'Jo‘nashda ro‘yxatdan o‘tish': 'Выезд', 'Qabulxona va mehmonlarga yordam': 'Стойка регистрации и помощь гостям',
    'Qoidalar va shartlar': 'Правила и условия', 'Bandlov bo‘yicha muhim ma’lumotlar': 'Важная информация о бронировании',
    'Bandlov tasdiqlanganda mehmon turar joy tafsilotlari va to‘lov shartlari ko‘rsatilgan tasdiqni oladi.': 'После подтверждения брони гость получает сведения о проживании и условиях оплаты.',
    'Narx xona toifasi, kelish sanasi va joriy takliflarga qarab o‘zgarishi mumkin.': 'Цена может меняться в зависимости от категории номера, даты заезда и действующих предложений.',
    'Bandlovni o‘zgartirish yoki bekor qilish belgilangan muddatda amalga oshirilsa, jarima olinmaydi.': 'При изменении или отмене брони в установленный срок штраф не взимается.',
    'Kech bekor qilish yoki kelmaslik holatida tanlangan tarif shartlariga muvofiq to‘lov ushlab qolinishi mumkin.': 'При поздней отмене или незаезде может удерживаться плата согласно условиям выбранного тарифа.',
    'Dam olish va ish safari uchun kerakli xizmatlar': 'Услуги для отдыха и деловых поездок',
    'Istiqlol Hotel Namanganda qulay yashash uchun asosiy va qo‘shimcha xizmatlarni bir joyda taqdim etadi.': 'Istiqlol Hotel предлагает основные и дополнительные услуги для комфортного проживания в Намангане.',
    'Asosiy xizmatlar': 'Основные услуги', 'Qo‘shimcha xizmatlar': 'Дополнительные услуги', 'Qulayliklar': 'Удобства', 'Xonalarda mavjud jihozlar': 'Оснащение номеров',
    'Maxsus takliflar': 'Специальные предложения', 'Qolish muddati va rejangizga mos foydali tariflar': 'Выгодные тарифы для ваших планов и срока проживания',
    'Uzoqroq yashash yoki safarni oldindan rejalashtirish orqali Istiqlol Hotel’da yanada qulay shartlarda bron qiling.': 'Бронируйте Istiqlol Hotel на более выгодных условиях при длительном проживании или раннем планировании.',
    'Tarif shartlari': 'Условия тарифа', 'Afzalliklar': 'Преимущества',
    'Istiqlol Hotel bilan bog‘lanish': 'Связаться с Istiqlol Hotel',
    'Xona band qilish, manzilni aniqlash yoki mehmonxona bo‘yicha savol berish uchun qabulxona 24/7 ishlaydi.': 'Стойка регистрации работает 24/7 для бронирования, уточнения адреса и любых вопросов об отеле.',
    'GPS koordinatalari': 'GPS-координаты', 'Pochta indeksi: 160100': 'Почтовый индекс: 160100', 'Xaritada aniq lokatsiya': 'Точное место на карте', 'Qabulxona': 'Стойка регистрации',
    'Joylashuv va yo‘nalish': 'Расположение и маршрут', 'Yaqin manzillar': 'Ближайшие места', 'Namangan Xalqaro Aeroporti': 'Международный аэропорт Намангана',
    'Telefon kutmasdan xona band qiling': 'Бронируйте номер без ожидания на линии',
    'Xonani tez va ishonchli band qilish uchun online bron formasidan foydalaning va kelish vaqtigacha ma’lumotlaringiz tayyor bo‘lsin.': 'Используйте онлайн-форму, чтобы быстро и надёжно забронировать номер и подготовить данные к приезду.',
    'Bron formasiga o‘tish': 'Перейти к форме бронирования',
  },
  en: {
    'Xonalar': 'Rooms', 'Xizmatlar': 'Services', 'Takliflar': 'Offers', 'Biz haqimizda': 'About us', 'Mehmonxona haqida': 'About the hotel',
    "Ma'lumot": 'Information', 'Sodiqlik dasturi': 'Loyalty program', 'Fotogalereya': 'Photo gallery', 'Restoran': 'Restaurant', 'Bron': 'Book', 'Aloqa': 'Contact',
    'Asosiy menyu': 'Main menu', 'Istiqlol Hotel bosh sahifa': 'Istiqlol Hotel home page', 'Mehmonlar uchun qulay joylashuv': 'A comfortable stay for every guest',
    'Shaharda sokin tunash, toza xonalar va tezkor bron qilish uchun ishonchli mehmonxona.': 'A trusted hotel for peaceful nights, clean rooms and quick booking in the city.',
    'Xona band qilish': 'Book a room', 'Qo‘ng‘iroq qilish': 'Call us', 'Banner rasmlari': 'Banner images',
    'Bron qilish': 'Book now', 'Kelish': 'Check-in', 'Ketish': 'Check-out', 'Mehmonlar': 'Guests', 'Topish': 'Search', 'Online bron': 'Online booking',
    'Modalni yopish': 'Close dialog', 'Ism': 'First name', 'Familiya': 'Last name', 'Telefon': 'Phone', 'Kelish sanasi': 'Check-in date', 'Ketish sanasi': 'Check-out date',
    'Xona kategoriyasi': 'Room category', 'Izoh': 'Note', 'Yuborilmoqda...': 'Sending...', 'Bron yuborish': 'Submit booking',
    'Kategoriyalar bazadan olinmadi, vaqtincha standart ro‘yxat ko‘rsatildi.': 'Room categories could not be loaded; a standard list is shown temporarily.',
    'Hozir bronni yuborib bo‘lmadi. Iltimos, qayta urinib ko‘ring.': 'The booking could not be sent. Please try again.', 'Xabarni yopish': 'Close message',
    'Bron qabul qilindi': 'Booking received', 'Xonangiz muvaffaqiyatli band qilindi': 'Your room has been booked successfully', 'Mehmon': 'Guest', 'Xona': 'Room',
    'Bu xabar 4 sekunddan so‘ng avtomatik yopiladi.': 'This message will close automatically in 4 seconds.',
    'Safaringizga mos xona kategoriyasini tanlang': 'Choose the right room for your trip',
    'Ko‘rsatilgan narxlar chet ellik mehmonlar uchun bazadagi xona narxlari asosida chiqadi.': 'Displayed prices are based on room rates for international guests.',
    'Xonalar yuklanmoqda...': 'Loading rooms...', 'Xonalarni yuklashda xatolik yuz berdi. Iltimos, birozdan keyin qayta urinib ko‘ring.': 'Rooms could not be loaded. Please try again shortly.',
    'Narx admin panelda kiritilmagan': 'Price has not been entered in the admin panel', 'Rasmlarni ko‘rish': 'View photos', '1 kecha uchun': 'per night',
    'Yopish': 'Close', 'Oldingi rasm': 'Previous photo', 'Keyingi rasm': 'Next photo', 'Google Maps’da ochish': 'Open in Google Maps',
    'Telefon: +998 78 223 00 15': 'Phone: +998 78 223 00 15', 'Manzil: Namangan Province, Namangan': 'Address: Namangan Province, Namangan',
    'Qulaylik va iliq mehmondo‘stlik bir joyda': 'Comfort and warm hospitality in one place',
    'Sayyohlar va ishbilarmon mehmonlar uchun Namangan shahridagi zamonaviy turar joy.': 'Modern accommodation in Namangan for tourists and business travellers.',
    'Namanganda qulay yashash uchun zamonaviy mehmonxona': 'A modern hotel for a comfortable stay in Namangan',
    'Istiqlol Hotel Namangan shahrida sayyohlar va ishbilarmon mehmonlar uchun komfortli joylashuvni taklif etadi. Qulay manzil, puxta o‘ylangan servis va maqbul narxlar mehmonxonani shaharda qolish uchun ishonchli tanlovga aylantiradi.': 'Istiqlol Hotel offers comfortable accommodation for tourists and business travellers in Namangan. Its convenient location, thoughtful service and fair prices make it a dependable choice.',
    'Mehmonlar standart xonalardan lyuksgacha bo‘lgan turli toifadagi shinam xonalardan foydalanishlari mumkin. Har bir xonada dam olish va ishlash uchun zarur sharoitlar, jumladan konditsioner, Wi-Fi va alohida hammom mavjud.': 'Guests can choose cosy rooms ranging from standard to suite categories. Every room includes essentials for rest and work, including air conditioning, Wi-Fi and a private bathroom.',
    'Har kuni ertalab 07:00 dan 10:00 gacha bufet usulida nonushta beriladi. Istiqlol Hotel qisqa safar uchun ham, uzoq muddatli yashash uchun ham sokin muhit va kerakli qulayliklarni bir joyda jamlaydi.': 'A buffet breakfast is served daily from 07:00 to 10:00. Istiqlol Hotel brings together a quiet setting and practical comforts for both short and extended stays.',
    'Standarddan lyuksgacha qulay toifalar': 'Comfortable categories from standard rooms to suites', 'Nonushta': 'Breakfast', 'Har kuni 07:00 - 10:00, bufet usulida': 'Daily 07:00–10:00, buffet style',
    'Avtoturargoh': 'Parking', 'Bino oldida 15 ta avtomobil uchun joy': '15 parking spaces in front of the building', '24/7 qabulxona, videokuzatuv va kir yuvish xizmati': '24/7 reception, CCTV and laundry service',
    'Mehmonlar uchun asosiy ma\'lumotlar': 'Essential guest information',
    'Istiqlol Hotel shahar ichida qulay joylashgan. Aeroport va asosiy manzillarga yetib borish oson, qabulxona esa mehmonlarga kunu tun yordam beradi.': 'Istiqlol Hotel is conveniently located in the city. The airport and key destinations are easy to reach, and reception assists guests around the clock.',
    'Kelish vaqti': 'Check-in time', "14:00 dan boshlab ro'yxatdan o'tish": 'Check-in from 14:00', 'Chiqish vaqti': 'Check-out time', "12:00 gacha ro'yxatdan chiqish": 'Check-out by 12:00',
    'Manzil': 'Address', "Namangan viloyati, Davlatobod tumani, Islom Karimov ko'chasi 20-uy": '20 Islam Karimov Street, Davlatabad District, Namangan Region',
    'Har safar ko\'proq foyda': 'More value with every stay',
    "Doimiy mehmonlar uchun sodiqlik dasturi mavjud. Mehmonxonada ko'proq tunagan sari daraja oshadi va keyingi bandlovlarda chegirmalar yanada qulaylashadi.": 'A loyalty program is available for returning guests. Your level increases with every stay, unlocking better discounts on future bookings.',
    "10% chegirma": '10% discount', "12% chegirma": '12% discount', "15% chegirma": '15% discount', "Doimiy mehmonlar uchun boshlang'ich imtiyoz.": 'An introductory benefit for returning guests.',
    "5 kecha va undan ko'p jamg'argan mehmonlar uchun.": 'For guests who have accumulated 5 or more nights.', "10 kecha va undan ko'p jamg'argan mehmonlar uchun.": 'For guests who have accumulated 10 or more nights.',
    'Xonalar va mehmonxona muhitidan lavhalar': 'Rooms and the atmosphere of the hotel', 'Kun mazali nonushta bilan boshlanadi': 'Start the day with a delicious breakfast',
    "Mehmonxonada har kuni 07:00 dan 10:00 gacha bufet usulida nonushta taqdim etiladi. Yorug' va shinam zalda mehmonlar o'z didiga mos taomlarni tanlab, kunni yoqimli muhitda boshlashlari mumkin.": 'A buffet breakfast is served daily from 07:00 to 10:00. In the bright, welcoming dining room, guests can choose dishes to suit their taste.',
    'Restoran qismi qisqa dam olish, ish uchrashuvi oldidan nonushta qilish yoki safar davomida xotirjam ovqatlanish uchun qulay.': 'The restaurant is ideal for a short break, breakfast before a business meeting or a relaxed meal during your trip.',
    'Yashash sharoitlari': 'Stay conditions', 'Safaringizning har bir lahzasi uchun o‘ylangan': 'Thoughtful comfort throughout your stay',
    'Har bir mehmon uchun osoyishta muhit, e’tibor va samarali dam olishga mos qulayliklar yaratilgan.': 'Every guest can enjoy a peaceful setting, attentive service and everything needed for a restful stay.',
    'Kelishda ro‘yxatdan o‘tish': 'Check-in', 'Jo‘nashda ro‘yxatdan o‘tish': 'Check-out', 'Qabulxona va mehmonlarga yordam': 'Reception and guest assistance',
    'Qoidalar va shartlar': 'Rules and conditions', 'Bandlov bo‘yicha muhim ma’lumotlar': 'Important booking information',
    'Bandlov tasdiqlanganda mehmon turar joy tafsilotlari va to‘lov shartlari ko‘rsatilgan tasdiqni oladi.': 'Once a booking is confirmed, the guest receives accommodation details and payment terms.',
    'Narx xona toifasi, kelish sanasi va joriy takliflarga qarab o‘zgarishi mumkin.': 'The price may vary by room category, arrival date and current offers.',
    'Bandlovni o‘zgartirish yoki bekor qilish belgilangan muddatda amalga oshirilsa, jarima olinmaydi.': 'There is no penalty when a booking is changed or cancelled within the stated period.',
    'Kech bekor qilish yoki kelmaslik holatida tanlangan tarif shartlariga muvofiq to‘lov ushlab qolinishi mumkin.': 'Late cancellation or no-show charges may apply under the selected rate conditions.',
    'Dam olish va ish safari uchun kerakli xizmatlar': 'Services for leisure and business travel',
    'Istiqlol Hotel Namanganda qulay yashash uchun asosiy va qo‘shimcha xizmatlarni bir joyda taqdim etadi.': 'Istiqlol Hotel brings together essential and additional services for a comfortable stay in Namangan.',
    'Asosiy xizmatlar': 'Essential services', 'Qo‘shimcha xizmatlar': 'Additional services', 'Qulayliklar': 'Amenities', 'Xonalarda mavjud jihozlar': 'In-room amenities',
    'Maxsus takliflar': 'Special offers', 'Qolish muddati va rejangizga mos foydali tariflar': 'Great-value rates for your plans and length of stay',
    'Uzoqroq yashash yoki safarni oldindan rejalashtirish orqali Istiqlol Hotel’da yanada qulay shartlarda bron qiling.': 'Enjoy better booking terms at Istiqlol Hotel when staying longer or planning ahead.',
    'Tarif shartlari': 'Rate conditions', 'Afzalliklar': 'Benefits', 'Istiqlol Hotel bilan bog‘lanish': 'Contact Istiqlol Hotel',
    'Xona band qilish, manzilni aniqlash yoki mehmonxona bo‘yicha savol berish uchun qabulxona 24/7 ishlaydi.': 'Reception is open 24/7 for room bookings, directions and any questions about the hotel.',
    'GPS koordinatalari': 'GPS coordinates', 'Pochta indeksi: 160100': 'Postal code: 160100', 'Xaritada aniq lokatsiya': 'Exact map location', 'Qabulxona': 'Reception',
    'Joylashuv va yo‘nalish': 'Location and directions', 'Yaqin manzillar': 'Nearby places', 'Namangan Xalqaro Aeroporti': 'Namangan International Airport',
    'Telefon kutmasdan xona band qiling': 'Book a room without waiting on the phone',
    'Xonani tez va ishonchli band qilish uchun online bron formasidan foydalaning va kelish vaqtigacha ma’lumotlaringiz tayyor bo‘lsin.': 'Use the online form to book quickly and reliably, so your details are ready before arrival.',
    'Bron formasiga o‘tish': 'Go to booking form',
  },
};

Object.assign(translations.ru, {
  'Nonushta bufeti: 07:00 - 10:00': 'Завтрак «шведский стол»: 07:00–10:00',
  'Bino oldida 15 ta joyli ochiq avtoturargoh': 'Открытая парковка на 15 мест перед зданием',
  'Butun hudud bo‘ylab bepul Wi-Fi': 'Бесплатный Wi-Fi на всей территории', '24 soatlik qabulxona': 'Круглосуточная стойка регистрации',
  'Kir yuvish xizmati: qo‘shimcha haq evaziga': 'Услуги прачечной за дополнительную плату', 'Transfer yoki taksi chaqirish: so‘rov bo‘yicha': 'Трансфер или вызов такси по запросу',
  'Mehmonlarga yordam va axborot ko‘magi': 'Помощь гостям и информационная поддержка', 'Nonushta "Bufet"': 'Завтрак «шведский стол»',
  'Keng va yorug‘ zalda mehmonlar har xil didga mos taomlarni tanlashlari mumkin. Nonushta kunni yoqimli muhit va mazali taomlar bilan boshlashga yordam beradi.': 'В просторном светлом зале гости могут выбрать блюда на любой вкус. Завтрак помогает начать день в приятной атмосфере.',
  'Keng, tartibli va yaxshi yoritilgan ochiq avtoturargoh mehmonlar qulayligi uchun mo‘ljallangan. Hudud 24 soatlik videokuzatuv ostida.': 'Просторная, ухоженная и хорошо освещённая парковка создана для удобства гостей. Территория находится под круглосуточным видеонаблюдением.',
  'Kir yuvish': 'Прачечная', 'Buyumlarining tozaligi va saranjomligini qadrlaydigan mehmonlar uchun qulay kir yuvish xizmati mavjud. Xizmat qabulxonada so‘rov bo‘yicha ko‘rsatiladi.': 'Для гостей доступна удобная услуга прачечной. Заказать её можно на стойке регистрации.',
  'Hammom aksessuarlari': 'Туалетные принадлежности', 'Konditsioner': 'Кондиционер', 'Shahar manzarasi': 'Вид на город', 'Alohida hammom': 'Собственная ванная комната',
  'Ovqatlanish stoli': 'Обеденный стол', 'Yozuv stoli': 'Рабочий стол', 'Bir kishilik to‘shak': 'Односпальная кровать', 'Dush': 'Душ', 'Kiyim javoni': 'Шкаф',
  'Soch quritgich': 'Фен', 'Shippak': 'Тапочки', 'Choynak': 'Чайник', 'Televizor': 'Телевизор', 'Tekis ekranli televizor': 'Телевизор с плоским экраном',
  'Xalqaro rozetka': 'Универсальная розетка', 'Elektron qulflar': 'Электронные замки', 'Internet': 'Интернет', 'Bide': 'Биде', 'Vanna': 'Ванна',
  'Ikkita bir kishilik to‘shak': 'Две односпальные кровати', 'King size yotoq': 'Кровать King Size', 'Uy hayvonlari bilan mumkin emas': 'Размещение с животными запрещено',
  'Uzoq muddatli yashash 3': 'Длительное проживание 3', '3+ kecha': '3+ ночи', 'Uzoq muddatli yashash 5': 'Длительное проживание 5', '5+ kecha': '5+ ночей',
  'Erta bron qilish': 'Раннее бронирование', 'Oldindan bron': 'Раннее бронирование',
  'Istiqlol Hotel mehmonxonasida 3 kecha yoki undan ko‘proq qolishni rejalashtirgan mehmonlar uchun qulay tarif.': 'Выгодный тариф для гостей, планирующих остановиться в Istiqlol Hotel на 3 ночи и более.',
  'Namanganda ko‘proq vaqt o‘tkazadigan mehmonlar uchun yanada foydali narx va barqaror qulaylik.': 'Ещё более выгодная цена и неизменный комфорт для длительного пребывания в Намангане.',
  'Safarni oldindan rejalashtiring va kelish sanasidan kamida 5 kun oldin bron qilib, maqbul narxni saqlab qoling.': 'Планируйте поездку заранее и бронируйте минимум за 5 дней до заезда, чтобы сохранить выгодную цену.',
  'Minimal yashash muddati 3 kecha': 'Минимальный срок проживания — 3 ночи', 'Minimal yashash muddati 5 kecha': 'Минимальный срок проживания — 5 ночей',
  'Standart tarifdan 10% chegirma': 'Скидка 10% от стандартного тарифа', 'Standart tarifdan 12% chegirma': 'Скидка 12% от стандартного тарифа', 'Standart tarifdan 8% chegirma': 'Скидка 8% от стандартного тарифа',
  'Nonushta narxga kiritilgan: 07:00 - 10:00': 'Завтрак включён: 07:00–10:00', 'Bepul Wi-Fi': 'Бесплатный Wi-Fi', 'Ish safarlari uchun ideal': 'Идеально для деловых поездок',
  'Kelish sanasidan kamida 5 kun oldin bron qilish': 'Бронирование минимум за 5 дней до заезда', 'Taklif xonalar mavjud bo‘lganda amal qiladi': 'Предложение действует при наличии номеров',
  'Namangan viloyati, Davlatobod tumani, Islom Karimov ko‘chasi 20-uy': 'Наманганская область, Давлатабадский район, ул. Ислама Каримова, 20',
  'Afsonalar vodisyi parki': 'Парк «Долина легенд»',
});

Object.assign(translations.en, {
  'Nonushta bufeti: 07:00 - 10:00': 'Breakfast buffet: 07:00–10:00', 'Bino oldida 15 ta joyli ochiq avtoturargoh': '15-space outdoor parking in front of the building',
  'Butun hudud bo‘ylab bepul Wi-Fi': 'Free Wi-Fi throughout the property', '24 soatlik qabulxona': '24-hour reception',
  'Kir yuvish xizmati: qo‘shimcha haq evaziga': 'Laundry service for an additional fee', 'Transfer yoki taksi chaqirish: so‘rov bo‘yicha': 'Transfer or taxi on request',
  'Mehmonlarga yordam va axborot ko‘magi': 'Guest assistance and information', 'Nonushta "Bufet"': 'Buffet breakfast',
  'Keng va yorug‘ zalda mehmonlar har xil didga mos taomlarni tanlashlari mumkin. Nonushta kunni yoqimli muhit va mazali taomlar bilan boshlashga yordam beradi.': 'In the spacious, bright dining room, guests can choose dishes for every taste and start the day with a delicious breakfast.',
  'Keng, tartibli va yaxshi yoritilgan ochiq avtoturargoh mehmonlar qulayligi uchun mo‘ljallangan. Hudud 24 soatlik videokuzatuv ostida.': 'The spacious, tidy and well-lit outdoor car park is designed for guest convenience and monitored around the clock.',
  'Kir yuvish': 'Laundry', 'Buyumlarining tozaligi va saranjomligini qadrlaydigan mehmonlar uchun qulay kir yuvish xizmati mavjud. Xizmat qabulxonada so‘rov bo‘yicha ko‘rsatiladi.': 'A convenient laundry service is available on request through reception.',
  'Hammom aksessuarlari': 'Bathroom amenities', 'Konditsioner': 'Air conditioning', 'Shahar manzarasi': 'City view', 'Alohida hammom': 'Private bathroom',
  'Ovqatlanish stoli': 'Dining table', 'Yozuv stoli': 'Desk', 'Bir kishilik to‘shak': 'Single bed', 'Dush': 'Shower', 'Kiyim javoni': 'Wardrobe', 'Soch quritgich': 'Hair dryer',
  'Shippak': 'Slippers', 'Choynak': 'Kettle', 'Televizor': 'Television', 'Tekis ekranli televizor': 'Flat-screen TV', 'Xalqaro rozetka': 'Universal socket',
  'Elektron qulflar': 'Electronic locks', 'Internet': 'Internet', 'Bide': 'Bidet', 'Vanna': 'Bathtub', 'Ikkita bir kishilik to‘shak': 'Two single beds',
  'King size yotoq': 'King-size bed', 'Uy hayvonlari bilan mumkin emas': 'No pets allowed',
  'Uzoq muddatli yashash 3': 'Long stay 3', '3+ kecha': '3+ nights', 'Uzoq muddatli yashash 5': 'Long stay 5', '5+ kecha': '5+ nights',
  'Erta bron qilish': 'Early booking', 'Oldindan bron': 'Book in advance',
  'Istiqlol Hotel mehmonxonasida 3 kecha yoki undan ko‘proq qolishni rejalashtirgan mehmonlar uchun qulay tarif.': 'A convenient rate for guests planning to stay at Istiqlol Hotel for 3 nights or more.',
  'Namanganda ko‘proq vaqt o‘tkazadigan mehmonlar uchun yanada foydali narx va barqaror qulaylik.': 'Even better value and consistent comfort for guests spending more time in Namangan.',
  'Safarni oldindan rejalashtiring va kelish sanasidan kamida 5 kun oldin bron qilib, maqbul narxni saqlab qoling.': 'Plan ahead and book at least 5 days before arrival to secure a better rate.',
  'Minimal yashash muddati 3 kecha': 'Minimum stay: 3 nights', 'Minimal yashash muddati 5 kecha': 'Minimum stay: 5 nights',
  'Standart tarifdan 10% chegirma': '10% off the standard rate', 'Standart tarifdan 12% chegirma': '12% off the standard rate', 'Standart tarifdan 8% chegirma': '8% off the standard rate',
  'Nonushta narxga kiritilgan: 07:00 - 10:00': 'Breakfast included: 07:00–10:00', 'Bepul Wi-Fi': 'Free Wi-Fi', 'Ish safarlari uchun ideal': 'Ideal for business trips',
  'Kelish sanasidan kamida 5 kun oldin bron qilish': 'Book at least 5 days before arrival', 'Taklif xonalar mavjud bo‘lganda amal qiladi': 'Offer subject to room availability',
  'Namangan viloyati, Davlatobod tumani, Islom Karimov ko‘chasi 20-uy': '20 Islam Karimov Street, Davlatabad District, Namangan Region',
  'Afsonalar vodisyi parki': 'Valley of Legends Park',
});

Object.assign(translations.ru, {
  'Bosh sahifa': 'Главная', '← Bosh sahifa': '← Главная', 'Mehmon rezidentligi': 'Резидентство гостя',
  'O‘zbekiston rezidenti': 'Резидент Узбекистана', 'Mahalliy tarif': 'Местный тариф', 'Norezident': 'Нерезидент',
  'Chet elliklar tarifi': 'Тариф для иностранцев', 'Mavjud xonalar': 'Доступные номера', 'Xonangizni tanlang': 'Выберите номер',
  'PMS bazasidan bo‘sh xona va narxlarni olib bo‘lmadi. Iltimos, qayta urinib ko‘ring.': 'Не удалось получить свободные номера и цены из PMS. Попробуйте ещё раз.',
  'Tanlangan sanalarda bo‘sh xona qolmagan.': 'На выбранные даты свободных номеров нет.', 'Sanalar': 'Даты',
  'Xona tanlanmagan': 'Номер не выбран', 'Jami': 'Итого', 'Avval xona tanlang': 'Сначала выберите номер',
  'Tanlangan xonalarda mehmonlar uchun joy yetarli emas': 'В выбранных номерах недостаточно мест для гостей',
  'Mijoz ma’lumotlari': 'Данные гостя', 'Bronni rasmiylashtirish': 'Оформление бронирования', 'Email': 'Email',
  'Tanlangan xonalar': 'Выбранные номера', 'Bron raqami': 'Номер брони', 'Xona kategoriyasi': 'Категория номера',
  'Bron qog‘ozi emailingizga yuborildi.': 'Подтверждение брони отправлено на вашу почту.',
  'Email yuborilmadi. Bron havolasini saqlab qo‘ying.': 'Письмо не отправлено. Сохраните ссылку на бронь.',
  'Bron qog‘ozini ochish': 'Открыть подтверждение', 'Bosh sahifaga qaytish': 'Вернуться на главную',
  'Kelish sanasi bugungi sanadan oldin bo‘lishi mumkin emas.': 'Дата заезда не может быть раньше сегодняшней.',
  'Ketish sanasi kelish sanasidan keyin bo‘lishi kerak.': 'Дата выезда должна быть позже даты заезда.',
  'Wi‑Fi': 'Wi‑Fi', '24/7 reception': 'Стойка 24/7', 'Shved stoli': 'Шведский стол',
  'Kattalar': 'Взрослые', '13 yosh va undan katta': '13 лет и старше', 'Bolalar': 'Дети', '0–12 yosh': '0–12 лет',
  'Kerakli xona soni': 'Количество номеров', 'Tayyor': 'Готово',
  'Bron tasdiq qog‘ozi': 'Подтверждение бронирования', 'Bron ma’lumotlari yuklanmoqda...': 'Данные брони загружаются...',
  'Bron topilmadi': 'Бронь не найдена', 'Havola noto‘g‘ri yoki yaroqsiz.': 'Ссылка неверна или недействительна.',
  'Bron tasdiqlandi': 'Бронь подтверждена', 'Rezidentlik': 'Резидентство', 'PDF yuklab olish': 'Скачать PDF',
});

Object.assign(translations.en, {
  'Bosh sahifa': 'Home', '← Bosh sahifa': '← Home', 'Mehmon rezidentligi': 'Guest residency',
  'O‘zbekiston rezidenti': 'Uzbekistan resident', 'Mahalliy tarif': 'Local rate', 'Norezident': 'Non-resident',
  'Chet elliklar tarifi': 'International guest rate', 'Mavjud xonalar': 'Available rooms', 'Xonangizni tanlang': 'Choose your room',
  'PMS bazasidan bo‘sh xona va narxlarni olib bo‘lmadi. Iltimos, qayta urinib ko‘ring.': 'Available rooms and prices could not be loaded from the PMS. Please try again.',
  'Tanlangan sanalarda bo‘sh xona qolmagan.': 'No rooms are available for the selected dates.', 'Sanalar': 'Dates',
  'Xona tanlanmagan': 'No room selected', 'Jami': 'Total', 'Avval xona tanlang': 'Select a room first',
  'Tanlangan xonalarda mehmonlar uchun joy yetarli emas': 'The selected rooms do not have enough capacity for all guests',
  'Mijoz ma’lumotlari': 'Guest details', 'Bronni rasmiylashtirish': 'Complete your booking', 'Email': 'Email',
  'Tanlangan xonalar': 'Selected rooms', 'Bron raqami': 'Booking reference', 'Xona kategoriyasi': 'Room category',
  'Bron qog‘ozi emailingizga yuborildi.': 'Your booking confirmation has been emailed to you.',
  'Email yuborilmadi. Bron havolasini saqlab qo‘ying.': 'The email was not sent. Save your booking link.',
  'Bron qog‘ozini ochish': 'Open booking confirmation', 'Bosh sahifaga qaytish': 'Return home',
  'Kelish sanasi bugungi sanadan oldin bo‘lishi mumkin emas.': 'Check-in cannot be earlier than today.',
  'Ketish sanasi kelish sanasidan keyin bo‘lishi kerak.': 'Check-out must be later than check-in.',
  'Wi‑Fi': 'Wi‑Fi', '24/7 reception': '24/7 reception', 'Shved stoli': 'Buffet breakfast',
  'Kattalar': 'Adults', '13 yosh va undan katta': 'Ages 13 and over', 'Bolalar': 'Children', '0–12 yosh': 'Ages 0–12',
  'Kerakli xona soni': 'Number of rooms', 'Tayyor': 'Done',
  'Bron tasdiq qog‘ozi': 'Booking confirmation', 'Bron ma’lumotlari yuklanmoqda...': 'Loading booking details...',
  'Bron topilmadi': 'Booking not found', 'Havola noto‘g‘ri yoki yaroqsiz.': 'The link is invalid or has expired.',
  'Bron tasdiqlandi': 'Booking confirmed', 'Rezidentlik': 'Residency', 'PDF yuklab olish': 'Download PDF',
});

const originalText = new WeakMap();
const originalAttributes = new WeakMap();

function translateValue(value, language) {
  if (language === 'uz') return value;
  const exact = translations[language]?.[value];
  if (exact) return exact;

  const rules = language === 'ru'
    ? [
      [/^(\d+) kunlik bron$/, 'Бронирование на $1 дн.'], [/^(\d+) mehmon gacha · (\d+) ta xona$/, 'До $1 гостей · $2 номеров'],
      [/^(\d+)-rasmni ko‘rsatish$/, 'Показать фото $1'], [/^(\d+)-rasmni ko‘rish$/, 'Открыть фото $1'],
      [/^(.+) rasmlarini ko‘rish$/, 'Посмотреть фото: $1'], [/^(.+) ko‘rinishi$/, 'Вид номера: $1'], [/^(.+) rasmlari$/, 'Фото: $1'], [/^(.+) rasmi$/, 'Фото: $1'],
      [/^(\d+) kishilik$/, 'На $1 чел.'], [/^(\d+) kecha$/, '$1 ноч.'], [/^(\d+) xona$/, '$1 ном.'], [/^(\d+) ta xona$/, '$1 ном.'],
      [/^(\d+) katta yoshli$/, '$1 взрослых'], [/^(\d+) bola$/, '$1 детей'], [/^(\d+) \/ (\d+) ta joy band$/, 'Занято $1 из $2 мест'],
      [/^(.+) \((\d+) kishilik\) × (\d+)$/, '$1 (на $2 чел.) × $3'], [/^(\d+) kishilik · (\d+) ta xona$/, 'На $1 чел. · $2 ном.'],
    ]
    : [
      [/^(\d+) kunlik bron$/, '$1-night booking'], [/^(\d+) mehmon gacha · (\d+) ta xona$/, 'Up to $1 guests · $2 rooms'],
      [/^(\d+)-rasmni ko‘rsatish$/, 'Show image $1'], [/^(\d+)-rasmni ko‘rish$/, 'View image $1'],
      [/^(.+) rasmlarini ko‘rish$/, 'View photos of $1'], [/^(.+) ko‘rinishi$/, '$1 room view'], [/^(.+) rasmlari$/, '$1 photos'], [/^(.+) rasmi$/, '$1 photo'],
      [/^(\d+) kishilik$/, 'Sleeps $1'], [/^(\d+) kecha$/, '$1 night(s)'], [/^(\d+) xona$/, '$1 room(s)'], [/^(\d+) ta xona$/, '$1 room(s)'],
      [/^(\d+) katta yoshli$/, '$1 adult(s)'], [/^(\d+) bola$/, '$1 child(ren)'], [/^(\d+) \/ (\d+) ta joy band$/, '$1 of $2 places occupied'],
      [/^(.+) \((\d+) kishilik\) × (\d+)$/, '$1 (sleeps $2) × $3'], [/^(\d+) kishilik · (\d+) ta xona$/, 'Sleeps $1 · $2 room(s)'],
    ];
  for (const [pattern, replacement] of rules) if (pattern.test(value)) return value.replace(pattern, replacement);
  return value;
}

function translateTree(root, language) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest('script, style, [data-no-translate]')) return;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (!trimmed) return;
    const nextValue = source.replace(trimmed, translateValue(trimmed, language));
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  });

  root.querySelectorAll?.('[aria-label], [title], [placeholder], img[alt]').forEach((element) => {
    if (element.closest('[data-no-translate]')) return;
    if (!originalAttributes.has(element)) originalAttributes.set(element, {});
    const saved = originalAttributes.get(element);
    ['aria-label', 'title', 'placeholder', 'alt'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!(attribute in saved)) saved[attribute] = element.getAttribute(attribute);
      const nextValue = translateValue(saved[attribute], language);
      if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
    });
  });
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = window.localStorage.getItem('istiqlol-language');
    return ['uz', 'ru', 'en'].includes(saved) ? saved : 'uz';
  });

  useEffect(() => {
    window.localStorage.setItem('istiqlol-language', language);
    document.documentElement.lang = language;
    document.title = language === 'ru' ? 'Istiqlol Hotel — Наманган' : language === 'en' ? 'Istiqlol Hotel — Namangan' : 'Istiqlol Hotel — Namangan';
    translateTree(document.body, language);
    const observer = new MutationObserver((records) => records.forEach((record) => {
      if (record.type === 'childList') record.addedNodes.forEach((node) => translateTree(node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement, language));
      if (record.type === 'characterData') translateTree(record.target.parentElement, language);
      if (record.type === 'attributes') translateTree(record.target, language);
    }));
    observer.observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['aria-label', 'title', 'placeholder', 'alt'] });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
