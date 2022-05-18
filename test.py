# This is a test file that interacts with the database
import os
from dotenv import load_dotenv
import requests

load_dotenv()

API = os.getenv('API')


# 1. creating warehouse

sample_warehouse1 = {
    "name": "w999",
    "address": "1",
    "comments": "N/A"
}

r1 = requests.post(API + "/api/warehouse/create", sample_warehouse1)
print("ID OF WAREHOUSE 1:")
print(r1.json()["_id"])
print("\n")

sample_warehouse2 = {
    "name": "w998",
    "address": "1",
    "comments": "N/A"
}

r2 = requests.post(API + "/api/warehouse/create", sample_warehouse2)

#check the current state of warehouse w999
r3 = requests.get(API + "/api/warehouse/get/w999")
print("GET REQUEST RESULT ON WAREHOUSE 1:")
print(r3.content)
print("\n")

#check the current state of warehouses
r4 = requests.get(API + "/api/warehouse/get_all", sample_warehouse2)
print("GET REQUEST RESULT ON ALL WAREHOUSES:")
print(r4.content)
print("\n")

print("####################################\n\n\n")

# 2. creating inventory items
sample_item = {
    "name": "i1",
	"warehouse": "w999", #item will be assigned to w999
	"comments": "yerrr"
}
r5 = requests.post(API + "/api/inventory/create", sample_item)
print("INVENTORY ITEM CREATED:")
print(r5.content)
print("\n")

sample_item2 = {
    "name": "i1",
	"warehouse": "w998", #item will be assigned to w998
	"comments": "yerrr"
}
r11 = requests.post(API + "/api/inventory/create", sample_item2)
print("INVENTORY ITEM CREATED:")
print(r11.content)
print("\n")

#check the state of the warehouses
r12 = requests.get(API + "/api/warehouse/get_all")
print("STATE OF WAREHOUSE AFTER EDIT:")
print(r12.json())
print("\n")

print("####################################\n\n\n")

# 3. edit the inventory item by changing warehouse
id_to_change = r5.json()["_id"] #this item is in w999
new_info = {
    "id": id_to_change,
    "name": "i2", #changing name from i1 to i2
	"warehouse": "w998", #item will be changing it to w998
	"comments": "yerrr?"
}
r6 = requests.post(API + "/api/inventory/edit", new_info)

#check the result of the change
r7 = requests.get(API + "/api/inventory/get/" + id_to_change)
print("STATE OF ITEM AFTER EDIT:")
print(r7.json())
print("\n")

#check the state of the warehouses
r8 = requests.get(API + "/api/warehouse/get_all")
print("STATE OF WAREHOUSE AFTER EDIT:")
print(r8.json())
print("\n")

print("####################################\n\n\n")

# 4. delete an inventory item
id_info =  {"id": id_to_change}
r9 =  requests.post(API + "/api/inventory/delete", id_info)

#check the result of the change
r7 = requests.get(API + "/api/inventory/get/" + id_to_change)
print("STATE OF ITEM AFTER DELETION:")
print(r7.json())
print("\n")

#check the state of the warehouses
r8 = requests.get(API + "/api/warehouse/get_all")
print("STATE OF WAREHOUSE AFTER DELETION:")
print(r8.json())
print("\n")