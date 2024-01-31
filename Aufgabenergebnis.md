# Projekt-Dokumentation

## Klone das Repository per SSH und starte den Server und den Client:

`git clone git@github.com:oleksandrsokaliuk/UDG-task.git`
`cd UDG-task`
`$ cd solution`
`npm i`
`npm start`

## Bibliotheken und Abhängigkeiten.

### Warum JavaScript und React:

JavaScript und React wurden für dieses Projekt gewählt, da sie während des Bootcamps erlernt wurden. Diese Technologien sind meine Hauptentwicklungswerkzeuge, in denen ich über umfangreiche Erfahrung verfüge und in denen ich bequem Code schreibe.

### Warum Express und Axios:

- **Express**
  Wurde verwendet, um einen Server zu erstellen, da er den direkten Zugriff auf das Dateisystem ermöglicht. Node.js ermöglicht einen direkten Zugriff auf das Dateisystem.
- **Axios**
  Wird für die einfache Ausführung von HTTP-Anfragen zwischen Client und Server verwendet.

### Warum **body-parser** und **cors**:

- **body-parser**
  Dient als Middleware zur Verarbeitung von Daten, die vom Client übermittelt werden. Dies ist besonders wichtig für die Arbeit mit Daten, insbesondere beim Austausch von umfangreichen Informationen.
- **cors**
  Wird verwendet, um Cross-Origin-Anfragen zu ermöglichen und die Sicherheit der Interaktion zwischen Server und Client zu gewährleisten.

### Zusätzliche Bibliotheken:

- **react-papaparse**
  Wird verwendet, um Daten in CSV-Dateien zu manipulieren, die auf dem Server gelesen werden.
- **chart.js** und **react-chartjs-2**
  Wurden angewendet, um Diagramme und Grafiken zur Visualisierung von Daten zu erstellen.
- **react-icons**
  Wird verwendet, um Icons schnell zu laden.
- **react-loader-spinner**
  Wurde angewendet, um vorhandene Ladekomponenten ohne Erstellung neuer zu verwenden.
- **react-paginate**
  Wird eingesetzt, um eine Paginierung zu erstellen und die Benutzeroberflächenbelastung bei der Arbeit mit umfangreichen Datenmengen zu optimieren.
- **concurrently**
  Wird verwendet, um React-Skripte zu kombinieren, um Server und Client bequem mit einem Skript zu starten.

### Gebrauchsanleitung mit GIF:

_Für Ihre Bequemlichkeit finden Sie unten ein GIF, das zeigt, wie Sie die Benutzeroberfläche des Projekts verwenden._
![Verwendung der Oberfläche](./presentation.gif)
