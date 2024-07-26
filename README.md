# Blog-App

Blog-App is a sophisticated blogging platform developed using cutting-edge web technologies. It empowers users to engage with content through Create, Read, Update, and Delete (CRUD) operations on blog posts. While the platform is accessible to everyone, only registered users can create, edit, or delete their own posts, ensuring a secure and personalized user experience. This README aims to provide a detailed overview of the project, including its technology stack, key features, and setup instructions.

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Setup and Configuration](#setup-and-configuration)
- [Known Issues](#known-issues)
- [Learning Outcomes](#learning-outcomes)

## Introduction

Blog-App is designed to offer a seamless blogging experience, blending intuitive design with robust backend capabilities. It serves as a practical platform for exploring and applying various web development concepts.

## Technology Stack

The foundation of Blog-App is built upon a mix of frontend and backend technologies, chosen for their efficiency, flexibility, and community support.

### Frontend

- **AngularJS**: Serves as the backbone of the single-page application (SPA), enabling dynamic content updates without page reloads.
- **Angular Material**: Implements Material Design principles, offering pre-built components for a consistent and modern UI.
- **PrimeNG**: Extends Angular with high-quality components, enhancing the visual appeal and interactivity of the app.

### Backend

- **ExpressJS**: Simplifies server-side application development, handling HTTP requests efficiently.
- **NodeJS**: Executes JavaScript on the server side, powering the backend logic of the app.
- **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents, suitable for scalable storage solutions.

### Additional Concepts

- **Interceptors**: Middleware functions for intercepting HTTP requests and responses, facilitating global operations like logging or error handling.
- **RxJS**: Enables reactive programming using Observables, streamlining the handling of asynchronous operations.
- **Services**: Singleton objects in Angular that maintain data throughout the application lifecycle, facilitating state management.
- **Cookies**: Small data pieces stored on the client's computer, used for session tracking and personalization.

## Key Features

- **CRUD Operations**: Users can create, read, update, and delete their own blog posts, fostering a dynamic and engaging content ecosystem.
- **Public Accessibility**: Allows visitors to view all blog posts without registration, promoting broad accessibility.
- **Secure Authentication**: Implements user registration and login, ensuring that only authorized users can modify their content.
- **Role-Based Access Control (RBAC)**: Utilizes Angular's route guards to enforce access restrictions based on user roles, enhancing security.
- **JSON Web Tokens (JWT)**: Facilitates secure session management and authorization, protecting user data and content integrity.
- **Responsive Design**: Adapts to various screen sizes and devices, ensuring a consistent user experience across platforms.
- **SEO Optimization**: Enhances the visibility of blog posts in search engines, driving organic traffic.

## Setup and Configuration

To start working with Blog-App, follow these straightforward steps:

1. **Clone the Repository**
   - Clone this GitHub repository to your local machine.

2. **Install Dependencies**
   - Run `npm install` in both the client and server directories to install all necessary packages.

3. **Running the Application**
   - Launch the client-side application by executing `ng serve` in the client directory.
   - For the server-side, use `npm run dev`.

## Known Issues

Currently, deployment challenges related to Angular V18 and build folder structure issues prevent the project from being live. Further details can be found in this [GitHub Issue](https://github.com/angular-schule/angular-cli-ghpages/issues/173).

## Learning Outcomes

Engaging with Blog-App has offered valuable insights into:
- AngularJS and its ecosystem
- Advanced state management techniques
- Interceptor usage for global request/response handling
- Service creation and utilization for maintaining application state
- Understanding event propagation in web applications
- Secure authentication mechanisms using JWT

