import React from 'react'

export default function FormBox({ children }) {
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: 20,
            maxWidth: 400,
            margin: '0 auto',
            backgroundColor: '#5c5c5c',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
            {children}
        </div>
    )
}