const fs = require('fs');
async function listModels() {
    const key = "AIzaSyBPINDONhW2mEbWkM5eXPZO1mRNLXBUtkE";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            console.error(await response.text());
            return;
        }
        const data = await response.json();
        if (data.models) {
            const names = data.models.map(m => m.name).join('\n');
            fs.writeFileSync('models-utf8.txt', names);
            console.log("Wrote to models-utf8.txt");
        } else {
            console.log("No models found:", JSON.stringify(data));
        }
    } catch (e) {
        console.error("Fetch error:", e.message);
    }
}

listModels();
