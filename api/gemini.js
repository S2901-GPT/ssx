import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send();

    // تأكد من إضافة GEMINI_API_KEY في إعدادات Vercel
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { prompt, fileData } = req.body;

    try {
        // تم الترقية هنا إلى محرك Nano Banana Pro (Gemini 3 Pro Image)
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });
        
        let parts = [{ text: prompt }];
        
        if (fileData) {
            const mimeType = fileData.split(';')[0].split(':')[1];
            const base64 = fileData.split(',')[1];
            parts.push({
                inlineData: { data: base64, mimeType }
            });
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        res.status(200).json({ text: response.text() });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
