# Getting Started

Clone the repo afer which you have to install all the needed dependencies you can run `npm install` to install all the dependencies and then run npm `npm start` in the root directory to start the application


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Front End

It is a React appliaction you need to login from some registered credentitals.

Hosting: [https://hospital-app-rose.vercel.app](https://hospital-app-rose.vercel.app) 

You can create a new account if you don't have an exisiting account.

Once you click on register and create a new account you get redirected to login page where you have to login from newly created account.

If have alreaady created an account and don't remember your password you can click on forgot password on homescreen that will take you too forgot password page where you need to enter your registered email. A password reset link which will expire in 15 mins will be sent to you registerd email.

Once you are successfully loged in you will be taken to dashboard screen where you will have 2 option `sign out` and `reset password`

If you click on sign out your session will exprire and you will be taken to login page.

If you want to change you password you can click on reset password and then enter your new password.

## Backend

Backend of the application is an express application. 

### As the backend is deployed on free server so it takes time to respond to the 1st request made from a browser after the first reqest is responded the server runs fine. ###

### First request will always take upto 15-20 sec to respond due to deployment on free server

Hosting:[https://backend-for-hospital.onrender.com/](https://backend-for-hospital.onrender.com/)

APIs Available:

End Point: `/register`

Method: POST

Request Body: ```{name:'name',userId:'email',password:'password',role:'optional'}```

Response: new user details

---

End Point: `/login`

Method:POST

Resquest Body: ```{userId:'email',password:'password'}```

Response: JWT Token for session

---

End Point: `/validate`

Method:GET

Responce: Session Details

---

End Point: `/forgot-password`

Method:POST

Request Body:```{userId:'email'}```

Responce: Status of reset password email

---

End Point `/reset-password`

Method:POST

Request Body: ```{userId:'email',password:'newPassword'}```

Responce: New password details


