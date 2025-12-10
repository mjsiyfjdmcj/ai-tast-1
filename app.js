// Brighters AI - Climate Intelligence Application

// Scroll to chat section
function scrollToChat() {
    document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
}

// Chat functionality
class BrightersAI {
    constructor() {
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.langBnButton = document.getElementById('lang-bn');
        this.langEnButton = document.getElementById('lang-en');
        this.chatTitle = document.querySelector('.chat-title');
        
        this.currentLang = 'bn';
        this.initializeEventListeners();
        this.responses = this.getClimateResponses();
        this.updateUI();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        this.langBnButton.addEventListener('click', () => this.setLanguage('bn'));
        this.langEnButton.addEventListener('click', () => this.setLanguage('en'));
    }

    setLanguage(lang) {
        this.currentLang = lang;
        this.updateUI();
    }

    updateUI() {
        if (this.currentLang === 'bn') {
            this.chatTitle.textContent = 'ব্রাইটার্স এআই-কে জিজ্ঞাসা করুন';
            this.chatInput.placeholder = 'জলবায়ু সমাধান, কার্বন ফুটপ্রিন্ট, নবায়নযোগ্য শক্তি সম্পর্কে জিজ্ঞাসা করুন...';
            this.langBnButton.classList.add('active');
            this.langEnButton.classList.remove('active');
        } else {
            this.chatTitle.textContent = 'Ask Brighters AI';
            this.chatInput.placeholder = 'Ask about climate solutions, carbon footprint, renewable energy...';
            this.langEnButton.classList.add('active');
            this.langBnButton.classList.remove('active');
        }
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            this.addTypingIndicator();
            setTimeout(() => {
                this.removeTypingIndicator();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 1500);
        }, 300);
    }
    
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const avatarIcon = document.createElement('img');
        avatarIcon.className = 'avatar-icon';
        avatarIcon.alt = type === 'bot' ? 'AI' : 'User';
        
        if (type === 'bot') {
            avatarIcon.src = '/public/icons/brain-circuit.svg';
        } else {
            avatarIcon.src = '/public/icons/message-circle.svg';
        }
        
        avatarDiv.appendChild(avatarIcon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarIcon = document.createElement('img');
        avatarIcon.src = '/public/icons/brain-circuit.svg';
        avatarIcon.alt = 'AI';
        avatarIcon.className = 'avatar-icon';
        avatarDiv.appendChild(avatarIcon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = '<p>Analyzing...</p>';
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const typing = document.getElementById('typing');
        if (typing) {
            typing.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        for (const item of this.responses) {
            const keywords = this.currentLang === 'bn' ? item.keywords_bn : item.keywords;
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                return this.currentLang === 'bn' ? item.response_bn : item.response_en;
            }
        }

        return this.currentLang === 'bn'
            ? "দারুণ প্রশ্ন! আমি এখনও শিখছি। আপনি কি আপনার প্রশ্নটি আরও বিস্তারিতভাবে বলতে পারেন?"
            : "That's an interesting question! I'm still learning. Could you please provide more details?";
    }

    getClimateResponses() {
        return [
            {
                keywords: ['brighters', 'organization', 'non-profit'],
                keywords_bn: ['ব্রাইটার্স', 'সংস্থা', 'অলাভজনক'],
                response_en: "Brighters is a non-profit organization that works on climate issues. It's a cool place with a mission to save the planet!",
                response_bn: "ব্রাইটার্স একটি অলাভজনক সংস্থা যা জলবায়ু নিয়ে কাজ করে। পৃথিবীকে বাঁচানোর জন্য এটি একটি দারুণ জায়গা!"
            },
            {
                keywords: ['founder', 'siam', 'sayedu rahman siam'],
                keywords_bn: ['প্রতিষ্ঠাতা', 'সিয়াম', 'সাইদু রহমান সিয়াম'],
                response_en: "The founder of Brighters is the amazing Sayedu Rahman Siam! A true climate hero.",
                response_bn: "ব্রাইটার্সের প্রতিষ্ঠাতা হলেন অসাধারণ সাইদু রহমান সিয়াম! একজন সত্যিকারের জলবায়ু বীর।"
            },
            {
                keywords: ['chair', 'faria', 'faria sultana ami'],
                keywords_bn: ['চেয়ার', 'ফারিয়া', 'ফারিয়া সুলতানা অমি'],
                response_en: "The chair of Brighters is the fantastic Faria Sultana Ami! Leading the charge for a greener world.",
                response_bn: "ব্রাইটার্সের চেয়ার হলেন চমৎকার ফারিয়া সুলতানা অমি! একটি সবুজ বিশ্বের জন্য নেতৃত্ব দিচ্ছেন।"
            },
            {
                keywords: ['climate change', 'global warming'],
                keywords_bn: ['জলবায়ু পরিবর্তন', 'বিশ্ব উষ্ণায়ন'],
                response_en: "Climate change is like Earth having a fever, and we're the ones who gave it a cold! It's all about long-term shifts in temperatures and weather patterns, mainly from burning fossil fuels.",
                response_bn: "জলবায়ু পরিবর্তন মানে পৃথিবীর জ্বর হয়েছে, আর আমরাই এর কারণ! জীবাশ্ম জ্বালানি পোড়ানোর ফলে আবহাওয়ার দীর্ঘমেয়াদী পরিবর্তন হচ্ছে।"
            },
            {
                keywords: ['carbon footprint', 'emissions'],
                keywords_bn: ['কার্বন ফুটপ্রিন্ট', 'নিঃসরণ'],
                response_en: "Your carbon footprint is like your environmental shadow. The bigger it is, the more you're contributing to climate change. Let's shrink it together!",
                response_bn: "আপনার কার্বন ফুটপ্রিন্ট হলো আপনার পরিবেশগত ছায়া। এটি যত বড় হবে, জলবায়ু পরিবর্তনে আপনার অবদান তত বেশি। আসুন একসাথে এটি ছোট করি!"
            },
            {
                keywords: ['renewable energy', 'solar', 'wind'],
                keywords_bn: ['নবায়নযোগ্য শক্তি', 'সৌর', 'বায়ু'],
                response_en: "Renewable energy is the superhero of power sources! It comes from natural sources like the sun and wind that never run out. Pow!",
                response_bn: "নবায়নযোগ্য শক্তি হলো শক্তির সুপারহিরো! এটি সূর্য এবং বাতাসের মতো প্রাকৃতিক উৎস থেকে আসে যা কখনও শেষ হয় না। দারুণ না?"
            },
            {
                keywords: ['sustainability', 'sustainable'],
                keywords_bn: ['টেকসই', 'সাসটেইনেবিলিটি'],
                response_en: "Sustainability is all about living in a way that's awesome for us and for future generations. It's like being a good ancestor!",
                response_bn: "সাসটেইনেবিলিটি মানে এমনভাবে জীবনযাপন করা যা আমাদের এবং ভবিষ্যৎ প্রজন্মের জন্য মঙ্গলজনক। এটা একজন ভালো পূর্বপুরুষ হওয়ার মতো!"
            },
            {
                keywords: ['help', 'what can you do'],
                keywords_bn: ['সাহায্য', 'আপনি কি করতে পারেন'],
                response_en: "I'm Brighters AI, your fun-loving climate companion! I can tell you all about climate change, sustainability, and how we can all be eco-warriors. What adventure shall we embark on today?",
                response_bn: "আমি ব্রাইটার্স এআই, আপনার মজাদার জলবায়ু সঙ্গী! আমি আপনাকে জলবায়ু পরিবর্তন, স্থায়িত্ব এবং আমরা কীভাবে পরিবেশ-যোদ্ধা হতে পারি সে সম্পর্কে বলতে পারি। আজ কোন অভিযানে যাওয়া যাক?"
            },
            {
                keywords: ['hello', 'hi', 'hey'],
                keywords_bn: ['হ্যালো', 'হাই', 'সালাম'],
                response_en: "Hello there, eco-warrior! Ready to save the planet with a smile? Ask me anything!",
                response_bn: "হ্যালো, পরিবেশ-যোদ্ধা! হাসিমুখে পৃথিবী বাঁচাতে প্রস্তুত? আমাকে যেকোনো প্রশ্ন করুন!"
            }
        ];
    }
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(26, 35, 50, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(26, 35, 50, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize chat
const brightersAI = new BrightersAI();

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

console.log('🌱 Brighters AI initialized - Ready to help save the planet!');
