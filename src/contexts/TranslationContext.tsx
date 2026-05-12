import { createContext, useContext, useState, ReactNode } from "react";

export interface TranslationData {
  // Common UI elements
  "app.name": string;
  "app.tagline": string;
  "app.creator": string;

  // Navigation
  "nav.chatHistory": string;
  "nav.logout": string;
  "nav.toggleTheme": string;

  // Language selector
  "language.select": string;
  "language.search": string;

  // Auth page
  "auth.welcome": string;
  "auth.email": string;
  "auth.password": string;
  "auth.fullName": string;
  "auth.continue": string;
  "auth.creatingAccount": string;
  "auth.accountNotFound": string;
  "auth.enterName": string;
  "auth.missingCredentials": string;
  "auth.emailPlaceholder": string;
  "auth.passwordPlaceholder": string;
  "auth.helpText": string;

  // Index page
  "index.welcome": string;
  "index.subtitle": string;
  "index.footer": string;

  // Chat page
  "chat.greeting": string;
  "chat.subtitle": string;
  "chat.clearChat": string;
  "chat.attachFiles": string;
  "chat.placeholder": string;
  "chat.readAloud": string;
  "chat.stop": string;
  "chat.translate": string;
  "chat.bySashankEduAlyve": string;
  "chat.askDoubt": string;
  "chat.quizMe": string;
  "chat.quickActionDoubt": string;
  "chat.quickActionQuiz": string;
  "chat.chooseFiles": string;
  "chat.fallbackAssistant": string;
  "chat.loaderText": string;
  "chat.disclaimer": string;

  // Translate panel
  "translate.title": string;
  "translate.selectLanguage": string;
  "translate.chooseLanguage": string;
  "translate.originalText": string;
  "translate.translatedText": string;
  "translate.translating": string;
  "translate.failure": string;

  // Message component
  "message.playPronunciation": string;
  "message.readAloud": string;
  "message.stop": string;
  "message.noSpeechSupport": string;
  "message.attachedFiles": string;
  "message.aiGeneratedImage": string;
  "message.aiGeneratedImageAlt": string;
  "message.document": string;
  "message.testYourself": string;

  // Subjects
  "subjects.english.name": string;
  "subjects.english.tagline": string;
  "subjects.hindi.name": string;
  "subjects.hindi.tagline": string;
  "subjects.math.name": string;
  "subjects.math.tagline": string;
  "subjects.science.name": string;
  "subjects.science.tagline": string;
  "subjects.social.name": string;
  "subjects.social.tagline": string;
  "subjects.language.name": string;
  "subjects.language.tagline": string;

  // Not Found page
  "notFound.title": string;
  "notFound.returnHome": string;
  "notFound.createdBy": string;
}

