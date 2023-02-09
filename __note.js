// steps:
// setup app.js first
// create authentication functionality secondly:
// a. create a user model
// - hash password there
// - for uploading photo create fileUpload.js in utils folder

// b. create a user controller
// - create a functon to gererate jwt token
// - while creating user set token in cookie
// - while login user also set token in cookie
// - notice it is set as res but it will be get as req in auth.js

// -- forget password.. steps are given in forget-password.txt file
// - create a token model
// - create email sending functionality in sendEmail.js
// - send mail with generated token to font end
// - from font end the token and password will be sent to reset password route
// - in reset password route check if token is valid
// - if valid then update password 

// d. create a user auth.js for authentication
// - create a middleware to protect routes
// - in jwt the whole user will be sent as payload in req.user object
// c. create a user route


// thirdly create product upload functionality:
// a. create a product model
// b. create a product controller
// - all system is like user crud
// - notice while updating product we check either user upload photo or not
// - Object.keys(req.files).length === 0 is used to check if photo is uploaded or not
// c. create a product route

// contact us functionality:
// a. create a contact controller
//  - get subject and message from req.body given by user
//  - get user from req.user
//   protected system .means user need to logged in to send mail

// b. create a contact route
