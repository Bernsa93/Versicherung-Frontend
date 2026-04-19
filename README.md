# Versicherungsprämienrechner - Frontend

## Features

- **KI-Fahrzeugklassenermittlung**: Chat-Assistent analysiert Fahrzeugbeschreibungen und schlägt passende Fahrzeugklassen vor
- **Prämienberechnung**: Automatische Berechnung der Versicherungsprämie basierend auf Eingabedaten
- **Dark Mode**: Unterstützung für hell/dunkle Themen
- **Responsive Design**: Optimiert für Desktop und Mobile
- **Formularvalidierung**: Clientseitige Validierung mit aussagekräftigen Fehlermeldungen

## Funktionsweise der KI-Fahrzeugklassenermittlung

1. Öffne das Chat-Fenster "KI-Fahrzeug-Assistent"
2. Beschreibe dein Fahrzeug (z.B. "groß und robust", "schnell und sportlich")
3. Die KI schlägt eine Fahrzeugklasse vor
4. Klicke auf "Annehmen", um den Vorschlag zu bestätigen
5. Die Klasse wird automatisch im Fahrzeugtyp-Dropdown übernommen

## API-Endpoints

| Endpoint | Methode | Beschreibung |
|----------|---------|-------------|
| `/api/premium/calculate` | POST | Berechne die Versicherungsprämie |
| `/api/premium/ai-classify` | POST | KI-gestützte Fahrzeugklassenermittlung |

**Base URL:** `http://localhost:8080`

**Request Body (AI-Classify)**
```json
{
  "description": "groß und robust"
}
```

**Response Body (AI-Classify)**
```json
{
  "suggestedVehicleType": "suv",
  "description": "groß und robust",
  "reason": "Die Beschreibung enthält Merkmale, die auf SUV hindeuten."
}
```

## Formularfelder

| Feld | Typ | Validierung |
|------|------|-------------|
| Kilometerleistung | number | > 0, numerisch |
| Fahrzeugtyp | select | erforderlich |
| Postleitzahl | text | genau 5 Ziffern |

## Fahrzeugtypen

- Kleinwagen
- Kleinvan
- Kombi
- Limousine
- Crossover
- SUV
- Sportwagen
- anders

## Setup

1. Backend starten (`./gradlew bootRun` im Backend-Verzeichnis)
2. Frontend starten:
   ```bash
   npm install
   npm run dev
   ```
3. Öffne `http://localhost:51905` (Vite Dev Server)

## Technologie-Stack

- **React** 19.1.0
- **Vite** 6.3.5
- **Axios** 1.9.0
- **JavaScript** ES6+
- **CSS** (keine externen CSS-Frameworks)

## Komponenten

- `App.jsx` - Hauptkomponente mit Formulareingabe und State-Management
- `ChatWindow.jsx` - KI-Chat-Fenster für Fahrzeugklassenermittlung
- `SelectField.jsx` - Fahrzeugtyp Dropdown
- `InputField.jsx` - Eingabefelder für Text und Zahlen
- `FormBox.jsx` - Formularcontainer mit Styling
- `ResultBox.jsx` - Prämienanzeige
- `Header.jsx` - Header mit Navigation und Dark Mode Toggle
- `Footer.jsx` - Footer mit Copyright

## Styling

- CSS Variables für themenübergreifende Konsistenz
- Light/Dark Mode mit `localStorage` Persistierung
- Responsive Grid-Layout
- Kein externes CSS-Framework

## Validierungsregeln

- **Kilometerleistung**: Numerisch, muss > 0 sein
- **Fahrzeugtyp**: Ist erforderlich (dropdown-gesteuert)
- **Postleitzahl**: Exakt 5 Ziffern (Regex: `^\d{5}$`)

## Error Handling

- UI-Validierung mit klaren Fehlermeldungen
- API-Fehler werden über try/catch abgefangen
- Loading-States für asynchrone Operationen
- Graceful Fallback bei KI-Fehlern

## Projektstruktur

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── theme.css
├── App.css
└── components/
    ├── AI-KI-Component.jsx
    ├── ChatWindow.jsx
    ├── FormBox.jsx
    ├── InputField.jsx
    ├── ResultBox.jsx
    └── SelectField.jsx
```

## Entwicklung

- `npm run dev` - Startet den Vite Dev Server (Port 51905)
- `npm run build` - Erzeugt Production-Bundle
- `npm run lint` - Läuft ESLint
