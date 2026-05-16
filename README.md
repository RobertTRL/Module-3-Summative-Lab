# Summative Lab Showcase #
A React web application built with Vite, featuring 3D rendering capabilities using Three.js/React Three Fiber and animations with Framer Motion. It uses json-server to mock a backend REST API for data management.

## Getting Started ##
### Prerequisites ###
Make sure you have Node.js installed on your machine.

### Installation ###
Clone the repository and install the dependencies by running npm install

## Running the Application ## 
To run this application fully, you will need to start both the frontend development server and the mock backend server in two separate terminal windows.

__Terminal 1:__ Start the Mock Backend (JSON Server)
Type __npm run server__ in the terminal. This runs the local database on __http://localhost:3001__ using the data from src/data/db.json. 

__Terminal 2:__ Start the Frontend React App
Type __npm run dev__ in the terminal. This runs the Vite development server.

## Testing ##
This project uses Jest and React Testing Library for testing. To run the test suite, simply use: npm test

