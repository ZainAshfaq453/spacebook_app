Created using EXPO client. Does not include spacebook server.

HOW TO RUN: Download folder and type "NPM start" in command line 
Endpoints implemented:

User Management

POST
/user
Add a new user

POST
/login
Log into an account

POST
/logout
Log out of an account

GET
/user/{user_id}
Get user information

PATCH
/user/{user_id}
Update user information

GET
/user/{user_id}/photo
Get a users profile photo


Friend Management

GET
/user/{user_id}/friends
Get list of friends for a given user

POST
/user/{user_id}/friends
Add a new friend

GET
/friendrequests
Get list of outstanding friends requests

POST
/friendrequests/{user_id}
Accept a friend request

GET
/search
Find friends

Post Management

POST
/user/{user_id}/post
Add a new post

DELETE
/user/{user_id}/post/{post_id}
Delete a post

PATCH
/user/{user_id}/post/{post_id}
Update a post


