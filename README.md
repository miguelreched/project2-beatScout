
BeatScout
https://beatscout.adaptable.app/
[BeatScout Logo] (./public/images/beat-scout-logo.jpg)

Description
"beatscout is the ultimate app for exploring, voting and sharing music! Discover new talent, vote for your favorite artists, follow music gurus for expert recommendations and discover new talent thanks to the recommendations of our smart algorithm"

User Stories
404 - When I go to a page that doesn’t exist so that I know it was my fault
500 - When the super team screws it up so that I know that is not my fault
homepage - On this page we can see all bands views 
sign up - On this page users create their account
login - On this page users enter the page with their profile
logout - The user clicks a button and logs out of the page.
bands - You can see all the bands created by users and follow them
users - You can see all users and follow them

Backlog Functionalities
In the future we would implement that comments can be made on comments. And that messages can be sent between users

Technologies used
HTML, CSS, Javascript, Node, Express, Handlebars, Mongoose, Sessions & Cookies

Models

User
 
    usernamen,
    email,
    password,
    country,
    favoriteBand,
    followed,
    role,
    profilePic,

Band

  name,
  genre
  ratings 
  info
  instagramUrl: String,
  facebookUrl: String,
  spotifyUrl: String,
  bandPic: String


Comment
    
  band,
  user,
  comment,
  rating,
