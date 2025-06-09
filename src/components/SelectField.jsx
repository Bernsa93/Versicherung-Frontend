import React from 'react'

export default function SelectField({ label, value, onChange, options }) {
    return (
        <div style={{ marginBottom: 12 }}>
            {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                required
            >
                <option value="">Bitte wählen</option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
        </div>
    )
}