const chatTest = async () => {
    try {
        console.log("Testing Health...");
        const health = await fetch('http://localhost:5000/api/health');
        console.log("Health Status:", await health.json());

        console.log("Testing Chat...");
        const chat = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: "Hello, are you working?",
                history: []
            })
        });

        if (!chat.ok) {
            console.error("Chat Error Status:", chat.status);
            console.error("Chat Error Text:", await chat.text());
        } else {
            const data = await chat.json();
            console.log("Chat Response:", data);
        }
    } catch (error) {
        console.error("Connection Failed:", error.message);
    }
};

chatTest();
