const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send();

    if (!process.env.Gemini_API_Key) {
        return res.status(500).json({ error: "Gemini_API_Key is missing in Vercel." });
    }

    const { prompt } = req.body;

    try {
        // الخطوة 1: استخدام Gemini لهندسة البرومبت
        const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);
        
        // استخدام النموذج الأحدث لحل مشكلة 404 الخاصة بـ gemini-pro
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const aiInstruction = `أنت تعمل كمهندس نصوص لتوليد الصور. قم بترجمة طلب المستخدم للعربية إلى الإنجليزية.
قاعدة صارمة جداً: إذا طلب المستخدم رسم خريطة دولة محددة أو شكل دقيق، يجب أن يبدأ البرومبت بتأكيد صارم على الشكل، مثال: The exact geographical map silhouette of [Country].
اجعل الوصف الفني قصيراً ومباشراً، وامنع تماماً إضافة تفاصيل مبالغ فيها مثل: Unreal Engine 5, award-winning, hyper-realistic لأنها تشتت نموذج الرسم عن الشكل الأساسي.
إذا كان الطلب ليس خريطة أو شكلاً دقيقاً، اكتب Prompt إنجليزي واضح ومباشر ومناسب لتوليد صورة، بدون مبالغة أو زخرفة زائدة.
طلب المستخدم: "${prompt}"

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
