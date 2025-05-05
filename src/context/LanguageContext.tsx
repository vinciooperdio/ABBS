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

    //business navbar
    'Come Funziona': 'Come Funziona',
    'Vantaggi': 'Vantaggi',
    'Contattaci': 'Contattaci',
    
    // Hero
    'revolutionIsHere': 'La Rivoluzione degli Abbonamenti è Qui',
    'manageAllSubscriptions': 'Gestisci tutti i tuoi abbonamenti in un\'unica app: dai servizi digitali alle palestre, dai teatri alle piscine. Scopri nuovi servizi nella tua zona e risparmia tempo e denaro.',
    'joinWaitingList': 'Unisciti alla lista d\'attesa',
    'learnMore': 'Scopri di più',
    'scrollToDiscover': 'Scopri di più',
    'emailAlreadyRegistered': 'Questa email è già iscritta alla lista d\'attesa!',
    'errorMessage': 'Si è verificato un errore. Riprova più tardi.',
    'emailPlaceholder': 'Inserisci la tua email',
    'subscribeButton': 'Iscriviti',
    'subscribeSuccess': 'Grazie! Ti abbiamo aggiunto alla lista d\'attesa.',
    'missingFields': 'Per favore, compila tutti i campi',
    'invalidEmail': 'Per favore, inserisci un indirizzo email valido',
    'subscribeAnother': 'Iscrivi un\'altra email',
    
    // WhatIs
    'whatIsABBSTitle': 'Cos\'è ABBS?',
    'whatIsText': 'Con **ABBS**, non dovrai più cercare in siti diversi per monitorare i tuoi abbonamenti. Ora tutto è centralizzato in un\'**unica dashboard interattiva**. \nMonitora facilmente le scadenze e i costi mensili, ricevi notifiche intelligenti che ti avvisano in **anticipo** prima dei rinnovi. \nGrazie all\'intelligenza artificiale, ABBS analizza le tue abitudini di abbonamento e **suggerisce** i piani più adatti alle tue necessità. Così, saprai esattamente dove vanno i tuoi soldi ogni mese, con ogni abbonamento sotto controllo. \n Visualizza in tempo reale grafici e statistiche del tuo utilizzo, accedi a **promozioni esclusive** riservate agli utenti ABBS, e goditi un\'interfaccia intuitiva che semplifica la gestione con pochi clic.',
    
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
    //vantaggi
    'benefits': 'Vantaggi per il tuo Business',
    'benefitsDesc': 'Scopri come ABBS può trasformare la gestione degli abbonamenti e far crescere la tua attività.',
    'espandi': 'Espandi la tua clientela',
    'espandiDesc': 'Raggiungi nuovi clienti attraverso l\'app ABBS. La tua attività diventa visibile a migliaia di potenziali abbonati che cercano servizi come il tuo. Grazie al nostro sistema di raccomandazioni, i tuoi abbonamenti saranno mostrati agli utenti più interessati, aumentando significativamente le conversioni e riducendo il costo di acquisizione clienti.',
    'personalizzazione': 'Personalizzazione avanzata',
    'personalizzazioneDesc': 'Immagina di sapere esattamente cosa vogliono i tuoi clienti… prima ancora che lo chiedano. Entri nella dashboard di ABBS e vedi tutto: cosa hanno prenotato, cosa gli piace, dove si sono bloccati. Con un click, personalizzi la promo perfetta. Fidelizzazione? Boom. Fatturato? In salita.',
    'automazione': 'Totale Automazione',
    'automazioneDesc': 'Ogni rinnovo parte da solo. Ogni fattura si crea da sola. Ogni notifica arriva al momento giusto. E tu? Tu stai prendendo un caffè. Perché il tempo risparmiato è tempo guadagnato.',
    'pricing': 'Pricing Intelligente',
    'pricingDesc': 'ABBS ti legge la domanda in tempo reale e alza i prezzi quando serve. Nessuno slot vuoto, niente sprechi. Un algoritmo che lavora per te, mentre tu ti occupi dei clienti.',
    'sicurezza': 'Sicurezza Garantita',
    'sicurezzaDesc': 'I dati dei tuoi clienti? Al sicuro. Sempre. Crittografia avanzata, accessi controllati, e piena compliance GDPR. Come avere un vault digitale personale.',
    
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
    'vincenzo':'Sono un project manager, founder e mente creativa: nato per creare soluzioni digitali che abbiano un impatto concreto sulla vita delle persone.',
    'silvia':'Sono un giovane professionista con formazione in Economia e Digital Innovation, e mi occupo di guidare le decisioni strategiche e organizzative del progetto, unendo visione, metodo e attenzione al risultato.',
    'lorenzo':'Sono un professionista specializzato in sviluppo e trasformazione digitale, in ABBS mi occupo di guidare l\'innovazione tecnologica, combinando visione strategica e competenze analitiche.',
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
    'poolName': 'Piscina Poseidon',
    'theaterName': 'Teatro Apollo',
    'cinemaStar': 'Cinema Star',
    'aquaWellness': 'Acqua & Wellness',
    'cinemaSplendor': 'Cinema Splendor',
    'theaterOpera': 'Teatro dell\'Opera',
    'aquaFitness': 'Centro Aqua Fitness',
    'cinemaRex': 'Multisala Rex',
    'palazzoCongress': 'Palazzo dei Congressi',
    'centerSportive': 'Centro Sportivo Elite',
    'arenaConcert': 'Arena Concert Hall',
    'gymName': 'Palestra Olympia',

    //map
    'yourLocation': 'La tua posizione',
    'viewDetails': 'Vedi dettagli',
    'show': 'Mostra',
    'servicesAvailable': 'servizi disponibili',
    'description': 'Descrizione',
    'subscribeNow': 'Iscriviti ora',
    'price': 'Prezzo',
    'dist': 'Distanza',
    'rating': 'Valutazione',


    // Service types
    'gym': 'Palestra',
    'gymDesc': 'Abbonamento mensile completo con accesso a tutte le attrezzature e corsi fitness disponibili. Include spogliatoi, docce e supporto di trainer professionisti.',
    'pool': 'Piscina',
    'poolDesc': 'Abbonamento per accesso alla piscina con corsie e area relax. Include lezioni di nuoto di gruppo e accesso alle saune.',
    'cinema': 'Cinema',
    'cinemaDesc': 'Abbonamento mensile cinema con accesso illimitato a tutte le proiezioni. Include sconto su snack e bevande.',
    'course': 'Corsi',
    'courseDesc': 'Abbonamento per corsi di formazione con accesso a materiale didattico e certificato finale.',
    'theater': 'Teatro',
    'theaterDesc': 'Abbonamento stagionale teatro con accesso a tutti gli spettacoli della stagione. Include posto riservato e accesso prioritario.',
    'concert': 'Concerto',
    'concertDesc': 'Abbonamento stagionale per concerti ed eventi musicali. Include accesso prioritario e area riservata.',
    
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
    'subscribeError': 'Si è verificato un errore. Riprova più tardi.',
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
    businessHeroCta1: "Contattaci ora",
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
    businessBenefitsCta: "Inizia a trasformare il tuo business",
    businessHowItWorksTitle: "Implementazione Rapida e Facile: Inizia in pochi minuti",
    businessStep1: "Collega ciò che hai, senza perdere nulla",
    businessStep1Desc: "Hai già un gestionale? Non serve ripartire da zero. ABBS importa automaticamente tutti i tuoi dati e abbonamenti esistenti. Così puoi passare a un sistema più moderno, senza interruzioni.",
    businessStep2: "Inizia in pochi secondi",
    businessStep2Desc: "Registrazione super veloce. Con email e password sei dentro. Nessuna curva di apprendimento: tutto è pensato per essere semplice fin dal primo accesso.",
    businessStep3: "Subito Operativo",
    businessStep3Desc: "Goditi la gestione automatica degli abbonamenti, con la possibilità di personalizzare le offerte e ottimizzare i ricavi.",
    businessHowItWorksCta: "Contattaci per saperne di più",
    businessMarketingTitle: "Espandi la Tua Visibilità e Aumenta i Clienti con ABBS",
    businessMarketingText: "ABBS non è solo un gestionale. È una piattaforma di marketing che ti aiuta a raggiungere nuovi clienti e a promuovere le tue offerte. Migliaia di utenti cercano servizi come il tuo ogni giorno. Con ABBS, la tua attività sarà visibile e pronta ad attrarre nuovi abbonati.",
    businessMarketingPoint1: "I tuoi servizi vengono mostrati a migliaia di utenti in cerca di nuove opportunità.",
    businessMarketingPoint2: "Promuovi le tue offerte in modo mirato per segmenti specifici di clientela.",
    businessMarketingPoint3: "Offri pacchetti e promozioni esclusive per attrarre nuovi membri e mantenere i vecchi.",
    businessMarketingCta: "Aumenta la tua visibilità con ABBS",
    businessFaqTitle: "Hai Domande? Abbiamo le Risposte.",
    businessFaq1: "Come posso integrare ABBS con il mio sistema attuale?",
    businessFaq1Answer: "ABBS offre 30 giorni di prova gratuita. Durante il periodo di prova puoi importare automaticamente i tuoi dati e testare tutte le funzionalità senza modificare i tuoi flussi operativi. Il passaggio è semplice, veloce e senza inserimenti manuali: provi ABBS, lo confronti e decidi con calma.",
    businessFaq2: "Quanto tempo ci vuole per iniziare a vedere i benefici?",
    businessFaq2Answer: "Pochissimo! Con ABBS puoi iniziare a vedere i primi benefici già nei primi giorni: l'importazione automatica degli abbonamenti e la centralizzazione dei dati ti permettono di risparmiare tempo fin da subito. Molti dei nostri clienti notano una gestione più fluida e una riduzione dei costi già entro il primo mese.",
    businessFaq3: "Come mi aiuta ABBS a vendere di più?",
    businessFaq3Answer: "Tramite la nostra app, gli utenti scoprono nuovi abbonamenti nella loro zona, ricevono promozioni personalizzate e notifiche intelligenti. Tu puoi creare offerte mirate, attivare campagne interne e comparire tra le proposte consigliate, aumentando visibilità e conversioni in modo naturale. È come avere un canale di vendita diretto, già integrato nella routine dei tuoi potenziali clienti.",
    businessFaq4: "È sicuro condividere i dati dei nostri abbonamenti?",
    businessFaq4Answer: "La sicurezza dei tuoi dati è la nostra priorità assoluta. ABBS utilizza crittografia di livello bancario, è conforme al GDPR e non memorizza informazioni sensibili come password o dettagli completi delle carte di credito. Puoi leggere la nostra politica sulla privacy per tutti i dettagli.",
    businessFaq5: "Quanto tempo richiede l'implementazione?",
    businessFaq5Answer: "Il trasferimento dei dati sul gestionale ABBS avviene in 24-48 ore. Fin da subito puoi iniziare a usare la piattaforma: l'interfaccia è semplice, intuitiva e fluida, pensata per farti sentire a tuo agio già dal primo accesso. In pochi clic hai tutto sotto controllo — senza bisogno di formazione tecnica.", 
    businessFaqPreCta: "Hai altre domande? Siamo qui per aiutarti",
    businessFaqCta: "Contattaci",
    
    businessContact: "Sei interessato ad ABBS Business? Compila il modulo e ti contatteremo al più presto.",
    businessContactName: "Nome completo",
    businessContactNamePlaceholder: "Inserisci il tuo nome",
    businessContactEmail: "Email",
    businessContactAzienda: "Azienda",
    businessContactAziendaPlaceholder: "Nome della tua azienda",
    businessContactEmailPlaceholder: "Inserisci la tua email",
    businessContactMessage: "Messaggio",
    businessContactMessagePlaceholder: "Come possiamo aiutarti?",
    businessContactSubmit: "Invia Messaggio",





    businessFinalCtaTitle: "Non aspettare oltre! Ottimizza il tuo business con ABBS.",
    businessFinalCtaText: "Unisciti alle migliaia di aziende che stanno trasformando la gestione degli abbonamenti in un vantaggio competitivo.",
    businessFinalCtaButton: "Inizia Ora con ABBS",
    businessFinalCtaButton2: "Scopri come ABBS può migliorare il tuo business",
    
    // Business page case studies
    'caseStudiesTitle': 'Piattaforme che hanno rivoluzionato i settori',
    'airbnbName': 'Airbnb',
    'airbnbSubtitle': 'Rivoluzione nel settore ospitalità',
    'airbnbDesc': 'Airbnb ha trasformato il mercato dell\'ospitalità creando una piattaforma che connette direttamente host e viaggiatori. Con un modello di abbonamento per host, hanno democratizzato l\'industria permettendo a chiunque di monetizzare i propri spazi.',
    'spotifyName': 'Spotify',
    'spotifySubtitle': 'Reinvenzione della musica',
    'spotifyDesc': 'Spotify ha rivoluzionato come consumiamo la musica, trasformando un mercato di acquisti singoli in un modello di abbonamento con accesso illimitato. Hanno utilizzato i dati degli utenti per creare esperienze personalizzate e playlist curate.',
    'uberName': 'Uber',
    'uberSubtitle': 'Rivoluzione della mobilità urbana',
    'uberDesc': 'Uber ha trasformato il settore dei trasporti connettendo passeggeri e autisti attraverso un\'app semplice. Il suo modello di abbonamento per driver ha sconvolto l\'industria dei taxi tradizionali, creando un nuovo standard per la mobilità on-demand.',
    'users': 'Utenti',
    'activeUsers': 'Utenti attivi',
    'countries': 'Paesi',
    'cities': 'Città',
    'premiumSubscribers': 'Abbonati premium',
  },
  en: {
    // Navbar
    'mission': 'Mission',
    'whatIsABBS': 'What is ABBS',
    'timeline': 'Timeline',
    'team': 'Team',
    'business': 'Business',
    'joinWaitlist': 'Join Now',

    //business navbar
    'Come Funziona': 'How it works',
    'Vantaggi': 'Benefits',
    'Contattaci': 'Contact us',
    
    // Hero
    'revolutionIsHere': 'The Subscription Revolution is Here',
    'manageAllSubscriptions': 'One app for all your subscriptions: from streaming to gyms, theaters to pools. Discover local services and save time and money.',
    'joinWaitingList': 'Get Early Access',
    'learnMore': 'Learn More',
    'scrollToDiscover': 'Scroll to explore',
    'subscribeSuccess': 'Thank you! We\'ve added you to the waiting list.',
    'subscribeAnother': 'Subscribe another email',
    'subscribeButton': 'Subscribe',
    'subscribeError': 'An error occurred. Please try again later.',
    'emailAlreadyRegistered': 'This email is already subscribed to the waiting list!',
    'errorMessage': 'An error occurred. Please try again later.',
    'emailPlaceholder': 'Enter your email',
    'invalidEmail': 'Please enter a valid email address',
    
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
    
    
    'whatIsText': 'With **ABBS**, you won\'t have to search different sites for your subscription information anymore. Now, all your subscriptions are centralized in one **interactive dashboard**. \nMonitor easily due dates and monthly costs, receive smart notifications that alert you in **advance** before renewals. \nThanks to our AI, ABBS analyzes your subscription habits and **suggests** more suitable plans for your needs. So, you\'ll know exactly where your money goes every month, with every subscription under control. \nVisualize in real time charts and statistics of your usage, access **exclusive promotions** reserved for ABBS users, and enjoy an intuitive interface that simplifies management with just a few clicks.',
    
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
    //vantaggi
    'benefits': 'Business Benefits',
    'benefitsDesc': 'Discover how ABBS can transform subscription management and grow your business.',
    'espandi': 'Expand your customer base',
    'espandiDesc': 'Reach new customers through ABBS. Your business becomes visible to thousands of potential subscribers who are looking for services like yours. Thanks to our recommendation system, your subscriptions will be shown to users most interested in, increasing conversions and reducing customer acquisition costs.',
    'personalizzazione': 'Advanced Customization',
    'personalizzazioneDesc': 'Imagine knowing exactly what your customers want… before they even ask. Enter the ABBS dashboard and see everything: what they\'ve booked, what they like, where they\'re stuck. With a click, personalize the perfect promo. Loyalty? Boom. Revenue? On the rise.',
    'automazione': 'Total Automation',
    'automazioneDesc': 'Every renewal starts by itself. Every invoice is created by itself. Every notification arrives at the right time. And you? You\'re taking a coffee break. Because the time saved is time earned.',
    'pricing': 'Intelligent Pricing',
    'pricingDesc': 'ABBS reads your demand in real time and raises prices when needed. No empty slots, no wasted resources. An algorithm that works for you, while you focus on your customers.',
    'sicurezza': 'Guaranteed Security',
    'sicurezzaDesc': 'Your customer data? Safe and secure. Always. Advanced encryption, controlled access, and full GDPR compliance. Like having a digital personal vault.',
    
    

    

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
    'vincenzo':'I\'m a project manager, founder and creative mind: born to create digital solutions that have a real impact on people\'s lives.',
    'silvia':'I\'m a young professional with a background in Economics and Digital Innovation, and I\'m responsible for guiding the strategic and organizational decisions of the project, uniting vision, method, and attention to results.',
    'lorenzo':'I\'m a professional specialized in digital development and transformation, in ABBS I lead the technological innovation, combining strategic vision and analytical skills.',
    
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
    'poolName': 'Poseidon Pool',
    'theaterName': 'Apollo Theater',
    'cinemaStar': 'Star Cinema',
    'aquaWellness': 'Acqua & Wellness',
    'cinemaSplendor': 'Splendor Cinema',
    'theaterOpera': 'Opera Theater',
    'aquaFitness': 'Aqua Fitness',
    'cinemaRex': 'Rex Cinema',
    'palazzoCongress': 'Congress Palace',
    'arenaConcert': 'Arena Concert',
    'gymName': 'Olympia Gym',
    'centerSportive':'Elite Sport Center',

    //map
    'yourLocation': 'Your Location',
    'viewDetails': 'View Details',
    'show': 'Show',
    'servicesAvailable': 'services available',
    'description': 'Description',
    'subscribeNow': 'Subscribe Now',
    'price': 'Price',
    'dist': 'Distance',
    'rating': 'Rating',


    // Service types
    'gym': 'Gym',
    'gymDesc': 'Monthly full access subscription to all available gym equipment and fitness classes. Includes locker rooms, showers, and professional trainer support.',
    'pool': 'Pool',
    'poolDesc': 'Monthly access subscription to the pool with lane swimming and relaxation area. Includes group swimming lessons and access to saunas.',
    'cinema': 'Cinema',
    'cinemaDesc': 'Monthly cinema subscription with unlimited access to all screenings. Includes snack and beverage discounts.',
    'course': 'Courses',
    'courseDesc': 'Monthly subscription for training courses with access to educational materials and final certificate.',
    'theater': 'Theater',
    'theaterDesc': 'Seasonal theater subscription with access to all performances of the season. Includes reserved seating and priority access.',
    'concert': 'Concert',
    'concertDesc': 'Seasonal concert subscription with priority access and reserved area.',

    
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
    businessHeroCta1: "Contact us now",
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
    businessBenefitsCta: "Start transforming your business",
    businessHowItWorksTitle: "Quick and Easy Implementation: Start in Minutes",
    businessStep1: "Connect what you have, without losing anything",
    businessStep1Desc: "You already have a management system? No need to start from scratch. ABBS automatically imports all your existing data and subscriptions. So you can switch to a more modern system without interruptions.",
    businessStep2: "Start in seconds",
    businessStep2Desc: "Super fast registration. With email and password, you're in. No learning curve: everything is designed to be simple from the first access.",
    businessStep3: "Operative immediately",
    businessStep3Desc: "Enjoy automatic subscription management, with the ability to customize offers and optimize revenue.",
    businessHowItWorksCta: "Contact us for more information",
    businessMarketingTitle: "Expand Your Visibility and Increase Customers with ABBS",
    businessMarketingText: "ABBS is not just a management system. It's a marketing platform that helps you reach new customers and promote your offers. Thousands of users search for services like yours every day. With ABBS, your business will be visible and ready to attract new subscribers.",
    businessMarketingPoint1: "Your services are shown to thousands of users looking for new opportunities.",
    businessMarketingPoint2: "Promote your offers in a targeted way for specific customer segments.",
    businessMarketingPoint3: "Offer exclusive packages and promotions to attract new members and retain existing ones.",
    businessMarketingCta: "Increase your visibility with ABBS",
    businessFaqTitle: "Have Questions? We Have Answers.",
    businessFaq1: "How can I integrate ABBS with my current system?",
    businessFaq1Answer: "ABBS offers a 30-day free trial. During the trial period, you can automatically import your data and test all features without modifying your existing workflows. The transition is simple, fast, and without manual entries: try ABBS, compare it, and decide with confidence.",
    businessFaq2: "How soon can I start seeing benefits?",
    businessFaq2Answer: "Very soon! With ABBS, you can start seeing benefits in just a few days: automatic import of your subscriptions and centralized data allow you to save time right away. Many of our customers notice a more fluid management and a reduction in costs within the first month.",
    businessFaq3: "How does ABBS help me sell more?",
    businessFaq3Answer: "Through our app, users discover new subscriptions in their area, receive personalized promotions, and receive intelligent notifications. You can create targeted offers, activate internal campaigns, and appear among recommended offers, increasing visibility and conversions naturally. It's like having a direct sales channel integrated into your routine potential customers.",
    businessFaq4: "Is it safe to share our subscription data?",
    businessFaq4Answer: "Your data security is our top priority. ABBS uses bank-level encryption, is GDPR-compliant, and does not store sensitive information like passwords or complete credit card details. You can read our privacy policy for all the details.",
    businessFaq5: "How long does the implementation take?",
    businessFaq5Answer: "The transfer of data to the ABBS management system takes 24-48 hours. Immediately after that, you can start using the platform: the interface is simple, intuitive, and fluid, designed to make you feel comfortable right from the first access. In just a few clicks, you have everything under control — without the need for technical training.",
    businessFaqPreCta: "Have other questions? We're here to help",
    businessFaqCta: "Contact us",
    businessContact: "Are you interested in ABBS Business? Fill out the form and we'll contact you as soon as possible.",
    businessContactName: "Full Name",
    businessContactNamePlaceholder: "Enter your full name",
    businessContactEmail: "Email",
    businessContactEmailPlaceholder: "Enter your email",
    businessContactAzienda: "Company",
    businessContactAziendaPlaceholder: "Name of your company",
    businessContactMessage: "Message",
    businessContactMessagePlaceholder: "How can we help you?",
    businessContactSubmit: "Send Message",

    

    businessFinalCtaTitle: "Don't wait any longer! Optimize your business with ABBS.",
    businessFinalCtaText: "Join the thousands of companies that are turning subscription management into a competitive advantage.",
    businessFinalCtaButton: "Start Now with ABBS",
    
    // Business page case studies
    'caseStudiesTitle': 'Platforms that revolutionized their industries',
    'airbnbName': 'Airbnb',
    'airbnbSubtitle': 'Revolution in the hospitality sector',
    'airbnbDesc': 'Airbnb transformed the hospitality market by creating a platform that directly connects hosts and travelers. With a subscription model for hosts, they democratized the industry by allowing anyone to monetize their spaces.',
    'spotifyName': 'Spotify',
    'spotifySubtitle': 'Reinvention of music',
    'spotifyDesc': 'Spotify revolutionized how we consume music, transforming a market of single purchases into a subscription model with unlimited access. They used user data to create personalized experiences and curated playlists.',
    'uberName': 'Uber',
    'uberSubtitle': 'Revolution of urban mobility',
    'uberDesc': 'Uber transformed the transportation sector by connecting passengers and drivers through a simple app. Its subscription model for drivers disrupted the traditional taxi industry, creating a new standard for on-demand mobility.',
    'users': 'Users',
    'activeUsers': 'Active users',
    'countries': 'Countries',
    'cities': 'Cities',
    'premiumSubscribers': 'Premium subscribers',
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