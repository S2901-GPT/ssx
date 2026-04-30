const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send();

    if (!process.env.Gemini_API_Key) {
        return res.status(500).json({ error: "Gemini_API_Key is missing in Vercel." });
    }

    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-image-preview" });

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Generate an image from this user request. Return the generated image directly. User request: ${prompt}`
                        }
                    ]
                }
            ],
            generationConfig: {
                responseModalities: ["IMAGE"]
            }
        });

        const response = result.response;
        const parts = response?.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(part => part.inlineData && part.inlineData.data);

        if (!imagePart) {
            const fallbackText = parts.find(part => part.text)?.text || "No image was returned from Gemini.";
            return res.status(500).json({ error: fallbackText });
        }

        const mimeType = imagePart.inlineData.mimeType || "image/png";
        const imageUrl = `data:${mimeType};base64,${imagePart.inlineData.data}`;

        res.status(200).json({
            enhancedPrompt: prompt.trim(),
            imageUrl: imageUrl
        });
    } catch (error) {
        console.error("Nano Banana Image Generation Error:", error);
        res.status(500).json({ error: error.message });
    }
}
