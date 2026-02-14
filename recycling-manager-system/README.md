# Recycling Production Line Manager Selection System ♻️

This repository contains the solution for the **G CP** assignment: a standalone system for ranking and evaluating candidates for a Recycling Production Line Manager role.

The application is a **React + Vite** dashboard that visualizes candidate performance based on AI-simulated scores in Crisis Management, Sustainability, and Team Motivation.

![Project Status](https://img.shields.io/badge/status-complete-success.svg)
![Tech Stack](https://img.shields.io/badge/stack-React_Vite_Mantine-blue.svg)

## 📌 Implementation Overview

This project satisfies all assignment requirements including database design, data generation, AI prompting mocks, and UI implementation.

### 1. Dashboard Features (React + Vite + Mantine UI)
*   **🏆 Leaderboard**: Displays the top 10 candidates ranking by their total weighted score.
*   **📊 Skill Heatmap**: Visualizes average performance trends across key metrics (Crisis Management, Sustainability, Team Motivation).
*   **g Cards**: Detailed profiles for candidates with a "Share Candidate" workflow (Bonus Feature implemented).
*   **🎨 UI/UX**: Built with **Mantine v8**, utilizing a glassmorphic design, responsive grid, and animated gradients.

### 2. Data Generation & Database
*   **Random Generator**: Uses **Faker.js** (`seed.js`) to generate 40 realistic candidate profiles with diverse experience and attributes.
*   **Database Schema**: A comprehensive MySQL-compatible schema (`schema.sql`) is provided, including:
    *   `candidates` (ID, name, experience, skills)
    *   `evaluations` (AI scores)
    *   `rankings` (Auto-updated views/tables)

### 3. AI Prompting
*   **Evaluation Logic**: The system simulates AI scoring based on 3 core prompts found in `AI_PROMPTS.md`:
    1.  Crisis Management Evaluation
    2.  Sustainability Knowledge Assessment
    3.  Team Motivation & Leadership Scoring

## 🚀 Setup Instructions

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd recycling-manager-system
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # Note: Faker.js is installed in the root for data seeding
    ```

3.  **Generate Mock Data (Optional)**
    The project comes with pre-generated data, but you can regenerate it:
    ```bash
    node ../seed.js
    ```

4.  **Run the Dashboard**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the application.

## 📂 Project Structure

*   `/src`: React frontend code (App.jsx, main.jsx, components).
*   `/src/mockData.json`: generated candidate data.
*   `schema.sql`: Database design and SQL structure.
*   `AI_PROMPTS.md`: The 3 prompts used for candidate evaluation logic.
*   `seed.js`: Script for generating the 40 random candidate profiles.

## ✨ Bonus Features
*   **Share Candidate Button**: Implemented interactive button on candidate cards to simulate HR workflows.
*   **Advanced Styling**: Custom animated background and Mantine glassmorphism effects.

---
**Submission for G CP Assignment**
