import React from 'react'

export default function ResultBox({ children }) {
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            padding: 16,
            marginTop: 20,
            backgroundColor: '#212121'
        }}>
            {children}
        </div>
    )
}