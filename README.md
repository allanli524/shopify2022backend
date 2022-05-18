# shopify2022backend
This application was created by Yifei (Allan) Li to apply to Shopify's 2022 Fall Internship Backend position. The stack I chose was node js, more specificall, I used express for the CRUD API, and MongoDB for the database.

This backend web app is hosted on Replit at https://shopify2022backend.allanli524.repl.co

The API can be started by pressing run or running the command node server.js

##Getting started
You can run the sample code by executing the command "python test.py" in the shell while the API is running.

You can also test by accessing the API endpoints below through postman or insomnia

I implemented the basic CRUD functionalities and also the warehouse assignment functionalities. The inventory items are stored in the warehouse schema as a string representing their ID in a array.

***
Disclaimer: the test.py file can only be ran once successfully, because some of the fields must be unique in the database (name of the warehouse). So the same sample object cannot be added more than once. 
If you want to test with the test.py file more than once, please change the name of the warehouse in the code.
***


## /api/inventory/create [POST]
This endpoint accepts a json object:
name: the name of the item
warehouse: the name of the warehouse this inventory item will be stored in
comments: optional comments that is relevant to the item

This endpoint will create the object in MongoDB, assign and ID to it, and also inserts the item into the warehouse through its ID.

This endpoint will return the object (including ID) stored in MongoDB.

## /api/inventory/edit [POST]
This endpoint accepts a json object:
id: the id of the item in MongoDB
name: the new name of the item
warehouse: the new name of the warehouse this inventory item will be stored in
comments: optional comments that is relevant to the item

This endpoint will edit the item in MongoDB and update the relevant warehouses

This endpoint will return the new object in MongoDB

## /api/inventory/delete [POST]
This endpoint accepts a json object:
id: the id of the item in MongoDB

This endpoint will set the isDeleted attribute of the item to true and remove the item from their relevant warehouse.

This endpoint will return the ID of the object that had been deleted.

## /api/inventory/get/:id [GET]
This endpoint takes in the ID of the inventory object in its URL parameter.

This endpoint will return the full inventory object that is represented by the id provided from MongoDB

## /api/inventory/get_all [GET]
This endpoint will return all of the inventory items in MongoDB

## /api/warehouse/create [POST]
This endpoint takes in a json object:
name: the name of the warehouse (unique)
address: the string representing the address of the warehouse
comments: string of any relevant comments regarding the warehouse

This endpoint will create the warehouse object in MongoDB and then return the object created along with its ID

## /api/warehouse/get/:name [GET]
This endpoint takes in the unique name of the warehouse of interested in the URL parameter and returns the relevant object from MongoDB.

## /api/warehouse/get_all [GET]
This endpoint returns all of the warehouse objects in MongoDB
