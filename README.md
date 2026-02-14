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
  - Created page.tsx files to display the information by pulling from the firebase using import { db } data/firebase.
  - In order of the contents in the collections and documents, using querySnapshot is essential, you are telling Firebase to give you all the documents from collection.
  - I used map() for the Sections collection as it is an array. I could use a normal For loop, however map() returns me a new array list. And is what I want.
  - I now understand the concept of pulling infiom from the firebase sand displaying the info
- **Saturday - 14th Feb:**
  - Changes naviations through removing the subcollection Selections and instead made it a maped field. This made thing easuarie when it come to accessing the data without making complex function. Instead, using loops and if statements, i was able to show display the informtion while still having control on what part should be displayed. I have completed the overall behaviour of the chapter page.