# Front-End Project Overview

This project is a full stack application built with [Next.js 14](https://nextjs.org/), showcasing modern web development practices, responsive design, and integration with various APIs and libraries. It leverages server-side rendering and static site generation features of Next.js, providing a fast and seamless user experience.

## Key Features

- **Responsive Design:** Utilizes CSS and SCSS for a responsive layout that adapts to various screen sizes and devices.
- **State Management:** Employs React context for state management across components.
- **API Integration:** Demonstrates integration with external APIs, including Stripe for payment processing and MongoDB for data storage.
- **Authentication:** Implements secure authentication flows using JSON Web Token for a personalized user experience.
- **Performance Optimization:** Leverages Next.js features like automatic code splitting and image optimization for improved performance.

## Technologies Used

- **Frontend:** React, Next.js
- **Styling:** SCSS, Emotion, Tailwind CSS
- **Backend Integration:** MongoDB, Mongoose
- **Payment Processing:** Stripe
- **Other Libraries:** Formik, Yup, Swiper

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `app/`: Contains the React components and pages.
- `public/`: Static assets like images and fonts.
- `requests/`: API requests for testing the backend with VS Code REST Client extension.
- `middleware.ts`: Middleware for parsing api requests.

## Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, feel free to open an issue or submit a pull request.

## Deployment

This project is configured for easy deployment on Vercel, providing a seamless CI/CD pipeline. For more details on deploying Next.js applications, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
