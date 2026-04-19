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

            setMessages(prev => [...prev, {
                type: 'ai',
                text: `Basierend auf deiner Beschreibung (*${aiResponse.description}*), empfehle ich die Fahrzeugklasse **${aiResponse.suggestedVehicleType.toUpperCase()}**.\n\n${aiResponse.reason || 'Dies ist eine KI-generierte Empfehlung.'}`
            }])

            if (onVehicleClassDetermined && suggestedClass !== confirmedVehicleClass) {
                onVehicleClassDetermined(suggestedClass)
            }

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
        if (onVehicleClassDetermined) {
            onVehicleClassDetermined(vehicleClass)
        }
    }

    return (
        <div className="chat-window-container">
            <div className="chat-header">
                <h3>🤖 KI-Fahrzeug-Assistent</h3>
                {confirmedVehicleClass && (
                    <span className="badge">
                        Bestätigt: {confirmedVehicleClass.toUpperCase()}
                    </span>
                )}
            </div>

            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`chat-message ${msg.type}`}
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

            <div className="chat-input-area">
                <div style={{ marginBottom: 8 }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleKICall()}
                        disabled={loading}
                        placeholder="Beschreibe dein Fahrzeug..."
                        className="chat-input"
                    />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={handleKICall}
                        disabled={loading || !inputValue.trim()}
                        className={loading || !inputValue.trim() ? 'chat-query-btn disabled' : 'chat-query-btn'}
                    >
                        {loading ? 'Denken...' : 'Abfragen'}
                    </button>
                    {confirmedVehicleClass && (
                        <button className="chat-confirm-btn" onClick={() => handleConfirm(confirmedVehicleClass)}>
                            ✅ Annehmen
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
