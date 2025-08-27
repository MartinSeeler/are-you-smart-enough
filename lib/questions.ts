import { QuestionCatalog } from "@/lib/types";

export const questionCatalogs: QuestionCatalog[] = [
  {
    grade: 11,
    subject: "Künstliche Intelligenz",
    questions: [
      {
        type: "text",
        topic: "Einstieg",
        question:
          "Was versteht man unter Künstlicher Intelligenz?",
        referenceAnswer:
          "KI ist der Versuch, Maschinen menschenähnliches Denken und Handeln beizubringen. Das heißt: Computer sollen nicht nur stumpf Befehle ausführen, sondern eigenständig lernen, Probleme lösen oder Entscheidungen treffen.",
      },
      {
        type: "text",
        topic: "Einstieg",
        question:
          "Was unterscheidet KI von klassischer Programmierung?",
        referenceAnswer:
          'Bei klassischer Programmierung schreibt ein Mensch alle Regeln vor. Bei KI, speziell maschinellem Lernen, entwickelt die Maschine Regeln selbst, indem sie aus Daten Muster erkennt.',
      },
      {
        type: "text",
        topic:
          "Einstieg",
        question:
          "Nenne zwei wichtige Entwicklungsschritte in der Geschichte der KI",
        referenceAnswer:
          "1956 Dartmouth Conference, Expertensysteme 1980er, Durchbruch Deep Learning ab 2010",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Was versteht man unter maschinellem Lernen?",
        referenceAnswer:
          "Maschinelles Lernen bedeutet, dass ein System aus Beispieldaten lernt, ohne dass es explizit für jede Aufgabe programmiert wird. Es erkennt Strukturen in Daten und kann dadurch Vorhersagen oder Entscheidungen treffen.",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Welche Arten von maschinellem Lernen gibt es?",
        referenceAnswer:
          "Überwachtes Lernen: Trainieren mit Eingaben und bekannten Ergebnissen (z. B. Handschriftenerkennung). Unüberwachtes Lernen: Muster finden ohne vorgegebene Ergebnisse (z. B. Kundengruppen clustern). Bestärkendes Lernen: Lernen durch Belohnung und Bestrafung (z. B. Roboter lernt Gehen, KI spielt Spiele).",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Was ist Deep Learning?",
        referenceAnswer:
          "Deep Learning ist ein spezieller Bereich des maschinellen Lernens, der mit künstlichen neuronalen Netzen arbeitet. Diese haben viele Schichten („deep“) und können dadurch extrem komplexe Muster in Daten erkennen, z. B. bei Bildern oder Sprache.",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Worin liegt der Unterschied zwischen maschinellem Lernen und Deep Learning?",
        referenceAnswer:
          "ML: braucht oft vorverarbeitete Daten und ist einfacher aufgebaut. DL: arbeitet mit großen neuronalen Netzen, kann Rohdaten direkt verarbeiten (z. B. Pixel eines Bildes) und liefert meist bessere Ergebnisse, braucht aber viel Rechenleistung und Daten.",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Wo begegnet uns maschinelles Lernen im Alltag?",
        referenceAnswer:
          "Beispiele: Streaming-Dienste schlagen Filme/Musik vor. Spamfilter sortieren E-Mails. Banken erkennen Kreditkartenbetrug.",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Wo begegnet uns Deep Learning im Alltag?",
        referenceAnswer:
          "Beispiele: Gesichtserkennung auf Smartphones. Autonomes Fahren (Verkehrszeichen und Hindernisse erkennen). Sprachassistenten verstehen und beantworten Fragen.",
      },
      {
        type: "text",
        topic:
          "Vertiefung",
        question:
          "Warum ist KI ein wichtiges Zukunftsthema?",
        referenceAnswer:
          "Weil sie viele Lebensbereiche verändern kann: Medizin, Verkehr, Bildung, Wirtschaft. Chancen sind effizientere Prozesse und neue Möglichkeiten, Risiken sind Kontrollverlust, Abhängigkeit und ethische Fragen.",
      },
    ],
  },
];
