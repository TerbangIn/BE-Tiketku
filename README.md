# Final Project: TerbangIN
This is the REST API backend from the final project at Binar Academy. REST API for booking flight tickets. 

[API Documentation](https://be-tiketku-production.up.railway.app/api-docs)

## Authors  
- [Brahmasta Bagus Aryandra](https://github.com/Brahmastabagus)
- [Muhammad Fadhlan Aqila](https://github.com/zodplugin)

## Tech Stack  
Node, Express, Sequelize, PostgreSQL, Swagger

## Run Locally  

Clone the project  

~~~bash  
git clone https://github.com/Tiketku/BE-Tiketku.git
~~~

Go to the project directory  

~~~bash  
cd BE-Tiketku
~~~

Install dependencies  

~~~bash  
npm install
~~~

Setup Sequelize

~~~bash  
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
~~~

Start the server  

~~~bash  
npm run dev
~~~

## Environment Variables  
To run this project, you will need to add the following environment variables to your .env file  
`JWT_SIGNATURE_KEY`
`DB_USERNAME`
`DB_PASSWORD`
`DB_NAME`
`DB_HOST`
`DB_PORT`
`PORT`


`IS_PRODUCTION`
`SERVERKEY`
`CLIENTKEY`

## Note  

Thank you for coming. 