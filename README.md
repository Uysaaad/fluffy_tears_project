# 🌸 Fluffy Tears: Emotion Detection and Visualization with Machine Learning Web Application 🌸

Welcome to **Fluffy Tears: Emotion Detection with Machine Learning**! This project leverages advanced machine learning techniques to detect emotions from user journal entries and provides an engaging visual representation of these emotions through an interactive 3D garden. 🌼🌈

## 🎯 Project Overview

This application combines the power of machine learning, natural language processing, and 3D visualization to create a unique user experience. Users can enter their journal entries, and the application will predict the emotions expressed in the text. The predicted emotions are then visualized in an interactive 3D garden where different emotions contribute to the growth and appearance of plants. 🌿🌻

## 🚀 Features

- **Emotion Detection**: Analyze journal entries and detect emotions such as joy, sadness, fear, and anger using machine learning models. 🧠💖
- **Interactive 3D Garden**: Visualize detected emotions in a dynamic garden where plants grow based on the emotions expressed in journal entries. 🌱🌼
- **Personal Journal**: Users can add, edit, and delete journal entries. Each entry is analyzed for emotions, and visualizations are updated accordingly. 📓✍️
- **Emotion Gallery**: View and reflect on past emotions through a gallery that showcases visual representations of detected emotions. 🖼️📅
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
    git clone https://github.com/your-username/emotion-detection-visualization.git
    cd emotion-detection-visualization
    ```

2. **Install dependencies**:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Setup environment variables**:
    Create a `.env` file in the root directory and add the following environment variables:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    # Run backend server
    npm run server

    # Run frontend
    cd client
    npm start
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`

## 🧪 Testing

To run tests, use the following command:
```bash
npm test
