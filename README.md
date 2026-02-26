## SOFTWARE PROJECT - IMPLEMENTATION

### WEEK 1
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

### WEEK 2
- **Monday 16th Feb:**
  - In regard to checklists, I implemented that the user has a premade template. Howeer they can also add their own info as well.
  - I has to do almost the same thing like the checkbox. But not it is the information. I made an addItem function that allows the user to add an item and it updates in the databse. 
  - I created a compoment called check-form, that is where the user can wtite their own list and then I imported it the checklists page for it to be displayed there.
  - I ran into commplettion, I wanted that user gets a temple an then ad thirs on top, however it is multi user yet. Meaning if someone changes it veryone had the same update. So, I must made auth/page.tsx.
  - I have now added a one page that has both login and sighn up.
  - I have now managed to created a user document anytime a new user user is created and they automatically get a copy of the checklist. And changed the route to make it more seemless. Added comments for more clearity.

- **Tuesday 17th Feb:**
  - Modified the chapters page for the section to respond based on the order field added.
  - Started the tracking page. It was more of the same. import the data from the dtabase and display it. It shows up nicely. The basic functions are working, 
  - evetually I will adda carousel to show the week in a more presentable way.
  - Attempting to add a carousel using bootsrap, not sure if it is the right one to use.

- **Thursday 19th Feb:**
  - In order for the carousel to working using bootstrap, I need to install react-boostrap. However, I'm not using bootstrap. I'm using Tailwind, and since what want more control when it comes customisation, It seems like react-flowbite is more suitable for that.
  - I installed flowbite, using this command [npm install flowbite-react] in the terminal. I throgh an report that dependencies has some vulnerbilities. I fixed that using npm audit fix --force in order to address all issues.
  - I used useEffect to fecth the  data, mapped firestore doc to create an array of objects and I also sorted based on the week field fo it to be in order.
  - I mapped the sorted to create each slide inside a carousel. Now, it displays the track detail mentioned.
  - However I'm having issues making it look like a carousel.
  - I have added buttons and used useRef to get a reference to the carousel but still have problems. I'll leave this for now and move to next part which if faqs.
  - I made a faq page, it was relativlythe same, import the the collection, documents, and the detail and display them on screen. That went well with no issue. I make sure it works before I start with making it look good.
  - I have now moved the resource page and have completed it. Almost the same with faq - display, import the database, fecth the collection and docs, get the fields. An addition was that rescource had a url. I imported Link for that and added the url into the href, and inorder of the url to redirect to another tap, I used target="_blank". That way nstead for the link to replace the tab that currently in, it just opens a new tab.
  - Starting with the notes page, it will be similar to the checklists.

- **Friday 20th Feb:**
  - I have added a navbar to make the navigation better, this one of the funtions mentioned and it is vital for user-reading experience.
  - Contiunated having issues with flowbite when it comes to the carousel in the tracking/page.tsx. THe problem is that all the slides werer displaying at once. And the buttons prev/next method were not working.
  - The reason why it wasn't working at all is that I'm using Tailwind version 4. Flowbite-React depends on tailwind v3 and its plugin. I had no tailwind.config.ts, but I only have postcss.config.js. The carousel required a plugin-geneated classes like abosulte wherern't genrated in Tailwind v4. I later realised that I didn't call it as a function, instead I did this: onClick={() => carouselRef.current?.next} I forgot the the soft brackets. I should look like this: onClick={() => carouselRef.current?.next()}.
  - Flowbite Carousel is not compatibale with tailwind 4v, that was confirmed in the postcss.config.js - it was the using the plugin.
  - I now have two choices: Downgrade to Tailwind v3 or stay Tailwind v4 and swtch to mordern carousel. I choose option two - I will be using Embla Carousel instead of Flowbite Carousel. It is fully compatible with with Tailwind v4, lightweight with smooth aniamtions, no issues with plugins.
  - I have installed embla using this command in the terminal: npm install embla-carousel-react.
  - I attempted to call a method called goToNext, but it seems it doesn't have that. Instead it uses scrollNext(). The runtime error has disapeared, carousel works correctly and so does the navigation function.
  
