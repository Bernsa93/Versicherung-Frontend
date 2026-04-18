import React, { useState } from 'react'
import axios from 'axios'

import InputField from './components/InputField'
import SelectField from './components/SelectField'
import FormBox from './components/FormBox'
import ResultBox from './components/ResultBox'
import ChatWindow from './components/ChatWindow'

export default function App() {
    const [kilometers, setKilometers] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [postcode, setPostCode] = useState('')
    const [result, setResult] = useState(null)
    const [kiAvailable] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const estimatedKilometers = parseInt(kilometers, 10)
        if (isNaN(estimatedKilometers) || estimatedKilometers < 0) {
            alert('Bitte gib eine gültige Kilometerleistung ein.')
            return
        }

        if (!vehicleType) {
            alert('Bitte wähle einen Fahrzeugtyp.')
            return
        }

        if (!postcode.match(/^\d{5}$/)) {
            alert('Bitte gib eine gültige 5-stellige Postleitzahl ein.')
            return
        }

        // KI-Vorschlag bevorzugen, falls verfügbar
        const selectedVehicleType = kiAvailable
            ? vehicleType
            : (vehicleType || '')

        try {
            const res = await axios.post('http://localhost:8080/api/premium/calculate', {
                estimatedKilometers,
                vehicleType: selectedVehicleType,
                postcode
            })
            setResult(res.data)
        } catch (error) {
            console.error(error)
            alert('Fehler bei der Berechnung. Bitte Backend prüfen.')
        }
    }

    // KI-Vorschlag in das Dropdown übernehmen
    const handleKIVehicleClass = (suggestedClass) => {
        setVehicleType(suggestedClass)
    }

    return (
        <div style={{ padding: 20, backgroundColor: '#525252', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Versicherungsprämie berechnen</h1>

            <FormBox>
                {/* KI-Chat-Fenster für Fahrzeugklassenermittlung */}
                <ChatWindow onVehicleClassDetermined={handleKIVehicleClass} />

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Kilometerleistung"
                        type="number"
                        value={kilometers}
                        onChange={(e) => setKilometers(e.target.value)}
                        placeholder=''
                    />
                    <SelectField
                        label="Fahrzeugtyp"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        options={[
                            { value: 'mikroauto', label: 'Kleinwagen' },
                            { value: 'kleinvan', label: 'Kleinvan' },
                            { value: 'kombi', label: 'Kombi' },
                            { value: 'limousine', label: 'Limousine' },
                            { value: 'crossover', label: 'Crossover' },
                            { value: 'suv', label: 'SUV' },
                            { value: 'sportwagen', label: 'Sportwagen' },
                            { value: 'anders', label: 'anders' }
                        ]}
                    />
                    <InputField
                        label="Postleitzahl"
                        value={postcode}
                        onChange={(e) => setPostCode(e.target.value)}
                        placeholder="z.B. 12345"
                        maxLength={5}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: 10,
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            marginTop: 10,
                            fontSize: 16
                        }}>
                        Berechnen
                    </button>
                </form>

                {result && (
                    <ResultBox>
                        <h2>Berechnete Prämie: {result.calculatedPremium?.toFixed(2)} €</h2>
                        <p>Kilometerfaktor: {result.kmFactor}</p>
                        <p>Fahrzeugfaktor: {result.vehicleFactor}</p>
                        <p>Regionsfaktor: {result.regionFactor}</p>
                    </ResultBox>
                )}
            </FormBox>
        </div>
    )
}