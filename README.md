# Café PomPom: Pomodoro Timer App

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 50px; height: 50px;">
  <img src="https://github.com/ShelbyPop/CS35L-Project/blob/b198aab3aa9d8e50bed19fd5c28aa6e294f9f4f6/client/src/cat2.png" width="50" height="50">
</svg>

Welcome to Café PomPom, a productivity app that provides users with an engaging way to manage their time and tasks. From the principles of the Pomodoro technique with a playful interface, Café PomPom encourages focus and efficiency through timed work sessions, while rewarding users with breaks and virtual shop access where they can redeem points earned for completing tasks. 

Users should begin with the login button. The login feature is accessible through a click on the floating cat. New users should check the box “First-time user” and ensure their password contains at least 6 characters, otherwise log in with your credentials.
The timer opens with a default session length of 25 minutes, and is followed by a 5-minute break. 5 points are awarded after a session is completed. 4 sessions equal 1 cycle, and upon completing a cycle, a user earns 10 points. A user can view their current status with the dynamic status bar below the timer, and get notified of points awarded through popup notifications in the app. A user can enter a number into the timer bar, click Set Timer, and watch the timer begin. Upon logging in, a user can update their todo list, using the TODO LIST button, for quick and easy access across login sessions.

The navigation bar located at the top of the page becomes visible when hovered over and keeps updated information about a user, such as points. The user must be logged in to access their information and earn points. The navigation bar allows a user to verify that they are logged in; the username will appear on the right of the navigation bar. Under history, users can see all sessions of all users, searching for their own sessions or their friends! The navigation bar also includes a leaderboard displaying all users and their points. 

The shop allows for purchasing different pastries with points earned. Users may view the count of items purchased by type, last session, average session length, and total session time. 

## Components
<b>FRONTEND</b>
The frontend of Café PomPom is a vibrant interface crafted with React.js. The key components include:
- ToDoList: A board that manages and displays the tasks the user has noted down, and all progress is saved even if the user logs out and logs back in. The user can add tasks, delete tasks, and mark tasks as completed.
- Navigation bar: Located at the top of the screen, allows easy navigation across the app's features, accessing Points, History, Statistics, and the point-based leaderboard. Both the history and leaderboard are searchable.
- LoginButton: Handles user authentication process and allows new users to register.
- Timer: A dynamic and colored-in Pomodoro timer that tracks up to 4 customizable sessions per cycle with 5-minute breaks in between, also providing auditory notifications and equipped with notifications for points awarded.
- Shop: A virtual storefront where users can redeem their earned points. Notifications are available to indicate successful or unsuccessful purchases in addition to auditory notifications.
- Status bar: Informs user about their current status (i.e. work, session break, cycle break).

<b>DATASTORE</b>
We use MongoDB for our datastore needs due to its user-friendliness and ability to support a variety of data types, making it ideal for both our application's session tracking and user management. MongoDB is a document-oriented database, where a document is a single data structure with key/value pairs. Because documents are structured like JSON objects, accessing document properties is extremely similar to accessing object properties in regular JavaScript objects. For the database and other technologies, we chose what to use according to ease of use because none of us had prior web development experience.

Terminology: A collection is a group of similar documents (like a data table), and a database is a group of collections. We have 3 distinct collections in our MongoDB database: users, sessions, and todos. The users collection stores basic information about every user, including their username, hashed password, current point total, and quantity of each shop item. In the sessions collection, each document corresponds to a single recorded focus session, with the user who created the session, the session start and end time, and the session length. Each document in the todos collection corresponds to a single todo (displayed in the ToDoList component) and stores information about the user who created the todo, the display text for the todo, and the completion status of the todo.



## Setup & Commands
To set up the Café PomPom app, you'll need Node.js (v20.11.0) and npm installed on your system. Clone the repository, install dependencies, and start the local server. Here are some commands you'll need to interact with the project repository and set up the application. 
We assume you have Git and Node.js installed already. Note that these setup instructions are only guaranteed to work on Mac. 
Additionally, please make sure that ports 3000 and 5050 are not already in use, or else we cannot guarantee that the app will run. To do this, run the following commands:

```
sudo lsof -i :3000
sudo lsof -i :5050
```

If either command has nonempty output, identify the PID(s) of any processes using these ports and run
```
sudo kill -9 PID
```
for each (replacing PID with the actual PID)


