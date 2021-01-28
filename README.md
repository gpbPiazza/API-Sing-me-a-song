# API- Sing me a song
<p align="center">
  <img src="https://64.media.tumblr.com/0b35978929f4a9594c1dceefe86eee35/tumblr_o1laev7QQm1t0g7nko1_640.png" width="175" alt="cifra" />
</p>
  

## Objective
<p>
   The project Sing me asong was developed throughout the Bootcamp of "Respode Aí". This project its a API aplication and has the object to register genres, recommendations and return random recommendations. 
</p>

### Features
- **POST** `**/genres**`
- **GET** `**/genres**`
- **POST** `**/recommendations**`
- **POST** `**/recommendations/:id/upvote**` and `**/recommendations/:id/downvote**`
- **GET** `**/recommendations/random**`

### Busines Rules
As a user i:
- Would like create a new genre if this genre doesnt exist.
- Want se all genres created.
- Would like to create one recommendation that must contain one genre.
- Would like to up vote this recommendation or down vote, if this recommendation reachs score equal a -5 the recomendation is deleted.
- Want receive one random recomendation, folowing this rules.

Rules for a random recommendation:
- **70% of times**: one músic with score bigger than 10 must be recomendated randomly.
- **30% of times**: one músic with score between -5 and 10 must be recomendated randomly.
- In case if any music got in this scores, must return a random music independent his score.
- In case of any recommendation wheren't created, must return error status 404.

### Documentaion:

<a href="https://www.notion.so/Sing-me-a-song-documentation-aa54896e890a43dbba26e2bf3be66b3f">"Link"</a> 

### Tech Stack
Languages:<br>
<p align="center">
     <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
</p>


The following tools and frameworks were used in the construction of the project:<br> 
    <img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node&logoColor=white"/>
    <img src='https://img.shields.io/badge/express%20-%2320232a.svg?&style=for-the-badge&logo=express&logoColor=%2361DAFB'/>
    <img src='https://img.shields.io/badge/yarn%20-%2320232a.svg?&style=for-the-badge&logo=yarn&logoColor=%2361DAFB'/>
    <img src='https://img.shields.io/badge/jest%20-%2320232a.svg?&style=for-the-badge&logo=jest&logoColor=%2361DAFB'/>
    <img src='https://img.shields.io/badge/sequelize%20-%2320232a.svg?&style=for-the-badge&logo=sequelize&logoColor=%2361DAFB'/>
    <img src='https://img.shields.io/badge/postgreSQL%20-%2320232a.svg?&style=for-the-badge&logo=postgreSQL&logoColor=%2361DAFB'/>

### Authors
---
Gabriel Pedro Braga Piazza.
<p>Piazza Medias:</p>
<a href="https://www.linkedin.com/in/gabriel-piazza//"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a> 
<a href="https://github.com/gpbPiazza"><img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" /></a>

<br>
Made by, Get in Touch!<br><br>