- **Saturday 21st Feb:**
  - Started the notes/page.tsx. At, I wanted to be a component like check-form, but decided against it, there was need for that since it is not a template.
  - I went make a full crud functionality on it. That way, the user can create, read, update and delete their notes. And also added an orderBy to sort it by the newest based on createdAt field.
  - I have now implemented the all the crud functions, I'm now trying to display it on screen.
  - I had to update firestore rules to make sure that the users can only create notes if there logged in. Users can only see, edit and delete their own notes. I used [request.resource], whichrepesents incoming data and it exists for creating and updating while [resource] means the document that is currently stored in Firestore, used for read, update and delete.
  - I have completed the crud for the note. 
  - I fixed the buttons to act based on the onClick:{}.
  - Made upades on my Firestore that restrict user from spefic things. For example: collections faqs, resources, reviews and tracks are for read only. While: collections notes, bookmarks, checklists user specific, user can read, write and delete.
  - I having issues with the sign up, I have updated the rules in firestore to allow certain things to only users but I keep getting persmission errors. Hopefully, I will figure it out.

- **Sunday 22nd Feb:**
  - I fixed a errors, I'm using the console to see where things are happening, for some reason I have to click twice to sign successfully. It seems like it take a while for firestore add the new user.
  - Finally fixed the issue. I kept having error like "Missing or insufficient permissions" when creating a user. The first ttempt usually gave me "auth/invalid-credential" before on the secound attempt it works. The rules were tight, but I lossened it but still, the errors continued.
  - I added pendingSignup which is used to track newly created users before Firestore writes. It ensures that Firrestore writes after auth state is confirmed.
  - I also used onAuthStateChanged, it the write after Firebase Auth confirms that the user is logged in.
  - Had to add getIdToken to force a token refresh, without it Firestore will see the user a first as unauthorized.
  - How I improved this, is by error handling. It needs to check "auth/user-not-found" or "auth/invalid-credential". This was what prevent first-login errors from blocking Firestore writes and gave a clear separation between login and signup error in the alters.
  - Now, signing in work fine, the users both get their own personal checklist and a note template.

### WEEK 3
- **Monday 23rd Feb:**
  - I have added a bookmark button compoment, it is in the form of a boolean. I added svgs icon for fill and outline based on if it is on or off.
  - I made a handler that does something based on the the click of the bookmark icon. It will look for a userid and if the user exists it will creat a bookmark doc them with at the necessary information. That is in the chapters/[id]/page.tsx. It's bookmarked by sections. I will move the the bookmarks.page.tsx in order to display any sections that has been bookmarked.
  - I have now implemnted the the bookmarks/page.tsx. Everythign seems to be working well, I have granted access in the firestore rules in order to show true result. I also changed a few navigations. 
  - There's a few issues that can be tackled later.

