# People Directory

This is a project I made using Flask, Next.js and PostgreSQL. It is like a simple website where you can store and manage details of people. There are two types of users: admin and normal user. Admin can do everything like see all users, edit them, delete them and also add new ones. Normal users can only see their own profile and update it. The site is secure and uses login with JWT cookies. It also uses Tailwind CSS to make the site look nice.

How to run it:

1. First clone this repository and go into the folder:

   git clone https://github.com/your-username/people_directory.git
   cd people_directory

2. Now go to the backend folder and set it up:

   cd backend
   python -m venv venv
   source venv/bin/activate (on Windows use venv\Scripts\activate)
   pip install -r requirements.txt

   Note: The .env file is already added in the repo so you don’t need to create it.

3. Make sure PostgreSQL is installed and running. DB is already created on NeonDB and URL is present on env file.

   Admin Credentials for login and testing:
   Email - aarav.mehta@example.com
   Password - Aarav@123

4. Run the backend server:

   flask run

   This will start the backend on http://localhost:5000

5. Now go to the frontend folder and start the frontend:

   cd ../frontend
   npm install
   npm run dev

   This will start the frontend on http://localhost:3000

6. Now open the site in browser. You can register a new user. If you want to make someone an admin, either give "role": "admin" while registering using Postman or change it directly in the database.

That’s it! You can now use the site. Admin will see buttons to manage all users. Normal users can only see their profile. You can also search users by name, phone, email or city (for admin only) on users page.

Thank you!