const translations: Record<string, TranslationData> = {
  en: {
    // Common UI elements
    "app.name": "EduAlyve",
    "app.tagline": "Your AI-powered study companion",
    "app.creator": "Created by Sashank for EduAlyve",

    // Navigation
    "nav.chatHistory": "Chat History",
    "nav.logout": "Log out",
    "nav.toggleTheme": "Toggle theme",

    // Auth page
    "auth.welcome": "Welcome to EduAlyve",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full Name",
    "auth.continue": "Continue",
    "auth.creatingAccount": "Please wait...",
    "auth.accountNotFound": "Account not found. Please enter your name above to create a new account.",
    "auth.enterName": "Enter your name to create account",
    "auth.helpText": "Enter your email and password to sign in or create an account automatically.",
    "auth.missingCredentials": "Please enter email and password.",
    "auth.emailPlaceholder": "you@example.com",
    "auth.passwordPlaceholder": "••••••••",

    // Index page
    "index.welcome": "What would you like to learn today?",
    "index.subtitle": "Pick a subject and start chatting with your AI tutor",
    "index.footer": "Empowering learners with AI-driven education",

    // Chat page
    "chat.greeting": "Hi! I'm your {subject} tutor 👋",
    "chat.subtitle": "Ask me any question about {subject}, or try one of the quick actions below!",
    "chat.clearChat": "Clear chat",
    "chat.attachFiles": "Attach photos or documents",
    "chat.placeholder": "Ask about {subject}...",
    "chat.readAloud": "Read aloud",
    "chat.stop": "Stop",
    "chat.translate": "Translate",
    "chat.bySashankEduAlyve": "by Sashank • EduAlyve • AI Tutor",
    "chat.askDoubt": "Ask a Doubt",
    "chat.quizMe": "Quiz Me",
    "chat.quickActionDoubt": "I have a doubt about {subject}. Can you help me understand a concept?",
    "chat.quickActionQuiz": "Quiz me on {subject}. Give me a multiple-choice question.",
    "chat.chooseFiles": "Choose files",
    "chat.stopResponse": "Stop response",
    "chat.editQuery": "Edit query",
    "chat.save": "Save",
    "chat.cancel": "Cancel",
    "chat.fallbackAssistant": "I couldn't fully understand that right now. Please try again or ask it in a different way.",
    "chat.loaderText": "EduAlyve is thinking...",
    "chat.disclaimer": "Use these answers for learning support. Verify with your textbook and teacher notes.",
    "message.playPronunciation": "Play pronunciation",
    "message.readAloud": "Read aloud",
    "message.stop": "Stop",
    "message.noSpeechSupport": "Your browser does not support speech synthesis.",
    "message.showOriginal": "Show original",
    "message.showTranslated": "Show translation",
    "message.translatedResponse": "Translated response",
    "message.attachedFiles": "Attached files",
    "message.aiGeneratedImage": "AI-generated image",
    "message.aiGeneratedImageAlt": "AI-generated image",
    "message.document": "Document",
    "message.testYourself": "Test yourself",

    // Subjects
    "subjects.english.name": "English",
    "subjects.english.tagline": "Master words & stories",
    "subjects.hindi.name": "Hindi",
    "subjects.hindi.tagline": "हिंदी सीखें और समझें",
    "subjects.math.name": "Math",
    "subjects.math.tagline": "Solve, calculate, conquer",
    "subjects.science.name": "Science",
    "subjects.science.tagline": "Explore & experiment",
    "subjects.social.name": "Social Studies",
    "subjects.social.tagline": "History, civics & the world",
    "subjects.language.name": "Your Language",
    "subjects.language.tagline": "Learn in your mother tongue",

    // Language selector
    "language.select": "Select Language",
    "language.search": "Search languages...",

    // Not Found page
    "notFound.title": "Oops! Page not found",
    "notFound.returnHome": "Return to Home",
    "notFound.createdBy": "Created by Sashank for EduAlyve",
  },
  hi: {
    // Common UI elements
    "app.name": "एडुअलाइव",
    "app.tagline": "आपका AI-संचालित अध्ययन साथी",
    "app.creator": "सशांक द्वारा एडुअलाइव के लिए बनाया गया",

    // Navigation
    "nav.chatHistory": "चैट इतिहास",
    "nav.logout": "लॉग आउट",
    "nav.toggleTheme": "थीम बदलें",

    // Auth page
    "auth.welcome": "एडुअलाइव में आपका स्वागत है",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.fullName": "पूरा नाम",
    "auth.continue": "जारी रखें",
    "auth.creatingAccount": "कृपया प्रतीक्षा करें...",
    "auth.accountNotFound": "खाता नहीं मिला। नया खाता बनाने के लिए ऊपर अपना नाम दर्ज करें।",
    "auth.enterName": "खाता बनाने के लिए अपना नाम दर्ज करें",
    "auth.helpText": "साइन इन करने या स्वचालित रूप से खाता बनाने के लिए अपना ईमेल और पासवर्ड दर्ज करें।",
    "auth.missingCredentials": "कृपया ईमेल और पासवर्ड दर्ज करें।",
    "auth.emailPlaceholder": "आपका@उदाहरण.com",
    "auth.passwordPlaceholder": "••••••••",

    // Index page
    "index.welcome": "आज आप क्या सीखना चाहेंगे?",
    "index.subtitle": "कोई विषय चुनें और अपने AI ट्यूटर से चैट करना शुरू करें",
    "index.footer": "AI-संचालित शिक्षा के साथ शिक्षार्थियों को सशक्त बनाना",

    // Chat page
    "chat.greeting": "नमस्ते! मैं आपका {subject} ट्यूटर हूँ 👋",
    "chat.subtitle": "{subject} के बारे में कोई भी सवाल पूछें, या नीचे दिए गए त्वरित कार्यों में से कोई आज़माएं!",
    "chat.clearChat": "चैट साफ़ करें",
    "chat.attachFiles": "फोटो या दस्तावेज़ संलग्न करें",
    "chat.placeholder": "{subject} के बारे में पूछें...",
    "chat.readAloud": "जोर से पढ़ें",
    "chat.stop": "रोकें",
    "chat.translate": "अनुवाद",
    "chat.bySashankEduAlyve": "सशांक द्वारा • एडुअलाइव • AI ट्यूटर",
    "chat.askDoubt": "संदेह पूछें",
    "chat.quizMe": "मुझे क्विज़ करें",
    "chat.quickActionDoubt": "{subject} के बारे में मेरा एक संदेह है। क्या आप मुझे एक अवधारणा समझने में मदद कर सकते हैं?",
    "chat.quickActionQuiz": "{subject} पर मुझे क्विज़ करें। मुझे एक बहुविकल्पीय प्रश्न दें।",
    "chat.chooseFiles": "फाइलें चुनें",
    "chat.stopResponse": "प्रतिक्रिया रोकें",
    "chat.editQuery": "प्रश्न संपादित करें",
    "chat.save": "सहेजें",
    "chat.cancel": "रद्द करें",
    "chat.fallbackAssistant": "मैं अभी इस प्रश्न को पूरी तरह समझ नहीं पाया। कृपया इसे फिर से पूछें या अलग तरीके से पूछें।",
    "chat.loaderText": "एडुअलाइव सोच रहा है...",
    "chat.disclaimer": "ये उत्तर सीखने के लिए मदद के रूप में हैं। कृपया अपनी पाठ्यपुस्तक और शिक्षक के नोट्स से सत्यापित करें।",

    // Translate panel
    "translate.title": "अनुवाद",
    "translate.selectLanguage": "भाषा चुनें",
    "translate.chooseLanguage": "भाषा चुनने के लिए चुनें",
    "translate.originalText": "मूल पाठ",
    "translate.translatedText": "अनूदित पाठ",
    "translate.translating": "अनुवाद किया जा रहा है...",
    "translate.failure": "अनुवाद असफल रहा। कृपया बाद में पुनः प्रयास करें।",

    // Message component
    "message.playPronunciation": "उच्चारण चलाएँ",
    "message.readAloud": "ऊँची आवाज़ में पढ़ें",
    "message.stop": "रोकें",
    "message.noSpeechSupport": "ब्राउज़र भाषण समर्थन का समर्थन नहीं करता है।",
    "message.showOriginal": "मूल दिखाएँ",
    "message.showTranslated": "अनुवाद दिखाएँ",
    "message.translatedResponse": "अनूदित उत्तर",
    "message.attachedFiles": "संलग्न फ़ाइलें",
    "message.aiGeneratedImage": "AI द्वारा बनाई गई छवि",
    "message.aiGeneratedImageAlt": "AI निर्मित चित्र",
    "message.document": "दस्तावेज़",
    "message.testYourself": "खुद को परखें",

    // Subjects
    "subjects.english.name": "अंग्रेजी",
    "subjects.english.tagline": "शब्द और कहानियाँ सीखें",
    "subjects.hindi.name": "हिंदी",
    "subjects.hindi.tagline": "हिंदी सीखें और समझें",
    "subjects.math.name": "गणित",
    "subjects.math.tagline": "हल करें, गणना करें, जीतें",
    "subjects.science.name": "विज्ञान",
    "subjects.science.tagline": "अन्वेषण करें और प्रयोग करें",
    "subjects.social.name": "सामाजिक अध्ययन",
    "subjects.social.tagline": "इतिहास, नागरिक शास्त्र और दुनिया",
    "subjects.language.name": "आपकी भाषा",
    "subjects.language.tagline": "अपनी मातृभाषा में सीखें",

    // Language selector
    "language.select": "भाषा चुनें",
    "language.search": "भाषाएँ खोजें...",

    // Not Found page
    "notFound.title": "ओह! पेज नहीं मिला",
    "notFound.returnHome": "होम पर वापस जाएं",
    "notFound.createdBy": "सशांक द्वारा एडुअलाइव के लिए बनाया गया",
  },
  ta: {
    // Common UI elements
    "app.name": "எடுவாலைவ்",
    "app.tagline": "உங்கள் AI-இயக்கப்படும் கல்வி துணை",
    "app.creator": "சஷாங்க் எடுவாலைவ் க்காக உருவாக்கப்பட்டது",

    // Navigation
    "nav.chatHistory": "அரட்டை வரலாறு",
    "nav.logout": "வெளியேறு",
    "nav.toggleTheme": "தீம் மாற்று",

    // Auth page
    "auth.welcome": "எடுவாலைவ் க்கு வரவேற்கிறோம்",
    "auth.email": "மின்னஞ்சல்",
    "auth.password": "கடவுச்சொல்",
    "auth.fullName": "முழு பெயர்",
    "auth.continue": "தொடரவும்",
    "auth.creatingAccount": "தயவுசெய்து காத்திருங்கள்...",
    "auth.accountNotFound": "கணக்கு கிடைக்கவில்லை. புதிய கணக்கை உருவாக்குவதற்கு மேலே உங்கள் பெயரை உள்ளீடு செய்யவும்.",
    "auth.enterName": "கணக்கை உருவாக்குவதற்கு உங்கள் பெயரை உள்ளீடு செய்யவும்",
    "auth.helpText": "உள்நுழைய அல்லது தானாகவே கணக்கை உருவாக்க உங்கள் மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளீடு செய்யவும்.",
    "auth.missingCredentials": "தயவுசெய்து மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.",
    "auth.emailPlaceholder": "உங்கள்@எடுத்துக்காட்டு.com",
    "auth.passwordPlaceholder": "••••••••",

    // Index page
    "index.welcome": "இன்று நீங்கள் என்ன கற்க விரும்புகிறீர்கள்?",
    "index.subtitle": "ஒரு பாடத்தைத் தேர்ந்தெடுத்து உங்கள் AI டியூட்டருடன் அரட்டையைத் தொடங்குங்கள்",
    "index.footer": "AI-இயக்கப்படும் கல்வியுடன் கற்றவர்களை மேம்படுத்துதல்",

    // Chat page
    "chat.greeting": "வணக்கம்! நான் உங்கள் {subject} டியூட்டர் 👋",
    "chat.subtitle": "{subject} பற்றி எந்தக் கேள்வியையும் கேளுங்கள் அல்லது கீழே உள்ள விரைவு செயல்களில் ஒன்றை முயற்சிக்கவும்!",
    "chat.clearChat": "அரட்டையை அழி",
    "chat.attachFiles": "புகைப்படங்கள் அல்லது ஆவணங்களை இணைக்கவும்",
    "chat.placeholder": "{subject} பற்றி கேளுங்கள்...",
    "chat.readAloud": "உரக்கப் படிக்கவும்",
    "chat.stop": "நிறுத்து",
    "chat.translate": "மொழிபெயர்ப்பு",
    "chat.bySashankEduAlyve": "சாஷாங்க் மூலம் • எடுவாலைவ் • AI டியூட்டர்",
    "chat.askDoubt": "சந்தேகம் கேளுங்கள்",
    "chat.quizMe": "என்னை க்விஸ் செய்யுங்கள்",
    "chat.quickActionDoubt": "{subject} பற்றி எனக்கு ஒரு சந்தேகம் இருக்கிறது. ஒரு கருத்தை புரிந்துகொள்ள என்னால் உதவ முடியுமா?",
    "chat.quickActionQuiz": "{subject} பற்றி என்னை க்விஸ் செய்யுங்கள். எனக்கு ஒரு பல தேர்வு கேள்வியை கொடுங்கள்.",
    "chat.chooseFiles": "கோப்புகளை தேர்ந்தெடுக்கவும்",
    "chat.stopResponse": "பதில் நிறுத்தவும்",
    "chat.editQuery": "வினாவை திருத்தவும்",
    "chat.save": "சேமிக்கவும்",
    "chat.cancel": "ரத்து செய்",
    "chat.fallbackAssistant": "நான் இதை முழுமையாகப் புரிந்துகொள்ள முடியவில்லை. தயவுசெய்து பின்னர் மீண்டும் கேளுங்கள் அல்லது வேறுபடியாகப் கேள்வி கேட்கவும்.",
    "chat.loaderText": "எடுவாலைவ் யோசிக்கிறேன்...",
    "chat.disclaimer": "இந்த பதில்கள் கற்பித ஆதரவுக்காக மட்டுமே. உங்கள் பாடப் புத்தகத்தையும் ஆசிரியர் குறிப்புகளையும் சரிபார்க்கவும்.",

    // Translate panel
    "translate.title": "மொழிபெயர்ப்பு",
    "translate.selectLanguage": "மொழியைத் தேர்ந்தெடுக்கவும்",
    "translate.chooseLanguage": "மொழியைத் தேர்ந்தெடுத்து கொள்ளவும்",
    "translate.originalText": "அசல் உரை",
    "translate.translatedText": "மொழிபெயர்க்கப்பட்ட உரை",
    "translate.translating": "மொழிபெயர்க்கப்படுகின்றது...",
    "translate.failure": "மொழிபெயர்ப்பு தோற்றது. திரும்ப முயற்சிக்கவும்.",

    // Message component
    "message.playPronunciation": "உச்சரிப்பு இயக்கவும்",
    "message.readAloud": "உயிராக வாசிக்கவும்",
    "message.stop": "நிறுத்து",
    "message.noSpeechSupport": "உங்கள் உலாவி பேச்சு ஆதரவை வழங்கவில்லை.",
    "message.showOriginal": "முதல் பதிலை காட்டு",
    "message.showTranslated": "மொழிபெயர்ப்பை காட்டு",
    "message.translatedResponse": "மொழிபெயர்க்கப்பட்ட பதில்",
    "message.attachedFiles": "இணைக்கப்பட்ட கோப்புகள்",
    "message.aiGeneratedImage": "AI உருவாக்கிய படம்",
    "message.aiGeneratedImageAlt": "AI மூலம் உருவாக்கப்பட்ட படம்",
    "message.document": "ஆவணம்",
    "message.testYourself": "தினைத்தானே உங்களைச் சோதிக்கவும்",

    // Subjects
    "subjects.english.name": "ஆங்கிலம்",
    "subjects.english.tagline": "சொற்கள் மற்றும் கதைகளை கற்றுக்கொள்ளுங்கள்",
    "subjects.hindi.name": "இந்தி",
    "subjects.hindi.tagline": "இந்தியை கற்றுக்கொள்ளுங்கள் மற்றும் புரிந்துகொள்ளுங்கள்",
    "subjects.math.name": "கணிதம்",
    "subjects.math.tagline": "தீர்க்கவும், கணக்கிடவும், வெல்லவும்",
    "subjects.science.name": "அறிவியல்",
    "subjects.science.tagline": "ஆராய்ந்து சோதனை செய்யவும்",
    "subjects.social.name": "சமூக ஆய்வுகள்",
    "subjects.social.tagline": "வரலாறு, குடிமை மற்றும் உலகம்",
    "subjects.language.name": "உங்கள் மொழி",
    "subjects.language.tagline": "உங்கள் தாய்மொழியில் கற்றுக்கொள்ளுங்கள்",

    // Language selector
    "language.select": "மொழியைத் தேர்ந்தெடுக்கவும்",
    "language.search": "மொழிகளைத் தேடு...",

    // Not Found page
    "notFound.title": "ஓஹ்! பக்கம் கிடைக்கவில்லை",
    "notFound.returnHome": "முகப்புக்கு திரும்பு",
    "notFound.createdBy": "சஷாங்க் எடுவாலைவ் க்காக உருவாக்கப்பட்டது",
  },
  te: {
    // Common UI elements
    "app.name": "ఎడ్యుఅలైవ్",
    "app.tagline": "మీ AI-నడిపించే అధ్యయన సహచరుడు",
    "app.creator": "సశాంక్ ఎడ్యుఅలైవ్ కోసం సృష్టించబడింది",

    // Navigation
    "nav.chatHistory": "చాట్ చరిత్ర",
    "nav.logout": "లాగ్ అవుట్",
    "nav.toggleTheme": "థీమ్ మార్చు",

    // Auth page
    "auth.welcome": "ఎడ్యుఅలైవ్‌కు స్వాగతం",
    "auth.email": "ఇమెయిల్",
    "auth.password": "పాస్‌వర్డ్",
    "auth.fullName": "పూర్తి పేరు",
    "auth.continue": "కొనసాగించు",
    "auth.creatingAccount": "దయచేసి వేచి ఉండండి...",
    "auth.accountNotFound": "ఖాతా కనుగొనబడలేదు. కొత్త ఖాతాను సృష్టించడానికి పైన మీ పేరు నమోదు చేయండి.",
    "auth.enterName": "ఖాతాను సృష్టించడానికి మీ పేరు నమోదు చేయండి",
    "auth.helpText": "సైన్ ఇన్ చేయడానికి లేదా స్వయంచాలకంగా ఖాతాను సృష్టించడానికి మీ ఇమెయిల్ మరియు పాస్‌వర్డ్ నమోదు చేయండి.",
    "auth.missingCredentials": "దయచేసి ఇమెయిల్ మరియు పాస్‌వర్డ్‌ను నమోదు చేయండి.",
    "auth.emailPlaceholder": "మీ@ఉదాహరణ.com",
    "auth.passwordPlaceholder": "••••••••",

    // Index page
    "index.welcome": "మీరు ఈరోజు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
    "index.subtitle": "ఒక సబ్జెక్ట్ ఎంచుకోండి మరియు మీ AI ట్యూటర్‌తో చాట్ ప్రారంభించండి",
    "index.footer": "AI-నడిపించే విద్యతో అధ్యయనకులను శక్తివంతం చేయడం",

    // Chat page
    "chat.greeting": "హలొ! నేను మీ {subject} ట్యూటర్ 👋",
    "chat.subtitle": "{subject} గురించి ఏ ప్రశ్నైనా అడగండి లేదా క్రింద ఉన్న త్వరిత చర్యలలో ఒకటి ప్రయత్నించండి!",
    "chat.clearChat": "చాట్ క్లియర్ చేయండి",
    "chat.attachFiles": "ఫోటోలు లేదా పత్రాలను జోడించండి",
    "chat.placeholder": "{subject} గురించి అడగండి...",
    "chat.readAloud": "శబ్దంగా చదవండి",
    "chat.stop": "ఆపు",
    "chat.translate": "అనువాదం",
    "chat.bySashankEduAlyve": "సశాంక్ ద్వారా • ఎడ్యుఅలైవ్ • AI ట్యూటర్",
    "chat.askDoubt": "సందేహం అడగండి",
    "chat.quizMe": "నన్ను క్విజ్ చేయండి",
    "chat.quickActionDoubt": "{subject} గురించి నాకు ఒక సందేహం ఉంది. ఒక భావనను అర్థం చేసుకోవడంలో నాకు సహాయం చేయగలరా?",
    "chat.quickActionQuiz": "{subject}పై నన్ను క్విజ్ చేయండి. నాకు ఒక బహుళ ఎంపిక ప్రశ్న ఇవ్వండి.",
    "chat.chooseFiles": "ఫైళ్ళను ఎంచుకోండి",
    "chat.stopResponse": "ప్రతిస్పందనని ఆపండి",
    "chat.editQuery": "ప్రశ్నను సవరించండి",
    "chat.save": "సేవ్",
    "chat.cancel": "రద్దు",
    "chat.fallbackAssistant": "నేను ఈ ప్రశ్నని పూర్తిగా అర్థం చేసుకోలేను. దయచేసి దీనిని మళ్ళీ అడగండి లేదా వేరే విధంగా అడగండి.",
    "chat.loaderText": "ఎడ్యుఅలైవ్ ఆలోచిస్తున్నారు...",
    "chat.disclaimer": "ఈ జవాబులు నేర్చుకునే సహాయానికి మాత్రమే. మీ పాఠ్యపుస్తకాన్ని మరియు గురువు నోట్స్‌ను ధృవీకరించండి.",

    // Translate panel
    "translate.title": "అనువాదం",
    "translate.selectLanguage": "భాషను ఎంచుకోండి",
    "translate.chooseLanguage": "భాష ఎంచుకోడానికి",
    "translate.originalText": "మూల పాఠ్యం",
    "translate.translatedText": "అనువాదించిన పాఠ్యం",
    "translate.translating": "అనువదిస్తున్నారు...",
    "translate.failure": "అనువాదం విఫలమైంది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",

    // Message component
    "message.playPronunciation": "ఉచ్చారణ ప్లే చేయండి",
    "message.readAloud": "బిగ్గరగా చదవండి",
    "message.stop": "ఆపు",
    "message.noSpeechSupport": "మీ బ్రౌజర్ స్పీచ్ మద్దతును కలిగి లేదు.",
    "message.showOriginal": "మూలాన్ని చూపించండి",
    "message.showTranslated": "అనువాదాన్ని చూపించండి",
    "message.translatedResponse": "అనువదించిన ప్రతిస్పందన",
    "message.attachedFiles": "జోడించిన ఫైళ్ళు",
    "message.aiGeneratedImage": "AI రూపొందించిన చిత్రం",
    "message.aiGeneratedImageAlt": "AI రూపొందించిన చిత్రం",
    "message.document": "డాక్యుమెంట్",
    "message.testYourself": "మీ స్వయంగా పరీక్షించుకోండి",

    // Subjects
    "subjects.english.name": "ఆంగ్లం",
    "subjects.english.tagline": "పదాలు మరియు కథలను నేర్చుకోండి",
    "subjects.hindi.name": "హిందీ",
    "subjects.hindi.tagline": "హిందీ నేర్చుకోండి మరియు అర్థం చేసుకోండి",
    "subjects.math.name": "గణితం",
    "subjects.math.tagline": "పరిష్కరించండి, లెక్కించండి, గెలవండి",
    "subjects.science.name": "విజ్ఞానం",
    "subjects.science.tagline": "అన్వేషించండి మరియు ప్రయోగాలు చేయండి",
    "subjects.social.name": "సామాజిక అధ్యయనాలు",
    "subjects.social.tagline": "చరిత్ర, పౌర శాస్త్రం మరియు ప్రపంచం",
    "subjects.language.name": "మీ భాష",
    "subjects.language.tagline": "మీ మాతృభాషలో నేర్చుకోండి",

    // Language selector
    "language.select": "భాషను ఎంచుకోండి",
    "language.search": "భాషలను వెతకండి...",

    // Not Found page
    "notFound.title": "అయ్యో! పేజీ కనుగొనబడలేదు",
    "notFound.returnHome": "హోమ్‌కు తిరిగి వెళ్ళు",
    "notFound.createdBy": "సశాంక్ ఎడ్యుఅలైవ్ కోసం సృష్టించబడింది",
  },
  kn: {
    // Common UI elements
    "app.name": "ಎಡ್ಯುಅಲೈವ್",
    "app.tagline": "ನಿಮ್ಮ AI-ನಡೆಸುವ ಅಧ್ಯಯನ ಸಹಾಯಕ",
    "app.creator": "ಸಶಾಂಕ್ ಎಡ್ಯುಅಲೈವ್‌ಗಾಗಿ ರಚಿಸಲಾಗಿದೆ",

    // Navigation
    "nav.chatHistory": "ಚಾಟ್ ಇತಿಹಾಸ",
    "nav.logout": "ಲಾಗ್ ಔಟ್",
    "nav.toggleTheme": "ಥೀಮ್ ಬದಲಾಯಿಸಿ",

    // Auth page
    "auth.welcome": "ಎಡ್ಯುಅಲೈವ್‌ಗೆ ಸ್ವಾಗತ",
    "auth.email": "ಇಮೇಲ್",
    "auth.password": "ಪಾಸ್‌ವರ್ಡ್",
    "auth.fullName": "ಪೂರ್ಣ ಹೆಸರು",
    "auth.continue": "ಮುಂದುವರಿಸಿ",
    "auth.creatingAccount": "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ...",
    "auth.accountNotFound": "ಖಾತೆ ಕಂಡುಬಂದಿಲ್ಲ. ಹೊಸ ಖಾತೆಯನ್ನು ರಚಿಸಲು ಮೇಲೆ ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "auth.enterName": "ಖಾತೆಯನ್ನು ರಚಿಸಲು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    "auth.helpText": "ಸೈನ್ ಇನ್ ಮಾಡಲು ಅಥವಾ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಖಾತೆಯನ್ನು ರಚಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.",

    // Index page
    "index.welcome": "ನೀವು ಇಂದು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?",
    "index.subtitle": "ಒಂದು ವಿಷಯವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ AI ಟ್ಯೂಟರ್‌ನೊಂದಿಗೆ ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    "index.footer": "AI-ನಡೆಸುವ ಶಿಕ್ಷಣದೊಂದಿಗೆ ಕಲಿಯುವವರನ್ನು ಶಕ್ತಿಗೊಳಿಸುವುದು",

    // Chat page
    "chat.greeting": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ {subject} ಟ್ಯೂಟರ್ 👋",
    "chat.subtitle": "{subject} ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ ಅಥವಾ ಕೆಳಗಿನ ತ್ವರಿತ ಕ್ರಿಯೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಪ್ರಯತ್ನಿಸಿ!",
    "chat.clearChat": "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    "chat.attachFiles": "ಫೋಟೋಗಳು ಅಥವಾ ದಾಖಲೆಗಳನ್ನು ಲಗತ್ತಿಸಿ",
    "chat.placeholder": "{subject} ಬಗ್ಗೆ ಕೇಳಿ...",
    "chat.readAloud": "ಜೋರಾಗಿ ಓದಿ",
    "chat.stop": "ನಿಲ್ಲಿಸಿ",
    "chat.translate": "ಅನುವಾದ",
    "chat.bySashankEduAlyve": "ಸಶಾಂಕ್ ಮೂಲಕ • ಎಡ್ಯುಅಲೈವ್ • AI ಟ್ಯೂಟರ್",
    "chat.askDoubt": "ಸಂದೇಹ ಕೇಳಿ",
    "chat.quizMe": "ನನ್ನನ್ನು ಕ್ವಿಜ್ ಮಾಡಿ",
    "chat.quickActionDoubt": "{subject} ಬಗ್ಗೆ ನನಗೆ ಒಂದು ಸಂದೇಹವಿದೆ. ಒಂದು ಕಾನ್ಸೆಪ್ಟ್ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನೀವು ಸಹಾಯ ಮಾಡಬಹುದೇ?",
    "chat.quickActionQuiz": "{subject} ಬಗ್ಗೆ ನನ್ನನ್ನು ಕ್ವಿಜ್ ಮಾಡಿ. ನನಗೆ ಒಂದು ಬಹು ಆಯ್ಕೆ ಪ್ರಶ್ನೆ ನೀಡಿ.",
    "chat.chooseFiles": "ಫೈಲ್‌ಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "chat.stopResponse": "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿಲ್ಲಿಸಿ",
    "chat.editQuery": "ಪ್ರಶ್ನೆಯನ್ನು ಸಂಪಾದಿಸಿ",
    "chat.save": "ಉಳಿಸಿ",
    "chat.cancel": "ರದ್ದುಮಾಡಿ",
    "chat.fallbackAssistant": "ನಾನು ಈ ಪ್ರಶ್ನೆಯನ್ನು ಈಗಾಗಲೇ ಸಂಪೂರ್ಣವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಕೇಳಿ ಅಥವಾ ಬೇರೆ ರೀತಿಯಲ್ಲಿ ಕೇಳಿ.",
    "chat.loaderText": "ಏಡಿಯುಅಲೈವ್ ಯೋಚಿಸುತ್ತಿದೆ...",
    "chat.disclaimer": "ಈ ಉತ್ತರಗಳು ಕಲಿಕೆಗೆ ಸಹಾಯ ಮಾಡಲಿವೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪಾಠಪುಸ್ತಕ ಮತ್ತು ಶಿಕ್ಷಕರ ಟಿಪ್ಪಣಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",

    // Translate panel
    "translate.title": "ಅನುವಾದ",
    "translate.selectLanguage": "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "translate.chooseLanguage": "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಆಯ್ಕೆ ಮಾಡಿ",
    "translate.originalText": "ಮೂಲ ಪಠ್ಯ",
    "translate.translatedText": "ಅನುವಾದಿತ ಪಠ್ಯ",
    "translate.translating": "ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
    "translate.failure": "ಅನುವಾದ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

    // Message component
    "message.playPronunciation": "ಉಚ್ಚಾರಣೆಯನ್ನು ಪ್ಲೇ ಮಾಡಿ",
    "message.readAloud": "ಉಚ್ಚಾರವಾಗಿ ಓದಿ",
    "message.stop": "ನಿಲ್ಲಿಸಿ",
    "message.noSpeechSupport": "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಭಾಷಣ ಬೆಂಬಲವನ್ನು ಹೊಂದಿಲ್ಲ.",
    "message.showOriginal": "ಮೂಲವನ್ನು ತೋರಿಸಿ",
    "message.showTranslated": "ಅನುವಾದವನ್ನು ತೋರಿಸಿ",
    "message.translatedResponse": "ಅನುವಾದಿಸಿದ ಪ್ರತಿಕ್ರಿಯೆ",
    "message.attachedFiles": "ಸಂಯೋಜಿತ ಕಡತಗಳು",
    "message.aiGeneratedImage": "AI ರಚಿಸಿದ ಚಿತ್ರ",
    "message.aiGeneratedImageAlt": "AI ರಚಿಸಿದ ಚಿತ್ರ",
    "message.document": "ದಾಖಲೆ",
    "message.testYourself": "ಸ್ವಯಂ ಪರೀಕ್ಷೆ ಮಾಡಿಕೊಳ್ಳಿ",

    // Subjects
    "subjects.english.name": "ಇಂಗ್ಲಿಷ್",
    "subjects.english.tagline": "ಪದಗಳು ಮತ್ತು ಕಥೆಗಳನ್ನು ಕಲಿಯಿರಿ",
    "subjects.hindi.name": "ಹಿಂದಿ",
    "subjects.hindi.tagline": "ಹಿಂದಿ ಕಲಿಯಿರಿ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    "subjects.math.name": "ಗಣಿತ",
    "subjects.math.tagline": "ಪರಿಹರಿಸಿ, ಲೆಕ್ಕಹಾಕಿ, ಗೆಲ್ಲಿ",
    "subjects.science.name": "ವಿಜ್ಞಾನ",
    "subjects.science.tagline": "ಅನ್ವೇಷಿಸಿ ಮತ್ತು ಪ್ರಯೋಗ ಮಾಡಿ",
    "subjects.social.name": "ಸಾಮಾಜಿಕ ಅಧ್ಯಯನಗಳು",
    "subjects.social.tagline": "ಇತಿಹಾಸ, ನಾಗರಿಕ ಶಾಸ್ತ್ರ ಮತ್ತು ಪ್ರಪಂಚ",
    "subjects.language.name": "ನಿಮ್ಮ ಭಾಷೆ",
    "subjects.language.tagline": "ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಕಲಿಯಿರಿ",

    // Language selector
    "language.select": "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "language.search": "ಭಾಷೆಗಳನ್ನು ಹುಡುಕಿ...",

    // Not Found page
    "notFound.title": "ಅಯ್ಯೋ! ಪುಟ ಸಿಗಲಿಲ್ಲ",
    "notFound.returnHome": "ಮುಖ್ಯ ಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    "notFound.createdBy": "ಸಶಾಂಕ್ ಎಡ್ಯುಅಲೈವ್‌ಗಾಗಿ ರಚಿಸಲಾಗಿದೆ",
  },
};

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: keyof TranslationData, params?: Record<string, string>) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en");

  const t = (key: keyof TranslationData, params?: Record<string, string>): string => {
    const translation = translations[language]?.[key] || translations.en[key] || key;

    if (params) {
      return Object.entries(params).reduce(
        (str, [param, value]) => str.replace(`{${param}}`, value),
        translation
      );
    }

    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}