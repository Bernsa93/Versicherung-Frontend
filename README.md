# Versicherungsprämienrechner - Frontend

## Features

- **Fahrzeugklassenermittlung mit KI**: Das Chat-Fenster analysiert deine Fahrzeugbeschreibung und schlägt automatisch eine passende Fahrzeugklasse vor
- **Benutzeroberfläche zur Eingabe von Versicherungsdaten**
- **Anzeige berechneter Versicherungsprämien**
- **Interaktive Formulare mit Validierung**
- **Anbindung an ein REST-API-Backend**

## Funktionsweise der KI-Fahrzeugklassenermittlung

1. Beschreibe dein Fahrzeug im Chat-Fenster (z.B. "groß und robust", "schnell und sportlich")
2. Die KI analysiert die Beschreibung und schlägt eine Fahrzeugklasse vor
3. Klicke auf "Annehmen", um den Vorschlag zu bestätigen
4. Die Klasse wird automatisch im Fahrzeugtyp-Dropdown übernommen

## API-Endpoints

| Endpoint | Methode | Beschreibung |
|----------|---------|--------------|
| `/api/premium/calculate` | POST | Berechne die Versicherungsprämie |
| `/api/premium/ai-classify` | POST | KI-gestützte Fahrzeugklassenermittlung |

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

## Setup

1. Backend starten (`./gradlew bootRun` im Backend-Verzeichnis)
2. Frontend starten:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Technologie-Stack

- **React** 19.1.0
- **Vite** 6.3.5
- **Axios** 1.9.0
- **JavaScript** (ES6+)

## Komponenten

- `App.jsx` - Hauptkomponente mit Formulareingabe
- `ChatWindow.jsx` - KI-Chat-Fenster für Fahrzeugklassenermittlung
- `SelectField.jsx` - Fahrzeugtyp Dropdown
- `InputField.jsx` - Eingabefelder
- `FormBox.jsx` - Formularcontainer
- `ResultBox.jsx` - Prämienanzeige
