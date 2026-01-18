# Schedulify

<div align="center">

![Schedulify Logo](public/nav-logo.jpg)

A modern, full-featured scheduling and booking application built with the latest Next.js technology stack.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth-5.x-white?style=for-the-badge&logo=next-auth)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

**Open in your browser**

Navigate to [http://scheduulify.vercel.app/](http://scheduulify.vercel.app/)

---

## 🌟 Overview

Schedulify is a powerful scheduling platform that enables users to create personalized booking pages, manage availability, and automate the entire meeting scheduling process. With seamless Google Calendar integration and automatic Google Meet link generation, it eliminates the back-and-forth of coordinating meetings.

---

## ✨ Features

### Core Features

- 🔐 **Authentication**
  - Used NextAuth for authentication
  - Google OAuth 2.0 integration
  - Email/password credentials authentication
  - Secure session management with JWT tokens

- 📅 **Event Management**
  - Create custom event types with configurable durations
  - Set event visibility (public/private)
  - Add descriptions and detailed instructions

- 📆 **Smart Availability**
  - Configure weekly availability schedules
  - Set minimum gap times between bookings
  - Automatic timezone handling

- 🤖 **Automated Scheduling**
  - Automatic Google Meet link generation
  - Google Calendar event creation
  - Email notifications for all participants

- 🎨 **Customization**
  - Personalized booking page URLs (e.g., schedulify.com/username)
  - Branded booking pages
  - Responsive design for all devices

### Dashboard Features

- 📊 **Analytics Overview**
- 📋 **Event Management** - Create, edit, delete events
- 📅 **Meeting Management** - View and manage bookings
- ⚙️ **Availability Settings** - Configure your schedule

---

## 🛠 Tech Stack

| Category           | Technology              |
| ------------------ | ----------------------- |
| **Framework**      | Next.js 15 (App Router) |
| **Language**       | TypeScript              |
| **Styling**        | Tailwind CSS 4          |
| **UI Components**  | Radix UI, shadcn/ui     |
| **Database**       | PostgreSQL              |
| **ORM**            | Prisma                  |
| **Authentication** | NextAuth.js 5           |
| **Forms**          | React Hook Form + Zod   |
| **Animations**     | Motion, Framer Motion   |
| **Icons**          | Lucide React            |
| **Calendar API**   | Google Calendar API     |
| **Validation**     | Zod Schemas             |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later
- **npm**, **yarn**, **pnpm**, or **bun**
- **PostgreSQL** database (local or cloud)
- **Google Cloud Console** account (for OAuth & Calendar API)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/schedulify.git
cd schedulify
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

3. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://scheduulify.vercel.app/](http://scheduulify.vercel.app/)

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/schedulify?schema=public"

# NextAuth
AUTH_SECRET="your-auth-secret-key-here"
AUTH_URL="http://localhost:3000"

# Google OAuth (Google Cloud Console)
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# (Optional) Email notifications
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-email-password"
```

---

## 📁 Project Structure

```
schedulify/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/
│   ├── assets/                # Videos and media
│   ├── hero-bgd.png           # Hero background
│   └── nav-logo.jpg           # Logo
├── src/
│   ├── actions/               # Server Actions
│   │   ├── authAction.ts      # Authentication actions
│   │   ├── availabilityAction.ts
│   │   ├── bookingAction.ts   # Booking management
│   │   ├── dashboardAction.ts
│   │   ├── eventAction.ts     # Event CRUD operations
│   │   ├── meetingsAction.ts
│   │   └── userAction.ts
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login/signup)
│   │   ├── (main)/            # Main app pages
│   │   │   ├── [username]/    # Public booking pages
│   │   │   ├── availability/
│   │   │   ├── dashboard/
│   │   │   ├── events/
│   │   │   └── meetings/
│   │   ├── api/               # API routes
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx           # Landing page
│   ├── auth.ts                # NextAuth configuration
│   ├── components/            # React components
│   │   ├── auth/
│   │   ├── availability/
│   │   ├── dashboard/
│   │   ├── event/
│   │   ├── meeting/
│   │   ├── navbar/
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   │   ├── prisma.ts          # Prisma client
│   │   ├── utils.ts           # Helper functions
│   │   └── zodSchemas.ts      # Zod validation schemas
│   ├── middleware.ts          # Next.js middleware
│   └── sections/              # Landing page sections
│       ├── features.tsx
│       ├── final-cta.tsx
│       ├── hero.tsx
│       └── how-it-works.tsx
├── components.json            # shadcn/ui config
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔗 API Integration

### Google Calendar API

Schedulify integrates with Google Calendar to:

1. **Generate Meet Links**: Automatically creates Google Meet links for every booking
2. **Create Calendar Events**: Adds events to the host's calendar
3. **Send Invites**: Emails calendar invites to all participants

Required OAuth Scopes:

```
openid email profile https://www.googleapis.com/auth/calendar.events
```

### Authentication Flow

```
User → Login/Signup → NextAuth → Session Created
                                     ↓
                            Protected Routes Access
                                    ↓
                         Dashboard/Events/Meetings
```

---

## 📖 Usage Guide

### For Users

1. **Sign Up**: Create an account using email/password or Google OAuth
2. **Connect Google**: Link your Google account for calendar integration
3. **Set Availability**: Configure your weekly availability in the dashboard
4. **Create Events**: Define event types with durations and descriptions
5. **Share Your Link**: Share your booking page URL with others

### For Visitors

1. **Visit Booking Page**: Navigate to `/username` (e.g., `/john`)
2. **Select Event**: Choose an event type to book
3. **Choose Time**: Pick an available time slot
4. **Enter Details**: Provide name, email, and any additional info
5. **Confirm**: Receive confirmation with Google Meet link

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by Pratham Gambhir

</div>
