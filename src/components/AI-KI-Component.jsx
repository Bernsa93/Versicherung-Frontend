import React, { useState } from 'react'
import axios from 'axios'

export default function AIKIService({ onVehicleClassDetermined }) {
    const [message, setMessage] = useState('')
    const [kiResponse, setKiResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleKICall = async () => {
        if (!message.trim()) {
            setError('Bitte gib ein Fahrzeugmerkmal an (z.B. groß, sportlich, kompakt).')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await axios.post('http://localhost:8080/api/premium/ai-classify', {
                description: message
            })
            setKiResponse(res.data)
            if (onVehicleClassDetermined && res.data.suggestedVehicleType) {
                onVehicleClassDetermined(res.data.suggestedVehicleType)
            }
        } catch (error) {
            console.error(error)
            setError('Fehler bei der KI-Anfrage. Bitte Backend prüfen.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            padding: 16,
            backgroundColor: '#5c5c5c',
            borderRadius: 8,
            marginBottom: 16,
            border: '1px solid #e0e0e0'
        }}>
            <h3 style={{ marginTop: 0 }}>🤖 KI-Fahrzeugklassenermittlung</h3>
            <p style={{ color: '#5c5c5c', fontSize: 14, marginBottom: 8 }}>
                Beschreibe dein Fahrzeug (z.B. "groß und robust", "klein und sportlich")
            </p>

            <div style={{ marginBottom: 10 }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleKICall()}
                    disabled={loading}
                    placeholder="z.B. "
                    style={{
                        width: '100%',
                        padding: 8,
                        boxSizing: 'border-box',
                        borderRadius: 4,
                        border: '1px solid #5c5c5c'
                    }}
                />
            </div>

            <button
                onClick={handleKICall}
                disabled={loading || !message}
                style={{
                    width: '100%',
                    padding: 10,
                    backgroundColor: loading ? '#5c5c5c' : '#28a745',
                    color: '#5c5c5c',
                    border: 'none',
                    borderRadius: 4,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: 10,
                    fontSize: 14
                }}
            >
                {loading ? 'KI analysiert...' : 'KI abfragen'}
            </button>

            {kiResponse && (
                <div style={{
                    padding: 12,
                    backgroundColor: '#e9ecef',
                    borderRadius: 4,
                    marginBottom: 10,
                    border: '1px solid #dee2e6'
                }}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                        💡 KI-Vorschlag: <span style={{ color: '#495057' }}>{kiResponse.suggestedVehicleType}</span>
                    </p>
                    <p style={{ margin: 4 0 0 0, fontSize: 13 }}>{kiResponse.reason}</p>
                </div>
            )}

            {error && (
                <div style={{
                    padding: 12,
                    backgroundColor: '#f8d7da',
                    borderRadius: 4,
                    color: '#721c24',
                    fontSize: 13
                }}>
                    {error}
                </div>
            )}
        </div>
    )
}
