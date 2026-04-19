import React from 'react'

export default function FormBox({ children, onSubmit }) {
    return (
        <form onSubmit={onSubmit} style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 0,
            padding: 20,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
            {children}
        </form>
    )
}