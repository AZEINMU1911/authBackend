const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const db = require('../Models')

const User = db.user

//user sign up
const signup = async (req,res) => {
    try {
        const { userName, email, password} = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password,10),
        };
        const user = await User.create(data);

        if (user){
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
              });

        res.cookie ('jwt',token,{
            maxAge: 1 * 24 * 60 * 60,
            httpOnly: true
        });
        console.log("user",JSON.stringify(user, null, 2));
        console.log(token);

        return res.status(201).send(user)
        //If something wrong during sign up
        } else {
            return res.status(409).send("Please enter the correect details")
        }
    } catch (error) {
        console.log(error)
    }
}


//user login 
const login = async (req,res) => {
    try {
        const { email, password } = req.body;
    
        // Find a user by their email in the database
        const user = await User.findOne({
          where: {
            email: email
          }
        });
    
        // If user is found, compare the provided password with the hashed password stored in the database
        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);
    
          // If the passwords match, generate a JWT token
          if (isPasswordValid) {
            // Generate a JWT token with the user's ID and the secret key stored in the environment variables
            const token = jwt.sign({ id: user.id }, process.env.secretKey, {
              expiresIn: "1d" // Token expiration time
            });
    
            // Set the JWT token as a cookie in the HTTP response
            res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    
            // Log user data and token for debugging purposes
            console.log("User:", JSON.stringify(user, null, 2));
            console.log("Token:", token);
    
            // Send user data in the response
            return res.status(200).send(user);
          } else {
            // If the passwords do not match, return authentication failed
            return res.status(401).send("Authentication failed");
          }
        } else {
          // If user is not found, return authentication failed
          return res.status(401).send("Authentication failed");
        }
      } catch (error) {
        // Handle any errors
        console.log(error);
        return res.status(500).send("Internal server error");
      }
    };

    module.exports = {
        signup,login
    }
