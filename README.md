# MATERIAL CHECKUP
An application allow manager, staff-team manage their materials.

```.env
  1. Setup
  2. Document

```

## 1. How to setup this application
### a. Init firebase app.
Firstly, you need to have a firebase project.

Second, create your firebase app.
### b. Add environment variables for this app.
From your firebase app dashboard. (Your URL should like this: `https://console.firebase.google.com/u/{YOUR_GOOGLE_ACCOUNT_ORDER}/project/{YOUR_APP_ID}/overview`).

Go to project's setting, copy and paste your firebase app configuration to `env` file. Example like this:

```.env
  GOOGLE_API_KEY={apiKey}
  GOOGLE_PRJ_ID={projectId}
  GOOGLE_APP_ID={appId}
  GOOGLE_AUTH_DOMAIN={authDomain}
  GOOGLE_STORAGE_BUCKET={storageBucket}
  GOOGLE_MSG_SENDER_ID={messagingSenderId}
```

### c. Install dependencies for this app.
Run command `npm install` (or `yarn`) to install project's dependencies.

### d. Start app!
Run command `npm start` to start your application.

## 2. Document
View full documents here: **[TBU]**