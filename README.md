# Budgee
![BudgeeLogo](https://github.com/user-attachments/assets/cc87eaeb-bb98-4275-aa28-d770a39e1be4)
**Budgee** is a modern **personal finance application** designed to help users efficiently track their expenses, set budgets, and analyze their financial health. With an intuitive interface and real-time expense tracking, users can categorize spending, visualize trends, and **manage their finances with ease**. Budgee aims to provide clarity and control over personal finances through smart features and seamless user experience.


## ✨ Key Features
- Frontend:
    - Built with **Vue.js** for a reactive and modular user interface.

    - **Tailwind CSS** used for utility-first, consistent styling and responsive design.

    - **Chart.js**, extended via a **custom subclass** of DoughnutController, powers dynamic data visualizations and doubles as an interactive navigation tool.
      
    - **Pinia** for global state management of budget data

- Backend:
    - Developed with **Fastify**, a lightweight and performant **Node.js** web framework.
    - Uses **MongoDB** as a flexible, schema-less NoSQL database for storing user data.
    - Follows the **MVC (Model-View-Controller)** architecture for organized and scalable code structure.
    - Comprehensive backend testing with **Jest**, including database seeding and integration tests.
- API Communication:
    - **RESTful API** connects the frontend and backend, ensuring clean separation of concerns.
- Hosting & Deployment:
    - Frontend deployed via **Vercel** for fast, global delivery.
    - Backend hosted on **Render**, providing scalable cloud deployment.

## 🧰 Code Quality & Development Practices
- Adheres to **DRY (Don't Repeat Yourself)** principles for maintainable and efficient code.

- Backend testing with **Jest** ensures reliability of data operations and API functionality.

- Modular component structure in **Vue** promotes reusability and readability.

- Custom extensions in **Chart.js** for advanced interactivity and seamless UX integration.

- **MVC pattern** in backend ensures clear separation of logic, routing, and database interactions.
## 🎬 Live Demo
![PieWheel](https://github.com/user-attachments/assets/cdb762d1-72d9-47bc-b9f0-3d42a675f982)
You can find the GitHub repo for the backend [here](https://github.com/Max1357531/Budgee-BE) which is hosted on Render [here](https://budgee-be-amq3.onrender.com/api/).

The front end is hosted on Vercel [here](https://budgee-app-fe.vercel.app/). Note the following before checking out the front end of this project:

- 🚨 The backend hosting for the API is through the free hosting side of **Render**. As such the backend, and content will take up to 60 seconds to spin up. Please allow for this time before checking out the website.
- 🚨 The login page is a dummy, you may enter **any** details to proceed to the guest account.

## 🛠️ Tech Stack
### Backend
 MongoDB         |  Fastify | JavaScript
:-------------------------:|:-------------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/b4161023-a31b-4b14-9ad5-93f2cd758f2e) | ![image](https://github.com/user-attachments/assets/241726f8-5825-4938-a0af-132f75c40d5c) | ![image](https://github.com/user-attachments/assets/b6af978c-4d49-4188-a972-c1a539e0a247)

### Frontend

 Vue.js        |  Chart.js | Tailwind | Javascript | Pinia
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![image](https://github.com/user-attachments/assets/38114ef6-1644-423c-8043-6e3f0685d9af)| ![image](https://github.com/user-attachments/assets/582471bf-427c-43c0-aebb-7956142a5fa3) | ![image](https://github.com/user-attachments/assets/69e12a22-0fae-44c1-902d-78a16dd2252b) | ![image](https://github.com/user-attachments/assets/b6af978c-4d49-4188-a972-c1a539e0a247) | ![image](https://github.com/user-attachments/assets/cffc83df-68bc-4f6f-8639-68a2706ac252)


## 💻 How To Run
First clone the repo:
```
git clone https://github.com/Max1357531/Budgee-App-Fe
```
Next, navigate to the repo and install dependencies:
```
cd Budgee-App-Fe
npm install
```
To run the app locally:
```
npm run dev
```
Open http://localhost:3000 to view it in the browser
