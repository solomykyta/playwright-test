# Playwright Automation Project

## Description

UI and API test automation framework built with Playwright + TypeScript.

Uses global setup for authentication and storageState for authenticated test runs.

---

## Tech stack

- Playwright
- TypeScript
- Node.js
- dotenv

---

## Project structure

config/ - env and routes  
tests/  
api/ - API tests  
ui/ - UI tests  
setup/ - authentication setup (storageState generation)  
storage/ - auth state  

---

## Test coverage

- Authentication (UI + API)
- Home page functionality
- Basic application flows (UI)
- API authentication endpoints

---

## Run tests

```bash
npm install
npx playwright test
npx playwright test --project=setup


Notes
Environment variables are managed via .env
Sensitive data is excluded from repository
Auth state is generated via Playwright global setup
