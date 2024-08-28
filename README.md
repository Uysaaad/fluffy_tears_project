# 🌸 Fluffy Tears: Emotion Detection and Visualization with Machine Learning Web Application 🌸
![Screenshot 2024-08-15 at 14 44 50](https://github.com/user-attachments/assets/5cf315d0-af23-4c6c-9267-61e75da2f156)


Welcome to **Fluffy Tears: Emotion Detection with Machine Learning**! This project leverages advanced machine learning techniques to detect emotions from user journal entries and provides an engaging visual representation of these emotions through an interactive 3D garden. 🌼🌈

## 🎯 Project Overview

This application combines the power of machine learning, natural language processing, and 3D visualization to create a unique user experience. Users can enter their journal entries, and the application will predict the emotions expressed in the text. The predicted emotions are then visualized in an interactive 3D garden where different emotions contribute to the growth and appearance of plants. 🌿🌻


## 🚀 Features

- **Emotion Detection**: Analyze journal entries and detect emotions such as joy, sadness, fear, and anger using machine learning models. 🧠💖
  ![Screenshot 2024-08-15 at 14 45 00](https://github.com/user-attachments/assets/328c8b88-fa17-4d57-b341-aa3c423c033b)
- **Interactive 3D Garden**: Visualize detected emotions in a dynamic garden where plants grow based on the emotions expressed in journal entries. 🌱🌼
  ![Screenshot 2024-08-20 at 19 39 38](https://github.com/user-attachments/assets/be7154ee-c02e-4e37-963f-eb34ccf81f6d)

- **Personal Journal**: Users can add, edit, and delete journal entries. Each entry is analyzed for emotions, and visualizations are updated accordingly. 📓✍️
- **Emotion Gallery**: View and reflect on past emotions through a gallery that showcases visual representations of detected emotions. 🖼️📅
  ![Screenshot 2024-08-15 at 14 45 10](https://github.com/user-attachments/assets/777ab2c9-217e-4d1c-b0b0-3f5cb5a5f122)

- **Secure Authentication**: User authentication and authorization ensure that journal entries and visualizations are personalized and secure. 🔒🔑

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS 🌐🎨
- **Backend**: Node.js, Express.js 🖥️🚀
- **Database**: MongoDB 🗄️🍃
- **Machine Learning**: TensorFlow.js 🤖📊
- **3D Visualization**: Spline 🌐✨
- **Authentication**: JWT (JSON Web Tokens) 🔐🛡️

## 📦 Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Uysaaad/fluffy_tears_project.git
    cd fluffy_tears_project
    ```

2. **Install dependencies**:

    ```bash
    cd backend
    npm install
    cd frontend
    npm install
    ```
3. **Setup environment variables**:
    Create a `.env` file in the root directory and add the following environment variables:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    cd backend
    # Run backend server
    npm start

    # Run frontend
    cd frontend
    npm run dev
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:5731`


