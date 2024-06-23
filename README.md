# Front-End Project Overview

This project is a full stack application built with [Next.js 14](https://nextjs.org/), showcasing modern web development practices, responsive design, and integration with various APIs and libraries. It leverages server-side rendering and static site generation features of Next.js, providing a fast and seamless user experience.

## Demo

The project is deployed on Vercel and can be accessed [here](https://www.littlelemon.live/).

## Key Features

- **Authentication:** Implements secure authentication flow using JSON Web Token for a personalized user experience.
- **Theme Switcher:** Material Design 3 tokens generated from [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) are used as CSS variables to allow users to switch between light and dark themes. Inline script was added to the head of the document to prevent the flash of unstyled content (FOUC) when the page loads. The script checks the user's local storage for a theme preference and sets the theme class on root element accordingly.
- **API Integration:** Demonstrates integration with external APIs, including Stripe for payment processing and MongoDB for data storage.
- **State Management:** Employs React context for state management across components.
- **Responsive Design:** Utilizes CSS and SCSS for a responsive layout that adapts to various screen sizes and devices.
- **Performance Optimization:** Leverages Next.js features like automatic code splitting and image optimization for improved performance.

## Technologies Used

- **Frontend:** React, Next.js, MUI
- **Styling:** SCSS, Emotion, Tailwind CSS
- **Database:** MongoDB, Mongoose
- **Payment Processing:** Stripe
- **Other Libraries:** Formik (form management), Yup (form validation), Swiper

## Project Structure

- `app/`: Contains all pages.
- `app/api/`: Contains all api endpoints.
- `app/ui`: reuseable React UI components.
- `app/lib/context`: Contains all the context providers.
- `app/lib/models`: mongoose model schemas
- `public/`: Static assets like images and fonts.
- `requests/`: API requests for testing the backend with VS Code REST Client extension.
- `middleware.ts`: Middleware for parsing api requests.

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server with `npm run dev`.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
