# 🍕 Recipe App with Favorites and Filters

## 📌 Overview
The **Recipe App** is a web application built using **ReactJS** and **Redux** that allows users to browse, search, and save their favorite recipes. The app fetches recipes from an external API and provides filters for dietary preferences and meal categories.

---

🔗 **Live Demo:** [Recipe Explorer App](https://recipe-explorer-app.netlify.app/)

## 🚀 Features

✅ Display a collection of recipes with titles, images, and descriptions  
✅ Fetch recipes from an API dynamically  
✅ Search recipes by keywords, ingredients, or dietary criteria  
✅ View recipe details, including ingredients, instructions, and preparation time  
✅ Mark and save favorite recipes for later  
✅ Filter recipes by categories (Breakfast, Lunch, Dinner) and dietary restrictions  
✅ State management using Redux for better scalability  

---

## 🛠️ Tech Stack

- **Frontend:** ReactJS, Redux, JavaScript, CSS  
- **State Management:** Redux (Actions, Reducers, Store)  
- **API Integration:** Edamam API  
- **Styling:** CSS/SCSS  

---

## 📦 Installation & Setup

1️⃣ **Clone the repository:**  
bash
git clone https://github.com/ganeshyevle/Recipe-App.git
cd Recipe-App

2️⃣ **Install dependencies:**
- npm install

3️⃣ **Start the development server:**
- npm start
- ➡️ The app will be available at http://localhost:3000/

🔗 **API Used**
The app fetches recipes from the Edamam API. Example API endpoint:
[bash
Copy
Edit](https://api.edamam.com/search?q=pizza&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY&from=0&to=50
)

Replace YOUR_APP_ID and YOUR_APP_KEY with actual credentials from Edamam API.

📂 **Project Structure**
Recipe-App/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Pages (Home, Favorites, Recipe Details)
│   ├── redux/         # Redux store, actions, reducers
│   ├── assets/        # Images, icons
│   ├── App.js         # Main app component
│   ├── index.js       # Entry point
│   ├── styles/        # Global styles
│── public/
│── package.json
│── README.md


📸 **Screenshots**
📌 ![Homepage Screenshot](https://drive.google.com/uc?export=view&id=1GluUPjsPYp7lYWqkuCNUhTd7hB_9MOQX)

🤝 **Contributing**
Contributions are welcome! Feel free to fork the repository and submit a pull request.

📜 **License**
This project is licensed under the MIT License.

How to Add & Push README to GitHub
Save this file as README.md in your project folder.
Open a terminal in your project directory and run:

git add README.md
git commit -m "Added README file"
git push origin main
Check your GitHub repository to see the README file displayed.
This README follows best practices and makes your repository look professional! 🚀

---




