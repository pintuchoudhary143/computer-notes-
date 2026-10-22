export interface FullFormItem {
  abbr: string;
  fullForm: string;
  hindiMeaning: string;
  category: 'General' | 'Hardware' | 'Memory' | 'Networking' | 'Software' | 'Internet' | 'Legal';
}

export interface ShortcutItem {
  key: string;
  action: string;
  context: 'Windows' | 'MS Word' | 'MS PowerPoint' | 'General';
}

export interface TimelineEvent {
  year: string;
  event: string;
  significance: string;
}

export const fullFormsList: FullFormItem[] = [
  { abbr: 'CPU', fullForm: 'Central Processing Unit', hindiMeaning: 'केन्द्रीय संसाधन इकाई (कम्प्यूटर का दिमाग)', category: 'Hardware' },
  { abbr: 'ALU', fullForm: 'Arithmetic Logic Unit', hindiMeaning: 'अंकगणितीय व तार्किक इकाई', category: 'Hardware' },
  { abbr: 'CU', fullForm: 'Control Unit', hindiMeaning: 'नियंत्रण इकाई (कम्प्यूटर का तंत्रिका तंत्र)', category: 'Hardware' },
  { abbr: 'RAM', fullForm: 'Random Access Memory', hindiMeaning: 'रैंडम एक्सेस मेमोरी (अस्थाई / वोलेटाइल मुख्य स्मृति)', category: 'Memory' },
  { abbr: 'ROM', fullForm: 'Read Only Memory', hindiMeaning: 'रीड ओनली मेमोरी (स्थाई / नॉन-वोलेटाइल स्मृति)', category: 'Memory' },
  { abbr: 'PROM', fullForm: 'Programmable Read Only Memory', hindiMeaning: 'प्रोग्राम करने योग्य स्थाई स्मृति', category: 'Memory' },
  { abbr: 'EPROM', fullForm: 'Erasable Programmable Read Only Memory', hindiMeaning: 'पराबैंगनी किरणों (UV) द्वारा मिटाने योग्य स्मृति', category: 'Memory' },
  { abbr: 'EEPROM', fullForm: 'Electrically Erasable Programmable Read Only Memory', hindiMeaning: 'विद्युत तरंगों द्वारा मिटाने योग्य स्मृति', category: 'Memory' },
  { abbr: 'BIOS', fullForm: 'Basic Input Output System', hindiMeaning: 'कम्प्यूटर बूटिंग हेतु बेसिक इनपुट आउटपुट प्रोग्राम', category: 'Software' },
  { abbr: 'KB / MB / GB / TB', fullForm: 'Kilobyte / Megabyte / Gigabyte / Terabyte', hindiMeaning: 'मेमोरी मापन इकाइयाँ (क्रमशः 1024 गुणक)', category: 'Memory' },
  { abbr: 'PARAM', fullForm: 'Parallel Machine', hindiMeaning: 'सी-डैक (C-DAC) पुणे द्वारा निर्मित भारतीय सुपर कम्प्यूटर', category: 'General' },
  { abbr: 'C-DAC', fullForm: 'Centre for Development of Advanced Computing', hindiMeaning: 'उन्नत संगणन विकास केंद्र (पुणे)', category: 'General' },
  { abbr: 'ENIAC', fullForm: 'Electronic Numerical Integrator and Computer', hindiMeaning: 'प्रथम पीढ़ी का प्रथम पूर्ण इलेक्ट्रॉनिक कम्प्यूटर', category: 'General' },
  { abbr: 'EDVAC', fullForm: 'Electronic Discrete Variable Automatic Computer', hindiMeaning: 'प्रथम पीढ़ी का संग्रहित प्रोग्राम कम्प्यूटर', category: 'General' },
  { abbr: 'IC', fullForm: 'Integrated Circuit', hindiMeaning: 'एकीकृत परिपथ (तृतीय पीढ़ी का इलेक्ट्रॉनिक घटक)', category: 'Hardware' },
  { abbr: 'VLSI', fullForm: 'Very Large Scale Integration', hindiMeaning: 'चतुर्थ पीढ़ी में माइक्रोप्रोसेसर निर्माण की तकनीक', category: 'Hardware' },
  { abbr: 'ULSI', fullForm: 'Ultra Large Scale Integration', hindiMeaning: 'पंचम पीढ़ी में करोड़ों घटकों वाली माइक्रोचिप तकनीक', category: 'Hardware' },
  { abbr: 'AI', fullForm: 'Artificial Intelligence', hindiMeaning: 'कृत्रिम बुद्धिमत्ता (पंचम पीढ़ी का मुख्य आधार)', category: 'Software' },
  { abbr: 'VDU', fullForm: 'Visual Display Unit', hindiMeaning: 'दृश्य प्रदर्शन इकाई (मॉनिटर)', category: 'Hardware' },
  { abbr: 'CRT', fullForm: 'Cathode Ray Tube', hindiMeaning: 'कैथोड किरण नलिका युक्त मॉनिटर', category: 'Hardware' },
  { abbr: 'LCD', fullForm: 'Liquid Crystal Display', hindiMeaning: 'द्रव क्रिस्टल डिस्प्ले मॉनिटर', category: 'Hardware' },
  { abbr: 'FPD', fullForm: 'Flat Panel Display', hindiMeaning: 'सपाट पैनल डिस्प्ले (हल्के व पतले मॉनिटर)', category: 'Hardware' },
  { abbr: 'DMP', fullForm: 'Dot Matrix Printer', hindiMeaning: 'पिनों के मैट्रिक्स से बिंदु बनाकर छापने वाला इम्पैक्ट प्रिंटर', category: 'Hardware' },
  { abbr: 'CPS / LPM / DPI', fullForm: 'Characters Per Second / Lines Per Minute / Dots Per Inch', hindiMeaning: 'प्रिंटर की गति एवं प्रिंटिंग रिज़ॉल्यूशन मापक इकाइयाँ', category: 'Hardware' },
  { abbr: 'OFC', fullForm: 'Optical Fiber Cable', hindiMeaning: 'प्रकाशीय तंतु केबल (पूर्ण आंतरिक परावर्तन आधारित)', category: 'Networking' },
  { abbr: 'UTP / STP', fullForm: 'Unshielded / Shielded Twisted Pair', hindiMeaning: 'अनशील्डेड एवं शील्डेड ट्विस्टेड पेयर केबल', category: 'Networking' },
  { abbr: 'LAN', fullForm: 'Local Area Network', hindiMeaning: 'स्थानीय क्षेत्र नेटवर्क (सीमित भवन/कैंपस)', category: 'Networking' },
  { abbr: 'MAN', fullForm: 'Metropolitan Area Network', hindiMeaning: 'महानगरीय नेटवर्क (पूरे शहर में फैला नेटवर्क)', category: 'Networking' },
  { abbr: 'WAN', fullForm: 'Wide Area Network', hindiMeaning: 'विस्तृत क्षेत्र नेटवर्क (देश या विश्व भर में फैला)', category: 'Networking' },
  { abbr: 'NIC', fullForm: 'Network Interface Card', hindiMeaning: 'नेटवर्क इंटरफेस कार्ड (ईथरनेट कार्ड)', category: 'Networking' },
  { abbr: 'MODEM', fullForm: 'Modulator - Demodulator', hindiMeaning: 'एनालॉग व डिजिटल संकेतों का रूपांतरक', category: 'Networking' },
  { abbr: 'RJ-45', fullForm: 'Registered Jack 45', hindiMeaning: '8-पिन वाला नेटवर्क केबल कनेक्टर', category: 'Networking' },
  { abbr: 'WLAN', fullForm: 'Wireless Local Area Network', hindiMeaning: 'बेतार स्थानीय नेटवर्क', category: 'Networking' },
  { abbr: 'Wi-Fi', fullForm: 'Wireless Fidelity', hindiMeaning: 'वायरलेस फिडेलिटी (IEEE 802.11 मानक आधारित)', category: 'Networking' },
  { abbr: 'ARPANET', fullForm: 'Advanced Research Projects Agency Network', hindiMeaning: '1969 में अमेरिकी रक्षा विभाग द्वारा बना प्रथम नेटवर्क', category: 'Internet' },
  { abbr: 'WWW', fullForm: 'World Wide Web', hindiMeaning: 'विश्वव्यापी वेब (टिम बर्नर्स ली द्वारा 1989 में आविष्कृत)', category: 'Internet' },
  { abbr: 'W3C', fullForm: 'World Wide Web Consortium', hindiMeaning: 'वेब मानकों का निर्धारण करने वाली अंतर्राष्ट्रीय संस्था', category: 'Internet' },
  { abbr: 'HTTP / HTTPS', fullForm: 'HyperText Transfer Protocol (Secure)', hindiMeaning: 'वेब पेजों के आदान-प्रदान का मानक (सुरक्षित) प्रोटोकॉल', category: 'Internet' },
  { abbr: 'HTML', fullForm: 'HyperText Markup Language', hindiMeaning: 'वेब पेज निर्माण हेतु मार्कअप भाषा', category: 'Internet' },
  { abbr: 'URL', fullForm: 'Uniform Resource Locator', hindiMeaning: 'वेबसाइट का अद्वितीय वैश्विक वेब पता', category: 'Internet' },
  { abbr: 'IP', fullForm: 'Internet Protocol', hindiMeaning: 'इंटरनेट प्रोटोकॉल (संख्यात्मक कंप्यूटर पता)', category: 'Internet' },
  { abbr: 'DNS', fullForm: 'Domain Name System', hindiMeaning: 'डोमेन नाम को IP पते में अनुवाद करने वाला सिस्टम (वेब फोनबुक)', category: 'Internet' },
  { abbr: 'FTP', fullForm: 'File Transfer Protocol', hindiMeaning: 'फाइल स्थानांतरण प्रोटोकॉल', category: 'Internet' },
  { abbr: 'SMTP', fullForm: 'Simple Mail Transfer Protocol', hindiMeaning: 'ई-मेल भेजने हेतु प्रयुक्त प्रोटोकॉल', category: 'Internet' },
  { abbr: 'ISP', fullForm: 'Internet Service Provider', hindiMeaning: 'इंटरनेट सेवा प्रदाता कंपनी (जैसे BSNL, MTNL)', category: 'Internet' },
  { abbr: 'GUI', fullForm: 'Graphical User Interface', hindiMeaning: 'चित्र व आइकन आधारित यूजर इंटरफेस', category: 'Software' },
  { abbr: 'CAD', fullForm: 'Computer Aided Design', hindiMeaning: 'कंप्यूटर सहायतित डिजाइनिंग (इंजीनियरिंग व फैशन)', category: 'Software' },
  { abbr: 'CAE', fullForm: 'Computer Aided Engineering', hindiMeaning: 'कंप्यूटर सहायतित इंजीनियरिंग विश्लेषण', category: 'Software' },
  { abbr: 'DTP', fullForm: 'Desk Top Publishing', hindiMeaning: 'कंप्यूटर द्वारा आधुनिक पुस्तक प्रकाशन व मुद्रण', category: 'Software' },
  { abbr: 'CBT', fullForm: 'Computer Based Teaching', hindiMeaning: 'कंप्यूटर आधारित शिक्षण प्रणाली', category: 'Software' },
  { abbr: 'ATM', fullForm: 'Automatic Teller Machine', hindiMeaning: 'स्वचालित गणक मशीन (Any Time Money)', category: 'General' },
  { abbr: 'OTP', fullForm: 'One Time Password', hindiMeaning: 'एक बार उपयोग होने वाला सुरक्षित पासवर्ड', category: 'Internet' },
  { abbr: 'WIPO', fullForm: 'World Intellectual Property Organization', hindiMeaning: 'विश्व बौद्धिक सम्पदा संगठन (स्थापना 1967, जेनेवा)', category: 'Legal' },
  { abbr: 'WTO', fullForm: 'World Trade Organization', hindiMeaning: 'विश्व व्यापार संगठन (स्थापना 1995)', category: 'Legal' },
  { abbr: 'TRIPS', fullForm: 'Trade-Related Aspects of Intellectual Property Rights', hindiMeaning: 'बौद्धिक सम्पदा अधिकारों पर व्यापार संबंधी समझौता', category: 'Legal' },
  { abbr: 'IPR', fullForm: 'Intellectual Property Right', hindiMeaning: 'बौद्धिक सम्पदा का वैधानिक कानूनी अधिकार', category: 'Legal' },
  { abbr: 'OSS', fullForm: 'Open Source Software', hindiMeaning: 'मुक्त स्रोत सॉफ्टवेयर (खुले कोड वाला, जैसे Linux)', category: 'Software' }
];

