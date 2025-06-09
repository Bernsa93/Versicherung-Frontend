import React from 'react'

export default function FormBox({ children }) {
    return (
        <div style={{
            border: '1px solid #838383',
            borderRadius: 8,
            padding: 20,
            maxWidth: 400,
            margin: '0 auto',
            backgroundColor: '#838383',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            {children}
        </div>
    )
}