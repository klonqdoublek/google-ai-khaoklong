import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    console.log("API route handler started"); // Added log

    if (req.method !== 'POST') {
        console.log("Method not POST"); // Added log
        return res.status(405).text({ message: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    console.log("Received prompt:", prompt); // Added log

    if (!prompt) {
        console.log("Prompt is missing"); // Added log
        return res.status(400).text({ message: 'Prompt is required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.local.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        console.log("Calling Gemini API..."); // Added log
        const result = await model.generateContent(prompt);
        console.log("Gemini API Result:", result); // Log the entire result object

        const responseText = result.response.text();
        console.log("Generated quote:", responseText); // Added log
        console.log("API route handler finished successfully"); // Added log
        res.status(200).text({ quote: responseText });
    } catch (error) {
        console.error("Error generating quote:", error); // Keep existing error log
        console.error("Full error object:", error); // Log full error object for more details
        console.log("API route handler finished with error"); // Added log
        res.status(500).text({ message: 'Failed to generate quote', error: error.message });
    }
}