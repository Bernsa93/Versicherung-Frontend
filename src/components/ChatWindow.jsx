import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function ChatWindow({ onVehicleClassDetermined }) {
    const [messages, setMessages] = useState([
        { type: 'system', text: '🤖 Ich helfe dir bei der Fahrzeugklassenermittlung! Beschreibe dein Fahrzeug und ich schlage dir eine passende Klasse vor.' }
    ])
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmedVehicleClass, setConfirmedVehicleClass] = useState(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleKICall = async () => {
        if (!inputValue.trim()) return

        // System Nachricht hinzufügen
        setMessages(prev => [...prev, {
            type: 'user',
            text: inputValue
        }])

        setInputValue('')
        setLoading(true)

        try {
            const res = await axios.post('http://localhost:8080/api/premium/ai-classify', {
                description: inputValue
            })

            const aiResponse = res.data
            const suggestedClass = aiResponse.suggestedVehicleType || 'kleinwagen'

            // KI Antwort
            setMessages(prev => [...prev, {
                type: 'ai',
                text: `Basierend auf deiner Beschreibung (*${aiResponse.description}*), empfehle ich die Fahrzeugklasse **${aiResponse.suggestedVehicleType.toUpperCase()}**.\n\n${aiResponse.reason || 'Dies ist eine KI-generierte Empfehlung.'}`
            }])

            // KI-Vorschlag in Dropdown übernehmen
            if (onVehicleClassDetermined && suggestedClass !== confirmedVehicleClass) {
                onVehicleClassDetermined(suggestedClass)
            }

            // Bestätigungsmeldung
            setMessages(prev => [...prev, {
                type: 'system',
                text: 'Klicke auf "Annehmen", um diesen Vorschlag zu bestätigen.'
            }])

            setConfirmedVehicleClass(suggestedClass)

        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, {
                type: 'error',
                text: 'Fehler bei der KI-Anfrage. Bitte stelle sicher, dass das Backend läuft.'
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleConfirm = (vehicleClass) => {
        setConfirmedVehicleClass(vehicleClass)
        setMessages(prev => [...prev, {
            type: 'system',
            text: `✅ Die Fahrzeugklasse "${vehicleClass.toUpperCase()}" wurde bestätigt und übernommen!`
        }])
        // Event-Trigger für Elternkomponente
        if (onVehicleClassDetermined) {
            onVehicleClassDetermined(vehicleClass)
        }
    }

    return (
        <div style={{
            border: '1px solid #dee2e6',
            borderRadius: 8,
            backgroundColor: '#5c5c5c',
            overflow: 'hidden'
        }}>
            <div style={{
                padding: '12px 16px',
                backgroundColor: '#5c5c5c',
                borderBottom: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{ margin: 0 }}>🤖 KI-Fahrzeug-Assistent</h3>
                {confirmedVehicleClass && (
                    <span style={{
                        backgroundColor: '#5c5c5c',
                        color: '#6c757d',
                        padding: '4px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 'bold'
                    }}>
                        Bestätigt: {confirmedVehicleClass.toUpperCase()}
                    </span>
                )}
            </div>

            <div style={{
                height: 200,
                overflowY: 'auto',
                padding: 12,
                backgroundColor: '#5c5c5c'
            }}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            marginBottom: 10,
                            maxWidth: '80%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            backgroundColor:
                                msg.type === 'user' ? '#f1f3f5' :
                                msg.type === 'ai' ? '#e9ecef' :
                                msg.type === 'error' ? '#f8d7da' :
                                            msg.type === 'system' ? '#dee2e6' : '#5c5c5c',
                            color:
                                msg.type === 'user' ? '#6c757d' :
                                msg.type === 'error' ? '#721c24' : '#333',
                            marginLeft: msg.type === 'user' ? 'auto' : 0
                        }}
                    >
                        {msg.text.split('\n').map((line, lineIdx) => (
                            <p key={lineIdx} style={{ margin: 0 }}>
                                {line}
                            </p>
                        ))}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{
                padding: 12,
                borderTop: '1px solid #ddd',
                backgroundColor: '#5c5c5c'
            }}>
                <div style={{ marginBottom: 8 }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleKICall()}
                        disabled={loading}
                        placeholder="Beschreibe dein Fahrzeug..."
                        style={{
                            width: '100%',
                            padding: 10,
                            boxSizing: 'border-box',
                            borderRadius: 4,
                            border: '1px solid #e0e0e0'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={handleKICall}
                        disabled={loading || !inputValue.trim()}
                        style={{
                            flex: 1,
                            padding: 10,
                            backgroundColor: loading || !inputValue.trim() ? '#3d3d3d' : '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: (loading || !inputValue.trim()) ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? 'Denken...' : 'Abfragen'}
                    </button>
                    {confirmedVehicleClass && (
                        <button
                            onClick={() => handleConfirm(confirmedVehicleClass)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#28a745',
                                color: '#5c5c5c',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ✅ Annehmen
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
