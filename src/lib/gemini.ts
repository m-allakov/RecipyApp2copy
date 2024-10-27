import { GoogleGenerativeAI } from '@google/generative-ai';

// Not: Gerçek API anahtarınızı buraya eklemelisiniz
const API_KEY = 'AIzaSyC0NGV6-7jxPXAiKqX1vx6HJR72OyIPxk0';

let genAI: GoogleGenerativeAI;

try {
  genAI = new GoogleGenerativeAI(API_KEY);
} catch (error) {
  console.error('Gemini API başlatılamadı:', error);
}

export const generateRecipe = async (
  ingredients: string,
  mealType: string,
  peopleCount: string,
  cookingMethod: string
): Promise<string> => {
  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    return 'API anahtarı geçerli değil. Lütfen geçerli bir API anahtarı ekleyin.';
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Lütfen şu bilgilere göre bir yemek tarifi oluştur:
      - Malzemeler: ${ingredients}
      - Öğün: ${mealType}
      - Kişi Sayısı: ${peopleCount}
      - Pişirme Yöntemi: ${cookingMethod}

      Tarifi şu formatta ver:
      1. Malzeme Listesi - her bir malzeme için tahmini bir kalori değerini de göster ve bir yerde toplam kalori değerini de göster
      2. Hazırlama Süresi
      3. Pişirme Süresi
      4. Adım Adım Hazırlanışı
      5. Servis Önerisi
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Tarif oluşturma hatası:', error);
    return 'Tarif oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  }
};