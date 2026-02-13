require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API Setup
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBPINDONhW2mEbWkM5eXPZO1mRNLXBUtkE";
const genAI = new GoogleGenerativeAI(API_KEY);
// Updated to gemini-2.5-flash as per available models
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// System Prompt for consistent output
const SYSTEM_PROMPT = `
You remain an expert industrial AI predictive maintenance system. 
Your task is to analyze sensor data from various industrial systems and predict their health status.
You MUST output ONLY valid JSON. Do not include markdown formatting like \`\`\`json ... \`\`\`.

Input Structure:
- System Info: Name, ID, Description
- Sensor Values: Key-value pairs of sensor readings

Output Structure (JSON Only):
{
  "rul": number, // Remaining Useful Life in days/hours (integer)
  "rulUnit": string, // "Cycles", "Days", "Hours"
  "healthIndex": number, // 0-100 (integer, 100 is best)
  "riskLevel": string, // "LOW", "MEDIUM", "HIGH", or "CRITICAL"
  "precursorProbability": number, // 0.00 to 1.00
  "confidence": number, // 0.00 to 1.00
  "shortTermRisk": number, // 0.00 to 1.00 (Risk within next 7 days)
  "failureMode": string, // Short description of potential failure
  "topSensors": [ // Array of top 3 contributing sensors
    { "name": "string", "impact": number, "direction": "up" | "down" } 
  ],
  "action": "string", // Recommended maintenance action
  "driftDetected": boolean // true/false
}

Logic:
- Analyze the sensor values relative to typical industrial ranges.
- High temperatures, vibrations, or pressures usually indicate lower health and higher risk.
- "rul" should decrease as health decreases.
- "riskLevel" should correlate with "healthIndex" (e.g., <50 is HIGH/CRITICAL).
- Be deterministic but realistic.
`;

app.post('/api/predict', async (req, res) => {
    try {
        const { systemInfo, inputs } = req.body;

        console.log(`Received prediction request for: ${systemInfo.name}`);

        const prompt = `
      System: ${JSON.stringify(systemInfo)}
      Sensor Inputs: ${JSON.stringify(inputs)}
      
      Analyze these inputs based on the system type and provide the predictive maintenance JSON output.
    `;

        const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
        const response = await result.response;
        let text = response.text();

        // Cleanup markdown if present (just in case the model ignores the "ONLY JSON" instruction slightly)
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const prediction = JSON.parse(text);

        // Add some random simulation data that the AI might essentially halllucinate or keep static, 
        // but ensures the frontend graph works if the AI doesn't return it (though we asked for it).
        // Actually, let's just trust the AI but provide defaults if missing.

        const enhancedPrediction = {
            ...prediction,
            // Ensure strictly required fields exist if AI missed them
            longTermProjection: prediction.longTermProjection || [
                { cycle: 0, health: 100 },
                { cycle: 25, health: prediction.healthIndex + 5 },
                { cycle: 50, health: prediction.healthIndex },
                { cycle: 75, health: prediction.healthIndex - 10 },
                { cycle: 100, health: prediction.healthIndex - 20 }
            ],
            simulation: prediction.simulation || {
                maintenanceNow: { riskReduction: 85, healthImprovement: 15, cost: 4500 },
                maintenanceLater: { riskReduction: 10, healthImprovement: 2, cost: 28000 }
            },
            failureCluster: prediction.failureCluster || { id: "CL-GEN", label: prediction.failureMode, description: "AI Detected Pattern" },
            dataDrift: prediction.dataDrift || { detected: prediction.driftDetected, severity: "Medium", explanation: "AI analysis of input distribution." }
        };

        res.json(enhancedPrediction);

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            error: 'Failed to generate prediction',
            details: error.message,
            // Fallback mock for resilience
            fallback: {
                healthIndex: 50,
                riskLevel: "MEDIUM",
                action: "System Error - Check Backend Logs"
            }
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

const CHAT_SYSTEM_PROMPT = `
You are "Forsee AI", an advanced industrial predictive maintenance assistant.
Your goal is to assist machine operators, engineers, and plant managers in ensuring optimal equipment health.

Traits:
- Professional, technical, yet accessible.
- Proactive in suggesting safety checks.
- Knowledgeable about industrial machinery (turbines, pumps, compressors, conveyor belts, etc.).

Capabilities:
- Explaining failure modes (e.g., "What causes bearing seizure?").
- Recommending maintenance actions.
- interpreting technical sensor data concepts (vibration analysis, thermography).
- Helping users navigate the Forsee AI dashboard (conceptually).

Guidelines:
- If asked about specific real-time data that you don't have access to, politely explain you are an AI assistant and ask the user to provide the readings or check the dashboard.
- Keep answers concise and actionable.
- Prioritize safety in all recommendations.
`;

const chatModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: CHAT_SYSTEM_PROMPT
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        console.log(`Received chat message: ${message}`);
        console.log(`History length: ${history?.length}`);

        // Construct chat history for Gemini
        const chat = chatModel.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });

    } catch (error) {
        console.error('Chat API Error Full Objects:', JSON.stringify(error, null, 2));
        console.error('Chat API Error Message:', error.message);

        let errorMessage = 'Failed to process chat message';

        // Handle common Gemini errors
        if (error.message?.includes('API key')) {
            errorMessage = 'Invalid API Key';
        } else if (error.message?.includes('SAFETY')) {
            errorMessage = 'Response blocked by safety filters';
        }

        res.status(500).json({ error: errorMessage, details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
