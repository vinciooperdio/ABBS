import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the available languages
export type Language = 'it' | 'en';

// Define the structure of our context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a dictionary of translations
const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navbar
    'mission': 'Mission',
    'whatIsABBS': 'Cos\'è ABBS',
    'timeline': 'Timeline',
    'team': 'Team',
    'business': 'Business',
    'joinWaitlist': 'Iscriviti Ora',
    
    // Hero
    'revolutionIsHere': 'La Rivoluzione degli Abbonamenti è Qui',
    'manageAllSubscriptions': 'Gestisci tutti i tuoi abbonamenti in un\'unica app: dai servizi digitali alle palestre, dai teatri alle piscine. Scopri nuovi servizi nella tua zona e risparmia tempo e denaro.',
    'joinWaitingList': 'Unisciti alla lista d\'attesa',
    'learnMore': 'Scopri di più',
    'scrollToDiscover': 'Scopri di più',
    
    // WhatIs
    'whatIsABBSTitle': 'Cos\'è ABBS?',
    'whatIsPhrase1': 'Non dovrai più cercare in siti diversi per le informazioni dei tuoi abbonamenti',
    'whatIsPhrase2': 'Centralizza tutti i tuoi abbonamenti in un\'unica dashboard interattiva',
    'whatIsPhrase3': 'Monitora scadenze, costi e ricevi notifiche intelligenti prima dei rinnovi',
    'whatIsPhrase4': 'La nostra AI analizza le tue abitudini e suggerisce piani più adatti',
    'whatIsPhrase5': 'Sai esattamente dove vanno i tuoi soldi ogni mese. \n Con ABBS, ogni abbonamento è sotto controllo.',
    'whatIsPhrase6': 'Visualizza grafici e statistiche sul tuo utilizzo',
    'whatIsPhrase7': 'Accedi a promozioni e sconti riservati agli utenti ABBS',
    'whatIsPhrase8': 'Interfaccia intuitiva che semplifica la gestione con pochi click',
    
    // Mission
    'ourMission': 'La Nostra Missione',
    'missionDescription': 'Stiamo trasformando il modo in cui gestisci i tuoi abbonamenti e i servizi nelle vicinanze, portando ordine nel caos e restituendoti il controllo sulle tue spese digitali e fisiche.',
    'abbsAdvantages': 'Vantaggi di ABBS',
    'completeTracking': 'Tracciamento Completo',
    'completeTrackingDesc': 'Tenere traccia di ogni abbonamento attivo, da Netflix alla palestra sotto casa.',
    'smartNotifications': 'Notifiche Intelligenti',
    'smartNotificationsDesc': 'Ricevere notifiche utili per evitare rinnovi indesiderati.',
    'priceComparison': 'Confronto Prezzi',
    'priceComparisonDesc': 'Confrontare prezzi e scegliere le offerte migliori.',
    'documentManagement': 'Gestione Documenti',
    'documentManagementDesc': 'Gestire documenti, certificati medici e bonus con pochi click.',
    'discoverNearbyServices': 'Scopri Servizi Vicino a Te',
    'discoverNearbyServicesDesc': 'Trova palestre, piscine e sale cinematografiche nella tua zona.',
    'physicalServicesNearby': 'Servizi Fisici Vicini',

    
    // Timeline
    'timelineTitle': 'La nostra Roadmap',
    'timelineQ2_2023': 'Q2 2023',
    'timelineResearchPlanning': 'Ricerca e Pianificazione',
    'timelineResearchPlanningDesc': 'Analisi di mercato, identificazione delle problematiche degli utenti, definizione della value proposition e architettura del sistema.',
    'timelineDetails': 'Dettagli',
    'timelineQ3_2023': 'Q3 2023',
    'timelineMVPDevelopment': 'Sviluppo MVP',
    'timelineMVPDevelopmentDesc': 'Sviluppo del backend per la gestione degli abbonamenti, creazione dell\'interfaccia utente basilare e implementazione delle notifiche.',
    'timelineLearnMore': 'Scopri di più',
    'timelineQ4_2023': 'Q4 2023',
    'timelineBetaTesting': 'Beta Testing',
    'timelineBetaTestingDesc': 'Versione beta per un pubblico selezionato, raccolta feedback utenti e ottimizzazione dell\'usabilità.',
    'timelineExploreMore': 'Approfondisci',
    'timelineQ1_2024': 'Q1 2024',
    'timelineMobileAppLaunch': 'Lancio App Mobile',
    'timelineMobileAppLaunchDesc': 'Sviluppo e rilascio delle app iOS e Android, con notifiche push e sincronizzazione cross-platform.',
    'timelinePreview': 'Vedi anteprima',
    'timelineQ2_2024': 'Q2 2024',
    'timelineInternationalExpansion': 'Espansione Internazionale',
    'timelineInternationalExpansionDesc': 'Localizzazione in più lingue, adattamento a regolamenti internazionali e partnership globali.',
    
    // Business
    'businessTitle': 'Ottimizza la gestione dei tuoi abbonamenti aziendali',
    'businessSubtitle': 'Riduci i costi, aumenta l\'efficienza e mantieni il controllo completo su tutti i servizi in abbonamento della tua azienda con un\'unica piattaforma centralizzata.',
    'freeTrial': 'Prova Gratis per 30 Giorni',
    'traditionalSystemProblems': 'Problemi con i sistemi tradizionali',
    'traditionalSystemProblemsDesc': 'Le aziende affrontano quotidianamente diverse sfide nella gestione degli abbonamenti. Ecco i problemi più comuni che ABBS risolve.',
    'inefficientManagement': 'Gestione Inefficiente',
    'inefficientManagementDesc': 'Tempo e risorse sprecati nella gestione separata di molteplici abbonamenti e servizi.',
    'hiddenCosts': 'Costi Nascosti',
    'hiddenCostsDesc': 'Difficoltà nel monitorare e controllare le spese totali per abbonamenti e servizi.',
    'limitedCompatibility': 'Compatibilità Limitata',
    'limitedCompatibilityDesc': 'Sistemi che non si integrano bene con le piattaforme tecnologiche moderne.',
    'scalabilityIssues': 'Scalabilità Problematica',
    'scalabilityIssuesDesc': 'Difficoltà ad adattarsi rapidamente alla crescita aziendale e a nuove esigenze.',
    
    // Footer
    'revolutionizeDigitalIdentity': 'Rivoluziona il tuo modo di gestire l\'identità digitale. Un account, infiniti servizi.',
    'navigation': 'Navigazione',
    'home': 'Home',
    'whatIs': 'Cos\'è ABBS',
    'roadmap': 'Roadmap',
    'sections': 'Sezioni',
    'waitingList': 'Lista d\'Attesa',
    'legal': 'Legale',
    'termsOfService': 'Termini di Servizio',
    'privacyPolicy': 'Privacy Policy',
    'cookiePolicy': 'Cookie Policy',
    'contactUs': 'Contattaci',
    'questionsLearnMore': 'Hai domande? Vuoi saperne di più?',
    'writeToUs': 'Scrivici',
    'copyright': 'Tutti i diritti riservati.',
    'madeWithLove': 'Made with ',
    'inItaly': ' in Italia',
    
    // Team
    'ourTeam': 'Il Nostro Team',
    'teamSubtitle': 'Le persone di talento dietro ABBS che lavorano per trasformare la tua esperienza digitale',
    'vincenzo':'Imprenditore e project manager con una visione chiara: creare soluzioni digitali che abbiano un impatto concreto sulla vita delle persone.',
    'silvia':'Giovane professionista con formazione in Economia e Digital Innovation, si occupa di guidare le decisioni strategiche e organizzative del progetto, unendo visione, metodo e attenzione al risultato.',
    'lorenzo':'Specializzato in sviluppo e trasformazione digitale, Lorenzo guida l’innovazione tech di ABBS con un mix di visione strategica e competenze analitiche.',
    'alwaysLooking': 'Siamo sempre alla ricerca di persone di talento per aiutarci a rivoluzionare la gestione degli abbonamenti.',
    'viewOpenPositions': 'Invia la tua candidatura',
    'joinTeam':'Vuoi unirti al nostro team?',
    // Language Selector
    'language': 'Lingua',
    
    // Service names
    'netflix': 'Netflix',
    'spotifyPremium': 'Spotify Premium',
    'amazonPrime': 'Amazon Prime',
    'iCloudStorage': 'iCloud Storage',
    'fitnessApp': 'Fitness App',
    'microsoft365': 'Microsoft 365',
    'fitnessClub': 'Fitness Club',
    'powerFitness': 'Power Fitness',
    'aquaticCenter': 'Centro Acquatico',
    'centralCinema': 'Cinema Centrale',
    
    // Service types
    'gym': 'Palestra',
    'pool': 'Piscina',
    'theater': 'Cinema',
    
    // Units and measurements
    'perMonth': '/mese',
    'perEntry': '/ingresso',
    'perTicket': '/biglietto',
    'distance': 'km',
    
    // Waiting List
    'waitingListTitle': 'Unisciti alla lista d\'attesa',
    'ofThe': 'degli',
    'subscriptions': 'Abbonamenti',
    'waitingListDesc': 'Iscriviti ora per essere tra i primi a provare ABBS quando sarà disponibile. Ti informeremo appena sarà pronto.',
    'earlyAccessDesc': 'Ottieni accesso anticipato alla rivoluzione degli abbonamenti',
    'yourName': 'Il tuo nome',
    'yourEmail': 'La tua email',
    'subscribe': 'Iscriviti',
    'subscribing': 'Iscrivendo...',
    'subscribeSuccess': 'Grazie! Ti abbiamo aggiunto alla lista d\'attesa.',
    'subscribeError': 'Si è verificato un errore. Riprova più tardi.',
    'invalidEmail': 'Per favore, inserisci un indirizzo email valido',
    'missingFields': 'Per favore, compila tutti i campi',
    'alreadySubscribed': 'Questa email è già iscritta alla lista d\'attesa',
    'privacyConsent': 'Iscrivendoti, accetti la nostra Privacy Policy',
    'subscriptionBenefits': 'Benefici dell\'iscrizione',
    'benefitEarlyAccess': 'Accesso anticipato alla piattaforma',
    'benefitExclusiveOffers': 'Offerte esclusive per i primi utenti',
    'freePremiumMonths':'3 mesi gratuiti del piano premium all\'uscita',
    'prioritySupport':'Supporto prioritario e accesso alle nuove funzionalità',
    'benefitUpdates': 'Aggiornamenti regolari sullo sviluppo',
    'benefitFeedback': 'Possibilità di fornire feedback diretto',
    'subscriptionCount': 'Già più di 2000 iscritti!',
    
    // Months
    'january': 'Gennaio',
    'february': 'Febbraio',
    'march': 'Marzo',
    'april': 'Aprile',
    'may': 'Maggio',
    'june': 'Giugno',
    'july': 'Luglio',
    'august': 'Agosto',
    'september': 'Settembre',
    'october': 'Ottobre',
    'november': 'Novembre',
    'december': 'Dicembre',
    businessHeroTitle: "Ottimizza il Tuo Business con ABBS: La Piattaforma Completa per la Gestione degli Abbonamenti",
    businessHeroSubtitle: "Dalla gestione degli abbonamenti alla fidelizzazione clienti, ABBS semplifica ogni aspetto del tuo servizio, portando efficienza, sicurezza e redditività. Scopri come.",
    businessHeroCta1: "Prova GRATIS per 30 giorni",
    businessHeroCta2: "Richiedi una Demo Personalizzata",
    businessProblemsTitle: "Problemi con la gestione degli abbonamenti? Lascia che ABBS li risolva!",
    businessProblemsText: "Gestire un'attività che offre abbonamenti è complesso: rinnovi, pagamenti, cancellazioni, e gestione delle risorse sono solo alcune delle sfide quotidiane. ABBS è la piattaforma che ottimizza questi processi, riducendo il lavoro manuale e aumentando i ricavi.",
    businessProblem1: "Non più tempi sprecati per i rinnovi manuali. ABBS automatizza tutto, liberandoti da compiti ripetitivi.",
    businessProblem2: "Fidelizza i clienti con offerte personalizzate e un'esperienza utente fluida.",
    businessProblem3: "Difficoltà nel monitorare le metriche chiave: Senza strumenti adeguati, è complicato analizzare dati come tassi di abbandono, valore medio per cliente e altri indicatori vitali",
    businessProblem4: "Proteggi i dati sensibili e i pagamenti in conformità al GDPR, con una sicurezza di livello enterprise.",
    businessProblemsCta: "Scopri come ABBS può migliorare il tuo business",
    businessBenefitsTitle: "I Vantaggi di ABBS: La Soluzione Completa per Ogni Tipo di Servizio in Abbonamento",
    businessBenefitsText: "Con ABBS, ottieni una piattaforma che non solo gestisce i tuoi abbonamenti, ma ti aiuta a ottimizzare i profitti e migliorare l'efficienza operativa in modo intelligente e sicuro.",
    businessBenefit1: "Comprendi esattamente come i tuoi clienti utilizzano i tuoi servizi, analizzando i dati di utilizzo in tempo reale. Migliora la fidelizzazione e aumenta i ricavi personalizzando le offerte per ogni segmento di cliente.",
    businessBenefit2: "Automatizza i rinnovi, la fatturazione e le notifiche, riducendo al minimo le operazioni manuali. Con ABBS, ogni passaggio è semplificato, riducendo errori e risparmiando tempo prezioso.",
    businessBenefit3: "Massimizza i profitti con prezzi dinamici che si adattano alla domanda in tempo reale. Implementa sistemi di yield management per ottimizzare la redditività in ogni fascia oraria, massimizzando l'occupazione e i ricavi.",
    businessBenefit4: "Proteggi i dati sensibili dei tuoi clienti e le transazioni finanziarie in totale conformità con il GDPR. ABBS garantisce la sicurezza dei dati con crittografia avanzata e accesso protetto.",
    businessBenefit5: "Suggerisci automaticamente altri servizi ai tuoi clienti quando non ci sono slot liberi o quando completano un'attività, aumentando il valore per cliente e creando opportunità di vendita incrociata.",
    businessBenefit6: "ABBS è facile da usare e accessibile ovunque grazie alla sua app intuitiva. Dalla gestione degli abbonamenti all'analisi dei dati, tutto è a portata di mano.",
    businessBenefitsCta: "Scopri come ABBS può rendere il tuo business più efficiente e redditizio",
    businessHowItWorksTitle: "Implementazione Rapida e Facile: Inizia in pochi minuti",
    businessStep1: "Registrati su ABBS e configura la tua attività in pochi clic.",
    businessStep2: "Integra i tuoi abbonamenti tramite API semplici o tramite la nostra interfaccia intuitiva.",
    businessStep3: "Goditi la gestione automatica degli abbonamenti, con la possibilità di personalizzare le offerte e ottimizzare i ricavi.",
    businessHowItWorksCta: "Inizia la tua prova gratuita",
    businessMarketingTitle: "Espandi la Tua Visibilità e Aumenta i Clienti con ABBS",
    businessMarketingText: "ABBS non è solo un gestionale. È una piattaforma di marketing che ti aiuta a raggiungere nuovi clienti e a promuovere le tue offerte. Migliaia di utenti cercano servizi come il tuo ogni giorno. Con ABBS, la tua attività sarà visibile e pronta ad attrarre nuovi abbonati.",
    businessMarketingPoint1: "I tuoi servizi vengono mostrati a migliaia di utenti in cerca di nuove opportunità.",
    businessMarketingPoint2: "Promuovi le tue offerte in modo mirato per segmenti specifici di clientela.",
    businessMarketingPoint3: "Offri pacchetti e promozioni esclusive per attrarre nuovi membri e mantenere i vecchi.",
    businessMarketingCta: "Aumenta la tua visibilità con ABBS",
    businessFaqTitle: "Hai Domande? Abbiamo le Risposte.",
    businessFaq1: "Come posso integrare ABBS con il mio sistema attuale?",
    businessFaq2: "ABBS può rivoluzionare la gestione degli abbonamenti anche per piccole attività?",
    businessFaq3: "Come funziona il sistema di prezzi dinamici?",
    businessFaqCta: "Contattaci per ulteriori informazioni",
    businessFinalCtaTitle: "Non aspettare oltre! Ottimizza il tuo business con ABBS.",
    businessFinalCtaText: "Unisciti alle migliaia di aziende che stanno trasformando la gestione degli abbonamenti in un vantaggio competitivo.",
    businessFinalCtaButton: "Inizia Ora con ABBS",
    businessFinalCtaButton2: "Scopri come ABBS può migliorare il tuo business"
  },
  en: {
    // Navbar
    'mission': 'Mission',
    'whatIsABBS': 'What is ABBS',
    'timeline': 'Timeline',
    'team': 'Team',
    'business': 'Business',
    'joinWaitlist': 'Join Now',
    
    // Hero
    'revolutionIsHere': 'The Subscription Revolution is Here',
    'manageAllSubscriptions': 'One app for all your subscriptions: from streaming to gyms, theaters to pools. Discover local services and save time and money.',
    'joinWaitingList': 'Get Early Access',
    'learnMore': 'Learn More',
    'scrollToDiscover': 'Scroll to explore',
    
    // WhatIs
    'whatIsABBSTitle': 'What is ABBS?',
    'whatIsPhrase1': 'No more searching different sites for your subscription information',
    'whatIsPhrase2': 'Centralize all your subscriptions in one interactive dashboard',
    'whatIsPhrase3': 'Track due dates, costs and receive smart notifications before renewals',
    'whatIsPhrase4': 'Our AI analyzes your habits and suggests more suitable plans',
    'whatIsPhrase5': 'Save up to 30% on your monthly subscriptions',
    'whatIsPhrase6': 'View charts and statistics on your usage',
    'whatIsPhrase7': 'Access promotions and discounts reserved for ABBS users',
    'whatIsPhrase8': 'Intuitive interface that simplifies management with just a few clicks',
    
    // Mission
    'ourMission': 'Our Mission',
    'missionDescription': 'We\'re transforming how you manage subscriptions and local services, bringing order to chaos and giving you control over your digital and physical expenses.',
    'abbsAdvantages': 'ABBS Advantages',
    'completeTracking': 'Complete Tracking',
    'completeTrackingDesc': 'Keep track of every active subscription, from Netflix to your local gym.',
    'smartNotifications': 'Smart Notifications',
    'smartNotificationsDesc': 'Receive useful notifications to avoid unwanted renewals.',
    'priceComparison': 'Price Comparison',
    'priceComparisonDesc': 'Compare prices and choose the best offers.',
    'documentManagement': 'Document Management',
    'documentManagementDesc': 'Manage documents, medical certificates and bonuses with a few clicks.',
    'discoverNearbyServices': 'Discover Services Near You',
    'discoverNearbyServicesDesc': 'Find gyms, pools and cinemas in your area.',
    'physicalServicesNearby': 'Nearby Physical Services',
    
    // Timeline
    'timelineTitle': 'Our Roadmap',
    'timelineQ2_2023': 'Q2 2023',
    'timelineResearchPlanning': 'Research & Planning',
    'timelineResearchPlanningDesc': 'Market analysis, identifying user issues, defining value proposition and system architecture.',
    'timelineDetails': 'Details',
    'timelineQ3_2023': 'Q3 2023',
    'timelineMVPDevelopment': 'MVP Development',
    'timelineMVPDevelopmentDesc': 'Backend development for subscription management, creation of basic user interface and notification implementation.',
    'timelineLearnMore': 'Learn More',
    'timelineQ4_2023': 'Q4 2023',
    'timelineBetaTesting': 'Beta Testing',
    'timelineBetaTestingDesc': 'Beta version for a selected audience, user feedback collection and usability optimization.',
    'timelineExploreMore': 'Explore More',
    'timelineQ1_2024': 'Q1 2024',
    'timelineMobileAppLaunch': 'Mobile App Launch',
    'timelineMobileAppLaunchDesc': 'Development and release of iOS and Android apps, with push notifications and cross-platform synchronization.',
    'timelinePreview': 'See Preview',
    'timelineQ2_2024': 'Q2 2024',
    'timelineInternationalExpansion': 'International Expansion',
    'timelineInternationalExpansionDesc': 'Localization in multiple languages, adaptation to international regulations and global partnerships.',
    
    // Business
    'businessTitle': 'Optimize your business subscription management',
    'businessSubtitle': 'Reduce costs, increase efficiency and maintain complete control over all your company\'s subscription services with a centralized platform.',
    'freeTrial': 'Try Free for 30 Days',
    'traditionalSystemProblems': 'Problems with traditional systems',
    'traditionalSystemProblemsDesc': 'Companies face various challenges in subscription management daily. Here are the most common problems ABBS solves.',
    'inefficientManagement': 'Inefficient Management',
    'inefficientManagementDesc': 'Time and resources wasted in separate management of multiple subscriptions and services.',
    'hiddenCosts': 'Hidden Costs',
    'hiddenCostsDesc': 'Difficulty in monitoring and controlling total spending on subscriptions and services.',
    'limitedCompatibility': 'Limited Compatibility',
    'limitedCompatibilityDesc': 'Systems that don\'t integrate well with modern technology platforms.',
    'scalabilityIssues': 'Scalability Issues',
    'scalabilityIssuesDesc': 'Difficulty adapting quickly to business growth and new requirements.',
    
    // Footer
    'revolutionizeDigitalIdentity': 'Transform your digital identity. One account, infinite possibilities.',
    'navigation': 'Navigation',
    'home': 'Home',
    'whatIs': 'What is ABBS',
    'roadmap': 'Roadmap',
    'sections': 'Sections',
    'waitingList': 'Waiting List',
    'legal': 'Legal',
    'termsOfService': 'Terms of Service',
    'privacyPolicy': 'Privacy Policy',
    'cookiePolicy': 'Cookie Policy',
    'contactUs': 'Contact Us',
    'questionsLearnMore': 'Questions? Want to know more?',
    'writeToUs': 'Get in Touch',
    'copyright': 'All rights reserved.',
    'madeWithLove': 'Made with ',
    'inItaly': ' in Italy',
    
    // Team
    'ourTeam': 'Our Team',
    'teamSubtitle': 'The talented minds behind ABBS working to transform your digital experience',
    'vincenzo':'Entrepreneur and project manager with a clear vision: creating digital solutions that have a tangible impact on people\'s lives.',
    'silvia':'Young professional with a degree in Economics and Digital Innovation, she is responsible for guiding strategic and organizational decisions of the project, combining vision, method and attention to results.',
    'lorenzo':'Specialized in digital development and transformation, Lorenzo leads the tech innovation of ABBS with a mix of strategic vision and analytical skills.',
    
    'alwaysLooking': 'We\'re always looking for talented people to help us revolutionize subscription management.',
    'joinTeam':'Want to join our team?',
    'viewOpenPositions': 'Send your application',
    
    // Language Selector
    'language': 'Language',
    
    // Service names
    'netflix': 'Netflix',
    'spotifyPremium': 'Spotify Premium',
    'amazonPrime': 'Amazon Prime',
    'iCloudStorage': 'iCloud Storage',
    'fitnessApp': 'Fitness App',
    'microsoft365': 'Microsoft 365',
    'fitnessClub': 'Fitness Club',
    'powerFitness': 'Power Fitness',
    'aquaticCenter': 'Aquatic Center',
    'centralCinema': 'Central Cinema',
    
    // Service types
    'gym': 'Gym',
    'pool': 'Pool',
    'theater': 'Cinema',
    
    // Units and measurements
    'perMonth': '/month',
    'perEntry': '/entry',
    'perTicket': '/ticket',
    'distance': 'km',
    
    // Waiting List
    'waitingListTitle': 'Join our waiting list',
    'ofThe': 'of the',
    'subscriptions': 'Subscriptions',
    'waitingListDesc': 'Sign up now to be among the first to try ABBS when it becomes available. We\'ll let you know as soon as it\'s ready.',
    'earlyAccessDesc': 'Get early access to the subscription revolution',
    'yourName': 'Your name',
    'yourEmail': 'Your email',
    'subscribe': 'Subscribe',
    'subscribing': 'Subscribing...',
    'subscribeSuccess': 'Thank you! We\'ve added you to the waiting list.',
    'subscribeError': 'An error occurred. Please try again later.',
    'invalidEmail': 'Please enter a valid email address',
    'missingFields': 'Please fill in all fields',
    'alreadySubscribed': 'This email is already subscribed to the waiting list',
    'privacyConsent': 'By subscribing, you agree to our Privacy Policy',
    'subscriptionBenefits': 'Subscription Benefits',
    'benefitEarlyAccess': 'Early access to the platform',
    'benefitExclusiveOffers': 'Exclusive offers for early users',
    'freePremiumMonths':'3 months of premium plan for free at launch',
    'benefitUpdates': 'Regular updates on development',
    'prioritySupport':'Priority support and access to new features',
    'benefitFeedback': 'Opportunity to provide direct feedback',
    'subscriptionCount': 'Already more than 2000 subscribers!',
    
    // Months
    'january': 'January',
    'february': 'February',
    'march': 'March',
    'april': 'April',
    'may': 'May',
    'june': 'June',
    'july': 'July',
    'august': 'August',
    'september': 'September',
    'october': 'October',
    'november': 'November',
    'december': 'December',
    businessHeroTitle: "Optimize Your Business with ABBS: The Complete Platform for Subscription Management",
    businessHeroSubtitle: "From subscription management to customer loyalty, ABBS simplifies every aspect of your service, bringing efficiency, security, and profitability. Discover how.",
    businessHeroCta1: "Try FREE for 30 days",
    businessHeroCta2: "Request a Personalized Demo",
    businessProblemsTitle: "Having issues with subscription management? Let ABBS solve them!",
    businessProblemsText: "Managing a subscription-based business is complex: renewals, payments, cancellations, and resource management are just some of the daily challenges. ABBS is the platform that optimizes these processes, reducing manual work and increasing revenue.",
    businessProblem1: "No more wasted time on manual renewals. ABBS automates everything, freeing you from repetitive tasks.",
    businessProblem2: "Build customer loyalty with personalized offers and a smooth user experience.",
    businessProblem3: "With ABBS, you have access to advanced data on user behavior to make more informed decisions.",
    businessProblem4: "Protect sensitive data and payments in compliance with GDPR, with enterprise-level security.",
    businessProblemsCta: "Discover how ABBS can improve your business",
    businessBenefitsTitle: "The Benefits of ABBS: The Complete Solution for Every Type of Subscription Service",
    businessBenefitsText: "With ABBS, you get a platform that not only manages your subscriptions but helps you optimize profits and improve operational efficiency in a smart and secure way.",
    businessBenefit1: "Understand exactly how your customers use your services by analyzing real-time usage data. Improve loyalty and increase revenue by customizing offers for each customer segment.",
    businessBenefit2: "Automate renewals, billing, and notifications, minimizing manual operations. With ABBS, every step is simplified, reducing errors and saving valuable time.",
    businessBenefit3: "Maximize profits with dynamic pricing that adapts to real-time demand. Implement yield management systems to optimize profitability in every time slot, maximizing occupancy and revenue.",
    businessBenefit4: "Protect your customers' sensitive data and financial transactions in full compliance with GDPR. ABBS ensures data security with advanced encryption and protected access.",
    businessBenefit5: "Automatically suggest other services to your customers when there are no free slots or when they complete an activity, increasing customer value and creating cross-selling opportunities.",
    businessBenefit6: "ABBS is easy to use and accessible anywhere thanks to its intuitive app. From subscription management to data analysis, everything is at your fingertips.",
    businessBenefitsCta: "Discover how ABBS can make your business more efficient and profitable",
    businessHowItWorksTitle: "Quick and Easy Implementation: Start in Minutes",
    businessStep1: "Register on ABBS and set up your business in a few clicks.",
    businessStep2: "Integrate your subscriptions through simple APIs or our intuitive interface.",
    businessStep3: "Enjoy automatic subscription management, with the ability to customize offers and optimize revenue.",
    businessHowItWorksCta: "Start your free trial",
    businessMarketingTitle: "Expand Your Visibility and Increase Customers with ABBS",
    businessMarketingText: "ABBS is not just a management system. It's a marketing platform that helps you reach new customers and promote your offers. Thousands of users search for services like yours every day. With ABBS, your business will be visible and ready to attract new subscribers.",
    businessMarketingPoint1: "Your services are shown to thousands of users looking for new opportunities.",
    businessMarketingPoint2: "Promote your offers in a targeted way for specific customer segments.",
    businessMarketingPoint3: "Offer exclusive packages and promotions to attract new members and retain existing ones.",
    businessMarketingCta: "Increase your visibility with ABBS",
    businessFaqTitle: "Have Questions? We Have Answers.",
    businessFaq1: "How can I integrate ABBS with my current system?",
    businessFaq2: "How long does it take to start seeing the benefits?",
    businessFaq3: "How does the dynamic pricing system work?",
    businessFaqCta: "Contact us for more information",
    businessFinalCtaTitle: "Don't wait any longer! Optimize your business with ABBS.",
    businessFinalCtaText: "Join the thousands of companies that are turning subscription management into a competitive advantage.",
    businessFinalCtaButton: "Start Now with ABBS"
  }
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  // Function to get a translated string
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}; 