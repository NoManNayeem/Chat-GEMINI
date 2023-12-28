# MyChatApp Project Structure

This project is an Expo-based app that mimics the ChatGPT interface, utilizing React Native Paper for UI components and Google's Gemini backend for AI interactions.

## Directory Structure

### `/src` 
Contains all the source code of the application.

- #### `/components`
  Reusable components such as buttons, input fields, etc.

- #### `/screens`
  Different screens of the app.
  - `LoginScreen.js` - The login and signup interface.
  - `ChatScreen.js` - The main chat interface.

- #### `/api`
  Handling API interactions.
  - `auth.js` - Dummy authentication API interactions.
  - `chatService.js` - Interactions with Google Gemini API.

- #### `/utils`
  Utility functions and constants.

- #### `/navigation`
  Navigation logic between screens.

### `/assets`
Static assets like images, icons, etc.

### `App.js`
Entry point of the application.

### `package.json`
Project metadata and dependencies.

### `app.json`
Expo configuration file.

## Notes

- The `/components` directory can be populated with any custom components you create for your app.
- The `/api` directory is structured to separate different kinds of API interactions, making the codebase more maintainable.
- The `App.js` file will primarily handle navigation and global app settings.
- Dependency management and project configuration are handled in `package.json` and `app.json`, respectively.
