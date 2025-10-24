# Mood Bloom

Mood Bloom is a modern, responsive, and personal mood journaling application designed to help you track, reflect on, and understand your daily emotions. With an intuitive interface and AI-powered insights, it offers a private and insightful space to explore your well-being.

## ✨ Features

*   **Daily Mood Tracking**: Easily record your mood with a selection of expressive options.
*   **Private Journaling**: Add notes to your entries to capture thoughts, activities, and feelings.
*   **AI-Powered Insights**: Generate personalized reflections and identify patterns in your entries with a single click.
*   **Mood Trends**: Visualize your mood fluctuations over time with an interactive chart.
*   **Data Privacy**: All your journal entries are stored locally in your browser, ensuring complete privacy.
*   **Modern & Responsive**: A clean, minimalistic design that works beautifully on both desktop and mobile devices.
*   **Fast & Performant**: Built with Next.js and optimized for a smooth user experience.

## 🚀 Getting Started

This is a Next.js project bootstrapped with `create-next-app` and enhanced with Firebase Studio.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see your application in action.

## 🛠️ Built With

*   **Framework**: [Next.js](https://nextjs.org/) (React)
*   **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI**: Google Gemini via [Genkit](https://firebase.google.com/docs/genkit)
*   **Charting**: [Recharts](https://recharts.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 📝 How It Works

*   **State Management**: The application uses React's `useState` and `useEffect` hooks for state management.
*   **Local Storage**: All journal entries are saved directly in the user's browser `localStorage`. This means the data is persistent on their device but is not sent to any server.
*   **AI Insights**: When you request insights, the text from your journal entries is securely sent to a Genkit flow which uses the Google Gemini model to generate reflections. The insights are then displayed back to you without being stored.
