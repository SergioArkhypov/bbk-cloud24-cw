# bbk-cloud24-cw
Bbk cloud computing coursework for 2024

`npm install express nodemon mongoose body-parser dotenv`
`npm install jsonwebtoken joi bcryptjs`


## Post
Post fields: 
* postid: int
* tytle: str
* topic: list str (Politics, Health, Sport or Tech. Could have multiple)
* timestamp: datetime
* message: string
* expiration: float
* user: str (username)

    Methods: 
    * GetStatus: Live or Expired
    * GetLikes: int
    * GetDislikes: int
    * GetComments: list str

## User
* userid: int
* username: str (unique)
* email
* password: str
* usertype: str (Authorised / Registered)


## Action
* type: Like, Dislike, Comment
* user: str (username)
* posttitle: str
* posttopic: list str (Politics, Health, Sport or Tech. Could have multiple)
* timeexpire: float
