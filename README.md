<p align="center">
  <img src="./docs/images/logo.png" width="180">
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

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express-5-lightgrey)
![Supabase](https://img.shields.io/badge/Supabase-Database-success)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-black)
![Version](https://img.shields.io/badge/version-v0.2.0-orange)
![Status](https://img.shields.io/badge/status-active-success)

---

# Overview

The Smart Student Procedures Management System is a multiplatform application designed to digitalize and optimize academic administrative procedures in higher education institutions.

The platform centralizes procedure requests, document management, request tracking, and intelligent information retrieval through semantic search capabilities powered by embeddings.

The project is developed following Scrum methodology and a Layered Monolithic Architecture to ensure maintainability, scalability, and efficient academic delivery.

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
- [System Architecture](#system-architecture)
  - [Architecture Style](#architecture-style)
  - [Architectural Principles](#architectural-principles)
  - [Hexagonal Architecture Layers](#hexagonal-architecture-layers)
- [Repository Structure](#repository-structure)
- [Supported Platforms](#supported-platforms)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Authentication Module](#authentication-module)
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

Many academic institutions still rely on manual or semi-digital administrative processes, creating challenges such as:

- Long waiting times
- Lack of transparency in request status
- Excessive paperwork
- Information fragmentation
- Difficult access to administrative information
- Poor user experience

This project aims to address these issues through a centralized digital platform accessible from multiple devices.

---

# Objectives

## General Objective

Develop a multiplatform system capable of digitalizing and optimizing academic administrative procedures while improving information accessibility through intelligent search mechanisms.

## Specific Objectives

- Provide secure authentication and user management.
- Allow students to submit administrative procedures digitally.
- Enable document upload and management.
- Allow users to track procedure status in real time.
- Provide administrative tools for request management.
- Implement semantic search capabilities.
- Support Web, Desktop, and Mobile platforms.
- Establish a scalable software architecture.

---

# Key Features

## Student Features

- User Registration
- Secure Authentication
- Procedure Visualization
- Online Procedure Submission
- Document Upload
- Procedure Tracking
- Notifications
- Semantic Search
- Procedure Recommendations

## Administrator Features

- Administrative Dashboard
- Procedure Management
- Request Review
- Status Updates
- Observation Management
- Indexed Information Management

---

# Technology Stack

## Frontend

| Technology | Version | Purpose |
|------------|------------|------------|
| React | 19.x | User Interface Development |
| TypeScript | 5.x | Type Safety |
| Vite | 7.x | Build Tool |
| Tailwind CSS | 4.x | Styling Framework |
| React Router | 7.x | Client-Side Routing |

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter)

---

## Backend

| Technology | Version | Purpose |
|------------|------------|------------|
| Node.js | 22.x | Runtime Environment |
| Express.js | 5.x | REST API Framework |
| JWT | Latest | Authentication |
| bcrypt | Latest | Password Encryption |

![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-success)

---

## Database

| Technology | Purpose |
|------------|------------|
| Supabase | Database & Backend Services |

![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)

---

## Architecture

| Technology | Purpose |
|------------|------------|
| Hexagonal Architecture | Core System Design |
| Ports & Adapters | Infrastructure Isolation |

![Hexagonal Architecture](https://img.shields.io/badge/Architecture-Hexagonal-success)
![Ports%20and%20Adapters](https://img.shields.io/badge/Pattern-Ports%20%26%20Adapters-blue)

---

## DevOps & Infrastructure

| Technology | Purpose |
|------------|------------|
| Docker | Containerization |
| Docker Hub | Container Registry |
| GitHub Actions | Continuous Integration / Deployment |
| GitHub Organization | Repository Management |

![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![Docker Hub](https://img.shields.io/badge/Docker_Hub-Registry-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions)
![GitHub](https://img.shields.io/badge/GitHub-Organization-181717?logo=github)

---

## Documentation & Project Management

| Technology | Purpose |
|------------|------------|
| SRS | Software Requirements Specification |
| Scrum | Agile Methodology |
| Huly | Agile Project Management |

![Scrum](https://img.shields.io/badge/Scrum-Agile-blue)
![Huly](https://img.shields.io/badge/Huly-Project_Management-purple)

---

# System Architecture

## Architecture Style

The project follows a **Hexagonal Architecture (Ports and Adapters)** approach.

This architectural style promotes:

- Separation of concerns
- Independence from frameworks
- Testability
- Maintainability
- Scalability
- Flexibility to replace external technologies

The business domain remains isolated from external dependencies such as databases, APIs, authentication providers, and user interfaces.

---

## Architectural Principles

The architecture is based on the following principles:

- Domain-Centric Design
- Dependency Inversion Principle
- Ports and Adapters Pattern
- Separation of Business Logic and Infrastructure
- Framework Independence
- High Testability
- Low Coupling and High Cohesion

---

# Repository Structure

```text
EduProcess/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   └── package.json
│
├── docker/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
└── README.md
```

---

# Supported Platforms

The system is designed to operate on:

* Web Browsers
* Desktop Applications (Electron)
* Mobile Devices (React Native)

Supported browsers:

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Safari

---

# Getting Started

## Prerequisites

Before running the project, ensure the following software is installed:

* Git
* Node.js 22+
* npm 10+
* Docker
* Docker Compose

---

# Installation

## Clone Repository

```bash
git clone https://github.com/organization/EduProcess.git
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Run development server:

```bash
npm run dev
```

---

## Backend Setup

```bash
cd backend
npm install
```

Run development server:

```bash
npm run dev
```

---

# Environment Variables

## Backend

Create a `.env` file inside the backend folder:

```env
PORT=3000

JWT_SECRET=your_secret_key

SUPABASE_URL=your_supabase_url

SUPABASE_ANON_KEY=your_supabase_key
```

---

## Frontend

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:3000
```

---

# Docker

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

# Authentication Module

Current authentication implementation includes:

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Session Persistence
* Role-Based Authorization Foundation

---

# Development Workflow

The project follows a Git Flow inspired strategy.

```text
feature/*
        ↓
develop
        ↓
qa
        ↓
main
```

---

## Branches

| Branch    | Purpose                 |
| --------- | ----------------------- |
| main      | Production Environment  |
| qa        | Quality Assurance       |
| develop   | Integration Environment |
| feature/* | Feature Development     |

---

# Pull Request Process

1. Create feature branch.
2. Implement changes.
3. Push changes.
4. Open Pull Request.
5. Code Review.
6. Approval.
7. Merge into develop.
8. Promote to QA.
9. Promote to Production.

---

# CI/CD Pipeline

GitHub Actions automatically executes:

* Dependency Installation
* Build Validation
* Static Checks
* Docker Image Generation
* QA Deployment
* Production Deployment

---

# Deployment Environments

## Development

Environment used by developers during implementation.

---

## QA

Environment used for testing and validation before production releases.

---

## Production

Stable environment available to final users.

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

# Project Roadmap

## Sprint 1

* Project Foundation
* Environment Setup
* Backend Structure
* Frontend Structure

## Sprint 2

* Authentication Module
* JWT Integration
* Protected Routes
* QA Deployment
* Production Deployment

## Sprint 3

* Procedures Module
* Procedure CRUD
* Request Submission
* Student Dashboard

## Sprint 4

* Document Upload
* Request Tracking
* Notifications

## Sprint 5

* Semantic Search
* Embeddings Integration

## Sprint 6

* Procedure Recommendations
* Search Optimization

## Sprint 7

* Desktop Application Integration

## Sprint 8

* Mobile Application Integration

## Sprint 9

* System Testing
* Deployment Optimization

---

# Team

<div align="center">

| Member | Role |
|---------|---------|
| **José Soto** | Business Analyst / Scrum Master |
| **Mathias Fernández** | Backend Developer / Software Architect |
| **Vanessa Heredia** | Frontend Developer / UI/UX Designer |
| **Frixon Luna** | DevOpsSec / Site Reliability Engineer |

</div>

---

# Quality Standards

The project follows:

* Scrum Framework
* Git Flow Practices
* Layered Architecture Principles
* Pull Request Reviews
* Continuous Integration
* Continuous Deployment
* Documentation-Driven Development

---

# Future Improvements

Planned future enhancements include:

* Advanced Semantic Ranking
* Analytics Dashboard
* Real-Time Notifications
* AI-Powered Recommendations
* University System Integrations
* Multi-Tenant Support

---

# License

This project was developed for academic and educational purposes.

Universidad Central del Ecuador

Faculty of Engineering and Applied Sciences

Software Engineering Program

2026

---