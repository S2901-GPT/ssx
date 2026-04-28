const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send();

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing in Vercel." });
    }

    const { prompt } = req.body;

    try {
        // الخطوة 1: استخدام Gemini لهندسة البرومبت
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // تم تغيير اسم النموذج هنا إلى gemini-pro لحل مشكلة 404
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const aiInstruction = `أنت خبير محترف في كتابة أوامر (Prompts) لمولدات الصور المتقدمة مثل Midjourney.
مهمتك: خذ الفكرة البسيطة التالية من المستخدم، وحولها إلى Prompt احترافي باللغة الإنجليزية فقط.
أضف تفاصيل بصرية دقيقة مثل: الإضاءة (Cinematic lighting, volumetric light)، جودة الكاميرا (8k, unreal engine 5 render)، الأسلوب الفني، والزوايا.
الفكرة البسيطة: "${prompt}"

النتيجة المطلوبة: اكتب البرومبت الإنجليزي فقط كفقرة واحدة بدون أي مقدمات، رموز، أو شروحات.`;

        const result = await model.generateContent(aiInstruction);
        const enhancedPrompt = await result.response.text();

        // الخطوة 2: تمرير البرومبت الاحترافي لمحرك توليد الصور
        const seed = Math.floor(Math.random() * 1000000); 
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt.trim())}?width=1024&height=1024&seed=${seed}&nologo=true`;

        // إرسال البرومبت المطور ورابط الصورة النهائي للواجهة
        res.status(200).json({ 
            enhancedPrompt: enhancedPrompt.trim(), 
            imageUrl: imageUrl 
        });
        
    } catch (error) {
        console.error("Error generating image pipeline:", error);
        res.status(500).json({ error: error.message });
    }
}
