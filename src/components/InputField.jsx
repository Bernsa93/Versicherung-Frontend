import React from 'react'

export default function InputField({ label, value, onChange, placeholder, type = 'text', maxLength }) {
    return (
        <div style={{ marginBottom: 12 }}>
            {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                required
            />
        </div>
    )
}