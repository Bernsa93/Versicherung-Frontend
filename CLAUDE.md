# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project Overview

Versicherungsprämienrechner - React 19 frontend with AI vehicle classification.

Goals:
- minimal code
- fast execution
- low token usage
- modular agent system
- no overengineering

---

# AUTO-AGENT ROUTING SYSTEM (CRITICAL)

Claude MUST automatically detect intent and route tasks to specialized agents from `.claude/agents/`.

## Available Agents

- frontend-architect → architecture, system design, structure
- ui-designer → UI/UX design (Modern Website style layout)
- react-component → React components, JSX, UI logic
- api-integration → REST API, Axios, backend communication
- form-validation → validation rules, input constraints
- state-management → React state, hooks, data flow
- styling → CSS, layout system, design tokens
- darkmode → theme system (light/dark toggle)
- performance → optimization, rendering improvements
- refactoring → cleanup, simplification, code quality

---

## Routing Rules

For every request:

1. Analyze intent
2. Split into subtasks
3. Assign one or multiple agents
4. Avoid duplicate responsibilities
5. Keep agent count minimal
6. Merge outputs into final result

---

## Routing Examples

### Login Feature
Agents:
- react-component → login UI
- api-integration → authentication request
- form-validation → input validation
- styling → layout

---

### Dark Mode Feature
Agents:
- darkmode → theme logic
- styling → CSS variables
- frontend-architect → integration into app

---

### Performance Issue
Agents:
- performance → optimization strategy
- refactoring → cleanup unused logic

---

### UI Redesign (Modern Website style)
Agents:
- ui-designer → layout system
- styling → design system implementation
- frontend-architect → page structure

---

# OUTPUT FORMAT (MANDATORY)

Always respond using:

ROUTE:
- agent → task

PLAN:
- step breakdown

EXECUTION ORDER:
- sequence of agents

RESULT:
- final merged output

---

# Architecture

- Vite (dev server port 51905)
- React 19.1.0
- Axios for HTTP requests
- JavaScript ES6+
- functional components only
- hooks-based state

Flow:
User Input → State → API → Response → UI Update

AI Flow:
ChatWindow → /api/premium/ai-classify → suggestion → dropdown update

---

# Backend Integration

Base URL:
http://localhost:8080

Endpoints:
- POST /api/premium/calculate
- POST /api/premium/ai-classify

---

# Components

- App.jsx → main state + API orchestration
- ChatWindow.jsx → AI interaction
- InputField.jsx → input abstraction
- SelectField.jsx → dropdown selection
- FormBox.jsx → layout container
- ResultBox.jsx → premium output

---

# Coding Rules

- functional components only
- no class components
- minimal state
- no overengineering
- small reusable functions
- flat structure preferred

---

# Validation Rules

- kilometers: numeric > 0
- vehicleType: required
- postcode: exactly 5 digits

---

# Error Handling

- UI validation errors shown to user
- API errors handled via try/catch
- loading states required
- graceful fallback UI

---

# Performance Rules

- avoid unnecessary re-renders
- prefer simple state
- memoize only when needed
- no heavy libraries

---

# Styling Rules

- CSS variables only
- card-based layout
- Modern Website-inspired UI
- strong spacing system
- responsive grid layout

---

# FINAL RULE

simple > complex  
working > perfect  
minimal tokens always  
agent routing always required  