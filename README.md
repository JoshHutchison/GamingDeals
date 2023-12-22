# GamingDeals

## Description
This will be a gaming deals website where it displays the current gaming deals from around the web. 
### MVP
It will have 3 pages. 
- Homepage where it displays all the deals with filters
- Individual deal page with the deal and the description and comments, and a button to add it to the users wishlist
- The user page where the user can see the deals they has saved to their wishlist and delete them

It will be seeded from here:
- https://www.gamerpower.com/api/giveaways
- https://www.gamerpower.com/api-read

### Stretch goals
- on the user page, the ability to see all comments they have made
- responsive design with hamburger button
- hovering over each item on the homepage will popup a preview of the deal homepage


## ERD
https://lucid.app/lucidchart/044e2f9a-f8d5-4097-84c1-efc0c66e342b/edit?invitationId=inv_6b1cd47f-d6e3-47da-8435-04563d12d07b

![Screenshot 2023-10-12 at 10 25 46 PM](https://github.com/JoshHutchison/GamingDeals/assets/47956394/2aafa80e-197d-44f6-a075-6cd1cc93dcb2)

## Wireframe
### Main Page
![Screenshot 2023-10-12 at 10 31 18 PM](https://github.com/JoshHutchison/GamingDeals/assets/47956394/13e40030-00a7-45da-8af2-f871d13fdd65)


### Each Deal Page
![Screenshot 2023-10-12 at 10 34 37 PM](https://github.com/JoshHutchison/GamingDeals/assets/47956394/b8a1b086-df04-4e4f-890d-be14a4f8e1bc)

### User page with Wishlist
![Screenshot 2023-10-12 at 10 38 11 PM](https://github.com/JoshHutchison/GamingDeals/assets/47956394/f341d8e6-bb05-4c52-bbd8-55923fe644f0)

### How to seed
- run :
- ```node seed/consumeApi.js```
- ```node seed/addUsers.js```
- ```node seed/addComments.js```
- ```node seed/addCommentsToDeals.js```
