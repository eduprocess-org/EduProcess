<p align="center">
  <img src="./desktop/assets/icon.png" width="100">
</p>

<h1 align="center">
EduProcess
</h1>

<h1 align="center">
Smart Student Procedures Management System
</h1>

<p align="center">
Digital Transformation Platform for Academic Administrative Procedures
</p>

![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-Desktop_App-47848F?style=flat&logo=electron&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-Mobile_App-119EFF?style=flat&logo=capacitor&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-Framework-FF5D01?style=flat&logo=astro&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat)
---

# Overview

EduProcess is a multiplatform system designed to digitalize and optimize academic administrative procedures within higher education institutions.

The platform provides a unified experience across **Web**, **Desktop**, and **Mobile** applications, allowing students and administrators to manage academic requests efficiently through a secure and modern interface.

The project includes a responsive web application built with React, a desktop application powered by Electron, a mobile application developed with Capacitor, and a JAMstack landing page built with Astro.

EduProcess centralizes procedure requests, document management, request tracking, notifications, and administrative workflows while exposing a fully documented REST API through Swagger and a Postman workspace for testing.

The project follows the Scrum framework and adopts a Hexagonal Architecture (Ports and Adapters) to ensure maintainability, scalability, testability, and clear separation between business logic and infrastructure.

---

# Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
  - [General Objective](#general-objective)
  - [Specific Objectives](#specific-objectives)
- [Key Features](#key-features)
  - [Student Features](#student-features)
  - [Administrator Features](#administrator-features)
- [Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [DevOps & Infrastructure](#devops--infrastructure)
  - [Documentation](#documentation)
- [Project Modules](#project-modules)
- [System Architecture](#system-architecture)
  - [Architecture Style](#architecture-style)
  - [Architectural Principles](#architectural-principles)
  - [Hexagonal Architecture Layers](#hexagonal-architecture-layers)
- [Repository Structure](#repository-structure)
- [Supported Platforms](#supported-platforms)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Authentication Module](#authentication-module)
- [API Documentation](#api-documentation)
- [Postman Workspace](#postman-workspace)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment Environments](#deployment-environments)
- [Versioning Strategy](#versioning-strategy)
- [Project Roadmap](#project-roadmap)
- [Team](#team)
- [Quality Standards](#quality-standards)
- [Future Improvements](#future-improvements)
- [License](#license)

---

# Problem Statement

Many universities still rely on manual or partially digital administrative procedures, resulting in slow processes, excessive paperwork, limited transparency, and fragmented information.

These challenges negatively affect both students and administrative staff by increasing waiting times, making request tracking difficult, and reducing operational efficiency.

EduProcess addresses these problems through a centralized multiplatform solution that enables secure authentication, online procedure submission, request tracking, notifications, and administrative management from Web, Desktop, and Mobile applications.

---

# Objectives

## General Objective

Develop a secure, scalable, and multiplatform system that digitalizes academic administrative procedures while improving efficiency, transparency, and user experience for both students and administrators.

## Specific Objectives

- Provide secure authentication and role-based authorization.
- Allow students to submit academic procedure requests digitally.
- Support document upload and request tracking.
- Provide administrators with complete request management capabilities.
- Manage academic procedures through a dedicated administration module.
- Deliver notifications related to request status updates.
- Support Web, Desktop, and Mobile platforms.
- Expose a documented REST API using Swagger.
- Provide a Postman workspace for API validation.
- Ensure responsive interfaces and cross-platform compatibility.
- Apply Scrum practices and modern software engineering principles throughout the development lifecycle.

---

# Key Features

## Student Features

- User Registration
- Secure Authentication
- Student Dashboard
- Procedure Catalog
- Online Procedure Submission
- Supporting Document Upload
- Request Tracking
- Status Notifications
- Mobile Dashboard
- Desktop Application Access
- Responsive User Interface

## Administrator Features

- Administrator Dashboard
- Procedure Management
- Create Procedures
- Edit Procedures
- Activate and Deactivate Procedures
- Request Review
- Status Management
- Administrative Observations
- Notification Management
- Request Filtering and Search
- User Administration

---

# Technology Stack

## Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | Web Application |
| TypeScript | 5.x | Type Safety |
| Vite | 7.x | Build Tool |
| Tailwind CSS | 4.x | Utility-First CSS Framework |
| React Router | 7.x | Client-Side Routing |
| Capacitor | 0.81.x | Mobile Application |
| Electron | 38.x | Desktop Application |
| Astro | 5.x | Landing Page |
| Zustand | Latest | Global State Management |
| Axios | Latest | HTTP Client |

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Capacitor](https://img.shields.io/badge/Capacitor-Mobile-119EFF?style=flat&logo=capacitor&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron)
![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)

---

## Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.x | Runtime Environment |
| Express.js | 5.x | REST API |
| Prisma ORM | Latest | Database Access |
| JWT | Latest | Authentication |
| bcrypt | Latest | Password Encryption |
| Swagger | OpenAPI 3 | REST API Documentation |

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?logo=swagger)

---

## Database

| Technology | Purpose |
|------------|---------|
| Supabase | PostgreSQL Database |
| Prisma ORM | Data Access Layer |

![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)

---

## Architecture

| Technology | Purpose |
|------------|---------|
| Hexagonal Architecture | Software Architecture |
| Ports and Adapters | Infrastructure Isolation |
| REST API | Client Communication |
| JWT | Secure Authentication |

![Hexagonal Architecture](https://img.shields.io/badge/Architecture-Hexagonal-success)
![REST](https://img.shields.io/badge/API-REST-blue)

---

## DevOps & Infrastructure

| Technology | Purpose |
|------------|------------|
| Docker | Containerization |
| Docker Hub | Container Registry |
| GitHub Actions | Continuous Integration / Deployment |
| GitHub Organization | Repository Management |
| AWS EC2 | INfrastructure Cloud |

![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![Docker Hub](https://img.shields.io/badge/Docker_Hub-Registry-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions)
![GitHub](https://img.shields.io/badge/GitHub-Organization-181717?logo=github)

---

## Documentation & Quality

| Technology | Purpose |
|------------|---------|
| Swagger | API Documentation |
| Postman | Endpoint Validation |
| Scrum | Agile Framework |
| Huly | Sprint Management |

![Swagger](https://img.shields.io/badge/Swagger-Documentation-85EA2D?logo=swagger)
![Postman](https://img.shields.io/badge/Postman-API_Testing-FF6C37?logo=postman)
![Scrum](https://img.shields.io/badge/Scrum-Agile-blue)
![Huly](https://img.shields.io/badge/Huly-Project_Management-purple)

---

# System Architecture

## Pattern: Hexagonal Architecture (Ports & Adapters)

The backend follows a **hexagonal architecture** where the domain is isolated from infrastructure details. Dependencies flow inward: `Infrastructure → Application → Domain`.

## Tech Stack

- **Runtime:** Node.js + Express.js + TypeScript
- **ORM:** Prisma 7.x (adapter pattern with `PrismaPg`)
- **Database:** PostgreSQL (Supabase)
- **Auth:** JWT stateless (5min session token + 24h refresh token)
- **Real-time:** Socket.IO

## Directory Structure

```
backend/src/
├── domain/                          # Core business logic (innermost layer)
│   ├── procedures/
│   │   ├── procedure.types.ts       # DTOs and interfaces
│   │   ├── procedure.repository.ts  # Repository interface (port)
│   │   └── status-machine.ts        # Status transition rules
│   ├── admin/
│   │   ├── admin.types.ts
│   │   ├── admin.repository.ts
│   │   └── procedures/              # Admin procedure sub-module
│   ├── auth/
│   ├── career/
│   ├── observations/
│   └── notifications/
│
├── application/                     # Use cases / services
│   ├── procedures/
│   │   ├── procedure.service.ts     # Business logic
│   │   └── status-history.service.ts
│   ├── admin/
│   │   └── procedures/
│   ├── auth/
│   ├── career/
│   ├── observations/
│   └── notifications/
│
├── infrastructure/                  # External adapters (outermost layer)
│   ├── http/
│   │   ├── routes/                  # Express routes (entry points)
│   │   ├── controllers/             # Request/response handling
│   │   ├── middlewares/             # Auth, validation
│   │   └── utils/                   # Error handler, helpers
│   ├── persistence/
│   │   ├── database.config.ts       # Prisma client singleton
│   │   └── prisma/                  # Repository implementations
│   │       ├── procedure/
│   │       ├── admin/
│   │       ├── auth/
│   │       ├── career/
│   │       ├── observation/
│   │       └── notification/
│   ├── websocket/                   # Socket.IO events
│   └── config/                      # Swagger, env config
│
└── app.ts                           # Express app setup
```

## Dependency Flow

```
Route → Controller → Service → Repository (interface) → PrismaRepository (implementation)
```

## DI Wiring

Each route file instantiates the full chain:

```typescript
// procedure.routes.ts
const repository = new PrismaProcedureRepository();
const service = new ProcedureService(repository);
const controller = new ProcedureController(service);
```

## Key Design Decisions

| Decision | Rationale |
|---|---|
| **Hexagonal per module** | Each domain concept (procedures, observations, notifications) has its own `domain/`, `application/`, `infrastructure/persistence/prisma/` folder |
| **Repository pattern** | Domain defines interface, Prisma implements it — easy to swap DB or test with mocks |
| **Status machine** | Dedicated `status-machine.ts` enforces valid state transitions (pending → in_review → approved/rejected) |
| **No migration files** | Uses `prisma db push` for schema sync to Supabase |
| **Shared error handler** | `error-handler.ts` with exact-match + prefix-match for known error messages |
| **Socket.IO for real-time** | `SocketService` singleton, events decoupled via optional DI |

## Modules

| Module | Domain | Application | Infrastructure |
|---|---|---|---|
| **Procedures** | Types, Repository interface, Status machine | ProcedureService, StatusHistoryService | PrismaProcedureRepository, ProcedureController, Routes |
| **Admin** | AdminTypes, AdminRepository | AdminProcedureService, AdminDashboardService | PrismaAdminProcedureRepository, AdminControllers |
| **Auth** | AuthTypes, AuthRepository | AuthService | PrismaAuthRepository, AuthController |
| **Observations** | ObservationTypes, ObservationRepository | ObservationService | PrismaObservationRepository |
| **Notifications** | NotificationTypes, NotificationRepository | NotificationService | PrismaNotificationRepository |
| **Career** | CareerTypes, CareerRepository | CareerService | PrismaCareerRepository |

## Tests

- **Stack:** `node:test` + `supertest` + mock in-memory repositories
- **228 tests** across auth, procedures, admin, observations, notifications
- Run: `npm test` (builds first, then runs all test files)
---
# Project Modules

| Module | Description |
|---------|-------------|
| Authentication | Secure authentication and authorization using JWT |
| Student Dashboard | Student overview and request management |
| Administrator Dashboard | Administrative control panel |
| Requests | Procedure request lifecycle |
| Procedures | Procedure catalog management |
| Notifications | Request status notifications |
| Mobile Application | React Native mobile client |
| Desktop Application | Electron desktop client |
| Landing Page | JAMstack website built with Astro |
| REST API | Backend services exposed through Express |
| Swagger | Interactive API documentation |
| Postman Workspace | API testing collection |

---

# Supported Platforms

EduProcess is available on multiple platforms:

| Platform | Technology |
|----------|------------|
| Web Application | React |
| Desktop Application | Electron |
| Mobile Application | Capacitor |
| Landing Page | Astro |
| REST API | Express |
| API Documentation | Swagger |

Supported browsers:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

Desktop:

- Windows 10+
- Windows 11

Mobile:

- Android
- iOS

---

# Getting Started

## Prerequisites

Before running the project locally, ensure the following software is installed:

- Git
- Node.js 22+
- npm 10+
- Docker
- Docker Compose

Recommended tools:

- Visual Studio Code
- Postman
- Capacitor
- Electron

---

# Installation

## Clone Repository

```bash
git clone https://github.com/organization/EduProcess.git
cd EduProcess
```

---

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Install Mobile Dependencies

```bash
cd mobile
npm install
```

---

## Install Desktop Dependencies

```bash
cd desktop
npm install
```

---

## Install Landing Page Dependencies

```bash
cd landing-page
npm install
```
---
# Running Locally

## Backend

```bash
cd backend
npm run dev
```

The backend will be available at:

```text
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm run dev
```

The web application will be available at:

```text
http://localhost:5173
```

---


## Desktop Application

```bash
cd desktop
npm run dev
```

Electron will start automatically using the local frontend.

---

## Landing Page

```bash
cd landing-page
npm run dev
```

Available at:

```text
http://localhost:4321
```

---

# Environment Variables

## Backend

Create a `.env` file inside the `backend` directory.

```env
PORT=3000

DATABASE_URL=your_database_url

JWT_SECRET=your_jwt_secret

SUPABASE_URL=your_supabase_url

SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Frontend

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

## Mobile

Create a `.env` file inside the `mobile` directory.

```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api/v1
```

---

## Desktop

Create a `.env` file inside the `desktop` directory.

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

## Landing Page

No environment variables are required.

---
# Docker

The project includes Docker support for local development and deployment.

## Build Containers

```bash
docker compose build
```

---

## Start Containers

```bash
docker compose up -d
```

---

## Stop Containers

```bash
docker compose down
```

---

## View Running Containers

```bash
docker ps
```

---

## View Container Logs

```bash
docker compose logs
```
---
# Project URLs

| Service | Local URL |
|----------|-----------|
| Backend API | http://localhost:3000 |
| Frontend | http://localhost:5173 |
| Landing Page | http://localhost:4321 |
| Swagger | http://localhost:3000/api-docs |
| Mobile | Capacitor APK |
| Desktop | Electron Application |

---

# Development Workflow

The project follows a GitFlow-inspired branching strategy.

```text
feature/*
        │
        ▼
develop
        │
        ▼
qa
        │
        ▼
main
```

Each feature is developed through GitHub Issues and Pull Requests following Scrum practices.

The team uses:

- Feature branches
- Atomic commits
- Pull Requests
- Code Reviews
- QA Validation
- Production Releases
---

## Branches

| Branch | Purpose |
|---------|---------|
| main | Production |
| qa | Quality Assurance |
| develop | Integration |
| feature/* | New Features |
| fix/* | Bug Fixes |
| docs/* | Documentation |
| hotfix/* | Critical Fixes |

---

# Pull Request Process

Every contribution follows the same workflow:

1. Create a GitHub Issue.
2. Create a feature branch.
3. Implement the required changes.
4. Commit changes using atomic commits.
5. Push the branch to the remote repository.
6. Open a Pull Request targeting `develop`.
7. Perform code review.
8. Resolve review comments if necessary.
9. Merge into `develop`.
10. Promote changes to `qa`.
11. Validate in QA.
12. Merge into `main` after approval.

---

# CI/CD Pipeline

The project uses GitHub Actions to automate build validation and deployments.

Pipeline stages include:

- Dependency installation
- Project build
- Static validation
- Docker image generation
- QA deployment
- Production deployment

Deployment targets:

| Environment | Platform |
|-------------|----------|
| Backend | Render |
| Frontend | Render |
| Desktop | Electron Build |

---

# Deployment Environments

## Development

Local environment used by developers during implementation.

---

## QA

Environment used for testing new features before production deployment.

Activities include:

- Functional Testing
- Integration Testing
- Regression Testing
- User Acceptance Testing (UAT)

---

## Production

Stable environment available to end users.

Every production deployment must satisfy:

- Successful build
- QA approval
- Pull Request approval
- CI/CD validation

---

# Versioning Strategy

The project follows Semantic Versioning.

Format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.0.0
```

Rules:

* MAJOR → Breaking Changes
* MINOR → New Features
* PATCH → Bug Fixes

Current Version:

```text
v0.2.0
```
---

# Completed Modules

The MVP includes the following completed modules:

| Module | Status |
|---------|--------|
| Authentication | ✅ Completed |
| Student Dashboard | ✅ Completed |
| Administrator Dashboard | ✅ Completed |
| Procedures Management | ✅ Completed |
| Request Management | ✅ Completed |
| Document Upload | ✅ Completed |
| Notifications | ✅ Completed |
| Mobile Application | ✅ Completed |
| Desktop Application | ✅ Completed |
| Landing Page | ✅ Completed |
| Swagger Documentation | ✅ Completed |
| Postman Workspace | ✅ Completed |
| Docker Support | ✅ Completed |
| CI/CD Pipeline | ✅ Completed |

---

# Team

<div align="center">

| Member | Role |
|---------|------|
| **José Soto** | Business Analyst · Scrum Master · QA Lead |
| **Mathias Fernández** | Backend Developer · Software Architect |
| **Vanessa Heredia** | Frontend Developer · UI/UX Designer |
| **Frixon Luna** | DevOpsSec · Site Reliability Engineer |

</div>

---

# Quality Standards

The project follows modern software engineering practices including:

- Scrum Framework
- GitFlow Workflow
- Atomic Commits
- Pull Request Reviews
- Continuous Integration
- Continuous Deployment
- Hexagonal Architecture
- REST API Best Practices
- Responsive Design
- Documentation-Driven Development
- Code Review Process
- Manual QA Validation

---

# Documentation

Complete project documentation is available in the shared OneDrive folder.

The documentation includes:

- Software Requirements Specification (SRS)
- Sprint Planning Documents
- Sprint Reviews
- Sprint Retrospectives
- Product Backlog
- User Stories
- Software Architecture
- UML Diagrams
- Entity Relationship Diagram
- QA Reports
- User Manual
- Technical Manual
- Deployment Guide
- Screenshots
- Demonstration Videos
- Final Project Report

Access the documentation here:

🔗 https://uceedu-my.sharepoint.com/:f:/g/personal/jgsoto_uce_edu_ec/IgDOexTuX2MNR6jP4_WERJ5TAfikbZ4AKUbEcAql0bKSjX4?e=lxHfOa

---

# License

This project was developed for academic purposes as part of the **Software Engineering** course at the **Universidad Central del Ecuador**.

Faculty of Engineering and Applied Sciences

2026

---