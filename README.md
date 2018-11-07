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
---------------------------------------------------------------------------------
Potential Issues with r-script

You may get this error
```
Cannot read property 'data' of undefined
```

If so please see https://github.com/joshkatz/r-script/issues/27. In short, you need to replace the init function with the below in node_modules/r-script/index.js

```
function init(path) {
  var obj = new R(path);
  _.bindAll(obj, "data", "call", "callSync");
  return obj;
}
```
---------------------------------------------------------------------------------
config/default.json

This file houses the filepaths you will use for data analyses using R. Please specify the paths to those scripts (see mss-r-code repo) in that file on your local machine.
