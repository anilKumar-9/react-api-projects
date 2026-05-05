# Jokes Viewer Application

## Overview

The Jokes Viewer Application is a React-based web application that fetches jokes from a public API and displays them in an interactive and user-friendly interface. Users can browse jokes using navigation controls such as Next, Previous, and Random, making the experience simple and engaging.

## Live Demo

[Vercel Link: ](https://react-api-projects-silk.vercel.app/)

## GitHub Repository

[Repo: ](https://github.com/anilKumar-9/react-api-projects/blob/main/projects/jokes-app)

## Features

* Fetches jokes from a public API
* Displays one joke at a time in a clean interface
* Next and Previous navigation
* Random joke generator
* Loading and error handling
* Responsive dark-themed UI

## Tech Stack

* React (with Hooks)
* JavaScript (ES6+)
* Tailwind CSS
* Fetch API

## API

Endpoint used:
https://api.freeapi.app/api/v1/public/randomjokes

## Installation and Setup

1. Clone the repository:
   git clone https://github.com/your-username/jokes-viewer.git

2. Navigate to the project folder:
   cd jokes-viewer

3. Install dependencies:
   npm install

4. Start the development server:
   npm run dev

5. Open in browser:
   http://localhost:5173

## Project Structure

src/
│── App.jsx
│── main.jsx
│── index.css

## Usage

* Click "Next" to view the next joke
* Click "Prev" to view the previous joke
* Click "Random" to display a random joke

## Error Handling

* Displays a loading state while fetching data
* Shows an error message if the API request fails
* Handles empty data safely

## Future Improvements

* Pagination using API nextPage feature
* Search and filtering options
* Save favorite jokes using localStorage
* Copy joke to clipboard functionality

## Deployment

The application is deployed using Vercel.

## License

This project is developed for educational purposes.
