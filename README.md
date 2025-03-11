# AI-Assisted Tax Preparation Tool

A modern web application that helps users prepare their taxes with AI-powered suggestions and optimizations. This project leverages current technologies to provide a seamless tax preparation experience.

## Features

- User authentication
- Tax information input forms
- AI-powered tax optimization suggestions
- Detailed tax calculations
- Tax report generation
- Integration with Canada Revenue Agency (CRA) tax filing API

## Tech Stack

### Frontend
- **TypeScript**: Strongly typed JavaScript for better development experience
- **React**: UI library for building interactive user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **NestJS**: Progressive Node.js framework for building efficient and scalable server-side applications
- **Firebase**: Authentication, database, and hosting platform

### AI/ML
- Custom AI models for tax optimization suggestions

## Project Structure

```
ai-tax-preparation-tool/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── ...
├── server/                 # Backend NestJS application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── tax/            # Tax calculation module
│   │   ├── ai/             # AI suggestions module
│   │   └── ...
│   └── ...
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Firebase account

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   PORT=3001
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login existing user
- `POST /api/auth/logout`: Logout current user

### Tax Endpoints

- `GET /api/tax/:id`: Get tax data by ID
- `POST /api/tax/save`: Save tax data
- `POST /api/tax/calculate`: Calculate taxes
- `POST /api/tax/optimize`: Get optimization suggestions
- `POST /api/tax/generate-report`: Generate tax report
- `POST /api/tax/:id/file`: File tax return with CRA

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [NestJS](https://nestjs.com/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
