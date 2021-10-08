# Social App

### Working URL: https://rgautam320-social.netlify.app

## App Summary

### 1. Home Page

Home Page will show the posts by last uploaded. I have implemented pagination so at one time only Eight posts can be seen. If you are not logged in, then you can't make any post and like any post.

![Social-App](https://user-images.githubusercontent.com/71542496/136505352-a2d2350f-df29-4f77-9921-7e60e33914b0.png)

### 2. Searching and Filtering

You can search post by Post Title and and filter post by tags.

![Social-App-Search](https://user-images.githubusercontent.com/71542496/136505919-f49345a2-dbf9-48f8-a7f7-3cc5cd862921.png)

### 3. Authentication

It also supports JWT and Google Authentication. Only after Authentication, you can create and like post.

![Social-App-Authentication](https://user-images.githubusercontent.com/71542496/136507279-5589d5d3-c048-4ae1-8e52-ff8c24fef997.png)

### 4. Post Details

You can make comments, if you are authenticated and you can also see the recommended posts.

![Social-App-Details](https://user-images.githubusercontent.com/71542496/136509100-96328aa9-b6e3-4b49-95a1-1fcb66c1ac96.png)

## Social App - Frontend

## Step to Run the App

###### npm install

###### npm start

## Folder Structure

```
frontend
|___node_modules
|___public
|   │   index.html
|   │   logo.png
|___src
│   │___assets
│   │___components
|   |___data
|   | App.css
|   | App.js
|   | index.js
│   .env
│   README.md
|   package.json
|   package-lock.json
```

### 1. node_modules

It contains all the npm packages.

### 2. public

It contains index.html and logo.png. Other files have been removed.

### 3. src

It contains Assets, Components, Containers, Data and Routers folders and App.css, App.js and index.js files.

#### assets

It has all the static images we are using.

#### components

It has folders for all the components we are using and they are mostly categoried based on the Containers. Each component is having their own styles.js file which has all the required css for that component.

#### data

This folder is for Redux-Toolkit purpose.

#### App.css

Here, we are defining our constants and if we have something to modify, we are doing that here (Like Bootstrap classes).

#### App.js

This is our App.js file.

#### index.js

This is the main index.js file.

### 4. package-lock.json

The locked packages are here.

### 5. package.json

All the dependencies, scripts are here.

## Social App - Backend

## Step to Run the App

##### npm install

##### npm start

## Folder Structure

```
backend
|___ node_modules
|___ controllers
|___ middleware
|___ models
|___ routes
│   .env
│   index.js
|   package.json
|   package-lock.json
```

### 1. node_modules

It contains all the npm packages.

### 2. controllers

It contains all the logical files.

### 3. middleware

The middleware of our application.

### 4. models

Our application models.

### 5. routes

Routes of our application

### 6. .env

The environment variables for our app.

### 7. index.js

Main index.js file of the application.

### 8. package-lock.json

The locked packages are here.

### 9. package.json

All the dependencies, scripts are here.

## .gitignore

This is gitignore file where we will be mentioning all the ignored files and folders.

## README.md

It's me😅

### README.md by Rajan Gautam

### Special Thanks to Adrian Hajdin - JavaScript Mastery.
