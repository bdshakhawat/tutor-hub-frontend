# Elite Educators

[![GitHub issues](https://img.shields.io/github/issues/ThisIsKhalid/elite-educators-frontend)](https://github.com/ThisIsKhalid/elite-educators-frontend/issues)
[![GitHub stars](https://img.shields.io/github/stars/ThisIsKhalid/elite-educators-frontend)](https://github.com/ThisIsKhalid/elite-educators-frontend/stargazers)

The **Elite Educators** Platform is a comprehensive online education hub designed to streamline and enhance the educational experience for both students and educators. With a user-centric approach, the platform facilitates efficient communication, service management, and secure transactions. Using this platform, people can easily find their favorite teacher from anywhere across the country. Now, you don't have to go to any specific place to get tuition. You can do it online after booking a service from a specific tutor for a specific subject.

live site: https://elite-educators-frontend.vercel.app

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

## Features

- **User Authentication:** Ensure data privacy with a secure authentication system.
- **Dashboard:** Interact with key information and statistics through an interactive dashboard.
- **Course Management:** Easily create, update, and manage courses.
- **Student Profiles:** Track student performance with detailed profiles for each student.
- **Responsive Design:** Experience a seamless user interface with responsiveness for various devices.
- **Notifications:** Stay informed with updates for important announcements.
- **Search Functionality:** Effortlessly find tutors, courses, and relevant content.
- **Session Scheduling:** Seamlessly plan and organize sessions for enhanced flexibility.
- **Feedback and Ratings:** Foster transparency with a system for user feedback and ratings.
- **Multi-platform Access:** Utilize the platform across various devices for convenience.

## Installation

To get started with the Elite Educators Frontend, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ThisIsKhalid/elite-educators-frontend.git
   cd elite-educators-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file based on the provided and fill in the necessary configuration.

   Example `.env` file:

   ```env
   NEXT_PUBLIC_API_BASE_URL=
   EDGE_STORE_ACCESS_KEY=
   EDGE_STORE_SECRET_KEY=
   ```
   This configuration assumes that you are using the publicly hosted backend API. Adjust the `NEXT_PUBLIC_API_BASE_URL` if you are running a local backend server.

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000` to access the Elite Educators Frontend.

## Technologies Used

- **TypeScript:** 5
- **Next.js:** 13.5.4
- **React:** 18
- **React Redux:** 8.1.3
- **Redux Toolkit:** 1.9.7
- **Tailwind CSS:** 3.3.3
- **React Hook Form:** 7.47.0
- **Axios:** 1.5.1
- **JWT Decode:** 3.1.2
- **React Countup:** 6.4.2
- **React Hot Toast:** 2.4.1
- **React Icons:** 4.11.0
- **Swiper:** 10.3.1


For a complete list of dependencies and devDependencies, refer to the [package.json](package.json) file.

## Screenshots

<div>
   <img width="70%" src="https://github.com/ThisIsKhalid/elite-educators-frontend/blob/main/public/readmeImg/elite-educators.png"/>
   <img width="70%" src="https://github.com/ThisIsKhalid/elite-educators-frontend/blob/main/public/readmeImg/service.png"/>
   <img width="70%" src="https://github.com/ThisIsKhalid/elite-educators-frontend/blob/main/public/readmeImg/signup.png"/>
   <img width="70%" src="https://github.com/ThisIsKhalid/elite-educators-frontend/blob/main/public/readmeImg/servicelist.png"/>
</div>

## Usage

### User

As a user of the Elite Educators platform, you can perform the following actions:

1. **Sign Up / Login:**
   - Create a new account by signing up with a valid email address and password.
   - Existing users can log in using their credentials to access the platform.

2. **Search and Filter Services:**
   - Search for educational services based on criteria such as location, level, and name.
   - Apply filters to narrow down results by service rating and level.

3. **View Service Details:**
   - Access detailed information about each service to make informed decisions.

4. **Book a Service:**
   - Select a service and initiate the booking process.
   - Choose the pricing plan (e.g., price per week) and specify the start and end dates for the service.

5. **Manage Bookings:**
   - View the list of bookings in the user dashboard.
   - Check the status of each booking, whether accepted or rejected by the admin/teacher.
   - Delete bookings if needed.

6. **Receive Notifications:**
   - Get notified when an admin/teacher accepts or rejects a booking.
   - Receive payment notifications and updates on the status of your services.

7. **Payment Process:**
   - After a booking is accepted, proceed to payment by clicking the "Pay" button.
   - Be redirected to a checkout page for payment processing through SSL-Commerz.

8. **Payment Status:**
   - Receive notifications for successful or unsuccessful payments.
   - Check the dashboard to view the list of services for which payment has been successfully processed.

### Admin

As an admin on the Elite Educators platform, you have additional responsibilities and capabilities:

1. **User Management:**
   - Admins are created by superadmins.
   - Admins have the ability to delete user accounts.

2. **Service Management:**
   - Post, update, delete, and retrieve details of educational services.
   - Admins can ensure accurate and up-to-date information about the services.

3. **Booking Management:**
   - Delete user bookings to manage service availability.
   - Admins have control over the booking system to address any issues or adjustments.

### Superadmin

As a superadmin, you have the highest level of authority and can perform the following:

1. **Admin Creation:**
   - Create new admin accounts to manage the platform efficiently.

2. **User Deletion:**
   - Delete user accounts as needed.

3. **Superadmin Management:**
   - Manage superadmin accounts, ensuring secure access and oversight of the platform.

### Additional Information

- **Security:**
  - Security measures are implemented to protect user and admin accounts.
  - SSL-Commerz is used for secure payment processing.

- **Notifications:**
  - Users and admins receive notifications for various events, including booking updates and payment status.

- **Dashboard:**
  - Both users and admins can utilize a personalized dashboard for a streamlined experience.

- **Collaboration:**
  - Admins and users can collaborate seamlessly to ensure a smooth educational service experience.

