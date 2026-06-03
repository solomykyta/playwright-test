# Playwright Automation Project

## Live Report
 **[View latest Playwright report](https://solomykyta.github.io/playwright-test/)**

## CI Status
![Playwright Tests](https://github.com/solomykyta/playwright-test/actions/workflows/playwright.yml/badge.svg)

---

## Description

E2E UI and API automation framework built with Playwright + TypeScript for a real development environment.

The project simulates real user behavior on a mobile-first web application and includes:
- authenticated sessions via API login with persisted `storageState`
- Page Object Model (POM) architecture for UI scalability
- reusable UI helpers for popups and common flows
- screenshots, videos, and traces on test failures for debugging
- secure handling of environment variables via `.env` (excluded from repository)

Test execution is fully automated via GitHub Actions, with results published as a live HTML report on GitHub Pages.

---

## Tech Stack

- Playwright
- TypeScript
- GitHub Actions
- GitHub Pages
- dotenv

---

## Structure

config/   - environment configuration  
pages/    - Page Object Model  
tests/  
  api/    - API tests  
  ui/     - UI tests (mobile-first flows)  
  setup/  - authentication setup (storageState generation)  
storage/  - persisted auth state  
helpers/  - UI utilities (popups)  

---

## CI Report

Automated test runs generate a Playwright HTML report deployed to GitHub Pages after each CI execution.