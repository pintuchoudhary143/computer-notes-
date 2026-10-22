import { Chapter } from '../types/study';

export const englishChapters: Record<number, Chapter> = {
  1: {
    id: 1,
    unitId: 1,
    unitName: 'Unit 1: Introduction to Computer',
    unitHindi: 'इकाई 1: कम्प्यूटर का परिचय',
    unitEnglish: 'Unit 1: Introduction to Computer',
    chapterNumber: 1,
    titleHindi: 'कम्प्यूटर का परिचय',
    titleEnglish: 'Introduction to Computer',
    pageRange: '1 - 42',
    overview: 'कम्प्यूटर की उत्पत्ति, परिभाषा, अनुप्रयोग व आकार के आधार पर वर्गीकरण, सुपर कम्प्यूटर परम (PARAM), कम्प्यूटर के मुख्य उपयोग, विशेषताएँ व सीमाएँ, पाँचों पीढ़ियाँ, ब्लॉक रेखाचित्र, संख्या प्रणालियाँ, हार्डवेयर व सॉफ्टवेयर।',
    overviewEnglish: 'Origin and definition of computers, classification by application and size, Indian Supercomputer PARAM, strengths and limitations, Five Generations of computers, Block Diagram (CPU, CU, ALU, Memory), Number Systems (Binary, Octal, Hexadecimal, Decimal and conversions), Hardware and Software concepts.',
    keyPoints: [
      'कम्प्यूटर शब्द लैटिन/अंग्रेजी "Compute" से बना है जिसका अर्थ गणना करना है।',
      'CPU को कम्प्यूटर का दिमाग कहा जाता है जिसमें ALU, CU और Memory होते हैं।',
      'सुपर कम्प्यूटर परम (PARAM) सी-डैक (C-DAC) पुणे द्वारा 1991 में विकसित हुआ।'
    ],
    keyPointsEnglish: [
      'The word "Computer" is derived from "Compute", which means to calculate or count.',
      'A computer is an automated electronic device that accepts raw data, processes it under program control, and produces meaningful information.',
      'Computers are classified by application into Analog, Digital, and Hybrid; and by size into Micro, Mini, Mainframe, and Supercomputers.',
      'India\'s first indigenous supercomputer PARAM 8000 was built by C-DAC Pune in 1991.',
      'CPU (Central Processing Unit) consists of Control Unit (CU), Arithmetic Logic Unit (ALU), and Memory/Registers.',
      'The Five Generations: 1st (Vacuum Tubes), 2nd (Transistors), 3rd (Integrated Circuits - IC), 4th (Microprocessor / VLSI), 5th (Artificial Intelligence & ULSI).',
      'Number Systems: Binary (Base 2: 0, 1), Octal (Base 8: 0-7), Decimal (Base 10: 0-9), Hexadecimal (Base 16: 0-9, A-F).'
    ],
    sections: [
      {
        title: '1. Origin and Standard Definition of Computer',
        titleEnglish: '1. Origin and Standard Definition of Computer',
        subsections: [
          {
            subtitle: 'Etymology and Fundamental Meaning',
            subtitleEnglish: 'Etymology and Fundamental Meaning',
            content: [
              'The term "Computer" originates from the English/Latin root "Compute", meaning to calculate or reckon.',
              'While initially designed strictly for fast numerical computation, over 80% of modern computer applications are non-mathematical (logical reasoning, document processing, database management, multimedia, internet communication).',
              'A computer differs fundamentally from a simple calculator: along with rapid arithmetic, it possesses logical decision-making capabilities, huge storage memory, and programmable automation.'
            ],
            callout: 'A computer is not merely a calculator; it is a general-purpose electronic machine capable of storing instructions and processing diverse forms of data autonomously.'
          },
          {
            subtitle: 'Standard Academic Definition',
            subtitleEnglish: 'Standard Academic Definition',
            content: [
              'A computer is an automated electronic machine that accepts raw data as input, stores and processes it under the control of a set of stored instructions (program), and produces accurate, meaningful information as output.',
              'Core Components of Data Processing Cycle (IPO Model):',
              '• Input (Raw Data): Unorganized facts, numbers, characters, images, or audio provided to the system.',
              '• Process (Program Execution): Ordered execution of algorithms and instructions on data by the CPU.',
              '• Output (Information): Processed, organized, meaningful and actionable results delivered to the user.',
              '• Storage: Secondary memory where input data and results are retained for future reuse.'
            ]
          }
        ]
      },
      {
        title: '2. Comprehensive Classification of Computers',
        titleEnglish: '2. Comprehensive Classification of Computers',
        subsections: [
          {
            subtitle: 'Classification Based on Principles of Operation / Application',
            subtitleEnglish: 'Classification Based on Principles of Operation / Application',
            content: [
              '1. Analog Computers: Operate on continuous physical quantities such as voltage, electric current, temperature, liquid pressure, and mechanical speed. Signals are continuous waves. Examples: Car speedometer, analog thermometer, seismic voltmeter.',
              '2. Digital Computers: Operate on discrete values using the binary number system (0s and 1s). Highly accurate and versatile. Used in homes, business management, scientific computation, and modern telecommunication.',
              '3. Hybrid Computers: Combine the best qualities of both analog and digital computers. They measure continuous physical signals via analog sensors and convert them into discrete digital numbers for high-speed calculation. Widely used in Intensive Care Units (ICUs), dialysis machines, ECG monitors, aerospace, and weather forecasting.'
            ],
            table: {
              headers: ['Type', 'Signal Nature', 'Processing Principle', 'Primary Applications'],
              rows: [
                ['Analog Computer', 'Continuous Wave', 'Physical quantities (voltage, pressure)', 'Engineering plants, speedometers, voltmeters'],
                ['Digital Computer', 'Discrete (0 and 1)', 'Binary arithmetic & Boolean logic', 'Commerce, schools, office documentation, gaming'],
                ['Hybrid Computer', 'Hybrid (Continuous + Discrete)', 'Analog sensor input + Digital display', 'Medical ICU, ECG/EEG, weather satellites, jet cockpits']
              ]
            }
          },
          {
            subtitle: 'Classification Based on Size, Speed, and Configuration',
            subtitleEnglish: 'Classification Based on Size, Speed, and Configuration',
            content: [
              '1. Microcomputer: Smallest, most economical personal computers powered by a single microchip (microprocessor). Common forms: Desktop PCs, Laptops, Notebooks, Tablets, and Smartphones.',
              '2. Minicomputer: Mid-sized multi-user systems with higher processing power than microcomputers. Supports tens of simultaneous users in small-to-medium enterprises, universities, and laboratories.',
              '3. Mainframe Computer: High-performance, massive-capacity multi-user computers capable of handling thousands of concurrent user queries and high-volume transaction processing (e.g., Railway Reservation, Banking core servers, Insurance companies - IBM z15, VAX).',
              '4. Supercomputer: The world\'s most powerful, fastest, and most expensive computers designed for complex scientific modeling and floating-point computations (measured in FLOPS - Floating-point Operations Per Second). Applications: Weather forecasting, nuclear simulation, quantum physics, space exploration (Cray, Fugaku, Summit, Frontier).'
            ]
          },
          {
            subtitle: 'India\'s Indigenous Supercomputer: PARAM Series',
            subtitleEnglish: 'India\'s Indigenous Supercomputer: PARAM Series',
            content: [
              '• Development: Spearheaded by C-DAC (Centre for Development of Advanced Computing), Pune under the visionary leadership of Dr. Vijay Bhatkar.',
              '• Background: During the late 1980s, when Western nations denied India the purchase of a Cray X-MP supercomputer, Indian scientists resolved to build their own indigenous parallel computing architecture.',
              '• Milestones: PARAM 8000 (launched in 1991), followed by PARAM 10000, PARAM Anant, PARAM Brahma, and PARAM Siddhi-AI.',
              '• Applications: Indian monsoon prediction, molecular docking for pharmaceuticals, satellite remote sensing, defense and space trajectory calculation.'
            ]
          }
        ]
      },
      {
        title: '3. Major Strengths and Limitations of Computers',
        titleEnglish: '3. Major Strengths and Limitations of Computers',
        subsections: [
          {
            subtitle: 'Key Strengths (Characteristics)',
            subtitleEnglish: 'Key Strengths (Characteristics)',
            content: [
              '• Speed: Executes billions of operations per second, with instruction cycles measured in nanoseconds (10⁻⁹ s) and picoseconds (10⁻¹² s).',
              '• Accuracy: Consistently delivers 100% accurate results. Computational errors only occur due to erroneous human data entry or flawed programming (GIGO - Garbage In, Garbage Out).',
              '• Diligence: Free from tiredness, fatigue, emotional boredom, and lack of concentration; performs repetitive tasks for days with identical precision.',
              '• High Storage Capacity: Retains terabytes and petabytes of multimedia data indefinitely in compact secondary media.',
              '• Versatility: Capable of switching from complex financial modeling to high-definition graphic design, gaming, or musical composition seamlessly.',
              '• Automation: Once an instruction program is loaded into memory, the CPU executes it from start to finish without requiring human intervention.'
            ]
          },
          {
            subtitle: 'Inherent Limitations of Computers',
            subtitleEnglish: 'Inherent Limitations of Computers',
            content: [
              '• Zero Native IQ: Possesses no independent common sense, moral judgement, or intuition; strictly bound to programmed instructions.',
              '• Dependence on Electricity: Completely reliant on continuous power supply and sensitive to electrical surges.',
              '• Vulnerability to Cyber Threats: Susceptible to malware, trojans, ransomware, and unauthorized network intrusion.',
              '• Rapid Obsolescence: Constant evolution of hardware architecture and operating platforms necessitates ongoing capital investment.'
            ]
          }
        ]
      },
      {
        title: '4. Five Generations of Computers',
        titleEnglish: '4. Five Generations of Computers',
        subsections: [
          {
            subtitle: 'Comparative Evolution of Five Generations',
            subtitleEnglish: 'Comparative Evolution of Five Generations',
            content: [
              '1st Generation (1940-1956): Used Vacuum Tubes; machine and assembly languages; magnetic drums for memory; massive power consumption and immense heat generation (ENIAC, EDVAC, UNIVAC-I).',
              '2nd Generation (1956-1963): Used Transistors invented at Bell Labs; magnetic core memory; introduction of high-level languages like FORTRAN, COBOL; smaller, faster, and more reliable than vacuum tubes (IBM 1401, CDC 1604).',
              '3rd Generation (1964-1971): Integrated Circuits (ICs) invented by Jack Kilby and Robert Noyce; keyboard input and monitor display; time-sharing operating systems (IBM 360, PDP-8).',
              '4th Generation (1971-Present): Very Large Scale Integration (VLSI) leading to the Microprocessor (Intel 4004/8086); advent of Personal Computers (PCs), graphical user interfaces (GUI), optical storage, and the internet.',
              '5th Generation (Present & Beyond): Ultra Large Scale Integration (ULSI) microchips; Artificial Intelligence (AI), Machine Learning, Natural Language Processing, quantum computing, and parallel processing.'
            ],
            table: {
              headers: ['Generation', 'Core Hardware Component', 'Memory Technology', 'Programming Language', 'Key Systems'],
              rows: [
                ['1st Generation', 'Vacuum Tubes', 'Magnetic Drum & Delay lines', 'Machine code, Assembly', 'ENIAC, EDVAC, UNIVAC'],
                ['2nd Generation', 'Transistors', 'Magnetic Cores & Magnetic Tape', 'FORTRAN, COBOL', 'IBM 1401, CDC 1604'],
                ['3rd Generation', 'Integrated Circuits (SSI/MSI)', 'Magnetic Cores & early RAM', 'BASIC, Pascal, C', 'IBM 360, PDP-8'],
                ['4th Generation', 'Microprocessor (VLSI)', 'Semiconductor RAM/ROM, Hard Disks', 'C++, Java, Python, SQL', 'Apple II, IBM PC, Intel Core'],
                ['5th Generation', 'Ultra Large Scale (ULSI) / AI', 'Optical, Cloud, Quantum memory', 'Python, R, AI frameworks', 'PARAM, Watson, Supercomputers']
              ]
            }
          }
        ]
      },
      {
        title: '5. Computer Hardware Architecture: The Block Diagram',
        titleEnglish: '5. Computer Hardware Architecture: The Block Diagram',
        subsections: [
          {
            subtitle: 'Functional Units of the CPU',
            subtitleEnglish: 'Functional Units of the CPU',
            content: [
              'The Central Processing Unit (CPU) is the electronic brain of the computer system, composed of three vital functional units:',
              '1. Arithmetic and Logic Unit (ALU): Executes all mathematical calculations (addition, subtraction, multiplication, division) and logical comparisons (equal to, greater than, less than, AND, OR, NOT).',
              '2. Control Unit (CU): Serves as the central nervous system. It fetches instructions from main memory, decodes their opcode, directs data flow through internal buses, and synchronizes system timing via the system clock.',
              '3. Registers and Internal Cache: Ultra-fast temporary memory storage locations located directly inside the microprocessor die (e.g., Program Counter, Accumulator, Instruction Register).'
            ]
          }
        ]
      },
      {
        title: '6. Digital Number Systems and Conversion Rules',
        titleEnglish: '6. Digital Number Systems and Conversion Rules',
        subsections: [
          {
            subtitle: 'The Four Fundamental Number Systems',
            subtitleEnglish: 'The Four Fundamental Number Systems',
            content: [
              '• Binary (Base 2): Consists of only two digits: 0 and 1. This is the fundamental machine language understood by electronic logic gates.',
              '• Octal (Base 8): Consists of eight digits: 0, 1, 2, 3, 4, 5, 6, 7. Each octal digit corresponds precisely to a 3-bit binary group (2³ = 8).',
              '• Decimal (Base 10): The standard human counting system using ten digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.',
              '• Hexadecimal (Base 16): Uses sixteen alphanumeric symbols: 0-9 for numbers 0 to 9, and letters A (10), B (11), C (12), D (13), E (14), F (15). Each hexadecimal digit represents a 4-bit binary nibble (2⁴ = 16).'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Which component is known as the "Brain of the Computer" that performs all calculations and controls?',
        questionEnglish: 'Which component is known as the "Brain of the Computer" that performs all calculations and controls?',
        options: { 'A': 'Monitor', 'B': 'CPU (Central Processing Unit)', 'C': 'RAM', 'D': 'Hard Disk' },
        correctOption: 'B',
        explanation: 'CPU is the brain of the computer containing the ALU, CU, and registers.'
      },
      {
        id: 2,
        question: 'What was the core electronic component used in First Generation computers?',
        questionEnglish: 'What was the core electronic component used in First Generation computers?',
        options: { 'A': 'Transistor', 'B': 'Vacuum Tube', 'C': 'Integrated Circuit (IC)', 'D': 'Microprocessor' },
        correctOption: 'B',
        explanation: 'First generation computers (1940-1956) relied on vacuum tubes.'
      },
      {
        id: 3,
        question: 'India\'s first indigenous supercomputer was developed by which institution?',
        questionEnglish: 'India\'s first indigenous supercomputer was developed by which institution?',
        options: { 'A': 'ISRO', 'B': 'DRDO', 'C': 'C-DAC (Pune)', 'D': 'IIT Delhi' },
        correctOption: 'C',
        explanation: 'C-DAC Pune developed PARAM 8000 in 1991 under Dr. Vijay Bhatkar.'
      },
      {
        id: 4,
        question: 'What is the base of the Hexadecimal number system?',
        questionEnglish: 'What is the base of the Hexadecimal number system?',
        options: { 'A': '2', 'B': '8', 'C': '10', 'D': '16' },
        correctOption: 'D',
        explanation: 'Hexadecimal has base 16 with symbols 0-9 and A-F.'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'What is the full form of CPU and ALU?',
        questionEnglish: 'What is the full form of CPU and ALU?',
        answer: 'CPU: Central Processing Unit; ALU: Arithmetic and Logic Unit.',
        answerEnglish: 'CPU stands for Central Processing Unit and ALU stands for Arithmetic and Logic Unit.'
      },
      {
        id: 2,
        question: 'Who developed India\'s first supercomputer PARAM and in which year?',
        questionEnglish: 'Who developed India\'s first supercomputer PARAM and in which year?',
        answer: 'PARAM 8000 was developed by C-DAC, Pune in the year 1991.',
        answerEnglish: 'PARAM 8000 was developed by C-DAC, Pune in 1991 under Dr. Vijay Bhatkar.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'Explain the difference between Analog, Digital, and Hybrid computers.',
        questionEnglish: 'Explain the difference between Analog, Digital, and Hybrid computers.',
        answer: 'Analog computers process continuous physical quantities (e.g., speedometers). Digital computers process discrete binary data (0 and 1). Hybrid computers combine both continuous analog inputs with high-speed digital calculation (e.g., hospital ICU monitors).',
        answerEnglish: 'Analog computers measure continuous physical parameters like temperature and pressure. Digital computers compute using discrete binary digits (0 and 1) for general-purpose computing. Hybrid computers accept analog signals and convert them into digital outputs for medical equipment and flight simulators.'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Describe the Five Generations of computers highlighting the electronic component, memory, and programming language of each.',
        questionEnglish: 'Describe the Five Generations of computers highlighting the electronic component, memory, and programming language of each.',
        answer: '1st Gen (Vacuum tubes, machine language), 2nd Gen (Transistors, FORTRAN/COBOL), 3rd Gen (Integrated Circuits, high-level languages), 4th Gen (Microprocessors/VLSI, personal computers, C/Java/Python), 5th Gen (ULSI, Artificial Intelligence, parallel processing).',
        answerEnglish: '1st Gen (1940-1956) used Vacuum Tubes and machine code. 2nd Gen (1956-1963) introduced Transistors and magnetic core memory. 3rd Gen (1964-1971) used Integrated Circuits (ICs) with keyboards and monitors. 4th Gen (1971-Present) utilizes Microprocessors (VLSI) powering PCs. 5th Gen focuses on AI, Ultra Large Scale Integration (ULSI), and quantum computation.'
      }
    ]
  },
  2: {
    id: 2,
    unitId: 1,
    unitName: 'Unit 1: Introduction to Computer',
    unitHindi: 'इकाई 1: कम्प्यूटर का परिचय',
    unitEnglish: 'Unit 1: Introduction to Computer',
    chapterNumber: 2,
    titleHindi: 'इनपुट/आउटपुट तथा संग्रहण युक्तियाँ',
    titleEnglish: 'Input/Output and Storage Devices',
    pageRange: '43 - 68',
    overview: 'इनपुट युक्तियाँ, आउटपुट युक्तियाँ एवं प्राथमिक व द्वितीयक संग्रहण माध्यम।',
    overviewEnglish: 'Primary vs Secondary storage devices (Hard Disk, CD, DVD, Blu-Ray, Pen Drive), Input devices (Keyboard, Mouse, Scanner, OCR, OMR, MICR, Barcode Reader, Light Pen), and Output devices (Monitors CRT/LCD/LED, Printers: Impact & Non-Impact, Plotters, Projectors).',
    keyPoints: [
      'प्राथमिक मेमोरी (RAM/ROM) तात्कालिक होती है जबकि द्वितीयक मेमोरी स्थाई होती है।',
      'हार्ड डिस्क में एल्युमिनियम प्लेटर्स और रीड/राइट हेड होते हैं।',
      'लेज़र प्रिंटर सर्वाधिक तीव्र और श्रेष्ठ गुणवत्ता वाला नॉन-इम्पैक्ट प्रिंटर है।'
    ],
    keyPointsEnglish: [
      'Primary Storage (RAM/ROM) is directly accessed by the CPU for current operations.',
      'Secondary Storage (HDD, SSD, Optical Disks) permanently preserves data even when power is turned off.',
      'Optical Disks store data as microscopic Pits (1s) and Lands (0s) read by laser beams.',
      'Blu-Ray Disks use blue-violet laser (405 nm) to store up to 25 GB (single layer) and 50 GB (dual layer).',
      'Input devices convert human-understandable information into machine-readable digital format.',
      'Specialized input scanners include OMR (Optical Mark Reader), OCR (Optical Character Reader), and MICR (Magnetic Ink Character Recognition used in banking).',
      'Printers are divided into Impact (Dot Matrix, Daisy Wheel) and Non-Impact (Inkjet, Laser Printer).'
    ],
    sections: [
      {
        title: '1. Primary vs Secondary Storage Devices',
        titleEnglish: '1. Primary vs Secondary Storage Devices',
        subsections: [
          {
            subtitle: 'Core Differences Between Primary and Secondary Memory',
            subtitleEnglish: 'Core Differences Between Primary and Secondary Memory',
            content: [
              '• Primary Memory (Main Memory / RAM): Fast semiconductor memory located on the motherboard that holds instructions currently executed by the CPU. It is volatile (erased when power is turned off).',
              '• Secondary Memory (Mass Storage): Non-volatile magnetic, optical, or solid-state storage devices that permanently hold programs, documents, and operating systems indefinitely.'
            ]
          },
          {
            subtitle: 'Key Secondary Storage Devices and Their Technical Specifications',
            subtitleEnglish: 'Key Secondary Storage Devices and Their Technical Specifications',
            content: [
              '1. Hard Disk Drive (HDD): Primary magnetic mass storage device containing multiple aluminum platters coated with magnetic material, rotating at 5400-7200 RPM inside a sealed dust-free chamber. Data is arranged in concentric tracks and sectors read by magnetic read/write heads.',
              '2. Compact Disc (CD-ROM): Optical disc holding ~700 MB of data. High-intensity laser burns microscopic Pits and Lands along a continuous spiral track over 5 km in length.',
              '3. Digital Versatile Disc (DVD): Identical in diameter to a CD (12 cm) but holds 4.7 GB (single-layer) up to 17 GB (dual-layer/double-sided) using a narrower red laser.',
              '4. Blu-Ray Disc (BD): Employs a short-wavelength blue-violet laser (405 nm), enabling up to 25 GB per layer (50 GB dual layer) for Ultra-HD video storage.',
              '5. Solid State Drive (SSD) / Pen Drive: Flash EEPROM memory with no moving parts; extremely fast, shock-resistant, and low-power.'
            ],
            table: {
              headers: ['Medium', 'Category', 'Typical Capacity', 'Distinguishing Technology'],
              rows: [
                ['Floppy Disk', 'Magnetic', '1.44 MB', 'Mylar plastic, 3.5-inch with write-protect notch'],
                ['Hard Disk Drive', 'Magnetic Mass Storage', '500 GB - 4 TB+', 'Sealed chamber, multiple aluminum platters, spindle'],
                ['CD-ROM', 'Optical (Red Laser)', '650 - 700 MB', 'Pits & Lands, continuous spiral track'],
                ['DVD-ROM', 'Optical (High Density)', '4.7 GB - 17 GB', 'Narrow track pitch, dual-layer recording'],
                ['Blu-Ray Disc', 'Optical (Blue-Violet Laser)', '25 GB - 50 GB', '405 nm blue-violet laser, 4K video backup'],
                ['Pen / SSD Drive', 'Flash Solid-State', '32 GB - 2 TB+', 'Semiconductor NAND flash, USB/NVMe interface']
              ]
            }
          }
        ]
      },
      {
        title: '2. Input Devices and Optical Recognition Systems',
        titleEnglish: '2. Input Devices and Optical Recognition Systems',
        subsections: [
          {
            subtitle: 'Standard and Specialized Input Devices',
            subtitleEnglish: 'Standard and Specialized Input Devices',
            content: [
              '• Keyboard: The most universal text input device with alphanumeric, function (F1-F12), navigation, and modifier keys (Ctrl, Alt, Shift).',
              '• Mouse: Handheld pointing device with optical sensor to position the screen cursor and select GUI elements.',
              '• Scanner: Captures printed photos or documents and converts them into digital bitmap image files.',
              '• OMR (Optical Mark Recognition): Evaluates answer sheets of competitive exams by detecting pencil or pen marks.',
              '• OCR (Optical Character Recognition): Scans printed alphanumeric text and translates visual letterforms into editable text characters.',
              '• MICR (Magnetic Ink Character Recognition): Reads bank check numbers printed with magnetic iron-oxide ink (E-13B font) with near 100% security against fraud.',
              '• Barcode Reader: Employs laser reflection to decode Universal Product Code (UPC) bars printed on consumer goods.'
            ]
          }
        ]
      },
      {
        title: '3. Output Devices: Monitors and Printers',
        titleEnglish: '3. Output Devices: Monitors and Printers',
        subsections: [
          {
            subtitle: 'Visual Display Units (Monitors)',
            subtitleEnglish: 'Visual Display Units (Monitors)',
            content: [
              '• CRT (Cathode Ray Tube): Traditional heavy monitors using electron guns to excite phosphor coatings.',
              '• LCD / LED (Flat Panel Displays): Energy-efficient, lightweight displays using liquid crystal matrices backlit by LEDs, measured diagonally in inches with high resolution (Full HD, 4K).'
            ]
          },
          {
            subtitle: 'Classification of Printers: Impact vs Non-Impact',
            subtitleEnglish: 'Classification of Printers: Impact vs Non-Impact',
            content: [
              '• Impact Printers: Form characters by physically striking an inked ribbon against paper. Noisy and slower, but produce multi-layer carbon copies. Example: Dot Matrix Printer (DMP).',
              '• Non-Impact Printers: Form images without physical contact using heat, electrostatic charges, or liquid ink droplets. Whisper-quiet and ultra-sharp. Examples: Inkjet Printers (spray liquid ink droplets) and Laser Printers (use toner powder and laser beam charges for blazing speed and professional typography).'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Which of the following is a non-volatile secondary storage medium?',
        questionEnglish: 'Which of the following is a non-volatile secondary storage medium?',
        options: { 'A': 'RAM', 'B': 'Cache Memory', 'C': 'Hard Disk Drive', 'D': 'CPU Registers' },
        correctOption: 'C',
        explanation: 'Hard Disk is a non-volatile secondary magnetic storage device.'
      },
      {
        id: 2,
        question: 'Which device is used in banking systems to read bank check numbers printed with magnetic ink?',
        questionEnglish: 'Which device is used in banking systems to read bank check numbers printed with magnetic ink?',
        options: { 'A': 'OMR', 'B': 'OCR', 'C': 'MICR', 'D': 'Bar Code Reader' },
        correctOption: 'C',
        explanation: 'MICR (Magnetic Ink Character Recognition) reads bank checks.'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'What is the full form of OMR, OCR, and MICR?',
        questionEnglish: 'What is the full form of OMR, OCR, and MICR?',
        answer: 'OMR: Optical Mark Reader; OCR: Optical Character Reader; MICR: Magnetic Ink Character Recognition.',
        answerEnglish: 'OMR: Optical Mark Reader; OCR: Optical Character Reader; MICR: Magnetic Ink Character Recognition.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'Differentiate between Impact and Non-Impact printers with examples.',
        questionEnglish: 'Differentiate between Impact and Non-Impact printers with examples.',
        answer: 'Impact printers physically strike paper through an ink ribbon (e.g., Dot Matrix). Non-impact printers form images using laser toner or ink spray without mechanical impact (e.g., Laser and Inkjet printers).',
        answerEnglish: 'Impact printers use physical hammers striking an inked ribbon to imprint characters (e.g., Dot Matrix), making them noisy but able to print carbon copies. Non-impact printers create text and graphics silently using electrostatic toner or liquid micro-droplets (e.g., Laser and Inkjet).'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Explain the working principles and comparative storage capacities of CD-ROM, DVD, and Blu-Ray Discs.',
        questionEnglish: 'Explain the working principles and comparative storage capacities of CD-ROM, DVD, and Blu-Ray Discs.',
        answer: 'All three are optical discs that store data using microscopic pits and lands. CD stores ~700 MB using red laser (780 nm). DVD holds 4.7-17 GB using narrower red laser (650 nm). Blu-Ray uses short-wavelength blue-violet laser (405 nm) to store 25-50 GB.',
        answerEnglish: 'All three are optical storage discs recording digital data as microscopic pits and lands along spiral tracks. CD uses a 780 nm infrared laser holding 700 MB. DVD uses a 650 nm red laser with tighter track spacing holding 4.7 GB to 17 GB. Blu-Ray uses a 405 nm blue-violet laser with microscopic pit size holding 25 GB (single layer) to 50 GB (dual layer).'
      }
    ]
  },
  3: {
    id: 3,
    unitId: 2,
    unitName: 'Unit 2: Communication and Networking',
    unitHindi: 'इकाई 2: संचार एवं नेटवर्किंग',
    unitEnglish: 'Unit 2: Communication and Networking',
    chapterNumber: 3,
    titleHindi: 'कम्प्यूटर संचार एवं नेटवर्किंग',
    titleEnglish: 'Computer Communication and Networking',
    pageRange: '69 - 98',
    overview: 'डेटा संचार के घटक, ट्रांसमिशन मोड, माध्यम एवं नेटवर्क टोपोलॉजी।',
    overviewEnglish: 'Data communication model (Sender, Receiver, Medium, Message, Protocol), Transmission modes (Simplex, Half-Duplex, Full-Duplex), Transmission media (Twisted Pair, Coaxial Cable, Optical Fiber, Wireless), Network categories (LAN, MAN, WAN), and Network Topologies (Star, Bus, Ring, Mesh, Tree).',
    keyPoints: [
      'संचार में सेंडर, रिसीवर, माध्यम, संदेश व प्रोटोकॉल 5 मुख्य घटक हैं।',
      'ऑप्टिकल फाइबर केबल (OFC) प्रकाश के पूर्ण आंतरिक परावर्तन (TIR) पर कार्य करती है।',
      'स्टार टोपोलॉजी में एक केंद्रीय हब या स्विच से सभी नोड जुड़े होते हैं।'
    ],
    keyPointsEnglish: [
      'Data communication requires 5 basic elements: Sender, Receiver, Transmission Medium, Message, and Protocol.',
      'Transmission modes: Simplex (one-way), Half-Duplex (two-way alternating), and Full-Duplex (simultaneous two-way).',
      'Optical Fiber Cable (OFC) transmits data as light pulses using Total Internal Reflection (TIR) with zero electromagnetic interference.',
      'Network geographic scale: LAN (single room/campus), MAN (metropolitan city-wide), WAN (nationwide or worldwide internet).',
      'Network Topologies describe geometric node layouts: Bus, Star, Ring, Tree, and Mesh.',
      'In Star Topology, all client devices connect directly to a central Hub or Switch; failure of one cable does not disrupt the rest of the network.'
    ],
    sections: [
      {
        title: '1. Fundamentals of Data Communication',
        titleEnglish: '1. Fundamentals of Data Communication',
        subsections: [
          {
            subtitle: 'The Five Fundamental Elements of Communication',
            subtitleEnglish: 'The Five Fundamental Elements of Communication',
            content: [
              '1. Sender (Source): The transmitting device (computer, workstation, telephone) that originates the data.',
              '2. Receiver (Destination): The receiving device (computer, printer, terminal) that receives the transmitted data.',
              '3. Message: The actual information or content to be conveyed (text, numbers, images, audio, video).',
              '4. Transmission Medium: The physical communication pathway carrying the signal from sender to receiver (cables or wireless airwaves).',
              '5. Protocol: A formal set of governing rules and communication conventions agreed upon by both communicating endpoints.'
            ]
          },
          {
            subtitle: 'Modes of Data Transmission',
            subtitleEnglish: 'Modes of Data Transmission',
            content: [
              '• Simplex Mode: Unidirectional communication where data flows strictly in one direction only. The sender only transmits, and the receiver only receives. Examples: Television broadcasting, radio transmission, keyboard to CPU.',
              '• Half-Duplex Mode: Bidirectional communication where both parties can transmit and receive, but only one party at a time. Examples: Walkie-talkie communication, push-to-talk radios.',
              '• Full-Duplex Mode: True simultaneous bidirectional communication where both parties can transmit and receive data concurrently. Examples: Modern mobile phone calls, broadband fiber-optic internet.'
            ]
          }
        ]
      },
      {
        title: '2. Transmission Media: Guided vs Unguided',
        titleEnglish: '2. Transmission Media: Guided vs Unguided',
        subsections: [
          {
            subtitle: 'Guided (Wired) Transmission Media',
            subtitleEnglish: 'Guided (Wired) Transmission Media',
            content: [
              '1. Twisted Pair Cable: Insulated copper wires twisted in pairs to reduce electromagnetic crosstalk. Available as UTP (Unshielded Twisted Pair) and STP (Shielded Twisted Pair). Terminated with 8-pin RJ-45 connectors for LAN networks.',
              '2. Coaxial Cable: Copper central core surrounded by dielectric insulation, braided wire mesh shielding, and an outer PVC jacket. Used extensively in cable television (CATV) and long-distance telephone lines.',
              '3. Optical Fiber Cable (OFC): Hair-thin silica glass fiber core surrounded by lower refractive index cladding. Signals travel as pulses of light utilizing Total Internal Reflection (TIR). Boasts extreme bandwidth (gigabits/sec), zero electromagnetic interference, and secure long-haul data transit.'
            ]
          },
          {
            subtitle: 'Unguided (Wireless) Transmission Media',
            subtitleEnglish: 'Unguided (Wireless) Transmission Media',
            content: [
              '• Radio Waves: Omnidirectional electromagnetic waves propagating easily through building walls (e.g., FM Radio, Wi-Fi 2.4/5 GHz, Bluetooth).',
              '• Microwaves: Unidirectional line-of-sight electromagnetic waves requiring parabolic dish antennas aligned over high communication towers (1 to 300 GHz).',
              '• Satellite Communication: Geostationary orbiting transponders positioned ~36,000 km in space that receive uplink signals, amplify them, and broadcast downlink signals globally.'
            ]
          }
        ]
      },
      {
        title: '3. Geographic Network Categories and Topologies',
        titleEnglish: '3. Geographic Network Categories and Topologies',
        subsections: [
          {
            subtitle: 'Network Geographical Scale: LAN, MAN, WAN',
            subtitleEnglish: 'Network Geographical Scale: LAN, MAN, WAN',
            content: [
              '• LAN (Local Area Network): Confined to a single room, school laboratory, or office campus (up to 1 km). High transmission speed (100 Mbps to 10 Gbps) and low error rates.',
              '• MAN (Metropolitan Area Network): Encompasses an entire city or municipal area (up to 50 km). Examples: City-wide cable television networks, municipal smart-city camera networks.',
              '• WAN (Wide Area Network): Spans across states, countries, or entire continents (thousands of kilometers). The global Internet is the most prominent WAN.'
            ]
          },
          {
            subtitle: 'Physical Network Topologies',
            subtitleEnglish: 'Physical Network Topologies',
            content: [
              '1. Star Topology: Every workstation connects independently to a central Hub or Switch via point-to-point cables. Extremely easy to install and troubleshoot; if one cable breaks, only that node is disconnected.',
              '2. Bus Topology: All workstations share a single continuous backbone cable terminated at both ends. Economical in cable length, but if the main backbone breaks, the entire network fails.',
              '3. Ring Topology: Nodes form a closed circular loop where data tokens circulate in a single direction. Each node acts as a signal repeater.',
              '4. Mesh Topology: Every node connects to every other node with dedicated point-to-point links. Provides maximum redundancy and fault tolerance, but is expensive in cabling.',
              '5. Tree Topology: Hierarchical combination of Star and Bus topologies, organized in root and child node branches.'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Which transmission medium uses Total Internal Reflection (TIR) of light for ultra-fast signal propagation?',
        questionEnglish: 'Which transmission medium uses Total Internal Reflection (TIR) of light for ultra-fast signal propagation?',
        options: { 'A': 'Twisted Pair', 'B': 'Coaxial Cable', 'C': 'Optical Fiber Cable (OFC)', 'D': 'Telephone Wire' },
        correctOption: 'C',
        explanation: 'Optical Fiber Cable transmits light pulses using Total Internal Reflection.'
      },
      {
        id: 2,
        question: 'In which network topology are all computers connected to a central Hub or Switch?',
        questionEnglish: 'In which network topology are all computers connected to a central Hub or Switch?',
        options: { 'A': 'Bus', 'B': 'Star', 'C': 'Ring', 'D': 'Mesh' },
        correctOption: 'B',
        explanation: 'Star topology connects all computers to a central switch or hub.'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'What are the five main components of data communication?',
        questionEnglish: 'What are the five main components of data communication?',
        answer: 'Sender, Receiver, Medium, Message, and Protocol.',
        answerEnglish: '1. Sender, 2. Receiver, 3. Transmission Medium, 4. Message, 5. Protocol.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'Distinguish between LAN, MAN, and WAN with examples.',
        questionEnglish: 'Distinguish between LAN, MAN, and WAN with examples.',
        answer: 'LAN covers a single room or school building (Ethernet/Wi-Fi). MAN spans an entire city (e.g., Cable TV network). WAN spans across countries or the globe (e.g., the Internet).',
        answerEnglish: 'LAN is confined to a local room, school, or campus. MAN covers a whole metropolitan city. WAN connects computers across states, countries, or globally across continents via telephone lines and satellites.'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Compare Star, Bus, and Ring topologies discussing their structure, advantages, and disadvantages.',
        questionEnglish: 'Compare Star, Bus, and Ring topologies discussing their structure, advantages, and disadvantages.',
        answer: 'Star uses a central switch; easy to manage, high fault tolerance, but fails if central switch dies. Bus uses a single trunk cable; cheap but a backbone fault drops the entire network. Ring passes data unidirectionally; requires token passing, slow during heavy traffic.',
        answerEnglish: 'In Star Topology, all nodes attach to a central switch. Advantages: isolated node failures do not impact others, easy addition of nodes. Disadvantage: central hub failure crashes the network. In Bus Topology, a single shared trunk cable connects all nodes. Advantage: low cable cost. Disadvantage: backbone cut halts everything. In Ring Topology, data flows in a unidirectional loop through tokens.'
      }
    ]
  },
  4: {
    id: 4,
    unitId: 2,
    unitName: 'Unit 2: Communication and Networking',
    unitHindi: 'इकाई 2: संचार एवं नेटवर्किंग',
    unitEnglish: 'Unit 2: Communication and Networking',
    chapterNumber: 4,
    titleHindi: 'इंटरनेट एवं इसकी सेवाएँ',
    titleEnglish: 'Internet and Its Services',
    pageRange: '99 - 128',
    overview: 'इंटरनेट का इतिहास, प्रोटोकॉल, वेब ब्राउज़र, ईमेल एवं साइबर सुरक्षा।',
    overviewEnglish: 'History of the Internet (ARPANET), Core Protocols (TCP/IP, HTTP/HTTPS, FTP, SMTP, DNS), World Wide Web (WWW), Web Browsers, Search Engines, Email mechanics and netiquette, and Cyber Security fundamentals.',
    keyPoints: [
      'इंटरनेट की शुरुआत 1969 में अमेरिकी रक्षा विभाग के ARPANET से हुई थी।',
      'WWW का आविष्कार 1989 में टिम बर्नर्स ली (Tim Berners-Lee) ने किया।',
      'DNS डोमेन नाम को कम्प्यूटर के IP पते में अनुवाद करता है।'
    ],
    keyPointsEnglish: [
      'The Internet originated in 1969 with ARPANET by the US Department of Defense.',
      'Tim Berners-Lee invented the World Wide Web (WWW) at CERN in 1989.',
      'TCP/IP is the foundational transmission protocol suite of the Internet.',
      'DNS (Domain Name System) translates human-friendly domain names (e.g., google.com) into numerical IP addresses.',
      'HTTPS (HyperText Transfer Protocol Secure) encrypts web communication using SSL/TLS.',
      'Email protocol suite: SMTP (Simple Mail Transfer Protocol for sending), POP3 and IMAP (for receiving mail).'
    ],
    sections: [
      {
        title: '1. History and Fundamental Architecture of the Internet',
        titleEnglish: '1. History and Fundamental Architecture of the Internet',
        subsections: [
          {
            subtitle: 'Evolution from ARPANET to Modern Internet',
            subtitleEnglish: 'Evolution from ARPANET to Modern Internet',
            content: [
              '• 1969: Advanced Research Projects Agency Network (ARPANET) was established by the US Department of Defense, interconnecting four universities.',
              '• 1983: Official adoption of TCP/IP protocol, marking the birth of the modern Internet.',
              '• 1989: Sir Tim Berners-Lee invented the World Wide Web (WWW), HTML, HTTP, and the first web browser at CERN, Switzerland.',
              '• 1995: Internet service launched publicly in India on 15 August 1995 by VSNL (Videsh Sanchar Nigam Limited).'
            ]
          },
          {
            subtitle: 'Core Internet Protocols',
            subtitleEnglish: 'Core Internet Protocols',
            content: [
              '• TCP/IP (Transmission Control Protocol / Internet Protocol): TCP divides data into discrete packets and verifies delivery; IP routes packets across networks using numerical IP addresses.',
              '• HTTP / HTTPS: Protocols for fetching and presenting web pages; HTTPS uses SSL/TLS encryption for banking and passwords.',
              '• FTP (File Transfer Protocol): Used for uploading and downloading files between client and server.',
              '• SMTP (Simple Mail Transfer Protocol): Standard protocol for sending email.',
              '• POP3 / IMAP: Standard protocols for retrieving and synchronizing email messages from mail servers.',
              '• DNS (Domain Name System): The phonebook of the Internet, translating names like "wikipedia.org" to IP addresses.'
            ]
          }
        ]
      },
      {
        title: '2. Web Services, Browsers, and Search Engines',
        titleEnglish: '2. Web Services, Browsers, and Search Engines',
        subsections: [
          {
            subtitle: 'Web Browsers vs Search Engines',
            subtitleEnglish: 'Web Browsers vs Search Engines',
            content: [
              '• Web Browser: Application software installed on client devices to retrieve, render, and display HTML web pages (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).',
              '• Search Engine: Web-based service using automated bots (crawlers/spiders) to index web pages and return ranked results for user keywords (e.g., Google, Bing, Yahoo!, DuckDuckGo).'
            ]
          },
          {
            subtitle: 'URL (Uniform Resource Locator) Structure',
            subtitleEnglish: 'URL (Uniform Resource Locator) Structure',
            content: [
              'A standard URL consists of: Protocol (https://) + Subdomain (www.) + Domain Name (rbse.rajasthan) + Top-Level Domain (.gov.in) + Path (/downloads/syllabus.pdf).'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Who invented the World Wide Web (WWW) in 1989?',
        questionEnglish: 'Who invented the World Wide Web (WWW) in 1989?',
        options: { 'A': 'Bill Gates', 'B': 'Tim Berners-Lee', 'C': 'Charles Babbage', 'D': 'Steve Jobs' },
        correctOption: 'B',
        explanation: 'Tim Berners-Lee invented the World Wide Web at CERN in 1989.'
      },
      {
        id: 2,
        question: 'Which protocol is used for securely transmitting sensitive data like credit card numbers over web pages?',
        questionEnglish: 'Which protocol is used for securely transmitting sensitive data like credit card numbers over web pages?',
        options: { 'A': 'FTP', 'B': 'HTTP', 'C': 'HTTPS', 'D': 'SMTP' },
        correctOption: 'C',
        explanation: 'HTTPS provides encrypted communication using SSL/TLS.'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'What is the full form of URL, HTTP, and DNS?',
        questionEnglish: 'What is the full form of URL, HTTP, and DNS?',
        answer: 'URL: Uniform Resource Locator; HTTP: HyperText Transfer Protocol; DNS: Domain Name System.',
        answerEnglish: 'URL: Uniform Resource Locator; HTTP: HyperText Transfer Protocol; DNS: Domain Name System.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'What is the difference between a Web Browser and a Search Engine?',
        questionEnglish: 'What is the difference between a Web Browser and a Search Engine?',
        answer: 'A browser is an application software used to display websites (e.g., Chrome). A search engine is an online service that indexes and searches the web for queries (e.g., Google).',
        answerEnglish: 'A web browser is software installed locally to view web pages (Google Chrome, Edge). A search engine is a web service that locates web pages across the internet matching user search keywords (Google, Bing).'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Explain the working of Email and describe SMTP, POP3, and IMAP protocols.',
        questionEnglish: 'Explain the working of Email and describe SMTP, POP3, and IMAP protocols.',
        answer: 'Emails are drafted and sent using SMTP to mail servers. The recipient client retrieves mail using POP3 (downloads locally) or IMAP (synchronizes across devices in real time).',
        answerEnglish: 'Electronic mail transmits digital messages across networks. The sender client sends mail via SMTP (Simple Mail Transfer Protocol) to outgoing servers. The recipient accesses incoming mail via POP3 (downloads messages to client machine) or IMAP (keeps messages synchronized on the remote server for multiple devices).'
      }
    ]
  },
  5: {
    id: 5,
    unitId: 3,
    unitName: 'Unit 3: Operating System and Office Tools',
    unitHindi: 'इकाई 3: ऑपरेटिंग सिस्टम एवं ऑफिस टूल्स',
    unitEnglish: 'Unit 3: Operating System and Office Tools',
    chapterNumber: 5,
    titleHindi: 'माइक्रोसॉफ्ट विंडोज़ 7/10',
    titleEnglish: 'Microsoft Windows Operating System',
    pageRange: '129 - 162',
    overview: 'ऑपरेटिंग सिस्टम के कार्य, GUI, डेस्कटॉप, टास्कबार, विंडोज़ एक्सप्लोरर एवं सहायक टूल्स।',
    overviewEnglish: 'Core functions of Operating Systems, Graphical User Interface (GUI), Desktop components, Taskbar, Windows Explorer file and folder management, Control Panel, and built-in accessories (Notepad, Paint, Calculator, Snipping Tool).',
    keyPoints: [
      'ऑपरेटिंग सिस्टम हार्डवेयर और प्रयोक्ता के मध्य मध्यस्थ (Interface) है।',
      'GUI में आइकन, मेन्यू और पॉइंटर द्वारा कार्य सरलता से होता है।',
      'विंडोज़ एक्सप्लोरर में फाइल व फोल्डर का पदानुक्रम (Hierarchy) दिखता है।'
    ],
    keyPointsEnglish: [
      'An Operating System acts as an intermediary bridge between computer hardware and the human user.',
      'Key OS functions: Process management, Memory allocation, File system management, and Device management.',
      'GUI (Graphical User Interface) enables intuitive computing using visual Windows, Icons, Menus, and Pointer (WIMP).',
      'The Windows Desktop contains Desktop Icons, Wallpaper, and the Taskbar with Start Button and System Tray.',
      'File paths follow hierarchical folder structures (e.g., C:\\Users\\Student\\Documents\\Notes.docx).',
      'Essential Windows Accessories include Notepad, WordPad, Paint, Calculator, and Snipping Tool.'
    ],
    sections: [
      {
        title: '1. Role and Core Functions of an Operating System',
        titleEnglish: '1. Role and Core Functions of an Operating System',
        subsections: [
          {
            subtitle: 'Fundamental Responsibilities of an OS',
            subtitleEnglish: 'Fundamental Responsibilities of an OS',
            content: [
              '• Process Management: Coordinates CPU time allocation among competing programs via scheduling algorithms.',
              '• Memory Management: Allocates and reclaims primary memory (RAM) segments dynamically to prevent program crashes.',
              '• File Management: Organizes files on hard drives using hierarchical directories, access permissions, and file systems (NTFS, FAT32).',
              '• Device / Driver Management: Uses specialized device drivers to communicate with printers, graphic cards, and external storage.',
              '• User Interface: Provides CLI (Command Line Interface - DOS, Linux shell) or GUI (Graphical User Interface - Windows, macOS).'
            ]
          }
        ]
      },
      {
        title: '2. The Windows Graphical Environment',
        titleEnglish: '2. The Windows Graphical Environment',
        subsections: [
          {
            subtitle: 'Desktop Elements and Taskbar Management',
            subtitleEnglish: 'Desktop Elements and Taskbar Management',
            content: [
              '• Desktop: The primary visual work surface displayed immediately after user authentication.',
              '• Desktop Icons: Graphical shortcuts pointing to files, applications, or system locations (e.g., This PC, Recycle Bin, Network).',
              '• Taskbar: The horizontal strip at the bottom of the screen housing the Start Menu button, pinned application icons, running task buttons, and the Notification Area (System Tray with clock and Wi-Fi status).'
            ]
          },
          {
            subtitle: 'File and Folder Operations in Windows Explorer',
            subtitleEnglish: 'File and Folder Operations in Windows Explorer',
            content: [
              '• Creating Folders: Right-click -> New -> Folder, or press Ctrl + Shift + N.',
              '• Renaming: Select file and press F2, or right-click -> Rename.',
              '• Permanent Deletion: Press Shift + Delete to bypass the Recycle Bin completely.'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Which shortcut key permanently deletes a file without sending it to the Recycle Bin?',
        questionEnglish: 'Which shortcut key permanently deletes a file without sending it to the Recycle Bin?',
        options: { 'A': 'Ctrl + Delete', 'B': 'Shift + Delete', 'C': 'Alt + Delete', 'D': 'Delete' },
        correctOption: 'B',
        explanation: 'Shift + Delete permanently deletes files bypassing the Recycle Bin.'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'Name three standard Windows accessories.',
        questionEnglish: 'Name three standard Windows accessories.',
        answer: 'Notepad, Paint, and Calculator.',
        answerEnglish: '1. Notepad, 2. Paint, 3. Calculator.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'What are the main functions performed by an Operating System?',
        questionEnglish: 'What are the main functions performed by an Operating System?',
        answer: 'Process management, memory management, file management, device driver management, and user interface provision.',
        answerEnglish: 'Process management, memory allocation, storage file management, input/output device control, and providing a user interface.'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Explain the Graphical User Interface (GUI) and describe the components of the Windows Desktop.',
        questionEnglish: 'Explain the Graphical User Interface (GUI) and describe the components of the Windows Desktop.',
        answer: 'GUI uses icons, menus, and pointers. The Windows Desktop includes desktop shortcuts, Start menu, taskbar, notification tray, and Windows Explorer.',
        answerEnglish: 'GUI allows users to interact with graphical icons and visual indicators rather than typing commands. Desktop components include desktop icons, wallpaper, taskbar with Start button, and system notification tray.'
      }
    ]
  },
  6: {
    id: 6,
    unitId: 3,
    unitName: 'Unit 3: Operating System and Office Tools',
    unitHindi: 'इकाई 3: ऑपरेटिंग सिस्टम एवं ऑफिस टूल्स',
    unitEnglish: 'Unit 3: Operating System and Office Tools',
    chapterNumber: 6,
    titleHindi: 'माइक्रोसॉफ्ट वर्ड (MS Word)',
    titleEnglish: 'Microsoft Word (Word Processing)',
    pageRange: '163 - 198',
    overview: 'वर्ड प्रोसेसर की विशेषताएं, रिबन, टेक्स्ट फॉर्मेटिंग, टेबल, मेल मर्ज एवं पेज लेआउट।',
    overviewEnglish: 'Word processor capabilities, Ribbon interface, Text formatting (Font, Size, Style, Color, Alignment), Bulleted lists, Tables, Mail Merge automation, Page Layout (Margins, Orientation, Headers/Footers), and essential keyboard shortcuts.',
    keyPoints: [
      'एमएस वर्ड एक शक्तिशाली वर्ड प्रोसेसिंग सॉफ्टवेयर है।',
      'मेल मर्ज द्वारा एक ही पत्र अनेक व्यक्तियों को अलग-अलग पते पर भेजा जा सकता है।',
      'Ctrl + B (बोल्ड), Ctrl + I (इटैलिक), Ctrl + U (अंडरलाइन) प्रमुख शॉर्टकट हैं।'
    ],
    keyPointsEnglish: [
      'Microsoft Word is a feature-packed word processing application for creating documents, letters, reports, and books.',
      'The Ribbon interface organizes tools into Tabs (Home, Insert, Page Layout, Mailings, Review, View) and Groups.',
      'Paragraph alignments: Left (Ctrl + L), Center (Ctrl + E), Right (Ctrl + R), and Justified (Ctrl + J).',
      'Mail Merge automates mass personalized correspondence by merging a Main Document with a Data Source.',
      'Page Orientation options: Portrait (vertical) and Landscape (horizontal).'
    ],
    sections: [
      {
        title: '1. Introduction to Microsoft Word and the Ribbon Interface',
        titleEnglish: '1. Introduction to Microsoft Word and the Ribbon Interface',
        subsections: [
          {
            subtitle: 'Core Capabilities and Screen Components',
            subtitleEnglish: 'Core Capabilities and Screen Components',
            content: [
              '• Microsoft Word is a complete word processing system supporting text editing, typographic styling, spelling checks, and multimedia integration.',
              '• Title Bar: Displays document title and application control buttons (Minimize, Maximize, Close).',
              '• Quick Access Toolbar: Customizable toolbar containing frequent commands (Save: Ctrl + S, Undo: Ctrl + Z, Redo: Ctrl + Y).',
              '• The Ribbon: Tabbed interface dividing features logically into Home, Insert, Page Layout, References, Mailings, Review, and View.'
            ]
          }
        ]
      },
      {
        title: '2. Text Formatting and Typography',
        titleEnglish: '2. Text Formatting and Typography',
        subsections: [
          {
            subtitle: 'Character and Paragraph Formatting',
            subtitleEnglish: 'Character and Paragraph Formatting',
            content: [
              '• Font Styling: Bold (Ctrl + B), Italic (Ctrl + I), Underline (Ctrl + U), Strikethrough, Subscript (Ctrl + =), Superscript (Ctrl + Shift + +).',
              '• Paragraph Alignment: Left align, Center align, Right align, and Justify (smooth margins on both edges).',
              '• Lists: Bulleted lists, Numbered lists, and Multilevel outline numbering.'
            ]
          }
        ]
      },
      {
        title: '3. Mail Merge Automation',
        titleEnglish: '3. Mail Merge Automation',
        subsections: [
          {
            subtitle: 'The Mechanics of Mail Merge',
            subtitleEnglish: 'The Mechanics of Mail Merge',
            content: [
              'Mail Merge is an automated feature in MS Word used to generate hundreds of personalized letters, envelopes, certificate prints, or exam admit cards.',
              'It requires two files:',
              '1. Main Document: Contains the common fixed text, letter body, and placeholder merge fields.',
              '2. Data Source: The structured recipient database or Excel table containing individual names, addresses, and roll numbers.',
              'When merged, Word produces an individual customized letter for every recipient record.'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Which shortcut key in MS Word is used to center-align a paragraph?',
        questionEnglish: 'Which shortcut key in MS Word is used to center-align a paragraph?',
        options: { 'A': 'Ctrl + C', 'B': 'Ctrl + E', 'C': 'Ctrl + J', 'D': 'Ctrl + R' },
        correctOption: 'B',
        explanation: 'Ctrl + E aligns text to the center (Ctrl + C is for copy).'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'What are the two components required to perform a Mail Merge?',
        questionEnglish: 'What are the two components required to perform a Mail Merge?',
        answer: 'Main Document and Data Source.',
        answerEnglish: '1. Main Document, 2. Data Source.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'What is the purpose of Mail Merge in MS Word?',
        questionEnglish: 'What is the purpose of Mail Merge in MS Word?',
        answer: 'Mail Merge is used to send personalized documents (letters, certificates, notices) to many recipients without typing each one manually.',
        answerEnglish: 'Mail Merge automates mass document generation by combining a standard letter template with a database of recipient names and addresses.'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Describe the main tabs on the MS Word Ribbon and their key tools.',
        questionEnglish: 'Describe the main tabs on the MS Word Ribbon and their key tools.',
        answer: 'Home (Font, Paragraph, Styles), Insert (Tables, Pictures, Header/Footer), Page Layout (Margins, Orientation), Mailings (Mail Merge), Review (Spelling & Grammar).',
        answerEnglish: 'The Home tab houses font, alignment, and clipboard tools. The Insert tab provides tables, images, and page numbers. Page Layout sets margins, orientation, and columns. Mailings manages Mail Merge. Review provides spelling and grammar checks.'
      }
    ]
  },
  7: {
    id: 7,
    unitId: 3,
    unitName: 'Unit 3: Operating System and Office Tools',
    unitHindi: 'इकाई 3: ऑपरेटिंग सिस्टम एवं ऑफिस टूल्स',
    unitEnglish: 'Unit 3: Operating System and Office Tools',
    chapterNumber: 7,
    titleHindi: 'माइक्रोसॉफ्ट एक्सेल (MS Excel)',
    titleEnglish: 'Microsoft Excel (Spreadsheets)',
    pageRange: '199 - 232',
    overview: 'स्प्रेडशीट की अवधारणा, वर्कबुक, वर्कशीट, सेल, फॉर्मूले व फंक्शन, चार्ट्स एवं डेटा सॉर्टिंग।',
    overviewEnglish: 'Spreadsheet concepts, Workbooks vs Worksheets, Cell addressing, Formulas and Built-in Functions (SUM, AVERAGE, MIN, MAX, COUNT, IF, VLOOKUP), Chart visualizations, and Data Sorting & Filtering.',
    keyPoints: [
      'एक्सेल में प्रत्येक फार्मूला हमेशा बराबर (=) चिह्न से प्रारंभ होता है।',
      'रो (1, 2, 3...) और कॉलम (A, B, C...) के प्रतिच्छेदन को सेल (Cell) कहते हैं।',
      '=SUM(A1:A10) सेल रेंज A1 से A10 का कुल योग करता है।'
    ],
    keyPointsEnglish: [
      'In Microsoft Excel, every formula must begin with an equal sign (=).',
      'The intersection of a row (numbered 1, 2, 3...) and a column (lettered A, B, C...) is called a Cell.',
      'Active Cell address is displayed in the Name Box; cell contents and formulas appear in the Formula Bar.',
      'Fundamental mathematical functions include SUM(), AVERAGE(), MIN(), MAX(), and COUNT().',
      'Logical function IF() executes conditional tests: =IF(Logical_Test, Value_if_True, Value_if_False).',
      'Excel Charts visualize numeric trends: Column Chart, Bar Chart, Line Graph, and Pie Chart.'
    ],
    sections: [
      {
        title: '1. Spreadsheet Concepts and Excel Grid Structure',
        titleEnglish: '1. Spreadsheet Concepts and Excel Grid Structure',
        subsections: [
          {
            subtitle: 'Workbook, Worksheet, and Cell Addressing',
            subtitleEnglish: 'Workbook, Worksheet, and Cell Addressing',
            content: [
              '• Workbook: An Excel file (.xlsx) consisting of one or more worksheets (tabs).',
              '• Worksheet: A single spreadsheet grid composed of horizontal Rows (1 to 1,048,576) and vertical Columns (A to XFD - 16,384 columns).',
              '• Cell: The fundamental data container formed by the intersection of a column and row (e.g., cell B5 is column B, row 5).',
              '• Cell Range: A group of contiguous selected cells denoted with a colon, such as A1:D10.'
            ]
          }
        ]
      },
      {
        title: '2. Formulas and Built-In Statistical Functions',
        titleEnglish: '2. Formulas and Built-In Statistical Functions',
        subsections: [
          {
            subtitle: 'Essential Excel Functions',
            subtitleEnglish: 'Essential Excel Functions',
            content: [
              '• =SUM(A1:A10): Computes the arithmetic total of numbers in range A1 to A10.',
              '• =AVERAGE(B1:B20): Calculates the arithmetic mean value.',
              '• =MAX(C1:C50) / =MIN(C1:C50): Finds the maximum or minimum value in the dataset.',
              '• =COUNT(D1:D100): Counts the number of cells containing numeric values.',
              '• =IF(E2>=33, "PASS", "FAIL"): Tests a logical condition and returns corresponding outputs.'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Which character MUST every formula in MS Excel begin with?',
        questionEnglish: 'Which character MUST every formula in MS Excel begin with?',
        options: { 'A': '+', 'B': '=', 'C': '#', 'D': '@' },
        correctOption: 'B',
        explanation: 'Every Excel formula must start with an equal sign (=).'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'Write the Excel formula to calculate the average of cells B1 to B10.',
        questionEnglish: 'Write the Excel formula to calculate the average of cells B1 to B10.',
        answer: '=AVERAGE(B1:B10)',
        answerEnglish: '=AVERAGE(B1:B10)'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'What is the difference between a Workbook and a Worksheet in Excel?',
        questionEnglish: 'What is the difference between a Workbook and a Worksheet in Excel?',
        answer: 'A workbook is the entire Excel file, while a worksheet is an individual spreadsheet sheet inside the workbook.',
        answerEnglish: 'A workbook is the complete Excel document file containing multiple sheets. A worksheet is an individual grid of columns and rows within the workbook.'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Explain five essential functions in MS Excel with their syntax and examples.',
        questionEnglish: 'Explain five essential functions in MS Excel with their syntax and examples.',
        answer: '1. =SUM(A1:A5), 2. =AVERAGE(A1:A5), 3. =MAX(A1:A5), 4. =MIN(A1:A5), 5. =IF(A1>=40, "Pass", "Fail").',
        answerEnglish: '1. =SUM(range) adds numeric values; 2. =AVERAGE(range) calculates arithmetic mean; 3. =MAX(range) and 4. =MIN(range) return largest and smallest numbers; 5. =IF(test, true, false) performs conditional evaluation.'
      }
    ]
  },
  8: {
    id: 8,
    unitId: 4,
    unitName: 'Unit 4: Social Impact of Computers and Cyber Law',
    unitHindi: 'इकाई 4: कम्प्यूटर का समाज पर प्रभाव एवं साइबर कानून',
    unitEnglish: 'Unit 4: Social Impact of Computers and Cyber Law',
    chapterNumber: 8,
    titleHindi: 'कम्प्यूटर का समाज पर प्रभाव एवं साइबर कानून',
    titleEnglish: 'Impact of Computers on Society and Cyber Ethics',
    pageRange: '233 - 264',
    overview: 'ई-शासन, ई-कॉमर्स, साइबर अपराध, बौद्धिक संपदा अधिकार एवं आईटी अधिनियम 2000।',
    overviewEnglish: 'E-Governance, E-Commerce, E-Learning, Cyber Crimes (Hacking, Phishing, Identity Theft), Intellectual Property Rights (Copyright, Patents, Trademarks, Plagiarism), Indian IT Act 2000, and Cyber Ethics.',
    keyPoints: [
      'ई-शासन (E-Governance) द्वारा सरकारी सेवाएं नागरिकों को डिजिटल रूप से मिलती हैं।',
      'दूसरे की रचना को बिना संदर्भ अपने नाम से प्रकाशित करना साहित्यिक चोरी (Plagiarism) है।',
      'भारत में साइबर अपराधों पर नियंत्रण हेतु IT Act 2000 लागू किया गया।'
    ],
    keyPointsEnglish: [
      'E-Governance delivers transparent, fast, and accessible government services to citizens online (G2C, G2B, G2G).',
      'E-Commerce models: B2C (Business to Consumer), B2B (Business to Business), C2C (Consumer to Consumer).',
      'Cyber crimes include Hacking, Phishing, Identity Theft, Ransomware, Cyberstalking, and Online Financial Fraud.',
      'Intellectual Property Rights (IPR) safeguard creative and scientific inventions through Copyrights, Patents, and Trademarks.',
      'Plagiarism is the unethical copying of another person\'s work or ideas without proper citation.',
      'The Information Technology Act 2000 (IT Act 2000) is the legal framework governing cyber crimes and digital signatures in India.'
    ],
    sections: [
      {
        title: '1. Societal Transformations: E-Governance and E-Commerce',
        titleEnglish: '1. Societal Transformations: E-Governance and E-Commerce',
        subsections: [
          {
            subtitle: 'E-Governance and Its Interaction Models',
            subtitleEnglish: 'E-Governance and Its Interaction Models',
            content: [
              'E-Governance uses Information and Communication Technology (ICT) to transform government interactions with citizens and businesses:',
              '• G2C (Government to Citizen): Issuing birth certificates, digital land records, utility bill payments (e-Mitra in Rajasthan).',
              '• G2B (Government to Business): Online business registration, corporate taxation, digital tenders.',
              '• G2G (Government to Government): Inter-departmental coordination and digital file tracking.'
            ]
          },
          {
            subtitle: 'E-Commerce and Digital Economy',
            subtitleEnglish: 'E-Commerce and Digital Economy',
            content: [
              '• B2C (Business to Consumer): Amazon, Flipkart, online grocery delivery.',
              '• B2B (Business to Business): Bulk manufacturing trades between industrial suppliers.',
              '• C2C (Consumer to Consumer): Peer-to-peer auction and resale platforms (OLX, eBay).'
            ]
          }
        ]
      },
      {
        title: '2. Cyber Crimes and Digital Threats',
        titleEnglish: '2. Cyber Crimes and Digital Threats',
        subsections: [
          {
            subtitle: 'Prevalent Cyber Threat Categories',
            subtitleEnglish: 'Prevalent Cyber Threat Categories',
            content: [
              '• Hacking: Unauthorized penetration into computer systems or networks to steal, alter, or destroy private data.',
              '• Phishing: Fraudulent emails or replica banking websites designed to deceive victims into surrendering passwords and credit card PINs.',
              '• Cyberbullying / Stalking: Harassment, defamation, or intimidation carried out across social media or messaging platforms.'
            ]
          }
        ]
      },
      {
        title: '3. Intellectual Property Rights (IPR) and Cyber Law',
        titleEnglish: '3. Intellectual Property Rights (IPR) and Cyber Law',
        subsections: [
          {
            subtitle: 'Pillars of Intellectual Property Rights',
            subtitleEnglish: 'Pillars of Intellectual Property Rights',
            content: [
              '• Copyright: Legal right granting creators exclusive control over literary, artistic, musical, and software code creations.',
              '• Patent: Exclusive governmental grant protecting scientific and industrial technical inventions for 20 years.',
              '• Trademark: Distinctive logos, brand names, or symbols distinguishing a company\'s products in commerce.',
              '• Plagiarism: Presenting another author\'s text, research, or creative work as one\'s own without explicit attribution.'
            ]
          },
          {
            subtitle: 'The Indian Information Technology Act, 2000 (IT Act 2000)',
            subtitleEnglish: 'The Indian Information Technology Act, 2000 (IT Act 2000)',
            content: [
              'Enacted by the Parliament of India in October 2000 to grant legal recognition to electronic transactions, digital signatures, and prescribe strict penalties/imprisonment for computer-based offenses.'
            ]
          }
        ]
      }
    ],
    diagrams: [],
    mcqs: [
      {
        id: 1,
        question: 'Publishing someone else\'s research or creative writing under your own name without attribution is called:',
        questionEnglish: 'Publishing someone else\'s research or creative writing under your own name without attribution is called:',
        options: { 'A': 'Integrity', 'B': 'Plagiarism', 'C': 'Open Source', 'D': 'Encryption' },
        correctOption: 'B',
        explanation: 'Plagiarism is copying another\'s work without citation.'
      },
      {
        id: 2,
        question: 'Which law governs cyber crimes and electronic records in India?',
        questionEnglish: 'Which law governs cyber crimes and electronic records in India?',
        options: { 'A': 'Companies Act', 'B': 'IT Act 2000', 'C': 'Consumer Act', 'D': 'Copyright Act 1957' },
        correctOption: 'B',
        explanation: 'Information Technology Act 2000 is India\'s cyber law.'
      }
    ],
    veryShortQuestions: [
      {
        id: 1,
        question: 'What is Plagiarism?',
        questionEnglish: 'What is Plagiarism?',
        answer: 'Using someone else\'s work, ideas, or words without giving them credit is Plagiarism.',
        answerEnglish: 'Plagiarism is the unethical copying or representation of another author\'s work as one\'s own without proper credit.'
      }
    ],
    shortQuestions: [
      {
        id: 1,
        question: 'What are the main objectives of the Indian IT Act 2000?',
        questionEnglish: 'What are the main objectives of the Indian IT Act 2000?',
        answer: 'To grant legal recognition to electronic commerce and digital records, and to penalize cyber crimes like hacking and identity theft.',
        answerEnglish: 'To provide legal validation to electronic data interchange and digital signatures, and to penalize cyber crimes.'
      }
    ],
    longQuestions: [
      {
        id: 1,
        question: 'Explain Intellectual Property Rights (IPR) covering Copyrights, Patents, Trademarks, and Plagiarism.',
        questionEnglish: 'Explain Intellectual Property Rights (IPR) covering Copyrights, Patents, Trademarks, and Plagiarism.',
        answer: 'Copyrights protect artistic/literary works. Patents protect technical inventions. Trademarks protect logos and brands. Plagiarism is unauthorized copying without citation.',
        answerEnglish: 'IPR grants legal ownership over intellectual creations: Copyright protects literary and software works; Patents protect scientific and industrial inventions; Trademarks protect commercial logos; Plagiarism is the violation of intellectual honesty by stealing work without citation.'
      }
    ]
  }
};
