# todotask
```markdown
UserAuthHub

UserAuthHub is a modern, full-stack authentication web application built using React, Express.js, TypeScript, and PostgreSQL. It allows users to securely register, log in, and manage sessions. The app is designed with clean UI/UX, real-time features, and scalability in mind, ideal for hackathons and production use.

Features

- Secure user authentication with Passport.js (Local Strategy)
- Responsive UI using Tailwind CSS and Radix UI
- Real-time-ready architecture (WebSocket integrated)
- Form validation with Zod and React Hook Form
- Dashboard-ready structure with support for charts and analytics
- PostgreSQL support via Drizzle ORM
- Fast dev experience using Vite and Esbuild

Tech Stack

Frontend: React, Tailwind CSS, Radix UI  
Backend: Express.js, TypeScript  
Auth: Passport.js (Local)  
Realtime: WebSocket (ws)  
DB Layer: PostgreSQL, Drizzle ORM  
Build Tool: Vite, Esbuild  

Installation and Setup

1. Clone the repository:

git clone https://github.com/<your-username>/UserAuthHub.git  
cd UserAuthHub

2. Install dependencies:

npm install

3. Set up .env file:

DATABASE_URL=postgres://user:password@localhost:5432/userauthhub  
SESSION_SECRET=your_session_secret

4. Push DB schema:

npx drizzle-kit push

5. Run the app:

npm run dev

Project Structure

UserAuthHub/  
server/  
components/  
pages/  
drizzle.config.ts  
tailwind.config.ts  
tsconfig.json  
vite.config.ts

Deployment

This project is publicly deployed and can be accessed at:  
https://userauthhub-demo.vercel.app

Demo Video

Watch the complete walkthrough of the project here:  
https://www.loom.com/share/example-video-link

Assumptions Made

- PostgreSQL and Drizzle ORM are used as no specific DB was restricted
- Deployment assumed on Vercel (frontend) and Render/Fly.io (backend)
- Local authentication used without email verification due to time constraints
- Email service integration can be added later

Architecture Diagram

docs/architecture-diagram.png

Scripts

npm run dev - Starts the development server  
npm run build - Builds the project for production  
npm run start - Runs the app in production  
npx drizzle-kit push - Push DB migrations

Final Note

This project is a part of a hackathon run by https://www.katomaran.com

