# mss-server

- git clone https://github.com/Morocco13-MSS/mss-server.git

- cd mss-server

- npm install

- npm run start

- See result in Open browser: http://127.0.0.1:8080/patients/global

---------------------------------------------------------------------------------
How to delete the existing database and create a new one:
- Drop the older databse with 
   mysql> DROP DATABASE oldDataBaseName
- Create a new database
  mysql>CREATE DATABASE new_database_name
- Come out of the mysql login and then
   mysql -u root -p  <new_database_name> < yasmine.sql

