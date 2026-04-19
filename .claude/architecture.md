# Architektur

Frontend: React + Vite

Struktur:
- App.jsx (State + API Calls)
- Components:
  - ChatWindow.jsx
  - SelectField.jsx
  - InputField.jsx
  - FormBox.jsx
  - ResultBox.jsx

Flow:
User Input -> Form State -> API Call -> Response -> UI Update

KI Flow:
ChatWindow -> /api/premium/ai-classify -> Vorschlag -> Dropdown setzen
