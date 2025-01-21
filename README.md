# yunimall-frontend

Welcome to the **yunimall-frontend** repository! This is where all the frontend magic for yunimall happens.

## Setup

To get started, follow these steps:

- **Update NestJS CLI**:  
  npm i -g @nestjs/cli

- **Create a Vite Project**:  
  npm create vite@latest yunimall-frontend

Follow the prompts, choosing **React** and **TypeScript**. 

- **Navigate to the Project Directory**:  
  cd yunimall-frontend

- **Install Dependencies**:  
  npm install

## Features

**yunimall-frontend** is equipped with the following features:

- **Tailwind CSS Setup**: 
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
 This setup provides a utility-first CSS framework for rapid UI development.

- **Components Library**:  
Shadcn: npx shadcn-ui@latest init
to add component npx shadcn@latest add _component name_


- **PWA (Progressive Web App) Enabled**:  
  npm i vite-plugin-pwa -D
  This makes yunimall accessible offline and provides a native app-like experience.

- **Routing**:  
Using **react-router-dom** for navigation within the app.
  npm install react-router-dom

- **Internationalization (i18n)**:  
With **react-i18next** for handling multiple languages.
  npm install react-i18next i18next
  npm install i18next-http-backend i18next-browser-languagedetector

## Contributing

We welcome contributions! If you're interested in helping out:

- Fork the repository.
- Create your feature branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a pull request.


---

Thank you for checking out yunimall-frontend. Let's build something great together!