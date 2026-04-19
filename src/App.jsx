import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import './theme.css'

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
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved === 'dark'
    })

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode)
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    const toggleTheme = () => setIsDarkMode(prev => !prev)

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

    const handleKIVehicleClass = (suggestedClass) => {
        setVehicleType(suggestedClass)
    }

    return (
        <div style={{ minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: 'var(--color-bg)' }}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <HeroSection />
            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px'
                }}>
                    <FormBox onSubmit={handleSubmit}>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="Kilometerleistung"
                                type="number"
                                value={kilometers}
                                onChange={(e) => setKilometers(e.target.value)}
                                placeholder="z.B. 15000"
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
                                    padding: '14px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 0,
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    fontWeight: 600,
                                    marginTop: 10
                                }}>
                                Berechnen
                            </button>
                        </form>
                    </FormBox>

                    <ChatWindow onVehicleClassDetermined={handleKIVehicleClass} />
                </div>
            </main>
            {result && (
                <div style={{
                    backgroundColor: '#f8f8f8',
                    padding: '40px 20px'
                }}>
                    <ResultBox>
                        <h2 style={{ fontSize: 28, marginBottom: 16, marginTop: 0 }}>
                            Deine Versicherungsprämie
                        </h2>
                        <div style={{ fontSize: 64, fontWeight: 700, color: '#ff7900', marginBottom: 20 }}>
                            {result.calculatedPremium?.toFixed(2)} €
                        </div>
                        <p style={{ fontSize: 18, color: '#666', marginBottom: 12 }}>
                            Kilometernutzung: {result.kmFactor}
                        </p>
                        <p style={{ fontSize: 18, color: '#666', marginBottom: 12 }}>
                            Fahrzeugfaktor: {result.vehicleFactor}
                        </p>
                        <p style={{ fontSize: 18, color: '#666' }}>
                            Regionsfaktor: {result.regionFactor}
                        </p>
                    </ResultBox>
                </div>
            )}
            <Footer />
        </div>
    )
}

function Header({ isDarkMode, toggleTheme }) {
    return (
        <header style={{
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
            padding: '16px 20px'
        }}>
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>
                    VERSICHERUNG
                </div>
                <nav style={{ display: 'flex', gap: '30px' }}>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontSize: 14 }}>
                        Produkte
                    </a>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontSize: 14 }}>
                        Dienstleistungen
                    </a>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--color-text)', fontSize: 14 }}>
                        Über uns
                    </a>
                </nav>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button className="konto-button" style={{
                        padding: '8px 16px',
                        border: '1px solid #e5e5e5',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        fontSize: 14
                    }}>
                        Konto
                    </button>
                </div>
            </div>
        </header>
    )
}

function HeroSection() {
    return (
        <section style={{
            backgroundColor: 'var(--color-hero-bg)',
            padding: '60px 20px',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: 48,
                fontWeight: 700,
                color: 'var(--color-hero-text)',
                margin: 0,
                marginBottom: 16
            }}>
                Versicherungsprämie berechnen
            </h1>
            <p style={{
                fontSize: 20,
                color: 'var(--color-hero-text)',
                marginBottom: 24,
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                Erfahre jetzt, wie viel deine Versicherung kostet. Inklusive KI-gestützter Fahrzeugklassenermittlung.
            </p>
            <button
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                    padding: '16px 32px',
                    backgroundColor: 'var(--color-hero-text)',
                    color: 'var(--color-hero-bg)',
                    border: 'none',
                    borderRadius: 0,
                    cursor: 'pointer',
                    fontSize: 16,
                    fontWeight: 600
                }}>
                Jetzt berechnen
            </button>
        </section>
    )
}

function Footer() {
    return (
        <footer style={{
            backgroundColor: 'var(--color-footer-bg)',
            color: 'var(--color-footer-text)',
            padding: '20px',
            textAlign: 'center',
            fontSize: 12
        }}>
            <p>&copy; 2026 Versicherungsprämienrechner. Alle Rechte vorbehalten.</p>
        </footer>
    )
}