export const shortcutsList: ShortcutItem[] = [
  { key: 'Ctrl + C', action: 'चयनित सामग्री की प्रतिलिपि बनाना (Copy)', context: 'General' },
  { key: 'Ctrl + X', action: 'चयनित सामग्री को काटकर क्लिपबोर्ड में लेना (Cut)', context: 'General' },
  { key: 'Ctrl + V', action: 'क्लिपबोर्ड से सामग्री चिपकाना (Paste)', context: 'General' },
  { key: 'Ctrl + Z', action: 'अंतिम किए गए कार्य को निरस्त करना (Undo)', context: 'General' },
  { key: 'Ctrl + Y', action: 'निरस्त कार्य को पुनः करना (Redo)', context: 'General' },
  { key: 'Ctrl + A', action: 'दस्तावेज की संपूर्ण सामग्री का चयन करना (Select All)', context: 'General' },
  { key: 'Ctrl + N', action: 'नया दस्तावेज / फाइल खोलना (New File)', context: 'MS Word' },
  { key: 'Ctrl + S', action: 'दस्तावेज को सुरक्षित / भंडारित करना (Save File)', context: 'MS Word' },
  { key: 'Ctrl + P', action: 'दस्तावेज का प्रिंट डायलॉग बॉक्स खोलना (Print)', context: 'MS Word' },
  { key: 'Ctrl + F', action: 'दस्तावेज में किसी शब्द को खोजना (Find)', context: 'MS Word' },
  { key: 'Ctrl + H', action: 'शब्द को किसी अन्य शब्द से बदलना (Replace)', context: 'MS Word' },
  { key: 'Ctrl + B', action: 'अक्षरों को गहरा / मोटा करना (Bold)', context: 'MS Word' },
  { key: 'Ctrl + I', action: 'अक्षरों को तिरछा करना (Italic)', context: 'MS Word' },
  { key: 'Ctrl + U', action: 'अक्षरों के नीचे रेखा खींचना (Underline)', context: 'MS Word' },
  { key: 'Ctrl + L', action: 'टेक्स्ट को बायीं ओर संरेखित करना (Left Align)', context: 'MS Word' },
  { key: 'Ctrl + R', action: 'टेक्स्ट को दायीं ओर संरेखित करना (Right Align)', context: 'MS Word' },
  { key: 'Ctrl + E', action: 'टेक्स्ट को केंद्र में संरेखित करना (Center Align)', context: 'MS Word' },
  { key: 'Ctrl + J', action: 'टेक्स्ट को दोनों तरफ बराबर फैलाना (Justify)', context: 'MS Word' },
  { key: 'Alt + Ctrl + C', action: 'कॉपीराइट प्रतीक © प्रविष्ट करना (Copyright Symbol)', context: 'MS Word' },
  { key: 'F5', action: 'पावरप्वाइंट में स्लाइड शो शुरू करना (Start Slide Show)', context: 'MS PowerPoint' },
  { key: 'Esc', action: 'चल रहे स्लाइड शो अथवा डायलॉग बॉक्स को रद्द/बंद करना', context: 'MS PowerPoint' },
  { key: 'F1', action: 'हेल्प (Help) सहायता विंडो खोलना', context: 'Windows' },
  { key: 'F2', action: 'चयनित फाइल या फोल्डर का नाम बदलना (Rename)', context: 'Windows' },
  { key: 'Alt + F4', action: 'सक्रिय विण्डो या प्रोग्राम को बंद करना / शटडाउन', context: 'Windows' },
  { key: 'Win + D', action: 'सीधे डेस्कटॉप पर पहुँचना (Show Desktop)', context: 'Windows' },
  { key: 'Print Screen', action: 'संपूर्ण मॉनीटर स्क्रीन का स्नैपशॉट कॉपी करना', context: 'Windows' }
];

