# CLAUDE.md

Hinweise für die Arbeit an diesem Projekt: den Webshop von HavanaSmokersClub.ch im Design «Die Depesche».
Überblick, Befehle und die offenen Punkte vor dem Launch stehen in der [README](README.md). Das Design ist in [docs/design/HANDOFF.md](docs/design/HANDOFF.md) beschrieben.

## Über den Betreiber

Der Betreiber ist kein Programmierer. Erklärungen deshalb in einfachem Deutsch, ohne Fachjargon.
Bei gleichwertigen Lösungen die einfachere und verbreitetere wählen.

## Regeln

- Schweizer Rechtschreibung: immer «ss», nie «ß». Das gilt für Oberfläche, Texte und Kommentare.
- Design-Tokens stehen in `src/app/globals.css` (`:root`). Keine neuen Farben oder Schriften ohne Rücksprache.
- Kein Name, Bild oder Zitat von Ernest Hemingway.
- Alter und Preise werden serverseitig geprüft (`src/lib/order.ts`). Diese Prüfung nie entfernen oder umgehen.
- Vor jedem Push `npm run lint`, `npm test` und `npm run build` ausführen.

## Entscheidungen

### 2026-09-24 · Zuerst Pull Request, danach Produkt-Import

**Entscheid:** Der erste Stand des Shops wird per Pull Request in die Hauptversion (`main`) übernommen. Erst danach folgt der Import des Sortiments aus dem PepperShop.

**Begründung:**
- Der Pull Request kostet nichts und braucht keine Wartung. Er bringt keine neuen Abhängigkeiten und lässt sich mit einem Klick zurücknehmen.
- Danach gibt es einen sauberen, gesicherten Ausgangspunkt, auf dem alle weiteren Schritte aufbauen.
- Für den Betreiber ist er leicht nachvollziehbar: eine Liste der Änderungen und ein Knopf zum Übernehmen.
- Zahlungen und Kundendaten sind davon nicht betroffen.

**Für den folgenden Import vereinbart:** Die Produkte kommen in eine Tabelle, die der Betreiber mit Excel pflegen kann (Preis, Lagerbestand, neue Produkte). Sie werden nicht fest im Code hinterlegt. So braucht der Betreiber für Sortimentsänderungen keinen Programmierer.

**Noch offen:** Die grössere Frage, wo Produkte, Bestellungen und Kundendaten dauerhaft verwaltet werden. Zur Wahl stehen ein fertiges Shop-System mit eigener Verwaltungsoberfläche oder die Verwaltung weiterhin im Projekt. Diese Frage entscheidet über Kosten, Zahlungssicherheit und Wartung und ist separat zu klären.
