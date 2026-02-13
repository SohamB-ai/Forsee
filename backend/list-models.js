require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = "AIzaSyBPINDONhW2mEbWkM5eXPZO1mRNLXBUtkE";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        // For some reason the library might not expose listModels directly on genAI, or it's on the client.
        // Actually usually it's via the API directly or `genAI.getGenerativeModel`...
        // Let's just try to infer from the error or try a known working model like 'gemini-pro'
        console.log("Trying gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("gemini-pro success:", await result.response.text());
    } catch (error) {
        console.error("gemini-pro failed:", error.message);
    }

    try {
        console.log("Trying gemini-1.5-flash-001...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const result = await model.generateContent("Hello");
        console.log("gemini-1.5-flash-001 success:", await result.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash-001 failed:", error.message);
    }
}

listModels();
