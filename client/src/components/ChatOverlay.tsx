import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { getClaudeChatResponse } from '../servers/Claude';

interface ChatOverlayProps {
  problemContext?: DescriptionData;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ problemContext }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(problemContext);

  const toggleChat = (): void => setIsOpen(!isOpen);

  const sendMessage = async (): Promise<void> => {
    if (inputMessage.trim() === '' || isLoading) return;

    const newMessage: Message = { text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response: string = await getClaudeChatResponse(inputMessage);
      const botResponse: Message = { text: response, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error getting Claude AI response:', error);
      const errorResponse: Message = { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={toggleChat}
          aria-label="Open chat"
          className="p-3 text-white transition-colors duration-300 ease-in-out bg-red-300 rounded-full shadow-lg dark:bg-pink-600 hover:bg-pink-400 dark:hover:bg-pink-700"

        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="flex flex-col bg-white border border-pink-300 rounded-lg shadow-xl dark:bg-gray-800 w-80 h-96 dark:border-pink-700">
          <div className="flex items-center justify-between p-4 text-white bg-pink-400 rounded-t-lg dark:bg-pink-600">
            <h3 className="text-lg font-bold">Chat with Lia</h3>
            <button onClick={toggleChat} aria-label="Close chat" className="text-white hover:text-pink-100">
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-pink-50 dark:bg-gray-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-pink-400 dark:bg-pink-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-pink-800 dark:text-pink-200 border border-pink-300 dark:border-pink-500'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-pink-300 dark:border-pink-700 dark:bg-gray-800">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                aria-label="Chat message"
                className="flex-grow p-2 text-gray-800 bg-white border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 dark:border-pink-700 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                aria-label="Send message"
                className={`bg-pink-500 dark:bg-pink-600 text-white p-2 rounded-r-lg transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600 dark:hover:bg-pink-700'
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