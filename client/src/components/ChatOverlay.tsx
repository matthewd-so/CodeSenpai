import { MessageCircle, Send, X } from "lucide-react";
import React, {
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { getClaudeResponse } from "../servers/Claude";

interface ChatOverlayProps {
    problemContext?: string;
}

interface Message {
    text: string;
    sender: "user" | "bot";
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ problemContext }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = (): void => setIsOpen(!isOpen);

    const sendMessage = async (): Promise<void> => {
        if (inputMessage.trim() === "" || isLoading) return;

        const newMessage: Message = { text: inputMessage, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            const response: string = await getClaudeResponse(inputMessage);
            const botResponse: Message = { text: response, sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.error("Error getting Claude AI response:", error);
            const errorResponse: Message = {
                text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
                sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputMessage(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="fixed bottom-4 right-4">
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    aria-label="Open chat"
                    className="bg-red-300 dark:bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-400 dark:hover:bg-pink-700 transition-colors duration-300 ease-in-out"
                >
                    <MessageCircle size={24} />
                </button>
            )}
            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl w-96 h-96 flex flex-col border-2 border-pink-300  ">
                    <div className="bg-pink-300  text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold text-lg">Chat with Lia</h3>
                        <button
                            onClick={toggleChat}
                            aria-label="Close chat"
                            className="text-white hover:text-pink-100"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 bg-pink-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 ${
                                    msg.sender === "user"
                                        ? "text-right"
                                        : "text-left"
                                }`}
                            >
                                <span
                                    className={`inline-block p-2 rounded-lg ${
                                        msg.sender === "user"
                                            ? "bg-pink-400 dark:bg-pink-600 text-white"
                                            : "bg-white text-pink-800 dark:text-pink-200 border border-pink-300 dark:border-pink-500"
                                    }`}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-pink-300 dark:border-pink-500 bg-white">
                        <div className="flex text-black">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                aria-label="Chat message"
                                className="flex-grow text-black p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-300 border-pink-300 dark:border-pink-300 bg-white  dark:text-white"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                aria-label="Send message"
                                className={`bg-pink-400 text-white p-2 rounded-r-lg transition-colors ${
                                    isLoading
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-pink-600 dark:hover:bg-pink-500"
                                }`}
                                disabled={isLoading}
                            >
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatOverlay;
