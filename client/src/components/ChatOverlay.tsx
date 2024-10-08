import { MessageCircle, Send, X } from "lucide-react";
import React, {
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { getClaudeChatResponse } from "../servers/Claude";
import hs from "../images/headshot-removebg-preview.png";
import { error } from "console";

interface ChatOverlayProps {
    problemContext?: DescriptionData;
    code: string;
    error?: string;
}

interface Message {
    text: string;
    sender: "user" | "bot";
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ problemContext, code, error }) => {
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
            const response: string = await getClaudeChatResponse({
                userQuery: inputMessage,
                problemName: problemContext?.name || "",
                userCode: code || "", 
                userError: error || "",  
            }, );
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
                    className="p-3 text-black transition-colors duration-300 ease-in-out bg-pink-100 border-4 border-pink-300 rounded-full shadow-lg"
                >
                    <img className="h-20 rounded-t-lg" src={hs} />
                </button>
            )}
            {isOpen && (
                <div className="flex flex-col bg-white border-2 border-pink-300 rounded-lg shadow-xl w-96 h-96 ">
                    <div className="flex items-center justify-between p-4 text-white bg-pink-300 rounded-t-lg">
                        <h3 className="text-lg font-bold">Chat with Lia</h3>
                        <button
                            onClick={toggleChat}
                            aria-label="Close chat"
                            className="text-white hover:text-pink-100"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto bg-pink-50 ">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2  ${
                                    msg.sender === "user"
                                        ? "text-right"
                                        : "text-left"
                                }`}
                            >
                                <span
                                    className={`inline-block p-2 rounded-lg text-black ${
                                        msg.sender === "user"
                                            ? "bg-pink-400 dark:bg-pink-400 text-white"
                                            : "bg-white text-black  border border-pink-300 dark:border-pink-500"
                                    }`}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 bg-white border-t border-pink-300 dark:border-pink-500">
                        <div className="flex text-black">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                aria-label="Chat message"
                                className="flex-grow p-2 text-black bg-white border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-300 dark:border-pink-300 "
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
