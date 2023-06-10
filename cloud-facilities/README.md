# Cloud Facilities

Cloud Facilities is an adventure travel booking app that aims to bring skydivers together by providing planned trips such that users can save on the hassle of planning for themselves.

This project is also highly experimental, using new (to me) technologies such as Next.js, Prisma ORM, Tailwind, Supabase, NextAuth and Nodemailer.

# Technologies/Platforms used

## Main Application

### <a href="https://nextjs.org/" target="_blank" >React.js with Javascript</a>

This app was built using Next.js App router, a Javascript framework built on React, to explore mainly its server-side rendering and how it would integrate both front and back-end work.

### <a href="https://tailwindcss.com/" target="_blank" >Tailwind CSS</a>

Tailwind CSS was utilized for ease of customization and use.

### <a href="https://www.prisma.io/" target="_blank" >Prisma ORM</a>

Prisma ORM was utilized to work with the database as it makes it more intuitive for database queries while providing a type-safe API for submitting them.

### <a href="https://www.postgresql.org/" target="_blank" >PostgreSQL</a>/<a href="https://supabase.com/" target="_blank" >Supabase</a>

Postgres is an SQL database that can be integrated with Prisma. An SQL database was chosen to explore its features and practice relational queries. (Post reflection: As Postgres' wide range of features would be underutilized, perhaps a more lightweight SQL DB might be more suitable.)

Supabase is an open-source platform for building modern, real-time applications with a serverless backend and was used to make it easier to work with Postgres.

## Authentication

### <a href="https://next-auth.js.org/" target="_blank" >NextAuth</a>

NextAuth/Auth.js was utilized as the main auth solution.

[bcrypt](https://www.npmjs.com/package/bcrypt) was used to hash passwords. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) was used to assign access & refresh tokens.

## Email feature

### <a href="https://nodemailer.com/about/" target="_blank" >Nodemailer</a>

Nodemailer is a plug-and-play email sending solution for developers who want implement mock sending of emails. It also uses [Ethereal](https://ethereal.email/), a fake SMTP service.

### <a href="https://react.email/" target="_blank" >React-email</a>

React.email provides a collection of high-quality, unstyled components for creating beautiful emails using React and TypeScript (in this case, Javascript).

# Model

![ERD](/public/cloudfac-ERD.png)

# General Approach

The design of our app was largely controlled by the prototype handed over to us by a design team and as such, we endeavoured to stick as close to the design as we could. Early in development, we prioritized setting up each of the app’s pages as per design and worked on styling the pages, since the app’s design was the first resource made available to us.

<br/>

## Front-end

### Login page

While not included by the design team, we implemented a login page to orchestrate access to individual user data. Before authentication was properly established in the back-end, any user would log in to a general mega-user account.

After having set up proper authentication via access tokens, users could then track their own unique set of data (points, cafes etc) after registering and logging in to the app via email and password.

### Home page

The home page showcases the user’s accumulated points and their corresponding cash value, along with a referral page link and nearby cafes.

To determine the user’s distance, we leveraged Javascript Geolocator, which provides the user’s device's coordinates as a reference point. Using these coordinates, we employed the Haversine formula to calculate the great-circle distance between the user and cafes in the database, based on their respective longitudes and latitudes.

The results were subsequently sorted and presented to the user in ascending order, from the nearest to the furthest cafe.

### Referral page

This page provides users with the opportunity to earn points through referrals. Each user is assigned a unique code, prominently displayed on this page. By utilizing the ‘copy’ button, users can easily copy the referral code, and the button dynamically changes to ‘copied’ to indicate successful copying to their clipboard. This was done with multiple declared states of the button which changed the text and styling of the button on click.

The page also features two additional buttons, ‘share' and ‘invite from contact’, enabling users to invite from the user database and earn points.

In the current development stage, clicking the ‘share’ button displays a placeholder drawer reflecting the envisioned design.

On the other hand, the ‘invite from contact’ button triggers a drawer displaying a list of available users for invitation. Clicking the ‘invite’ button within the drawer would transform it into ‘invite’, notifying users of their successful invitation. For this prototype, invitations were automatically accepted and inviting another user increases the referral count by 1 and rewards the user with 500 points. This was done by patching the user’s points and referral count in the backend.

The data would then be displayed in the referral page’s referral history section to show the user their referral count and also their points earned from referrals.

### Profile page

The profile page underwent significant modifications compared to the original design proposed by the design team. Initially, the design included a profile picture, the user's name, a points counter to display accumulated points, and a referral box resembling the homepage. Additionally, there were buttons to navigate users to various sections such as FAQ, settings, support, transaction history, and log out.

However, due to constraints during development of the prototype, substantial changes had to be made the profile page's design. Save for the log out button, all other buttons had been removed as they lacked functionality. Instead, an "about me" input box was added, allowing users to update their profile page with a description about themselves. This new feature provided some functionality to the page, granted users the opportunity to personalize their profile and share information that reflected their interests and background.

### Scan/Redeem page

The Scan/Collect Page is the user’s landing page when utilizing the points system. Once directed to this page, it displays a modal where the user could only select to collect or redeem points.

If the user chose to collect points, the modal would close and the collect page would render, initializing the camera. Upon capturing an image, the camera view would return a base64 encoded string which we sent to the database as BinData. This is allowed due to the small image size (<16MB), above which would have us use mongo’s gridFS. Via useState, that image would be displayed (i.e. pausing the video) and an input prompt for the user to input the value of the receipt would be conditionally rendered. This camera view would then continue once the user had closed the prompt or submitted the receipt.

The user would be redirected to the redeem page otherwise, initializing the QR code reader. Similarly, upon scanning and decoding the value of the QR code, the video would pause and an input prompt would appear for the user to input the redeem value.

For this prototype, all collection/redeem were automatically approved and as such, the points displayed in the profile page and home page were updated immediately upon submission of the collect or redeem input prompt.

### About Cafes page

This page required information from 3 different collections in our database to present the Cafe’s information, its Menu and its Reviews. As such, several fetch functions had to be prepared to call the appropriate endpoints.

These information were then organized into each of their own components: An AboutCafe, Menu and Review component. In each of these components, information was displayed in a format designated by the design team.

For the review page, a filter bar was implemented to filter reviews by their context, to allow users to see what reviews were talking about each amenity specifically. For this prototype, reviews could not be input by users but instead were pre-generated.

### Explore/Saved page

As the only salient difference between these pages was the cafes that were displayed, with the Explore page displaying all cafes and Saved page only displaying cafes favourited by the user, most components made for the Explore page were also reused in the Saved pages.

The filter function built for the About Cafes page was also re-styled and reused for these two pages as it could still be used to filter cafes by amenities due to the similarities in storage of cafe and review tags. Unique fetch functions were written for each page to fetch their specific sets of data.

<br/>

## Back-end

### Models

#### Cafe Models

Early in development, for simplicity’s sake, we had intended for a Cafe model in which every piece of information about each cafe to be stored as a document in a single Cafe collection. However, considering the complexity of certain cafe information, such as menu items having their own costs, names and images and cafe reviews having their own specific set of information to be stored, we eventually moved on decomplexifying this collection, splitting the Cafe model into a Cafe model harbouring general information about the cafe, a Cafe Menu model to contain individual menu items and a Cafe Reviews model to store reviews about the cafe. To link each of these models together, Cafe Menu and Cafe Review documents contained an ObjectId referencing the cafe which they were from.

#### User Model

For authentication purposes, our user model stores a user’s email and a hash of their password, which they use to register an account. On registration, a random referral code is generated along with trackers for their referral counts, referred status, points and saved cafes. Other accessory information was also designated to be stored for each user, such as their username, roles or profile description.

#### Collection Image Model

This model was created for storage of receipts images. Documents of this collection would store incoming bin64 strings as a buffer object, to be decoded into images via post-prototype functionalities where these images would be used for verifying points collection.

### Controllers

We started off with generic controllers for each of our models, getters, putters and patchers to insert and modify documents into our database and as we progressed with development, we gradually added more and more specific controllers to fulfil specific demands, such as creating an endpoint in our controller to simultaneously query the User model for a user’s saved cafes and the Cafe model to retrieve information about these cafes to be displayed in the front end’s Saved Cafes page.

### Routers & Validation

Routers were organized and named appropriate to the collections their associated controllers were interacting with. As we expected users to input emails and passwords freely, we implemented validation for requests sent to our login and register endpoints, to ensure that appropriate information was received in the request body.

## Challenges

1. To authenticate users, we relied on users obtaining an access token after they log in in order to query data from protected endpoints to display information in the app. To make the access token persist even after the user refreshed the page, we stored the access token in local storage and retrieved it each time the app loaded, setting the access token into a state. However, this led to problems where on refresh, the app was loading and attempting to fetch data from our database despite the fact that the access token had yet to be set into its state, leading to unauthorized queries throwing errors in the front-end when the app first loads.
2. Development of components from scratch. With time constraints in mind, our aim was to faithfully bring to life the app envisioned by the designers, encompassing both its visual appeal and functionality. However, due to the nature of how certain components were initially designed in Figma, we encountered difficulties in directly leveraging the CSS generated within the Figma environment.
3. For submission of receipts, dealing with data transfer of images was unfamiliar to the team and required us to greatly enhance our knowledge on encoding schemes, BSON type and the transfer methods available to MongoDB. The images were eventually sent directly to MongoDB as binData.
4. While react-webcam and react-qr-scanner were relatively straightforward to implement, the documentation for react-qr-scanner was very limited, resulting in the team being unable to customize it to meet the intended design.

## Solutions and/or mitigation attempts

1. To resolve the app attempting to fetch data before the access token was made available to components, we had to strictly control when each function was being called when the app loaded. This was done by adding useEffects with access token’s state as dependency on pages where the access token was required and by having these functions conditionally run when access token was available, this prevented appearance of the “false unauthorized errors”.
2. Due to how the components were designed in Figma, we had to meticulously style and harmonize these components, a laborious process that demanded significant investment of time and effort.
3. In the interest of time, the team chose not to invest further time to display these images in a folder on a local machine (for further verification) or implement a feature that allows users to select a receipt from a folder in their local machine
4. In our attempts to style the webcam and qr scanner, we experimented using commands/properties from other similar react webcam/qr scanner libraries in hopes that the libraries we used would have similar implementations. However, this was to no avail and the stylings were left as is to focus our efforts on other important features of the app.

# Dependencies

On top of React.js and Express.js, this app is dependent on the following packages.

## Front-end

- React Router DOM v6.11 <br/>`npm i react-router-dom`
- React Webcam <br/>`npm i react-webcam`
- React QR Scanner <br/>`npm i @yudiel/react-qr-scanner`
- Material UI & Icons <br/>`npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`
- JSON Web Token decode <br/>`npm i jwt-decode`

## Back-end

- Cors <br/>`npm i cors`
- Bcrypt <br/>`npm i bcrypt`
- JSON Web Token <br/>`npm i jsonwebtoken`
- Uuid <br/>`npm i uuid`
- Mongoose <br/>`npm i mongoose`
- Express Validator <br/>`npm i express-validator`

# User Stories

This app was created in recognition of the growing demand for public workspaces by remote workers, self-employed individuals and students. This app aims to connect this population to cafes and businesses which are willing and capable of hosting these people, allowing them to utilize their venues as workspaces in exchange for their patronage.

## Features

### Explore cafes

Users can browse participating cafes and save cafes to construct their own personal list of favourite cafes. Geolocation functionality also features the cafes nearest to the user’s device. The app also provides information on each cafes’ operating hours, amenities, menu and prices and other user reviews.

### Points accumulation system

Users can collect points from cafes and redeem points for rewards.

### Invite and refer friends

To encourage growth of the user base, existing users can invite their contacts to sign up as new users, rewarding both with points to use at participating cafes.

### User authentication

Users can log in to their own individual accounts to access the app’s services, authenticated by access/refresh tokens.

# Wireframes and Designs

## Initial Desgin provided by Design team

### Main pages

![Home Page](front-end/public/markdownAssets/homePage/homePage.png)![Explore Page](front-end/public/markdownAssets/explorePage/explorePage.png)

![Saved Cafes Page](front-end/public/markdownAssets/savedPage/SavedPage.png)![Profile Page](front-end/public/markdownAssets/profilePage/profilePage.png)

### Scan/Redeem page

![Scan/Redeem Page](front-end/public/markdownAssets/scanPage/scanPrompt.png)![Scan Page](front-end/public/markdownAssets/scanPage/scanningAndCollecting.png)![Collection Guide](front-end/public/markdownAssets/scanPage/collectionGuide.png)

### Referral page

![Referral Page](front-end/public/markdownAssets/homePage/referralPage.png)![Share drawer](front-end/public/markdownAssets/homePage/shareDrawer.png)![Invite drawer](front-end/public/markdownAssets/homePage/inviteDrawer.png)

### About page

![About Page](front-end/public/markdownAssets/explorePage/aboutPage.png)![Menu](front-end/public/markdownAssets/explorePage/menuTab.png)![Reviews](front-end/public/markdownAssets/explorePage/reviewsTab.png)

## Routes Web

![Route Web](front-end/public/markdownAssets/wireframe.png)

# Created by

## Developers

- Tan Bing Hong
- Low Zi Ming
- Tan Justinn
- Allan Kyaw Hliang Soe

## Designers

- Jaslyn Tan
- Samantha Tan
- Sandy Seah
- Wai Yee Tan
