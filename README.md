<!-- # After downloading files enter below command

# npm install

# then to start the node server run one of the below commands

# if you have installed nodemon globally then run :- "nodemon app"

# Otherwise run :- node app

#Please verify the PORT number from console of server . Default PORT will be 8080

# Important for user related API

 1)To add new user use below api along with userdata object in body
      API:  http://127.0.0.1:8080/api/v1/user
      Request Type : POST

        sample userdata object
        {
            "name":"Test Name 5",
            "mobile":"1245789712",
            "email":"dsjg@jhdsj.com",
            "address":{
                "street":"test5",
                "locality":"local3",
                "city":"cut1",
                "state":"mah1",
                "coordinatesType":"Point",
                "coordinates":[-28.3850,25.5867]
            },
            "status":1
        }

    2)To update user data
        API :http://127.0.0.1:8080/api/v1/user/   //along with user._id
        Request type : PUT

        updated userData object in body

    3)To delete user
        API :http://127.0.0.1:8080/api/v1/user/   //along with user._id
        Request type : DELETE

        it will set status of user to 0 means user is  inactive

    4)To fetch single user by its id
        API :http://127.0.0.1:8080/api/v1/user/   //along with user._id
        Request type : GET

    5)To fetch all users
        API :http://127.0.0.1:8080/api/v1/user
        Request type : GET

    6)To fetch sorted user by createdAt timestamp
        API :http://127.0.0.1:8080/api/v1/user/byCreateAt
        Request type : GET

    7)To fetch all user sorted by their distance from coordinates
        API :http://127.0.0.1:8080/api/v1/user/nearMe?lang=-24.2121&lat=40.145
        Request type : GET


# Database hosted user only valid till 1 week
 -->
