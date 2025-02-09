import { QuestionCatalog } from "@/lib/types";

export const questionCatalogs: QuestionCatalog[] = [
  {
    grade: 10,
    subject: "Geschichte",
    questions: [
      {
        type: "text",
        topic: "Beziehungen zwischen USA und UdSSR im 20. Jahrhundert",
        question:
          "Welche Ereignisse führten zur Verschärfung der Spannungen zwischen den USA und der UdSSR nach dem Zweiten Weltkrieg?",
        referenceAnswer:
          "Die Spannungen verschärften sich durch ideologische Gegensätze (Kapitalismus vs. Kommunismus), die Aufteilung Europas in Einflusszonen, den Marshallplan der USA und die Gründung der NATO. Die UdSSR reagierte mit der Einrichtung des Warschauer Pakts und der Blockade Berlins.",
      },
      {
        type: "text",
        topic: "Beziehungen zwischen USA und UdSSR im 20. Jahrhundert",
        question:
          "Welche Rolle spielte die Kubakrise im Kontext der Beziehungen zwischen den USA und der UdSSR?",
        referenceAnswer:
          'Die Kubakrise von 1962 war ein Höhepunkt des Kalten Krieges, als die UdSSR Raketen auf Kuba stationierte, was die USA als Bedrohung sahen. Nach intensiven Verhandlungen wurde ein Atomkrieg abgewendet, was zu einer Entspannung und Einrichtung eines "heißen Drahtes" zwischen Washington und Moskau führte.',
      },
      {
        type: "text",
        topic:
          "Der Ost-West-Konflikt – Ursachen und Auswirkungen für Deutschland",
        question:
          "Wie wurde Deutschland nach dem Zweiten Weltkrieg in den Ost-West-Konflikt einbezogen?",
        referenceAnswer:
          "Deutschland wurde in die BRD (Westdeutschland, unter Einfluss der USA und NATO) und die DDR (Ostdeutschland, unter sowjetischer Kontrolle) geteilt. Berlin wurde ebenfalls geteilt, was die Spannungen symbolisierte.",
      },
    ],
  },
  {
    grade: 10,
    subject: "Deutsch",
    questions: [
      {
        type: "multiple-choice",
        topic: "Rhetorische Mittel",
        question: "Was ist eine Metapher?",
        options: [
          'Ein Vergleich ohne "wie"',
          "Ein Gegenteil von etwas",
          "Ein Synonym",
          "Ein rhetorisches Mittel, das Widersprüche vereint",
        ],
        referenceAnswer: 'Ein Vergleich ohne "wie"',
      },
      {
        type: "text",
        topic: "Rhetorische Mittel",
        question: 'Erkläre den Begriff "Ironie".',
        referenceAnswer:
          "Ironie ist eine Form der Rede, bei der das Gegenteil dessen gemeint ist, was gesagt wird.",
      },
      {
        type: "multiple-choice",
        topic: "Klassiker der deutschen Literatur",
        question:
          "Welches der folgenden Werke ist von Johann Wolfgang von Goethe?",
        options: ["Faust", "Effi Briest", "Der Steppenwolf", "Die Verwandlung"],
        referenceAnswer: "Faust",
      },
      {
        type: "text",
        topic: "Erzählperspektive",
        question:
          "Was ist der Unterschied zwischen einer Erzählperspektive in der ersten und der dritten Person?",
        referenceAnswer:
          'Bei der Erzählperspektive in der ersten Person erzählt der Erzähler aus der Sicht einer Figur. In der dritten Person erzählt der Erzähler aus einer externen Sicht, indem er die Figuren mit "er", "sie" oder "es" beschreibt.',
      },
    ],
  },
  {
    grade: 10,
    subject: "Englisch",
    questions: [
      {
        type: "text",
        topic: "Future Tenses: Will vs. Going To",
        question:
          'What is the difference between "will" and "going to" when talking about the future?',
        referenceAnswer:
          '"Will" is used for spontaneous decisions or predictions, while "going to" is used when the decision has already been made or when something is about to happen.',
      },
      {
        type: "multiple-choice",
        topic: "Active and Passive Voice: Sentence Transformation",
        question: "Which sentence is in the passive voice?",
        options: [
          "The teacher explains the lesson.",
          "The lesson is explained by the teacher.",
          "The teacher will explain the lesson.",
          "The teacher explained the lesson.",
        ],
        referenceAnswer: "The lesson is explained by the teacher.",
      },
      {
        type: "multiple-choice",
        topic: 'Modal Verbs: Rules for Using "Can"',
        question: "Which of the following is a correct sentence?",
        options: [
          "I can speaks English.",
          "I can speak English.",
          "I can spoke English.",
          "I can speaking English.",
        ],
        referenceAnswer: "I can speak English.",
      },
      {
        type: "text",
        topic: 'Irregular Verbs: The Past Tense of "Go"',
        question: 'What is the past tense of "go"?',
        referenceAnswer: 'The past tense of "go" is "went."',
      },
    ],
  },
  {
    grade: 10,
    subject: "Physik",
    questions: [
      {
        type: "text",
        topic: "Unterschied zwischen Geschwindigkeit und Beschleunigung",
        question:
          "Erkläre den Unterschied zwischen Geschwindigkeit und Beschleunigung.",
        referenceAnswer:
          "Geschwindigkeit gibt an, wie schnell sich ein Objekt bewegt, also die zurückgelegte Strecke pro Zeit. Beschleunigung beschreibt die Änderung der Geschwindigkeit eines Objekts über die Zeit.",
      },
      {
        type: "multiple-choice",
        topic: "Elektrische Spannung und ihre Einheit",
        question:
          "Welche Einheit wird zur Messung der elektrischen Spannung verwendet?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        referenceAnswer: "Volt",
      },
      {
        type: "multiple-choice",
        topic: "Newtonsche Gesetze: Das Trägheitsprinzip",
        question: "Was beschreibt das Gesetz von Newton in Bezug auf Bewegung?",
        options: [
          "Ein Körper bleibt in Ruhe oder in gleichförmiger Bewegung, wenn keine äußeren Kräfte wirken.",
          "Die Geschwindigkeit eines Körpers bleibt konstant.",
          "Alle Körper bewegen sich in einer geraden Linie.",
          "Die Masse eines Körpers bleibt immer gleich.",
        ],
        referenceAnswer:
          "Ein Körper bleibt in Ruhe oder in gleichförmiger Bewegung, wenn keine äußeren Kräfte wirken.",
      },
      {
        type: "text",
        topic: "Reihen- und Parallelschaltungen im Stromkreis",
        question:
          "Was ist der Unterschied zwischen einem Stromkreis in Reihe und einem Stromkreis parallel?",
        referenceAnswer:
          "In einem Reihenschaltung sind die Bauteile hintereinander geschaltet, sodass der Strom durch alle Bauteile fließt. In einer Parallelschaltung sind die Bauteile nebeneinander geschaltet, sodass der Strom sich aufteilt und durch mehrere Wege fließt.",
      },
    ],
  },
  {
    grade: 10,
    subject: "Chemie",
    questions: [
      {
        type: "text",
        topic: "Chemische Reaktionen: Definition und Ablauf",
        question: "Was versteht man unter einer chemischen Reaktion?",
        referenceAnswer:
          "Eine chemische Reaktion ist ein Prozess, bei dem sich die Atome der Ausgangsstoffe (Reaktanten) neu anordnen, um neue Substanzen (Produkte) zu bilden.",
      },
      {
        type: "multiple-choice",
        topic: "Moleküle: Aufbau und Bedeutung",
        question: "Was ist ein Molekül?",
        options: [
          "Ein einzelnes Atom",
          "Eine Ansammlung von Ionen",
          "Eine Verbindung aus zwei oder mehr Atomen",
          "Ein Reinstoff",
        ],
        referenceAnswer: "Eine Verbindung aus zwei oder mehr Atomen",
      },
      {
        type: "multiple-choice",
        topic: "Exotherme Reaktionen: Eigenschaften und Auswirkungen",
        question:
          "Welche der folgenden Aussagen trifft auf eine exotherme Reaktion zu?",
        options: [
          "Sie nimmt Energie auf.",
          "Sie gibt Energie ab.",
          "Sie führt zu einer Temperaturerhöhung der Umgebung.",
          "Beide b) und c) sind richtig.",
        ],
        referenceAnswer: "Beide b) und c) sind richtig.",
      },
      {
        type: "text",
        topic: "Phasenübergänge: Verdampfung eines Stoffes",
        question: "Was passiert bei der Verdampfung eines Stoffes?",
        referenceAnswer:
          "Bei der Verdampfung geht ein Stoff vom flüssigen in den gasförmigen Zustand über, indem seine Moleküle genug Energie aufnehmen, um die Bindungen zu überwinden.",
      },
    ],
  },
  {
    grade: 10,
    subject: "Geographie",
    questions: [
      {
        type: "text",
        topic: "Wetter vs. Klima: Kurzfristige und langfristige Bedingungen",
        question: "Was ist der Unterschied zwischen Wetter und Klima?",
        referenceAnswer:
          "Wetter beschreibt die kurzfristigen atmosphärischen Bedingungen, wie Temperatur, Niederschlag oder Wind, zu einem bestimmten Zeitpunkt und Ort. Klima bezieht sich auf das langfristige durchschnittliche Wetter über einen längeren Zeitraum in einer bestimmten Region.",
      },
      {
        type: "multiple-choice",
        topic: "Die größten Länder der Welt: Flächenvergleich",
        question: "Welches ist das größte Land der Welt nach Fläche?",
        options: ["Kanada", "Russland", "USA", "China"],
        referenceAnswer: "Russland",
      },
      {
        type: "multiple-choice",
        topic: "Wüsten der Welt",
        question: "Was ist die größte Wüste der Welt?",
        options: ["Sahara", "Kalahari", "Gobi", "Antarktische Wüste"],
        referenceAnswer: "Antarktische Wüste",
      },
      {
        type: "text",
        topic: "Der Treibhauseffekt: Ursachen und Auswirkungen",
        question: "Was versteht man unter dem Treibhauseffekt?",
        referenceAnswer:
          "Der Treibhauseffekt beschreibt den Prozess, bei dem Treibhausgase in der Erdatmosphäre Wärme von der Sonne einfangen und zurückhalten, was zu einer Erwärmung der Erde führt.",
      },
    ],
  },
];