- **Tuesday 24th Feb:**
  - Now, I was able toggle each section, before if I click on the bookmark icon all of them reacted, however in the firestore, what was clicked was what was stored. So, it is working in the backend of things.
  - So, I tracked it based on section id instead of a boolean. Made a query that checks if the bookmarked exits or not, if it does - remove it, if it doesn't - add it. An it updates accordingly, this prevents any dupliactes.
  - In the bookmark button component, instead of a general boolean, it is a boolean based on the section id, uses it as a key.
  - I was also using the wrong syntax, so that led to error as well.
  - The summary of is, the problem is that, it was a shared state (click on the bookmark of a section - all it filled instead of remain unfilled). Solved by stracking the section id instead.
  - I implemented that a user can see all their bookmarks, when they click on a bookmark it takes them to the chapter. However, I want to make it more specific, I want it to scroll to actual the section in the chapter.
  - I searched to find something but as it turns out, there's no exact definate way of doing it. Next.js App doesn't have something like that directly. However there was a commonality, and there was hash (#) symbol, it seems like it used to scoll to a specific id. For example if you have <div id="section">, the href it will be <Link `/somthing/somewhere#${section}`> and in the url it be /somthing/somewhere#section. In other words, it finds the element with this id and scroll to it. 
  - The scroll wasn't working properly as first. The url was showing the right thing but no movement. As it turns out, in the useEffect, I was aiting for chapterId toad instead for chapterData. I made sure the hash in the URL and an if statement to get the element with that match id. I scroll smoothly behavoiur for to look seemless. Which leads toa better user experience.
  - Now, clicking on a bookmark takes you to the chapter, and it scrolls to the section now. 

- **Wednesday 25th Feb:** 
  - I have now implemented the Review collection. It was similar to the FAQ,it was a copy and paste, and changing the words. Updated the navbar component.

- **Thursday 26th Feb:**
  - I'm now moving to attempt a progress bar. However with the layout of the chapter, it wouldn't necessary. The chapters individually are not that long. For it to work, I need to change the layout to also increase better user experience. So, I have decided for the chapters to a carousel in chapters/[id]/page.tsx. So, when a user clicks on the chapter, not only can they read the chapter choosen, they can also have the option to move to the chapter with leaving. To will smoothen the navigation system.
  - So, started by fecthing all the chapters and stroing them into chapterIds as an array, it was privously chapterData but it is now simplified. Because chapterData was for the current chapter but inorder for it to be a carousel, I need an array of chpapter ids - that was stored in chapterIds. Along th way, I kept mixing those two and it led to confusions. That is now resloved.
  - The next problem I encountered is that the bookmarks were not syncing correctly, it could no longer locatd the section. I decided to instead pass the full chapter object instead of just the section, and from there, it can find the what section tht being bookmarked.
  - Another issue that came was that scoll was working anymore as well when I do a refresh it, the bookmark is goes unfilled when it was filled previously.
  - The problem was that auth.currentUser is null in the first render because the firebase aauth is not done. The first the useEffect does nothing because no user (null). And after that, even if the user is looged in, it doesnt re-run because the chapterId hasn't to lonly runs if a change has occured, otherwise do nothing. So, how to solve that is to wait for the user to ba available by using onAuthChanged inside a new useEffect. It insures that the bookmarks are load once firebase knows the user.
  - Now, for the scoll, the carousel is confused, it already scrolling horizontally and now inside it, something scrolls vertically. So, we have to delay the scroll untill the chapterIds(an array of chapter ids) is loaded. Embla has to initialised before scrollToView begins.
  - Another thing I came across is, the bookmark but undos itself when you refresh. As it turns out, it also looks at auth.currentUser which is null. I make sure to use onAuthChange to track the userId. It didn't wor as first and that's because it doesn't know it no longer null, so I had to say that the userId is a string du to the fact I previously said that userId is null or string.
  - I have now changed the chapters into a carousel. Hopefully, it will make the progress possible.
  - I'll start by making a component called progress-bar.
  - I have started implementing. I found a few different ways of progress bar, but decided on keeping it simple, in order to not make it too confusing for me. Since 'm using embla carousel, it has its own way of doing this. A chapter is a slide, Icalucalted based on that each silde is an index, inorder to get a number, it is index+1 out of the total chapter * 100 so I can get a percentage. I ran through a few issues, I was using the wrong embla type. But still nothing hppened, as it turns, I forgot to call the set progress in the compoment.
  - Everything is working smoothly, I'll make amendments when it comes to making more easy on the eye. The foundation of the progress bar is complete.
  - I updated the bookmark, and chapter/id. I wan the user yo be able go back to the chapter they were reading before the clicked on view all boookmarks. So, I just used the last bookmarked chapter they clicked, it not perfect but it can be managed.
  - I got an errot that said "can't access property "indexOf"", userId was intailsed as null even after stating it was a string. So, mention to check before fetching. only query Firestore if userId exists. And it worked, this ensures bookmarks loads only for a logged-in user.