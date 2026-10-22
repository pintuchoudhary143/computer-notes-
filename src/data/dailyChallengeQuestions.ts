export interface DailyChallengeItem {
  id: string;
  chapterId: number;
  chapterNumber: number;
  chapterTitleHindi: string;
  chapterTitleEnglish: string;
  unitHindi: string;
  question: string;
  options: { [key: string]: string };
  correctOption: string;
  explanation: string;
  memoryAnchor: string;
  difficulty: 'सरल (Basic)' | 'मध्यम (Moderate)' | 'उन्नत (Advanced)';
  examFrequency: 'अति-महत्वपूर्ण (Board 2026)' | 'मॉडल प्रश्न' | 'बुनियादी संकल्पना';
}

export const dailyChallengeQuestions: DailyChallengeItem[] = [
  // --- Chapter 1: Introduction to Computer ---
  {
    id: 'ch1-q1',
    chapterId: 1,
    chapterNumber: 1,
    chapterTitleHindi: 'कम्प्यूटर का परिचय',
    chapterTitleEnglish: 'Introduction to Computer',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'भारत में निर्मित प्रथम स्वदेशी सुपर कम्प्यूटर का नाम क्या है?',
    options: {
      'अ': 'सिद्धार्थ (Siddhartha)',
      'ब': 'परम (PARAM 8000)',
      'स': 'क्रे (CRAY X-MP)',
      'द': 'अनुपम (Anupam)'
    },
    correctOption: 'ब',
    explanation: 'भारत का पहला स्वदेशी सुपर कम्प्यूटर "PARAM 8000" था, जिसे 1991 में C-DAC (पुणे) में डॉ. विजय भटकर के नेतृत्व में विकसित किया गया था।',
    memoryAnchor: 'स्मृति सूत्र: C-DAC + 1991 + डॉ. भटकर = परम (PARAM)। यह मौसम अनुसंधान व रक्षा हेतु बना था।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch1-q2',
    chapterId: 1,
    chapterNumber: 1,
    chapterTitleHindi: 'कम्प्यूटर का परिचय',
    chapterTitleEnglish: 'Introduction to Computer',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'भौतिक राशियों जैसे ताप, दाब, द्रव प्रवाह आदि को मापने हेतु किस कम्प्यूटर का उपयोग होता है?',
    options: {
      'अ': 'डिजिटल कम्प्यूटर',
      'ब': 'एनालॉग कम्प्यूटर',
      'स': 'सुपर कम्प्यूटर',
      'द': 'माइक्रो कम्प्यूटर'
    },
    correctOption: 'ब',
    explanation: 'एनालॉग कम्प्यूटर सतत (continuous) भौतिक राशियों को इनपुट के रूप में ग्रहण कर मापन करते हैं; जैसे स्पीडोमीटर, थर्मामीटर व पेट्रोल पंप मीटर।',
    memoryAnchor: 'स्मृति सूत्र: सतत भौतिक संकेत = एनालॉग (Analog), असतत 0 व 1 = डिजिटल (Digital)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'मॉडल प्रश्न'
  },
  {
    id: 'ch1-q3',
    chapterId: 1,
    chapterNumber: 1,
    chapterTitleHindi: 'कम्प्यूटर का परिचय',
    chapterTitleEnglish: 'Introduction to Computer',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'कम्प्यूटर की तार्किक एवं अंकगणितीय गणनाएँ किसके द्वारा निष्पादित की जाती हैं?',
    options: {
      'अ': 'कन्ट्रोल यूनिट (CU)',
      'ब': 'रजिस्टर (Register)',
      'स': 'अरथमेटिक लॉजिक यूनिट (ALU)',
      'द': 'मॉनिटर (Monitor)'
    },
    correctOption: 'स',
    explanation: 'ALU (Arithmetic Logic Unit) समस्त जोड़, घटाव, गुणा, भाग तथा तुलनात्मक (तार्किक) निर्णय लेने का कार्य करता है।',
    memoryAnchor: 'स्मृति सूत्र: गणित + तुलना = ALU। जबकि समस्त समन्वय व नियंत्रण = CU (Control Unit)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch1-q4',
    chapterId: 1,
    chapterNumber: 1,
    chapterTitleHindi: 'कम्प्यूटर का परिचय',
    chapterTitleEnglish: 'Introduction to Computer',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'चिकित्सा के आईसीयू (ICU) एवं ईसीजी (ECG) में किस प्रकार के कम्प्यूटर का प्रयोग किया जाता है?',
    options: {
      'अ': 'हाइब्रिड कम्प्यूटर (Hybrid Computer)',
      'ब': 'एनालॉग कम्प्यूटर',
      'स': 'मेनफ्रेम कम्प्यूटर',
      'द': 'मिनी कम्प्यूटर'
    },
    correctOption: 'अ',
    explanation: 'हाइब्रिड कम्प्यूटर में एनालॉग व डिजिटल दोनों के गुण होते हैं। यह मरीज की धड़कन व तापमान (एनालॉग) लेकर स्क्रीन पर अंकों में (डिजिटल) प्रदर्शित करता है।',
    memoryAnchor: 'स्मृति सूत्र: एनालॉग + डिजिटल = हाइब्रिड (उदा. ICU, मौसम विज्ञान उपग्रह)।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },

  // --- Chapter 2: Computer System & Hardware ---
  {
    id: 'ch2-q1',
    chapterId: 2,
    chapterNumber: 2,
    chapterTitleHindi: 'कम्प्यूटर सिस्टम',
    chapterTitleEnglish: 'Computer System',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'मानक 3.5 इंच माइक्रो फ्लॉपी डिस्क (Floppy Disk) की संग्रहण क्षमता कितनी होती है?',
    options: {
      'अ': '1.2 MB',
      'ब': '650 MB',
      'स': '1.44 MB',
      'द': '4.7 GB'
    },
    correctOption: 'स',
    explanation: 'मानक 3.5 इंच की माइक्रो फ्लॉपी डिस्क की सामान्य संग्रहण क्षमता 1.44 MB होती है।',
    memoryAnchor: 'स्मृति सूत्र: 3.5 इंच = 1.44 MB, 5.25 इंच = 1.2 MB, CD = 700 MB, DVD = 4.7 GB।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch2-q2',
    chapterId: 2,
    chapterNumber: 2,
    chapterTitleHindi: 'कम्प्यूटर सिस्टम',
    chapterTitleEnglish: 'Computer System',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'लेज़र प्रिंटर (Laser Printer) में छपाई हेतु किस स्याही का उपयोग होता है?',
    options: {
      'अ': 'गीली द्रव स्याही (Liquid Ink Cartridge)',
      'ब': 'सूखा स्याही पाउडर जिसे टोनर (Toner) कहते हैं',
      'स': 'स्याही युक्त कपड़ा रिबन (Fabric Ribbon)',
      'द': 'रासायनिक वैक्स पाउडर'
    },
    correctOption: 'ब',
    explanation: 'लेज़र प्रिंटर में फोटोकॉपियर की तरह इलेक्ट्रोस्टैटिक तकनीक से सूखा बारीक काला स्याही पाउडर काम आता है जिसे टोनर (Toner) कहा जाता है।',
    memoryAnchor: 'स्मृति सूत्र: लेज़र प्रिंटर = टोनर (सूखा पाउडर), इंकजेट = कार्ट्रिज (द्रव), डॉट मैट्रिक्स = रिबन।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch2-q3',
    chapterId: 2,
    chapterNumber: 2,
    chapterTitleHindi: 'कम्प्यूटर सिस्टम',
    chapterTitleEnglish: 'Computer System',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'कम्प्यूटर मॉनीटर की स्क्रीन पर दिखने वाले सबसे छोटे रंगीन बिंदु (Dot) को क्या कहते हैं?',
    options: {
      'अ': 'पिक्सेल (Pixel)',
      'ब': 'बिट (Bit)',
      'स': 'रेजोल्यूशन (Resolution)',
      'द': 'डीपीआई (DPI)'
    },
    correctOption: 'अ',
    explanation: 'Pixel का पूरा नाम "Picture Element" है। मॉनिटर की डिस्प्ले स्क्रीन हजारों-लाखों छोटे पिक्सल्स से मिलकर बनती है।',
    memoryAnchor: 'स्मृति सूत्र: Picture + Element = Pixel (स्क्रीन की सबसे छोटी इकाई)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'मॉडल प्रश्न'
  },
  {
    id: 'ch2-q4',
    chapterId: 2,
    chapterNumber: 2,
    chapterTitleHindi: 'कम्प्यूटर सिस्टम',
    chapterTitleEnglish: 'Computer System',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'कागज पर मुद्रित बारकोड (बार व रिक्त स्थानों) को पढ़ने के लिए किसका प्रयोग किया जाता है?',
    options: {
      'अ': 'OMR रीडर',
      'ब': 'MICR रीडर',
      'स': 'BCR (बारकोड रीडर)',
      'द': 'OCR स्कैनर'
    },
    correctOption: 'स',
    explanation: 'BCR (Barcode Reader) लेज़र बीम द्वारा उत्पादों पर छपे यूनिवर्सल प्रोडक्ट कोड (UPC) बारकोड को डिकोड करता है।',
    memoryAnchor: 'स्मृति सूत्र: उत्पाद बारकोड = BCR, बहुविकल्पी उत्तर पुस्तिका = OMR, बैंक चेक = MICR।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'बुनियादी संकल्पना'
  },

  // --- Chapter 3: Computer Organization & Memory ---
  {
    id: 'ch3-q1',
    chapterId: 3,
    chapterNumber: 3,
    chapterTitleHindi: 'कम्प्यूटर का संगठन',
    chapterTitleEnglish: 'Computer Organization',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'RAM और ROM में क्या मौलिक अंतर है?',
    options: {
      'अ': 'RAM स्थायी है जबकि ROM अस्थायी है',
      'ब': 'RAM अस्थाई (Volatile) है जबकि ROM स्थाई (Non-Volatile) है',
      'स': 'दोनों में कोई अंतर नहीं है',
      'द': 'ROM में डाटा मिटाया जा सकता है, RAM में नहीं'
    },
    correctOption: 'ब',
    explanation: 'RAM (Random Access Memory) में बिजली जाते ही डाटा मिट जाता है (Volatile), जबकि ROM (Read Only Memory) में डाटा हमेशा सुरक्षित रहता है (Non-Volatile)।',
    memoryAnchor: 'स्मृति सूत्र: RAM = उड़ने वाली (Volatile - बिजली गई तो डाटा गया), ROM = पक्की (Non-Volatile - BIOS सुरक्षित)।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch3-q2',
    chapterId: 3,
    chapterNumber: 3,
    chapterTitleHindi: 'कम्प्यूटर का संगठन',
    chapterTitleEnglish: 'Computer Organization',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: '1 किलोबाइट (1 KB) में कुल कितने बाइट्स होते हैं?',
    options: {
      'अ': '1000 बाइट्स',
      'ब': '1024 बाइट्स',
      'स': '1048576 बाइट्स',
      'द': '8 बाइट्स'
    },
    correctOption: 'ब',
    explanation: 'कम्प्यूटर में बाइनरी प्रणाली (2 की घात 10 = 1024) प्रयुक्त होती है, अतः 1 KB = 1024 Bytes होता है।',
    memoryAnchor: 'स्मृति सूत्र: 8 Bits = 1 Byte, 1024 Bytes = 1 KB, 1024 KB = 1 MB, 1024 MB = 1 GB।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch3-q3',
    chapterId: 3,
    chapterNumber: 3,
    chapterTitleHindi: 'कम्प्यूटर का संगठन',
    chapterTitleEnglish: 'Computer Organization',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: 'CPU और मुख्य मेमोरी (RAM) के मध्य गति-असंतुलन दूर करने वाली अति-तीव्र मेमोरी कौन-सी है?',
    options: {
      'अ': 'हार्ड डिस्क',
      'ब': 'कैश मेमोरी (Cache Memory)',
      'स': 'वर्चुअल मेमोरी',
      'द': 'पेन ड्राइव'
    },
    correctOption: 'ब',
    explanation: 'कैश मेमोरी (Cache Memory) CPU और RAM के बीच बफर का काम करती है। यह अत्यंत तीव्र सेमीकंडक्टर मेमोरी है जो बार-बार प्रयुक्त निर्देशों को संचित रखती है।',
    memoryAnchor: 'स्मृति सूत्र: CPU और RAM के बीच का सुपरफास्ट पुल = कैश मेमोरी (Cache Memory)।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch3-q4',
    chapterId: 3,
    chapterNumber: 3,
    chapterTitleHindi: 'कम्प्यूटर का संगठन',
    chapterTitleEnglish: 'Computer Organization',
    unitHindi: 'इकाई 1: कम्प्यूटर की मूलभूत बातें',
    question: '4 बिट्स (Bits) के समूह को किस नाम से जाना जाता है?',
    options: {
      'अ': 'बाइट (Byte)',
      'ब': 'निब्बल (Nibble)',
      'स': 'वर्ड (Word)',
      'द': 'ब्लॉक (Block)'
    },
    correctOption: 'ब',
    explanation: '4 बिट्स = 1 निब्बल (Nibble) तथा 8 बिट्स = 1 बाइट (Byte) होता है। अर्थात आधा बाइट = एक निब्बल।',
    memoryAnchor: 'स्मृति सूत्र: 4 Bits = 1 Nibble (आधा बाइट), 8 Bits = 1 Byte।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'मॉडल प्रश्न'
  },

  // --- Chapter 4: Operating System ---
  {
    id: 'ch4-q1',
    chapterId: 4,
    chapterNumber: 4,
    chapterTitleHindi: 'ऑपरेटिंग सिस्टम',
    chapterTitleEnglish: 'Operating System',
    unitHindi: 'इकाई 2: ऑपरेटिंग सिस्टम व सॉफ्टवेयर',
    question: 'कम्प्यूटर चालू (Power On) होने पर ROM से ऑपरेटिंग सिस्टम को RAM में लोड करने की प्रक्रिया क्या कहलाती है?',
    options: {
      'अ': 'कम्पाइलिंग (Compiling)',
      'ब': 'बूटिंग (Booting)',
      'स': 'सॉर्टिंग (Sorting)',
      'द': 'पेजिंग (Paging)'
    },
    correctOption: 'ब',
    explanation: 'बूटिंग (Booting) वह स्वतः प्रक्रिया है जिसमें BIOS हार्डवेयर जांच (POST) के पश्चात ऑपरेटिंग सिस्टम को मुख्य मेमोरी में लोड करता है।',
    memoryAnchor: 'स्मृति सूत्र: Start = Booting। बंद कम्प्यूटर चालू करना = Cold Boot, रीस्टार्ट करना = Warm Boot।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch4-q2',
    chapterId: 4,
    chapterNumber: 4,
    chapterTitleHindi: 'ऑपरेटिंग सिस्टम',
    chapterTitleEnglish: 'Operating System',
    unitHindi: 'इकाई 2: ऑपरेटिंग सिस्टम व सॉफ्टवेयर',
    question: 'GUI का पूरा नाम (Full Form) क्या है?',
    options: {
      'अ': 'General User Interface',
      'ब': 'Graphical User Interface',
      'स': 'Guided Utility Interface',
      'द': 'Graphic Universal Instruction'
    },
    correctOption: 'ब',
    explanation: 'GUI का अर्थ है "Graphical User Interface"। इसमें प्रयोक्ता माउस द्वारा आइकनों, मेन्यू व विंडोज पर क्लिक करके सरलता से कार्य करता है (जैसे MS Windows)।',
    memoryAnchor: 'स्मृति सूत्र: CUI = केवल लिखकर कमांड देना (MS-DOS), GUI = ग्राफिक्स व आइकन से चलाना (Windows)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch4-q3',
    chapterId: 4,
    chapterNumber: 4,
    chapterTitleHindi: 'ऑपरेटिंग सिस्टम',
    chapterTitleEnglish: 'Operating System',
    unitHindi: 'इकाई 2: ऑपरेटिंग सिस्टम व सॉफ्टवेयर',
    question: 'लिनक्स (Linux) ऑपरेटिंग सिस्टम के जन्मदाता / निर्माता कौन हैं?',
    options: {
      'अ': 'बिल गेट्स (Bill Gates)',
      'ब': 'लिनस टोरवाल्ड्स (Linus Torvalds)',
      'स': 'स्टीव जॉब्स (Steve Jobs)',
      'द': 'चार्ल्स बैबेज (Charles Babbage)'
    },
    correctOption: 'ब',
    explanation: 'लिनक्स को फिनलैंड के छात्र लिनस टोरवाल्ड्स (Linus Torvalds) ने 1991 में विकसित किया था। यह एक ओपन सोर्स व मुफ्त ऑपरेटिंग सिस्टम है।',
    memoryAnchor: 'स्मृति सूत्र: Linux = Linus Torvalds (1991)। यह बहु-उपयोगकर्ता (Multi-User) सुरक्षित OS है।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'मॉडल प्रश्न'
  },

  // --- Chapter 5: Computer Communication and Network ---
  {
    id: 'ch5-q1',
    chapterId: 5,
    chapterNumber: 5,
    chapterTitleHindi: 'कम्प्यूटर संचार एवं नेटवर्क',
    chapterTitleEnglish: 'Computer Communication and Network',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'किसी एक भवन या विद्यालय परिसर तक सीमित नेटवर्क को क्या कहते हैं?',
    options: {
      'अ': 'WAN (Wide Area Network)',
      'ब': 'MAN (Metropolitan Area Network)',
      'स': 'LAN (Local Area Network)',
      'द': 'PAN (Personal Area Network)'
    },
    correctOption: 'स',
    explanation: 'LAN (Local Area Network) का दायरा 1 किमी तक (एक कमरे, भवन या स्कूल कैंपस) सीमित होता है। इसमें डेटा स्थानांतरण गति बहुत तीव्र होती है।',
    memoryAnchor: 'स्मृति सूत्र: LAN = एक कमरा/स्कूल (Local), MAN = पूरा शहर (Metropolitan), WAN = पूरी दुनिया (Wide/Internet)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch5-q2',
    chapterId: 5,
    chapterNumber: 5,
    chapterTitleHindi: 'कम्प्यूटर संचार एवं नेटवर्क',
    chapterTitleEnglish: 'Computer Communication and Network',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'स्टार टोपोलॉजी (Star Topology) में सभी कम्प्यूटर किस केंद्रीय उपकरण से जुड़े होते हैं?',
    options: {
      'अ': 'टर्मिनेटर (Terminator)',
      'ब': 'हब (Hub) या स्विच (Switch)',
      'स': 'एकल बैकबोन केबल',
      'द': 'रिपीटर (Repeater)'
    },
    correctOption: 'ब',
    explanation: 'स्टार टोपोलॉजी में सभी नोड्स एक सेंट्रल हब (Hub) या स्विच से जुड़े रहते हैं। यदि एक नोड खराब हो तो पूरा नेटवर्क बंद नहीं होता।',
    memoryAnchor: 'स्मृति सूत्र: स्टार = बीच में हब/स्विच और चारों ओर तारे की तरह फैले कम्प्यूटर।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch5-q3',
    chapterId: 5,
    chapterNumber: 5,
    chapterTitleHindi: 'कम्प्यूटर संचार एवं नेटवर्क',
    chapterTitleEnglish: 'Computer Communication and Network',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'प्रकाश संकेतों (Light Pulses) के रूप में पूर्ण आंतरिक परावर्तन द्वारा डाटा संचरण करने वाला माध्यम कौन-सा है?',
    options: {
      'अ': 'ट्विस्टेड पेयर केबल',
      'ब': 'को-एक्सियल केबल',
      'स': 'ऑप्टिकल फाइबर केबल (OFC)',
      'द': 'रेडियो तरंगें'
    },
    correctOption: 'स',
    explanation: 'ऑप्टिकल फाइबर केबल (OFC) कांच या प्लास्टिक के बारीक रेशों से बनती है। इसमें प्रकाश गति से डाटा जाता है और विद्युत-चुंबकीय व्यवधान नहीं होता।',
    memoryAnchor: 'स्मृति सूत्र: कांच के रेशे + प्रकाश गति + Total Internal Reflection = ऑप्टिकल फाइबर (OFC)।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch5-q4',
    chapterId: 5,
    chapterNumber: 5,
    chapterTitleHindi: 'कम्प्यूटर संचार एवं नेटवर्क',
    chapterTitleEnglish: 'Computer Communication and Network',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'एनालॉग सिग्नल को डिजिटल में और डिजिटल को एनालॉग में बदलने वाले उपकरण का नाम क्या है?',
    options: {
      'अ': 'राउटर (Router)',
      'ब': 'मॉडेम (Modem)',
      'स': 'ब्रिज (Bridge)',
      'द': 'गेटवे (Gateway)'
    },
    correctOption: 'ब',
    explanation: 'Modem का पूरा नाम Modulator-Demodulator है। यह टेलीफोन लाइन के एनालॉग संकेतों को कम्प्यूटर के डिजिटल रूप में बदलता है।',
    memoryAnchor: 'स्मृति सूत्र: MOdulation + DEModulation = MODEM।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'मॉडल प्रश्न'
  },

  // --- Chapter 6: Internet & Its Services ---
  {
    id: 'ch6-q1',
    chapterId: 6,
    chapterNumber: 6,
    chapterTitleHindi: 'इंटरनेट एवं इसकी सेवाएँ',
    chapterTitleEnglish: 'Internet and its Services',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'इंटरनेट का जनक / पितामह (Father of the Internet) किसे कहा जाता है?',
    options: {
      'अ': 'टिम बर्नर्स ली (Tim Berners-Lee)',
      'ब': 'विंट सेर्फ़ (Vint Cerf)',
      'स': 'मार्क जुकरबर्ग (Mark Zuckerberg)',
      'द': 'चार्ल्स बैबेज (Charles Babbage)'
    },
    correctOption: 'ब',
    explanation: 'विंट सेर्फ़ (Vinton G. Cerf) और बॉब कान ने TCP/IP प्रोटोकॉल बनाया, इसलिए विंट सेर्फ़ को इंटरनेट का पिता कहा जाता है। (जबकि WWW के जनक टिम बर्नर्स ली हैं)।',
    memoryAnchor: 'स्मृति सूत्र: Internet के जनक = Vint Cerf, WWW के जनक = Tim Berners-Lee।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch6-q2',
    chapterId: 6,
    chapterNumber: 6,
    chapterTitleHindi: 'इंटरनेट एवं इसकी सेवाएँ',
    chapterTitleEnglish: 'Internet and its Services',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'किसी वेबसाइट के मुख्य अथवा प्रथम पृष्ठ को क्या कहा जाता है?',
    options: {
      'अ': 'मास्टर पेज (Master Page)',
      'ब': 'होम पेज (Home Page)',
      'स': 'सर्च पेज (Search Page)',
      'द': 'इंडेक्स कोड (Index Code)'
    },
    correctOption: 'ब',
    explanation: 'किसी भी वेबसाइट का मुख्य प्रारंभिक पृष्ठ "होम पेज" (Home Page) कहलाता है, जिससे अन्य वेबपेजों के हाइपरलिंक जुड़े होते हैं।',
    memoryAnchor: 'स्मृति सूत्र: वेबसाइट का प्रवेश द्वार = होम पेज (Home Page)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'मॉडल प्रश्न'
  },
  {
    id: 'ch6-q3',
    chapterId: 6,
    chapterNumber: 6,
    chapterTitleHindi: 'इंटरनेट एवं इसकी सेवाएँ',
    chapterTitleEnglish: 'Internet and its Services',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'ईमेल में "BCC" का पूर्ण रूप क्या होता है?',
    options: {
      'अ': 'Blind Carbon Copy',
      'ब': 'Basic Common Copy',
      'स': 'Business Communication Code',
      'द': 'Broadband Client Channel'
    },
    correctOption: 'अ',
    explanation: 'BCC का अर्थ "Blind Carbon Copy" है। इसमें जोड़े गए ईमेल पते अन्य प्राप्तकर्ताओं को दिखाई नहीं देते, जिससे गोपनीयता बनी रहती है।',
    memoryAnchor: 'स्मृति सूत्र: CC = सबको दिखेगा, BCC = Blind (छुपा रहेगा, किसी को नहीं दिखेगा)।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch6-q4',
    chapterId: 6,
    chapterNumber: 6,
    chapterTitleHindi: 'इंटरनेट एवं इसकी सेवाएँ',
    chapterTitleEnglish: 'Internet and its Services',
    unitHindi: 'इकाई 3: संचार एवं इंटरनेट',
    question: 'इंटरनेट पर फाइल को सर्वर से अपने स्थानीय कम्प्यूटर में लाने की प्रक्रिया क्या कहलाती है?',
    options: {
      'अ': 'अपलोडिंग (Uploading)',
      'ब': 'डाउनलोडिंग (Downloading)',
      'स': 'ब्राउजिंग (Browsing)',
      'द': 'सर्वर होस्टिंग'
    },
    correctOption: 'ब',
    explanation: 'रिमोट सर्वर से फाइल स्थानीय पीसी में लाना = डाउनलोडिंग (Downloading); स्थानीय पीसी से सर्वर पर भेजना = अपलोडिंग (Uploading)।',
    memoryAnchor: 'स्मृति सूत्र: Down = नीचे अपने कम्प्यूटर में लाना; Up = ऊपर इंटरनेट सर्वर पर भेजना।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'बुनियादी संकल्पना'
  },

  // --- Chapter 7: Applications of IT ---
  {
    id: 'ch7-q1',
    chapterId: 7,
    chapterNumber: 7,
    chapterTitleHindi: 'सूचना प्रौद्योगिकी के अनुप्रयोग',
    chapterTitleEnglish: 'Applications of IT',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'ई-शासन (E-Governance) के अंतर्गत नागरिक से नागरिक मॉडल का संक्षिप्त रूप क्या है?',
    options: {
      'अ': 'G2C',
      'ब': 'B2B',
      'स': 'C2C',
      'द': 'G2G'
    },
    correctOption: 'स',
    explanation: 'C2C (Citizen to Citizen / Consumer to Consumer) में एक नागरिक सीधे दूसरे नागरिक से संपर्क या क्रय-विक्रय करता है (जैसे OLX या Quikr)।',
    memoryAnchor: 'स्मृति सूत्र: G2C = सरकार से नागरिक, B2C = व्यवसाय से ग्राहक, C2C = ग्राहक से ग्राहक।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch7-q2',
    chapterId: 7,
    chapterNumber: 7,
    chapterTitleHindi: 'सूचना प्रौद्योगिकी के अनुप्रयोग',
    chapterTitleEnglish: 'Applications of IT',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'राजस्थान में ई-मित्र (E-Mitra) परियोजना का मुख्य उद्देश्य क्या है?',
    options: {
      'अ': 'केवल खेल प्रतियोगिताएँ आयोजित करना',
      'ब': 'नागरिकों को सरकारी एवं गैर-सरकारी सेवाएँ एकल खिड़की (Single Window) से ऑनलाइन उपलब्ध कराना',
      'स': 'मुफ्त कम्प्यूटर बांटना',
      'द': 'केवल बिजली बिल जमा करना'
    },
    correctOption: 'ब',
    explanation: 'ई-मित्र राजस्थान सरकार की महत्वाकांक्षी योजना है जो ग्रामीण व शहरी क्षेत्रों में मूल निवास, जाति प्रमाण पत्र, बिल भुगतान आदि 500+ सेवाएँ एक ही स्थान पर उपलब्ध कराती है।',
    memoryAnchor: 'स्मृति सूत्र: ई-मित्र = राजस्थान का जनसेवा केंद्र (G2C व B2C एकल खिड़की)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch7-q3',
    chapterId: 7,
    chapterNumber: 7,
    chapterTitleHindi: 'सूचना प्रौद्योगिकी के अनुप्रयोग',
    chapterTitleEnglish: 'Applications of IT',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'ई-बैंकिंग में "OTP" का पूर्ण रूप क्या होता है?',
    options: {
      'अ': 'One Time Password',
      'ब': 'Online Transaction PIN',
      'स': 'Official Telecom Protocol',
      'द': 'Open Transfer Path'
    },
    correctOption: 'अ',
    explanation: 'OTP (One Time Password) एक बार प्रयुक्त होने वाला सुरक्षा कोड है जो वित्तीय लेन-देन के सत्यापन हेतु पंजीकृत मोबाइल पर भेजा जाता है।',
    memoryAnchor: 'स्मृति सूत्र: One Time Password = एक बार का गुप्त कोड (सुरक्षा हेतु)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'मॉडल प्रश्न'
  },

  // --- Chapter 8: Cyber Safety, IPR & IT in Society ---
  {
    id: 'ch8-q1',
    chapterId: 8,
    chapterNumber: 8,
    chapterTitleHindi: 'समाज में सूचना प्रौद्योगिकी के प्रभाव एवं साइबर सुरक्षा',
    chapterTitleEnglish: 'Cyber Safety & IT in Society',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'भारत में सूचना प्रौद्योगिकी कानून (IT Act) किस वर्ष लागू किया गया था?',
    options: {
      'अ': 'वर्ष 1995',
      'ब': 'वर्ष 2000',
      'स': 'वर्ष 2005',
      'द': 'वर्ष 2010'
    },
    correctOption: 'ब',
    explanation: 'भारत की संसद द्वारा सूचना प्रौद्योगिकी अधिनियम (IT Act 2000) को 17 अक्टूबर 2000 को लागू किया गया। इसमें साइबर अपराधों व डिजिटल हस्ताक्षरों का वैधानिक प्रावधान है।',
    memoryAnchor: 'स्मृति सूत्र: भारत IT Act = 2000। संशोधन = 2008। साइबर अपराधों पर कठोर दंड।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch8-q2',
    chapterId: 8,
    chapterNumber: 8,
    chapterTitleHindi: 'समाज में सूचना प्रौद्योगिकी के प्रभाव एवं साइबर सुरक्षा',
    chapterTitleEnglish: 'Cyber Safety & IT in Society',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'फिशिंग (Phishing) साइबर हमले का मुख्य उद्देश्य क्या होता है?',
    options: {
      'अ': 'कम्प्यूटर की हार्ड डिस्क को फॉर्मेट करना',
      'ब': 'फर्जी ईमेल व वेबसाइट द्वारा उपयोगकर्ता के पासवर्ड, बैंक विवरण व संवेदनशील डेटा चुराना',
      'स': 'कम्प्यूटर की गति को तेज करना',
      'द': 'प्रिंटर की स्याही बचाना'
    },
    correctOption: 'ब',
    explanation: 'फिशिंग (Phishing) में हैकर्स बैंक या संस्थान का फर्जी रूप धारण कर ईमेल भेजते हैं और धोखे से लॉगिन पासवर्ड या क्रेडिट कार्ड पिन चुरा लेते हैं।',
    memoryAnchor: 'स्मृति सूत्र: Fish (मछली पकड़ने का कांटा) की तरह फर्जी ईमेल भेजकर गोपनीय पासवर्ड फंसाना = Phishing।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch8-q3',
    chapterId: 8,
    chapterNumber: 8,
    chapterTitleHindi: 'समाज में सूचना प्रौद्योगिकी के प्रभाव एवं साइबर सुरक्षा',
    chapterTitleEnglish: 'Cyber Safety & IT in Society',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'बौद्धिक संपदा अधिकार (IPR) के अंतर्गत साहित्यिक व सॉफ्टवेयर कोड के संरक्षण हेतु क्या प्रदान किया जाता है?',
    options: {
      'अ': 'पेटेंट (Patent)',
      'ब': 'कॉपीराइट (Copyright)',
      'स': 'ट्रेडमार्क (Trademark)',
      'द': 'आईएसओ प्रमाणन'
    },
    correctOption: 'ब',
    explanation: 'पुस्तकों, संगीत, कला, फिल्मों तथा सॉफ्टवेयर सोर्स कोड के मौलिक अधिकार की सुरक्षा हेतु "कॉपीराइट" (Copyright ©) दिया जाता है।',
    memoryAnchor: 'स्मृति सूत्र: सॉफ्टवेयर कोड व पुस्तकें = Copyright, नए आविष्कार = Patent, लोगो व ब्रांड नाम = Trademark।',
    difficulty: 'मध्यम (Moderate)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  },
  {
    id: 'ch8-q4',
    chapterId: 8,
    chapterNumber: 8,
    chapterTitleHindi: 'समाज में सूचना प्रौद्योगिकी के प्रभाव एवं साइबर सुरक्षा',
    chapterTitleEnglish: 'Cyber Safety & IT in Society',
    unitHindi: 'इकाई 4: सूचना प्रौद्योगिकी के अनुप्रयोग एवं समाज',
    question: 'नेटवर्किंग में "फायरवॉल" (Firewall) का क्या मुख्य कार्य होता है?',
    options: {
      'अ': 'कम्प्यूटर को बिजली के झटके से बचाना',
      'ब': 'अनधिकृत उपयोगकर्ताओं व वायरस को आंतरिक निजी नेटवर्क में प्रवेश से रोकना',
      'स': 'मॉनिटर के स्क्रीन सेवर को चलाना',
      'द': 'इंटरनेट की गति को धीमा करना'
    },
    correctOption: 'ब',
    explanation: 'फायरवॉल (Firewall) एक सुरक्षा प्रणाली है जो आने वाले और जाने वाले नेटवर्क ट्रैफ़िक की निगरानी करती है तथा अनधिकृत घुसपैठियों को ब्लॉक करती है।',
    memoryAnchor: 'स्मृति सूत्र: निजी नेटवर्क का सुरक्षा गार्ड = फायरवॉल (Firewall)।',
    difficulty: 'सरल (Basic)',
    examFrequency: 'अति-महत्वपूर्ण (Board 2026)'
  }
];

export function getTodayChallengeIndex(total: number, dateStr?: string): number {
  if (total <= 0) return 0;
  const targetDate = dateStr || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < targetDate.length; i++) {
    hash = (hash << 5) - hash + targetDate.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % total;
}
