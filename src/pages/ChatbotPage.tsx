import { useState } from "react";
import { BoltStyleChat } from "@/components/ui/bolt-style-chat";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    // Add user message immediately
    const newMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format history for backend (Gemini expects parts: [{text}])
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server Error: ${response.status}`);
      }

      const data = await response.json();

      setMessages([...newMessages, { role: 'model', text: data.response }]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMessage = error.message || "Connection Failed";
      setMessages([...newMessages, { role: 'model', text: `Error: ${errorMessage}. Please check the backend console.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return <BoltStyleChat messages={messages} onSend={handleSend} isLoading={isLoading} />;
}

