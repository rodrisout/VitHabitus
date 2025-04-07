1. Overview
Objective: Build a mobile application for Android and iOS devices using:
React Native Expo (frontend).
Firebase (database).
API for the recommender implementation deployed on Firebase.

2. Functional Requirements
2.1. Authentication via Firebase
Create an account with email and password.
Option to authenticate with providers like Google, Apple, etc.
Log in.
Log out.
Error handling: Incorrect email, invalid password, weak password, etc.

2.2. Profile
User's first and last name.
Optional profile picture using Firebase Storage.
Optional phone number with international format.
Separate tab with all fields required by the habit recommender (optional).
Ability to create a new dataset to import into the recommender (V2).

2.3. Recommender
Input fields for all required data to execute the recommender.
Autocomplete fields based on the profile data.
Error handling for incorrect data input.
Button to execute the recommender.
Loading indicator while the recommender is running.
History of recommender usage saved in the database.
Results of the recommender execution with the option to save them to the database.

2.4. Habits
List of habits loaded from the database for the user, including their creation date.
Delete habits from the database.
Remove a habit.
Button to delete habits from the database.

2.5. Notes
Create notes:
Title with a maximum of 110 characters.
Unlimited content.
Autosave after writing.
Notes are ordered chronologically by creation date.
Ability to reorder notes by dragging them on the screen.

Read notes:
Display the title and the first 40 characters of the content.

Update notes:
Edit an existing note.
Update the note in the database.

Delete notes:
Button to select and delete a note.
Remove the note from the database.

2.6. Calendar (Optional)
Interactive calendar.
Display the calendar in this section.
Option to create notes with a maximum of 50 characters.

3. Technical Specifications

3.1. Firebase
Use Firebase Authentication to handle login.
Use Firebase Security Rules.
Use React Navigation to manage navigation between screens.
Store notes in the database with the following fields:
id (unique identifier).
user_id (linked to the user's ID).
title_note (note title).
content (note content).
created_at and updated_at (creation and update timestamps).

3.2. Architecture Components
AuthStack: Screens for login and account creation.
Account creation: A welcome screen, a screen for entering the email, and a screen for entering the password.

MainStack:
NoteList Screen: Displays all notes in a list.
NoteEditor Screen: Create/edit notes.

4. Non-Functional Specifications
Performance:
Load notes and habits in less than 1 second (cached locally).
Use indexes in Firebase to improve query performance.
Security:
Securely store API keys.
Secure Firebase with Firebase Security Rules.
Accessibility:Follow basic accessibility guidelines.
Error Handling:Global error boundary for crashes.
Testing:Basic unit tests for core functionality.

5. Risks
Firebase Misconfiguration Risk
Mitigate by testing with different users.

6. Appendices
Expo Router Documentation  https://docs.expo.dev/router/introduction/
Firebase Documentation: https://firebase.google.com/docs
