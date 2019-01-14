# How to run the program:

## downloads

first you need to clone this git project with "git clone https://github.com/alli959/lokaverkefni"

NodeJS for package management: https://nodejs.org/en/

you also need to download postgres database from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads



## Getting started

### postgres

if using windows, you need to set postgres into user and system variables, in my case:
C:\Program Files\PostgreSQL\11\bin
C:\Program Files\PostgreSQL\11\lib

then you need to go to C:\Program Files\PostgreSQL\11\data and find pg_hba.conf , opin it with text editor and change method in ipv4 and ipv6 connection from md5 to trust.

then you login to postgres with: "psql -U postgres" and write your password.
now you need to create a database with "create database <databaseName>;"
next you logout from postgres with \q
login again with psql -U postgres -d <databaseName> to see if it works
  
### .env

you need to create a file called ".env" in the root lokaverkefni insert this data to the file and save:

DATABASE_URL=postgres://postgres:@localhost/<databaseName>
  
PORT=5000
  
you need to create one more .env file in ./client where you put this value:
REACT_APP_SERVICE_URL=http://localhost:5000


### npm

you need to do "npm install" in the root, also "npm install" in ./client 
to start the project you do nodemon app.js in the root and npm start in ./client




