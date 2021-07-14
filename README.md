# NuMom (Keeping Moms and Infants Healthy) -- Mobile Application <Updated Summer 2021>

Authors: Eduardo Morales, Gabriel Alfonso, Michael Llanes, Noe Velasquez, Amin Sheikhnias, Jessica Gonzalez, Yonal Hernandez, David Antunez, David Acosta, Hongru Chu, Rolando Hernandez, Lawrence Chik, Leonel Diaz, Nicholas Gomez, Meleik Hyman, Nathaly Siguenza, Eric Vilella, Elton Lucien, Anthony Burgin, Jose Jimenez, Juan Pablo Arenas Grayeb, David Ricardo, Estephany Sanchez Criado.

Product Owner: Jean Hannan

This is the fourth version of the NuMom (Keeping Moms and Infants Healthy application that was built for Florida International University's CIS 4911 - Senior Project Course. A smartphone-based maternal/infant healthcare application (app), that provide support in 3 different languages (English, Spanish & Creole), designed for low-income minority mothers. The main purpose of the application in its current state is to provide early and continued access to health care for prenatal and postnatal mothers.

---

### Project Structure

The following tree structure will be useful to visualize how the project is structured:

```

├── Code

│   └── React-Native-App

│       ├── assets

│       │   ├── icons

│       │   └── images

│       ├── functions (Cloud functions that serve as an API that lives in the Cloud)

│       ├── node_modules (inside here are all the modules installed after running ``npm install``)

│       └── src

│           ├── Components

│           │   └── components

│           ├── JSON files

│           └── documents

├── Documentation

├── Posters

├── PresentationSlides

└── Videos

```

All the functionality lies in the `Code/React-Native-App` directory. The rest of the directories that are in the root are solely for documentation purposes.

The root of the `React-Native-App/src` directory is where all the source code for the application lies. The main entrypoint of the application is through `App.js`, which is where the application is created. To add new screens you must reference them in the `App.js` file and create a new navigation reference inside the navigators in this file.

Within the root of the `React-Native-App` directory is a file called `package.json`, which defines the scripts that allows to run the application and contains meta-data about the project, in addition to defining the project dependencies.

### Installation & Running steps

To install NuMom, you will need to install Node.js and npm as your dependency manager first, available here: -- (https://nodejs.org/en/). After they are installed, run these commands in your machine’s command line to install the necessary dependencies:


```

npm install --global expo-cli
npm install && expo install

```

After the dependencies are setup, you will need to clone the GitHub repository onto your local machine: 

```

git clone https://github.com/edumorlom/moms-infants-healthy.git

```

Install the expo client on your mobile device or install the Android/Iphone simulator on your computer

iOS: https://apps.apple.com/app/apple-store/id982107779

Android: https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www

Finally, you will need to setup the Firebase API key to open the app locally. After this, the application should be ready to start using the command `expo start` in your command line. This will open a window where Expo will create a QR code on your computer that you can scan with the mobile Expo app to open the application on your smartphone. You may have to wait a minute while your project bundles and loads for the first time. If using a simulator to run the app on your computer, using `npm start` instead will show instructions on how to run it on the simulator.

### API KEYS

Both the Firebase and Twilio API keys are provided by Eduardo, so contact him if you need them. For the Firebase API key, it should be a file called firebase_account.json. To set it up properly, move it into the /src/ folder of your local repository. The application will not start up properly without this API key in the correct place.

To gain access to the Twilio API for messaging users, you will need to navigate to the /functions/ folder and locate twilio_account.js. In that file you will need to edit the strings for accountSid and authToken to the account’s credentials and you will have access to the Twilio API.

### ACCESSING FIREBASE 

To access Firebase, you will first have to install Firebase and its tools onto your machine. This can be done by running npm install --save firebase firebase-tools in your command line in the directory in which you would like to access firebase. Then, in the same directory you can deploy new functions using firebase deploy --project moms-and-infants-healthy.

### DEPLOYING TO ANDROID 

1. Login to the developer expo account by typing "expo login" in the terminal. You'll have to contact Eduardo to get his login credentials.

2. Increment the versionCode in app.json by 1.

3. Save app.json and close it.

4. Navigate to your project directory 'moms-infants-healthy' and build the apk in the terminal by entering: "expo build:android" 

5. Choose “apk” and hit enter to build the app as an .apk file, the standard installation package for Android apps..
	You might encounter the error: “Connecting to metro bundler failed.” That's fine to ignore, just keep trying the build command until it starts the metro bundler. It may take a few attempts.

6. It will take a bit to build the apk but once it finishes, you'll be placed in a queue for your apk to build. You can go to the expo link in the terminal to monitor the build status while it finishes. 

7. Download the apk once it finishes building and then login to the google play console. Again, you will need to contact Eduardo for the credentials.

8. Click on nuMom, then open testing. Once there, click on "Create new release"

9. Upload the apk file you just built to add it to the release. Click “save” and then “review release” to finish creating the new release.

You should also commit the version code change you did in the app.json to development on GitHub.

### Deploying to IOS
