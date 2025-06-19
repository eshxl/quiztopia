# 🎮 Quiztopia

**Quiztopia** is a fun and interactive trivia quiz application built using **Angular v20**, designed as part of my frontend internship. It lets users choose a category, difficulty, and number of questions — and then tests their knowledge in a smooth, animated quiz interface.

🌐 **Live Demo:**  
👉 [https://eshxl.github.io/quiztopia/](https://eshxl.github.io/quiztopia/)

---

## 📸 Screenshots

| Home Page | Quiz Page | Result Page |
|----------|-----------|-------------|
| ![Home](https://github.com/eshxl/quiztopia/assets/preview-home.png) | ![Quiz](https://github.com/eshxl/quiztopia/assets/preview-quiz.png) | ![Result](https://github.com/eshxl/quiztopia/assets/preview-result.png) |

---

## ⚙️ Features

- 🎯 Choose category, difficulty, and number of questions (1-20)
- 🔄 Dynamic API integration with [Open Trivia DB](https://opentdb.com/)
- ✨ Quiz UI with animations and result feedback
- 📊 Tracks score with count-up animation
- 🛑 Navigation guard prevents accidental reload or back during quiz
- 📱 Fully responsive layout with clean UI

---

## 🚀 Technologies Used

- [Angular 20](https://angular.io/)
- HTML5 + CSS3
- TypeScript
- [Open Trivia DB API](https://opentdb.com/)
- Angular CLI & GitHub Pages for deployment

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/eshxl/quiztopia.git
cd quiztopia

# Install dependencies
npm install

# Run development server
ng serve
