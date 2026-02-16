## SOFTWARE PROJECT

### WEEK 4
- **Monday - 9th Feb:**
  - Setting things up for implementation
  - Installed and added a database called Firebase
- **Wednesday - 11th Feb:**
  - Installed PWA
- **Thursday - 12th Feb:**
  - Imported the database to the repo, tested it and it works
  - Managed redirect between pages using Link tag with href of the route. The link tag is for navigation.
- **Friday - 13th Feb:**
  - Created page.tsx files to display the information fron the databy pulling from the firebase using import { collection } data/firebase. The import{db} data/firebase is to connect to the database.
  - In order of the contents in the collections and documents, using querySnapshot is essential, you are telling Firebase to give you all the documents from collection.
  - I used map() for the Sections collection as it is an array. I could use a normal For loop, however map() returns me a new array list. And is what I want.
  - I now understand the concept of pulling information from the firebase sand displaying the info
- **Saturday - 14th Feb:**
  - Changes naviations through removing the subcollection Selections and instead made it a maped field. This made things easier when it comes to accessing the data without making complex function. Instead, using loops and if statements, I was able to show display the informtion while still having control on what part should be displayed. I have completed the overall behaviour of the chapter page.
  - Added a new page in a folder called checklists, that will be route.
  - At first, import getDocs to fecth all the checlists dcuments from firestore, and it coreclty displayed the title, trimester. I made a loop to target target the items. However I had issues. the items were objects, and it became complex to acess the fields.
  - I changed the items inro an array that holds objects instead, it was easier to code. I made input tag with type being checkbox. I wanted a line-trough to appear when an item is checked.
  - Intially, it didn't work, it was pre-ticked and could be unticked becasues it was contolled by firestore data; it displayed what was in the database instead of the user chossing what it ticked or not. 
  - A few reason to this was the component was server-side - an async function. I had to remove async and add 'use client'; on the top for it. I also added useState and useEffect. useEffect helps you manage side effects in the components. Side effects can be things like fectching data. And in my case, I used it for that situation.
  - I added a toggle funtionallity in order to update what the client does into the database. In this case, useState was implemented. It allows you to add a state to a functional componment. It returns an array containing the curretn state and a function to update. This makes sure my component can remember and mage data. I also added a updateDoc for Firestore to update based on the changes. 
  - Now the chackbox toogels both way; can tick and untick. However for it to actually update in FireStore, it needs permission. The inital rule was (allow read: if true; allo wwrite: if false;), not it has been updated to (allow read, write: if true). Now, the checkboxes can be toggled without any errors.
  - The checlists are dispalyed properly with item having a line-through when completed (ticked), and user can now tick/untick with the changes being updated remembers in Firestore. I have completed the checklists page

### WEEK 5
- **Monday 16th Feb:**
  - In regard to checklists, I implemented that the user has a premade template. Howeer they can also add their own info as well.
  - I has to do almost the same thing like the checkbox. But not it is the information. I made an addItem function that allows the user to add an item and it updates in the databse. 
  - I created a compoment called check-form, that is where the user can wtite their own list and then I imported it the checklists page for it to be displayed there.
  - I ran into commplettion, I wanted that user gets a temple an then ad thirs on top, however it is multi user yet. Meaning if someone changes it veryone had the same update. So, I must made auth/page.tsx.
  - I have now added a one page that has both login and sighn up.
  - I have now managed to created a user document anytime a new user user is created and they automatically get a copy of the checklist.