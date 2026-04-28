const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send();

    // التأكد من وجود مفتاح API
    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "مفتاح GEMINI_API_KEY مفقود في إعدادات Vercel" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { prompt, fileData } = req.body;

    try {
        // استخدام النموذج الحقيقي والأقوى من جوجل
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
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
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: error.message });
    }
}