export const timelineEvents: TimelineEvent[] = [
  { year: '1942', event: 'प्रथम पीढ़ी के कंप्यूटरों (ENIAC/EDVAC) की शुरुआत', significance: 'वैक्यूम ट्यूब तकनीक एवं मशीनी भाषा का प्रयोग' },
  { year: '1947', event: 'बेल लेबोरेटरीज में ट्रांजिस्टर का आविष्कार', significance: 'द्वितीय पीढ़ी का आधार; कंप्यूटरों के आकार व ताप में भारी कमी' },
  { year: '1958-1964', event: 'एकीकृत परिपथ (IC चिप) का आविष्कार', significance: 'तृतीय पीढ़ी की शुरुआत, सिलिकॉन चिप पर हजारों ट्रांजिस्टर' },
  { year: '1967', event: 'WIPO (विश्व बौद्धिक सम्पदा संगठन) की स्थापना', significance: 'जेनेवा में संयुक्त राष्ट्र संघ द्वारा वैश्विक IPR संरक्षण' },
  { year: '1969', event: 'अमेरिकी रक्षा विभाग द्वारा ARPANET की स्थापना', significance: 'आधुनिक इंटरनेट का प्रारंभिक उद्भव' },
  { year: '1970', event: 'इंटेल द्वारा प्रथम माइक्रोप्रोसेसर "Intel 4004" का निर्माण', significance: 'चतुर्थ पीढ़ी व पर्सनल कंप्यूटर (PC) क्रांति का सूत्रपात' },
  { year: '1980 के दशक', event: 'अमेरिका द्वारा भारत को Cray X-MP सुपरकंप्यूटर देने पर प्रतिबंध', significance: 'भारत के वैज्ञानिकों ने स्वदेशी तकनीक को चुनौती के रूप में स्वीकारा' },
  { year: '1989', event: 'टिम बर्नर्स-ली द्वारा वर्ल्ड वाइड वेब (WWW) का आविष्कार', significance: 'CERN में हाइपरटेक्स्ट व इंटरनेट संचार का क्रांतिकारी युग' },
  { year: '1990 (20 Dec)', event: 'दुनिया की पहली वेबसाइट ऑनलाइन हुई', significance: 'टिम बर्नर्स-ली द्वारा पहली बार वेब पेज होस्ट किया गया' },
  { year: '1991 (6 Aug)', event: 'WWW वेबसाइट को पूरी दुनिया के लिए सार्वजनिक किया गया', significance: 'वैश्विक इंटरनेट व वेब ब्राउजिंग युग की शुरुआत' },
  { year: '1991', event: 'C-DAC पुणे द्वारा भारत का पहला सुपरकंप्यूटर "परम" (PARAM) विकसित', significance: 'भारत वैश्विक सुपरकंप्यूटिंग क्लब का सदस्य बना' },
  { year: '1995', event: 'विश्व व्यापार संगठन (WTO) एवं TRIPS समझौते की शुरुआत', significance: 'बौद्धिक सम्पदा अधिकारों का अंतर्राष्ट्रीय मानकीकरण' },
  { year: '2000', event: 'भारत में सूचना प्रौद्योगिकी अधिनियम (IT Act 2000) पारित', significance: 'साइबर अपराधों व डिजिटल लेन-देन का कानूनी ढांचा' },
  { year: '2002', event: 'जैविक विविधता अधिनियम, 2002', significance: 'भारत में पारंपरिक ज्ञान व जैविक संपदा का विधिक संरक्षण' },
  { year: '2015', event: 'डिजिटल इंडिया कार्यक्रम की औपचारिक शुरुआत', significance: 'भारत को डिजिटल सशक्त ज्ञान अर्थव्यवस्था में बदलने की 9-स्तंभ योजना' }
];

