# AppliedTo
## Application Tracking System (ATS)

## Overview

The Application Tracking System (ATS) is a web application designed to help users keep track of their job applications. It provides a user-friendly interface to manage and organize application details, such as job titles, company names, application status, and notes.

## Features

### User Authentication

- Users can create an account and log in securely.
- User data is stored securely using encryption techniques.

### Application Management

- Users can create new applications by providing job titles, company names, and job descriptions.
- Applications can be categorized by status, such as "Applied," "Interviewing," "Ghosted," "Rejected," "Accepted," or "Archived."
- Users can view, edit, and delete applications.
- Applications can be marked as favorites for easy reference.

### Notes and Attachments

- Users can add notes to applications, providing additional details or reminders.
- Attachments, such as CVs or cover letters, can be uploaded and associated with applications.

### Search and Filtering

- Users can search for applications based on various criteria, such as job title, company name, or application status.
- Applications can be filtered by status or other custom criteria.

### Responsive Design

- The ATS is built with a responsive design, allowing users to access and manage their applications on different devices, including desktops, tablets, and smartphones.

## Technology Stack

The Application Tracking System is built using the following technologies:

- Front-end:

  - React.js: A popular JavaScript library for building user interfaces.
  - Tailwind CSS: A utility-first CSS framework for responsive and scalable designs.
  - React Router: A routing library for declarative navigation in React applications.
  - Axios: A library for handling HTTP requests.

- Back-end:
  - Node.js: A JavaScript runtime environment for server-side development.
  - Express.js: A web application framework for building APIs.
  - MongoDB: A NoSQL database for storing application data.
  - Mongoose: A MongoDB object modeling library for Node.js.
  - JWT (JSON Web Tokens): A standard for securely transmitting information between parties.

## Getting Started

To start using the Application Tracking System, follow these steps:

1. Sign up for an account by providing your email and password.
2. Log in to the application using your credentials.
3. Create new applications by entering the required details, such as job titles and company names.
4. Customize the application status based on your workflow.
5. Add notes and attachments to applications as needed.
6. Use the search and filtering features to find and manage your applications effectively.
7. Update application status, edit application details, or delete applications as required.
8. Access the ATS on different devices and enjoy the responsive design.

## Conclusion

The Application Tracking System provides a convenient and intuitive solution for managing job applications. With its user-friendly interface, powerful features, and responsive design, users can effectively track their applications, stay organized, and simplify their job search process.

## If you want to try it out

To set up and use the application, follow these steps:

1. Provide a `.env` file in the root directory of the backend folder with the following content:

```
NODE_ENV=development
PORT=8210
MONGO_URI=mongodb+srv://username:password.mongodb.net/Userdata?retryWrites=true&w=majority
JWT_SECRET="Your JWT-Secret"
```

2. Open two separate terminals.

3. In one terminal, navigate to the frontend folder and run `npm install` to install the necessary dependencies.

4. In the other terminal, navigate to the backend folder and run `npm install` to install the required packages.

5. Once the installations are complete, run `npm start` in each terminal.

6. The Express server will be running on port 8020, and the Vite dev server will be running on port 5173.

7. Congratulations! You can now use the application and explore its features.

Enjoy using the app!
