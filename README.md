# Eco Sports Ishlab Chiqarish - Boshqaruv Tizimi

Ushbu loyiha **Eco Sports** kiyim-kechak ishlab chiqarish korxonasi uchun maxsus ishlab chiqilgan bo'lib, ishlab chiqarish jarayonlarini (xomashyo, bichuv, tikuv, tayyor mahsulotlar va ishchilar ish haqi) raqamlashtirish va tartibga solishga xizmat qiladi.

## Loyiha Tuzilmasi

Loyiha quyidagi asosiy papkalarga bo'lingan:

1. **`docs/`** - Hujjatlar va yo'riqnomalar papkasi.
   - `ishlab_chiqarish_tartibi.md` - Bichuvdan tortib tayyor mahsulotgacha bo'lgan bosqichlar yo'riqnomasi.
   - `ekologik_mezonlar.md` - "Eco Sports" ekologik toza ishlab chiqarish mezonlari.
2. **`data/`** - Tizim uchun ma'lumotlar bazasi fayllari (JSON formatida).
   - `xomashyo.json` - Matolar va aksessuarlar ro'yxati.
   - `ishchilar.json` - Tikuvchilar, bichuvchilar ro'yxati va dona-bay ish haqi tariflari.
   - `buyurtmalar.json` - Faol ishlab chiqarish buyurtmalari.
3. **`src/`** - Interaktiv boshqaruv paneli (SPA Web App).
   - `index.html` - Dashboard HTML strukturasi.
   - `style.css` - Glassmorphism uslubidagi to'q yashil va zamonaviy UI dizayni.
   - `app.js` - Dinamik statistika, ma'lumotlarni qo'shish va ularni `localStorage`da saqlash tizimi.

## Tizimning Imkoniyatlari

- **Statistika Dashboard**: Bugungi ishlab chiqarilgan jami mahsulotlar, faol tikuv liniyalari va ekologik hisob-kitoblar (tejalgan suv, CO2 kamaytirilishi, chiqindi ulushi).
- **Ombor Boshqaruvi**: Matolar va tayyor kiyimlar qoldig'ini kuzatish, yangi xomashyo kiritish.
- **Bichuv & Tikuv Jurnali**: Kesilgan matolar va tikuvga berilgan partiyalar monitoringi.
- **Ish Haqi Kalkulyatori**: Tikuvchilar tikkan tayyor mahsulot soni va belgilangan tarif bo'yicha ularning kunlik yoki oylik ish haqlarini avtomatlashtirilgan hisoblash.

## Loyihani Ishga Tushirish

Ushbu loyiha mahalliy server orqali ishga tushadi:

1. Loyiha papkasiga o'ting:
   ```bash
   cd eco-sports-ishlab-chiqarish
   ```
2. Mahalliy serverni yoqing:
   ```bash
   npm run dev
   ```
3. Terminalda ko'rsatilgan manzilni (odatda `http://localhost:3000` yoki `http://localhost:5000`) brauzerda oching.
