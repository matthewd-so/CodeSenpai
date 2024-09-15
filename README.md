# CodeSenp.AI - Your Virtual Girlfriend and LeetCode Assistant
<img width="953" alt="Screenshot 2024-09-15 at 4 00 03 AM" src="https://github.com/user-attachments/assets/5165d957-4587-4158-9e6b-f5cc47e1876a">

**CodeSenp.AI** is your personal virtual girlfriend and coding assistant designed to help you practice coding while making it fun and interactive. CodeSenp.ai motivates you, helps you with LeetCode problems, and tracks your progress while making the experience enjoyable with a personalized virtual companion!

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Setup Instructions](#setup-instructions)
5. [How to Use](#how-to-use)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)
8. [License](#license)

## Overview

CodeSenp.ai brings a unique twist to your coding practice by combining a virtual girlfriend with a helpful assistant. It not only motivates you to solve more LeetCode problems but also interacts with you in a lighthearted, anime-inspired manner. The assistant gives hints, tracks your coding progress, and offers encouragement, helping to turn your daily coding grind into an enjoyable challenge.

## Features

- **Virtual Girlfriend Persona**: Interact with Lia, your anime-style girlfriend and coding senpai, who reacts to your progress and gives you personalized messages of motivation.
- **Text-to-Speech**: Lia speaks to you at key moments, making the experience more engaging.
- **LeetCode Problem Assistant**: Provides coding hints and guidance for LeetCode problems.
- **Progress Tracking**: Tracks the number of LeetCode problems solved and adjusts Lia's responses based on your activity.
- **Motivational Stages**: Lia motivates you at different stages of the app, from introductions to pushing you to solve more questions.
- **Incentives**: Earn points by solving coding problems, unlock experiences with Lia, and go on "fun dates" in all sort of different settigns.
- **LeetCode Integration**: Fetches real-time data from your LeetCode account to reflect progress.

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Text-to-Speech**: ElevenLabs API
- **LeetCode API**: Used to fetch coding problem data
- **Speech Synthesis**: Handles Lia’s voice interaction through ElevenLabs API
- **Hosting**: Vercel / Netlify (Frontend), Heroku / AWS (Backend)

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14+)
- **NPM** or **Yarn**
- **MongoDB** (if running locally)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/CodeSenp.ai.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd CodeSenp.ai
   ```

3. **Install dependencies for both the frontend and backend:**

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   # Install backend dependencies
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in both the `frontend` and `backend` directories with the following variables:

   **Frontend `.env`:**

   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_API_KEY=your-elevenlabs-api-key
   REACT_APP_VOICE_ID=your-elevenlabs-voice-id
   ```

   **Backend `.env`:**

   ```
   MONGO_URI=your-mongodb-connection-string
   ```

5. **Start the development servers:**

   ```bash
   # Start the backend
   cd backend
   npm start
   # Start the frontend
   cd ../frontend
   npm start
   ```

6. **Open the app in your browser**: Navigate to `http://localhost:3000` to see CodeSenp.ai in action.

## How to Use

1. **Onboarding**: Upon opening the app, Lia will introduce herself. You will enter your name and coding goals.
2. **Motivation Stage**: Lia motivates you with speech and visual interaction, asking for your goals.
3. **Solving Problems**: Navigate to the problem set and start solving LeetCode problems. Lia will track your progress and provide encouragement as you work through problems.
4. **Study Date Mode**: Unlock special interactions with Lia as you reach milestones. Lia will offer tips, hints, and extra motivation.
5. **Text-to-Speech**: Hear Lia’s voice as she speaks to you at various stages of your coding journey.
6. **Personalized Experience**: As you solve more problems, Lia’s responses will evolve, encouraging you based on your progress.
