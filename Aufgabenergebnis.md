# Projekt-Dokumentation

## Klone das Repository per SSH und starte den Server und den Client:

```
git clone git@github.com:oleksandrsokaliuk/UDG-task.git
```

```
cd UDG-task
```

```
$ cd solution
```

```
npm i
```

```
npm start
```

## Bibliotheken und Abhängigkeiten.

### Warum JavaScript und React:

JavaScript und React wurden für dieses Projekt gewählt, da sie während des Bootcamps erlernt wurden. Diese Technologien sind meine Hauptentwicklungswerkzeuge, in denen ich über umfangreiche Erfahrung verfüge und in denen ich bequem Code schreibe.

### Warum Express und Axios:

- _**Express**_
  wurde verwendet, um einen Server zu erstellen, da er den direkten Zugriff auf das Dateisystem ermöglicht. Node.js ermöglicht einen direkten Zugriff auf das Dateisystem.
- _**Axios**_
  wird für die einfache Ausführung von HTTP-Anfragen zwischen Client und Server verwendet.

### Warum _**body-parser**_ und _**cors**_:

- _**body-parser**_
  dient als Middleware zur Verarbeitung von Daten, die vom Client übermittelt werden. Dies ist besonders wichtig für die Arbeit mit Daten, insbesondere beim Austausch von umfangreichen Informationen.
- _**cors**_
  wird verwendet, um Cross-Origin-Anfragen zu ermöglichen und die Sicherheit der Interaktion zwischen Server und Client zu gewährleisten.

### Zusätzliche Bibliotheken:

- _**react-papaparse**_
  wird verwendet, um Daten in CSV-Dateien zu manipulieren, die auf dem Server gelesen werden.
- _**chart.js**_ und _**react-chartjs-2**_
  wurden angewendet, um Diagramme und Grafiken zur Visualisierung von Daten zu erstellen.
- _**react-icons**_
  wird verwendet, um Icons schnell zu laden.
- _**react-loader-spinner**_
  wurde angewendet, um vorhandene Ladekomponenten ohne Erstellung neuer zu verwenden.
- _**react-paginate**_
  wird eingesetzt, um eine Paginierung zu erstellen und die Benutzeroberflächenbelastung bei der Arbeit mit umfangreichen Datenmengen zu optimieren.
- _**concurrently**_
  wird verwendet, um React-Skripte zu kombinieren, um Server und Client bequem mit einem Skript zu starten.

### Gebrauchsanleitung mit GIF:

_Für Ihre Bequemlichkeit finden Sie unten ein GIF, das zeigt, wie Sie die Benutzeroberfläche des Projekts verwenden._
![Verwendung der Oberfläche](/presentation.gif)
