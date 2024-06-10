
### DishMatch Frontend

# DishMatch Frontend

This is the frontend for the DishMatch application, built with React.

## Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LeviathanIsI/dishmatch_frontend.git

Navigate to the frontend directory:
bash
Copy code
cd DishMatch/frontend
Install the dependencies:
bash
Copy code
npm install
Environment Variables
Create a .env file in the root of the frontend directory and add the following environment variable:

env
Copy code
VITE_GOOGLE_CLIENT_ID="your_google_client_id"
Running the Application
Start the application by running:

bash
Copy code
npm run dev
The application will be running on http://localhost:5173.

Components
Auth
Login

src/pages/Login.jsx
Allows users to login with email/password or Google OAuth
Register

src/pages/Register.jsx
Allows users to register with email/password or Google OAuth
Recipes
MyRecipes

src/pages/MyRecipes.jsx
Displays the user's saved recipes
Matching

src/pages/Matching.jsx
Displays a random recipe for the user to decide whether to save or pass
RecipeDetails

src/pages/RecipeDetails.jsx
Displays detailed information about a specific recipe
Preferences
Preferences
src/pages/Preferences.jsx
Allows users to set their recipe preferences
Navbar
Navbar
src/components/Navbar.jsx
Navigation bar with links to various pages and authentication actions
License
This project is licensed under the MIT License.
