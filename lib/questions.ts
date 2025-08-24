import { QuestionCatalog } from "@/lib/types";

export const questionCatalogs: QuestionCatalog[] = [
  {
     grade: 11,
    subject: "Künstliche Intelligenz",
    questions: [
      {
        "type": "multiple_choice",
        "question": "In welchen Teilbereich der Informatik wird Künstliche Intelligenz eingeordnet",
        "options": ["Theoretische Informatik", "Praktische Informatik", "Angewandte Informatik", "Technische Informatik"],
        "correct_answers": ["Angewandte Informatik"]
    },
    {
        "type": "multiple_choice",
        "question": "Welche Aussagen zu den Bereichen der Informatik sind falsch",
        "options": [
            "Die theoretische Informatik entwickelt Algorithmen",
            "Die praktische Informatik baut Hardware",
            "Die technische Informatik befasst sich mit Prozessoren und Speicher",
            "Die angewandte Informatik nutzt Informatikmethoden für konkrete Probleme"
        ],
        "correct_answers": [
            "Die praktische Informatik baut Hardware"
        ]
    },
    {
        "type": "open",
        "question": "Nenne zwei wichtige Entwicklungsschritte in der Geschichte der KI",
        "reference_answer": "1956 Dartmouth Conference, Expertensysteme 1980er, Durchbruch Deep Learning ab 2010"
    },
    {
        "type": "multiple_choice",
        "question": "Welcher Zusammenhang ist richtig",
        "options": [
            "KI ist ein Teil von Machine Learning",
            "Machine Learning ist ein Teil von KI",
            "Machine Learning ist ein spezieller Bereich von Deep Learning",
            "Deep Learning ist unabhängig von Machine Learning"
        ],
        "correct_answers": [
            "Machine Learning ist ein Teil von KI"
        ]
    },
    {
        "type": "open",
        "question": "Gib ein konkretes Anwendungsgebiet von KI an und beschreibe, wie es funktioniert",
        "reference_answer": "Medizinische Diagnostik, autonome Fahrzeuge, Chatbots usw."
    },
    {
        "type": "multiple_choice",
        "question": "Welche Art von Daten nutzt Deep Learning besonders effektiv",
        "options": [
            "Kleine strukturierte Tabellen",
            "Große Mengen unstrukturierter Daten wie Bilder oder Videos",
            "Nur Textdateien",
            "Daten mit wenigen Merkmalen"
        ],
        "correct_answers": ["Große Mengen unstrukturierter Daten wie Bilder oder Videos"]
    },
    {
        "type": "open",
        "question": "Nenne zwei Chancen und zwei Grenzen von KI",
        "reference_answer": "Chancen: Effizienz, neue Lösungen; Grenzen: Datenschutz, Bias"
    },
    {
        "type": "multiple_choice",
        "question": "Warum ist es nicht wichtig, ethische Fragen bei der Entwicklung von KI zu berücksichtigen",
        "options": [
            "Damit die KI effizient arbeitet",
            "Um gesellschaftliche Schäden zu vermeiden",
            "Damit keine unfairen Entscheidungen getroffen werden",
            "Damit die KI legal betrieben werden kann"
        ],
        "correct_answers": [
            "Damit die KI effizient arbeitet"
        ],
    },
];
