// Chatbot State
let conversationContext = [];

// Backend API Configuration
const BACKEND_API_URL = '/api/chat';

// Firebase is optional - uncomment below if you want to use Firebase for custom Q&A
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// const firebaseConfig = { ... };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Knowledge Base for American Tree Experts
const knowledgeBase = {
    company: {
        name: 'American Tree Experts',
        location: 'Evansville, IN',
        phone: '812-457-3433',
        email: 'Thetreexperts@gmail.com',
        hours: '24/7 for emergencies, Mon-Sat 7AM-6PM for regular services',
        insurance: 'Fully licensed and insured with $2M liability coverage',
        certifications: 'ISA Certified Arborists on staff',
        experience: '15+ years in business',
        serviceAreas: [
            'Evansville, IN',
            'Newburgh, IN',
            'Boonville, IN',
            'Henderson, KY',
            'Warrick County'
        ]
    }
};

// Initialize chatbot
function initChatbot() {
    // Add event listeners
    const inputField = document.getElementById('chatbot-input-field');
    if (inputField) {
        inputField.addEventListener('keypress', handleKeyPress);
        // Focus input on load
        inputField.focus();
    }
}

// Open chatbot with specific service context (modified for standalone)
function openChatbotWithService(service) {
    setTimeout(() => {
        sendQuickReply(`Tell me about ${service}`);
    }, 300);
}

// Handle keyboard input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message
function sendMessage() {
    const inputField = document.getElementById('chatbot-input-field');
    const message = inputField.value.trim();

    if (message === '') return;

    // Add user message to chat
    addMessage(message, 'user');

    // Clear input
    inputField.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Process message and generate response
    // Process message and generate response
    setTimeout(async () => {
        const response = await generateResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');

        // Update conversation context
        conversationContext.push({
            user: message,
            bot: response,
            timestamp: new Date()
        });
    }, 1000 + Math.random() * 1000);
}

// Send quick reply
function sendQuickReply(message) {
    addMessage(message, 'user');
    showTypingIndicator();

    setTimeout(async () => {
        const response = await generateResponse(message);
        hideTypingIndicator();
        addMessage(response, 'bot');

        conversationContext.push({
            user: message,
            bot: response,
            timestamp: new Date()
        });
    }, 1000 + Math.random() * 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🌳' : '👤';

    const content = document.createElement('div');
    content.className = 'message-content';

    // Convert text to HTML paragraphs
    const paragraphs = text.split('\n\n');
    paragraphs.forEach(para => {
        if (para.trim()) {
            const p = document.createElement('p');
            p.textContent = para.trim();
            content.appendChild(p);
        }
    });

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🌳';

    const content = document.createElement('div');
    content.className = 'message-content typing-indicator';
    content.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    messagesContainer.appendChild(typingDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Call backend API for chatbot response
async function callOpenAI(userMessage) {
    try {
        // Prepare conversation history for API
        const conversationHistory = conversationContext.flatMap(ctx => [
            { role: 'user', content: ctx.user },
            { role: 'assistant', content: ctx.bot }
        ]);

        const response = await fetch(BACKEND_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage,
                conversationHistory: conversationHistory
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error Details:', errorData);
            throw new Error(`API error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error calling chatbot API:', error);
        return "I apologize, but I'm having trouble connecting right now. Please call us directly at 812-457-3433 for immediate assistance.";
    }
}

// Generate response based on user input
async function generateResponse(userMessage) {
    // Use OpenAI for intelligent responses
    const aiResponse = await callOpenAI(userMessage);
    return aiResponse;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initChatbot);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-lg)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScroll = currentScroll;
});