export const indianIPRActs = [
  { no: 1, act: 'The Biological Diversity Act, 2002', hindi: 'जैविक विविधता अधिनियम, 2002', scope: 'पारंपरिक जैविक संसाधनों व जैव-विविधता का संरक्षण' },
  { no: 2, act: 'The Copyright Act, 1957', hindi: 'कॉपीराइट अधिनियम, 1957', scope: 'साहित्यिक, संगीत, नाट्य, कलात्मक कृतियों व सॉफ्टवेयर का संरक्षण' },
  { no: 3, act: 'The Design Act, 2000', hindi: 'डिजाइन अधिनियम, 2000', scope: 'औद्योगिक डिजाइनों, वस्तुओं के नए आकार व अलंकरण का संरक्षण' },
  { no: 4, act: 'The Geographical Indications of Goods Act, 1999', hindi: 'वस्तुओं का भौगोलिक उपदर्शन (GI) अधिनियम, 1999', scope: 'विशिष्ट भौगोलिक क्षेत्र से उत्पन्न प्रसिद्ध उत्पादों का संरक्षण' },
  { no: 5, act: 'The Patents Act, 1970', hindi: 'पेटेंट अधिनियम, 1970', scope: 'नवीन वैज्ञानिक व औद्योगिक आविष्कारों पर 20 वर्ष का एकाधिकार' },
  { no: 6, act: 'Protection of Plant Varieties & Farmers\' Rights Act, 2001', hindi: 'पादप किस्म और कृषक अधिकार संरक्षण अधिनियम, 2001', scope: 'कृषकों के अधिकारों एवं पौधों की नई किस्मों का संरक्षण' },
  { no: 7, act: 'Semiconductor Integrated Circuits Layout-Design Act, 2000', hindi: 'अर्धचालक एकीकृत परिपथ ले-आउट डिजाइन अधिनियम, 2000', scope: 'माइक्रोचिप व सेमीकंडक्टर आईसी के त्रि-आयामी लेआउट का संरक्षण' },
  { no: 8, act: 'The Trade Marks Act, 1999', hindi: 'ट्रेड मार्क्स अधिनियम, 1999', scope: 'व्यापारिक प्रतीकों, लोगो, ब्रांड नाम व विशिष्ट चिह्नों का संरक्षण' }
];
