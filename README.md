# Mongoose-Case-Study2
Easy notes application
-----------------------------------------------------------

Please follow the below steps to run the application
1) npm init-> to create the package.json file
2) npm install express mongoose body-parser-> installation of all required modules
3) npm install nodemon -g -> Installation of Nodemon
4) Assuming you have Mongo installed in your machine
    Open cmd- and run the mongod command 
    and in another cmd run the mongo command
5) In the second command prompt which has the mongoclient running type in the below:

db.createUser({ user:"myTester", pwd:"xyz123", roles :[{ role:"readWrite",db:"
easynotes"}, {role:"read",db:"reporting"}]})
Successfully added user: {
        "user" : "myTester",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "easynotes"
                },
                {
                        "role" : "read",
                        "db" : "reporting"
                }
        ]
}
6) Now in the same command prompt type the below command:

use easynotes

The user must be switched to the easynotes database
7) Now inorder to authorise the user type the below command in mongo client
 db.auth('myTester',"xyz123")

8) Finally create a collection within easynotes database using the below command
db.createCollection('Notes');

9) Now inorder to run the application 
open the integrated terminal in VS code and run the main file using  the below command
nodemon index.js

10) Once the server is up and running.
Navigate to the specific routes as mentioned in the assignment.
You may use RestEasy /Postman client for this.


