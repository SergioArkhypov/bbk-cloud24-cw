# bbk-cloud24-cw
Bbk cloud computing coursework for 2024

`npm install express nodemon mongoose body-parser dotenv`
`npm install jsonwebtoken joi bcryptjs`


## Post
Post fields: 
* PostId: int
* PostTytle: str
* PostTopic: list str (Politics, Health, Sport or Tech. Could have multiple)
* Timestamp: datetime
* Message: string
* ExpirationTime: float
* Owner: str (UserName)
* NumLikes: int
* NumDislikes: int
* Comments: list str

    Methods: 
    * GetStatus: Live or Expired

## User
* userid: int
* username: str (unique)
* email
* password: str
* usertype: str (Authorised / Registered)


## Interaction
* IntId: int
* IntValue: Like, Dislike, Comment
* Actor: (UserName)
* PostTytle: str
* PostTopic: list str (Politics, Health, Sport or Tech. Could have multiple)
* TimeToExpiration: float
