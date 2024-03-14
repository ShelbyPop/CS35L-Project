# Café PomPom: Pomodoro Timer App

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 50px; height: 50px;">
  <img src="https://github.com/ShelbyPop/CS35L-Project/blob/b198aab3aa9d8e50bed19fd5c28aa6e294f9f4f6/client/src/cat2.png" width="50" height="50">
</svg>

Welcome to Café PomPom, a productivity app that provides users with an engaging way to manage their time and tasks. From the principles of the Pomodoro technique with a playful interface, Café PomPom encourages focus and efficiency through timed work sessions, while rewarding users with breaks and virtual shop access where they can redeem points earned for completing tasks. 

Users should begin with the login button. The login feature is accessible through a click on the floating cat. New users should check the box “First-time user” and ensure their password contains at least 6 characters, otherwise log in with your credentials.
The timer opens with a default session length of 25 minutes, and is followed by a 5-minute break. 5 points are awarded after a session is completed. 4 sessions equal 1 cycle, and upon completing a cycle, a user earns 10 points. A user can view their current status with the dynamic status bar below the timer, and get notified of points awarded through popup notifications in the app. A user can enter a number into the timer bar, click Set Timer, and watch the timer begin. Upon logging in, a user can update their todo list, using the TODO LIST button, for quick and easy access across login sessions.

The navigation bar located at the top of the page becomes visible when hovered over and keeps updated information about a user, such as points. The user must be logged in to access their information and earn points. The navigation bar allows a user to verify that they are logged in; the username will appear on the right of the navigation bar. Under history, users can see all sessions of all users, searching for their own sessions or their friends! The navigation bar also includes a leaderboard displaying all users and their points. 

The shop allows for purchasing different pastries with points earned. Users may view the count of items purchased by type, last session, average session length, and total session time. 

![CafePomPom](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/pompomhomepage.png)

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

<b>BACKEND</b>
Our backend features a collection of Express endpoints that handle user authentication, session management, points tracking, and more. For better organization, the first word in each route path corresponds to the primary collection from which data is being retrieved, although some routing methods query data from multiple collections.

Endpoints Include: <br>
`/users/create`: POST request to create a new user account, given a username and password. This requires each user to have a unique username so that users can be easily identified by username (this is in addition to the unique MongoDB object ID created for each user stored in the collection) <br>
`/users/login`: GET request to authenticate a user, given a username and password. This compares hashed input password against stored hashed password <br>
`/users/points/get`: GET request to retrieve a user’s point total, given a username<br>
`/users/points/add`: POST request for changing a user’s point total, given a username and quantity of points to be added/subtracted<br>
`/users/items/get`: GET request for accessing the count of an item in a user’s inventory, given a username and an item category<br>
`/users/items/add`: POST request for incrementing the item count in a user’s inventory by 1, given a username and an item category<br>
`/users/leaderboard`: GET request for retrieving all documents in the user's collection matching a keyword query. This returns only the data matching the query, which will filter documents by any substring matching a username or point total<br> 
`/sessions/create`: POST request to add a focus session to the database, given a username, start time, end time, and session length<br>
`/sessions/history`: GET request for retrieving all documents in the sessions collection matching a keyword query. This returns only the data matching the query, which will filter documents by any substring matching a username<br>
`/sessions/user`: GET request for retrieving all documents in the sessions collection for a user, given a username to search for. This differs from /sessions/history endpoint since it will send an error status if the username does not exist, while the /sessions/history endpoint will just send an empty array<br>
`/todos/get`: GET request for retrieving all documents in the todos collection for a user, given a username to search for<br>
`/todos/create`: POST request for inserting a new todo, given a username and todo display text<br>
`/todos/toggle`: POST request for toggling completion status, given the MongoDB object ID of the todo (as a string)<br>
`/todos/delete`: POST request for deleting a todo, given the MongoDB object ID of the todo (as a string)



## Setup & Commands
> [!NOTE]
> The commit history of this repository appears to contain a MongoDB connection string. However,
> this string was only in place during development and is not present in the most recent version of 
> the code. Additionally, the password in the connection string in the commit history has already
> been revoked, so it is no longer a valid connection string for our cluster either way.

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
for each (replacing PID with the actual PID).

Now to actually run the app, run:
```
git clone https://github.com/ShelbyPop/CS35L-Project
cd CS35L-Project
./setup CONNECTION_STRING
```
In the last command, replace <b>CONNECTION_STRING</b> with the actual MongoDB connection string in quotations (provided in the individual reports). Note: the connection string is in the commit history because we didn’t hide it until recently, but the password has been changed so that string no longer works.<br>
Go to http://localhost:3000/ to view the app (may start automatically). After setting up the first time, just run
```
npm run dev-both
```
to start the app.

## Contributors
Isabelle Hong🗂️<br> 
Iris Shi⏱️<br>
Shelby Falde🎨<br>
Virounika Mina📝


## Sources
[The Pomodoro Technique](https://www.asundergrad.pitt.edu/study-lab/study-skills-tools-resources/pomodoro-technique)<br>
[CSS Animations](https://www.w3schools.com/css/css3_animations.asp)<br>
[ToDo List Creation](https://medium.com/@worachote/building-a-todo-list-app-with-reactjs-a-step-by-step-guide-2c58b9b6c0f5)<br>


## Project Behavior
*Why Pomodoro?*
The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It breaks work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a "Pomodoro," named after the tomato-shaped kitchen timer Cirillo used as a university student. The basic steps are:
1. Choose a task to work on.
2. Set a timer for 25 minutes and work on the task until the timer rings.
3. Take a short break (5 minutes) to rest and recharge.
4. Every four Pomodoros, take a longer break (15-30 minutes).

Once Café PomPom is up and running, you'll be greeted with a colorful, interactive café environment. Users can log in or create an account, set the Pomodoro timer, manage tasks, earn points, and shop for items. Below are screenshots of what a user may encounter. Here, we follow the journey of user <b>saltine crackers</b>:

### <b>*The user logs in*</b>
![LoggingIn](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/login.png)

### <b> *5 points are rewarded after the completion of a work session as the timer enters the 5-minute break*</b>
![5PointsEarned](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/gotpoints.png)

### <b> *The timer progresses during the third work session* </b>
![3rdSession](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/thirdsession.png)

### <b> *The user spends 12 points on purchasing buttered pancakes from the shop* </b>
![Shopping](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/shopping.png)

### <b> *The user is very happy about their pancake purchase, and they go to view their inventory and see that they have many desserts* </b>
![Inventory](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/inventory.png)

### <b> *The user views the Leaderboard that shows the collective points across all players* </b>
![ViewLeaderBoard](https://github.com/ShelbyPop/CS35L-Project/blob/eac1affa7167a87952a9e384430398d3348053ee/client/src/leaderboard.png)












