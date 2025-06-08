import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
    const [kilometers, setKilometers] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [postcode, setPostCode] = useState('')
    const [result, setResult] = useState(null)

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

        try {
            const res = await axios.post('http://localhost:8080/api/premium/calculate', {
                estimatedKilometers,
                vehicleType,
                postcode
            })
            setResult(res.data)
        } catch (error) {
            console.error(error)
            alert('Fehler bei der Berechnung. Bitte Backend prüfen.')
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Versicherungsprämie berechnen</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={kilometers}
                    onChange={(e) => setKilometers(e.target.value)}
                    placeholder="Kilometerleistung"
                    required
                />
                <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                >
                    <option value="">Fahrzeugtyp wählen</option>
                    <option value="kleinwagen">Kleinwagen</option>
                    <option value="suv">SUV</option>
                    <option value="sportwagen">Sportwagen</option>
                </select>
                <input
                    value={postcode}
                    onChange={(e) => setPostCode(e.target.value)}
                    placeholder="Postleitzahl"
                    maxLength={5}
                    required
                />
                <button type="submit">Berechnen</button>
            </form>

            {result && (
                <div style={{ marginTop: 20 }}>
                    <h2>Berechnete Prämie: {result.calculatedPremium?.toFixed(2)} €</h2>
                    <p>Kilometerfaktor: {result.mileageFactor}</p>
                    <p>Fahrzeugfaktor: {result.vehicleTypeFactor}</p>
                    <p>Regionsfaktor: {result.regionFactor}</p>
                </div>
            )}
        </div>
    )
}