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
  - Created page.tsx files to display the information fron the databy pulling from the firebase using ``import { collection } data/firebase``. The ``import{db} data/firebase`` is to connect to the database.
  - In order of the contents in the collections and documents, using ``querySnapshot`` is essential, you are telling Firebase to give you all the documents from collection.
  - I used ``map()`` for the ``Sections collection`` as it is an array. I could use a normal For loop, however ``map()`` returns me a new array list. And is what I want.
  - I now understand the concept of pulling information from the firebase sand displaying the info

- **Saturday - 14th Feb:**
  - Changes naviations through removing the subcollection Selections and instead made it a maped field. This made things easier when it comes to accessing the data without making complex function. Instead, using loops and if statements, I was able to show display the informtion while still having control on what part should be displayed. I have completed the overall behaviour of the chapter page.
  - Added a new page in a folder called checklists, that will be route.
  - At first, import getDocs to fecth all the checklists documents from firestore, and it correctly displayed the title, trimester. I made a loop to target target the items. However I had issues. the items were objects, and it became complex to acess the fields.
  - I changed the items inro an array that holds objects instead, it was easier to code. I made input tag with type being checkbox. I wanted a line-trough to appear when an item is checked.
  - Intially, it didn't work, it was pre-ticked and could be unticked becasues it was contolled by firestore data; it displayed what was in the database instead of the user chossing what it ticked or not. 
  - A few reason to this was the component was server-side - an ``async function``. I had to remove async and add 'use client'; on the top for it. I also added ``useState`` and ``useEffect``. ``useEffect`` helps you manage side effects in the components. Side effects can be things like fectching data. And in my case, I used it for that situation.
  - I added a toggle funtionallity in order to update what the client does into the database. In this case, ``useState`` was implemented. It allows you to add a state to a functional componment. It returns an array containing the curretn state and a function to update. This makes sure my component can remember and mage data. I also added a updateDoc for Firestore to update based on the changes. 
  - Now the chackbox toogels both way; can tick and untick. However for it to actually update in FireStore, it needs permission. The inital rule was ``allow read: if true; allo wwrite: if false;``, not it has been updated to ``allow read, write: if true``. Now, the checkboxes can be toggled without any errors.
  - The checklists are dispalyed properly with item having a line-through when completed (ticked), and user can now tick/untick with the changes being updated remembers in Firestore. I have completed the checklists page

### WEEK 2
- **Monday 16th Feb:**
  - In regard to checklists, I implemented that the user has a premade template. Howeer they can also add their own info as well.
  - I has to do almost the same thing like the checkbox. But not it is the information. I made an addItem function that allows the user to add an item and it updates in the databse. 
  - I created a compoment called check-form, that is where the user can wtite their own list and then I imported it the checklists page for it to be displayed there.
  - I ran into commplettion, I wanted that user gets a temple an then ad thirs on top, however it is multi user yet. Meaning, if someone changes it, everyone had the same update. So, I must made ``auth/page.tsx``.
  - I have now added a one page that has both login and sighn up.
  - I have now managed to created a user document anytime a new user user is created and they automatically get a copy of the checklist. And changed the route to make it more seemless. Added comments for more clearity.

- **Tuesday 17th Feb:**
  - Modified the chapters page for the section to respond based on the order field added.
  - Started the tracking page. It was more of the same. import the data from the dtabase and display it. It shows up nicely. The basic functions are working, 
  - evetually I will adda carousel to show the week in a more presentable way.
  - Attempting to add a carousel using bootsrap, not sure if it is the right one to use.

- **Thursday 19th Feb:**
  - In order for the carousel to working using bootstrap, I need to ``install react-boostrap``. However, I'm not using bootstrap. I'm using Tailwind, and since what want more control when it comes customisation, It seems like react-flowbite is more suitable for that.
  - I installed flowbite, using this command ``npm install flowbite-react`` in the terminal. I throgh an report that dependencies has some vulnerbilities. I fixed that using ``npm audit fix --force`` in order to address all issues.
  - I used useEffect to fecth the  data, mapped firestore doc to create an array of objects and I also sorted based on the week field fo it to be in order.
  - I mapped the sorted to create each slide inside a carousel. Now, it displays the track detail mentioned.
  - However I'm having issues making it look like a carousel.
  - I have added buttons and used useRef to get a reference to the carousel but still have problems. I'll leave this for now and move to next part which if faqs.
  - I made a faq page, it was relativlythe same, import the the collection, documents, and the detail and display them on screen. That went well with no issue. I make sure it works before I start with making it look good.
  - I have now moved the resource page and have completed it. Almost the same with faq - display, import the database, fecth the collection and docs, get the fields. An addition was that rescource had a url. I imported Link for that and added the url into the href, and inorder of the url to redirect to another tap, I used ``target="_blank"``. That way nstead for the link to replace the tab that currently in, it just opens a new tab.
  - Starting with the notes page, it will be similar to the checklists.

- **Friday 20th Feb:**
  - I have added a navbar to make the navigation better, this one of the funtions mentioned and it is vital for user-reading experience.
  - Contiunated having issues with flowbite when it comes to the carousel in the ``tracking/page.tsx``. THe problem is that all the slides werer displaying at once. And the buttons prev/next method were not working.
  - The reason why it wasn't working at all is that I'm using Tailwind version 4. Flowbite-React depends on tailwind v3 and its plugin. I had no tailwind.config.ts, but I only have postcss.config.js. The carousel required a plugin-geneated classes like abosulte wherern't genrated in Tailwind v4. I later realised that I didn't call it as a function, instead I did this: ``onClick={() => carouselRef.current?.next}`` I forgot the the soft brackets. I should look like this: ``onClick={() => carouselRef.current?.next()}``.
  - Flowbite Carousel is not compatibale with tailwind 4v, that was confirmed in the postcss.config.js - it was the using the plugin.
  - I now have two choices: Downgrade to Tailwind v3 or stay Tailwind v4 and swtch to mordern carousel. I choose option two - I will be using Embla Carousel instead of Flowbite Carousel. It is fully compatible with with Tailwind v4, lightweight with smooth aniamtions, no issues with plugins.
  - I have installed embla using this command in the terminal: npm install embla-carousel-react.
  - I attempted to call a method called ``goToNext()``, but it seems it doesn't have that. Instead it uses ``scrollNext()``. The runtime error has disapeared, carousel works correctly and so does the navigation function.
  
- **Saturday 21st Feb:**
  - Started the ``notes/page.tsx``. At, I wanted to be a component like check-form, but decided against it, there was need for that since it is not a template.
  - I went make a full crud functionality on it. That way, the user can create, read, update and delete their notes. And also added an orderBy to sort it by the newest based on createdAt field.
  - I have now implemented the all the crud functions, I'm now trying to display it on screen.
  - I had to update firestore rules to make sure that the users can only create notes if there logged in. Users can only see, edit and delete their own notes. I used ``request.resource``, whichrepesents incoming data and it exists for creating and updating while ``resource`` means the document that is currently stored in Firestore, used for read, update and delete.
  - I have completed the crud for the note. 
  - I fixed the buttons to act based on the ``onClick:{}``.
  - Made upades on my Firestore that restrict user from spefic things. For example: collections faqs, resources, reviews and tracks are for read only. While: collections notes, bookmarks, checklists user specific, user can read, write and delete.
  - I having issues with the sign up, I have updated the rules in firestore to allow certain things to only users but I keep getting persmission errors. Hopefully, I will figure it out.

- **Sunday 22nd Feb:**
  - I fixed a errors, I'm using the console to see where things are happening, for some reason I have to click twice to sign successfully. It seems like it take a while for firestore add the new user.
  - Finally fixed the issue. I kept having error like "Missing or insufficient permissions" when creating a user. The first ttempt usually gave me ``"auth/invalid-credential"`` before on the secound attempt it works. The rules were tight, but I lossened it but still, the errors continued.
  - I added ``pendingSignup`` which is used to track newly created users before Firestore writes. It ensures that Firrestore writes after auth state is confirmed.
  - I also used ``onAuthStateChanged``, it the write after Firebase Auth confirms that the user is logged in.
  - Had to add getIdToken to force a token refresh, without it Firestore will see the user a first as unauthorized.
  - How I improved this, is by error handling. It needs to check ``"auth/user-not-found"`` or ``"auth/invalid-credential"``. This was what prevent first-login errors from blocking Firestore writes and gave a clear separation between login and signup error in the alters.
  - Now, signing in work fine, the users both get their own personal checklist and a note template.

### WEEK 3
- **Monday 23rd Feb:**
  - I have added a bookmark button compoment, it is in the form of a boolean. I added svgs icon for fill and outline based on if it is on or off.
  - I made a handler that does something based on the the click of the bookmark icon. It will look for a userid and if the user exists it will creat a bookmark doc them with at the necessary information. That is in the ``chapters/id/page.tsx``. It's bookmarked by sections. I will move the the ``bookmarks.page.tsx`` in order to display any sections that has been bookmarked.
  - I have now implemnted the the ``bookmarks/page.tsx``. Everythign seems to be working well, I have granted access in the firestore rules in order to show true result. I also changed a few navigations. 
  - There's a few issues that can be tackled later.

- **Tuesday 24th Feb:**
  - Now, I was able toggle each section, before if I click on the bookmark icon all of them reacted, however in the firestore, what was clicked was what was stored. So, it is working in the backend of things.
  - So, I tracked it based on section id instead of a boolean. Made a query that checks if the bookmarked exits or not, if it does - remove it, if it doesn't - add it. An it updates accordingly, this prevents any dupliactes.
  - In the bookmark button component, instead of a general boolean, it is a boolean based on the section id, uses it as a key.
  - I was also using the wrong syntax, so that led to error as well.
  - The summary of is, the problem is that, it was a shared state (click on the bookmark of a section - all it filled instead of remain unfilled). Solved by stracking the section id instead.
  - I implemented that a user can see all their bookmarks, when they click on a bookmark it takes them to the chapter. However, I want to make it more specific, I want it to scroll to actual the section in the chapter.
  - I searched to find something but as it turns out, there's no exact definate way of doing it. Next.js App doesn't have something like that directly. However there was a commonality, and there was hash (#) symbol, it seems like it used to scoll to a specific id. For example if you have `<div id="section">`, the href it will be ``<Link /somthing/somewhere#${section}>`` and in the url it be ``/somthing/somewhere#section``. In other words, it finds the element with this id and scroll to it. 
  - The scroll wasn't working properly as first. The url was showing the right thing but no movement. As it turns out, in the ``useEffect``, I was aiting for chapterId toad instead for ``chapterData``. I made sure the hash in the URL and an if statement to get the element with that match id. I scroll smoothly behavoiur for to look seemless. Which leads toa better user experience.
  - Now, clicking on a bookmark takes you to the chapter, and it scrolls to the section now. 

- **Wednesday 25th Feb:** 
  - I have now implemented the ``Review collection``. It was similar to the ``FAQ``,it was a copy and paste, and changing the words. Updated the navbar component.

- **Thursday 26th Feb:**
  - I'm now moving to attempt a progress bar. However with the layout of the chapter, it wouldn't necessary. The chapters individually are not that long. For it to work, I need to change the layout to also increase better user experience. So, I have decided for the chapters to a carousel in ``chapters/id`/page.tsx``. So, when a user clicks on the chapter, not only can they read the chapter choosen, they can also have the option to move to the chapter with leaving. To will smoothen the navigation system.
  - So, started by fecthing all the chapters and stroing them into ``chapterIds`` as an array, it was privously ``chapterData`` but it is now simplified. Because ``chapterData`` was for the current chapter but inorder for it to be a carousel, I need an array of chpapter ids - that was stored in ``chapterIds``. Along th way, I kept mixing those two and it led to confusions. That is now resloved.
  - The next problem I encountered is that the bookmarks were not syncing correctly, it could no longer locatd the section. I decided to instead pass the full chapter object instead of just the section, and from there, it can find the what section tht being bookmarked.
  - Another issue that came was that scoll was working anymore as well when I do a refresh it, the bookmark is goes unfilled when it was filled previously.
  - The problem was that ``auth.currentUser`` is null in the first render because the firebase aauth is not done. The first the ``useEffect`` does nothing because no user (null). And after that, even if the user is looged in, it doesnt re-run because the chapterId hasn't to lonly runs if a change has occured, otherwise do nothing. So, how to solve that is to wait for the user to ba available by using onAuthChanged inside a new ``useEffect``. It insures that the bookmarks are load once firebase knows the user.
  - Now, for the scoll, the carousel is confused, it already scrolling horizontally and now inside it, something scrolls vertically. So, we have to delay the scroll untill the ``chapterIds``(an array of chapter ids) is loaded. Embla has to initialised before ``scrollToView`` begins.
  - Another thing I came across is, the bookmark but undos itself when you refresh. As it turns out, it also looks at ``auth.currentUser`` which is null. I make sure to use onAuthChange to track the userId. It didn't wor as first and that's because it doesn't know it no longer null, so I had to say that the userId is a string du to the fact I previously said that userId is null or string.
  - I have now changed the chapters into a carousel. Hopefully, it will make the progress possible.
  - I'll start by making a component called ``progress-bar``.
  - I have started implementing. I found a few different ways of progress bar, but decided on keeping it simple, in order to not make it too confusing for me. Since I'm using embla carousel, it has its own way of doing this. A chapter is a slide, I calucalted based on that each silde is an index, inorder to get a number, it is index+1 out of the total chapter * 100 so I can get a percentage. I ran through a few issues, I was using the wrong embla type. But still nothing hppened, as it turns, I forgot to call the ``setProgress`` in the compoment.
  - Everything is working smoothly, I'll make amendments when it comes to making more easy on the eye. The foundation of the progress bar is complete.
  - I updated the bookmark, and ``chapter/id``. I wan the user yo be able go back to the chapter they were reading before the clicked on view all boookmarks. So, I just used the last bookmarked chapter they clicked, it not perfect but it can be managed.
  - I got an error that said ``"can't access property "indexOf""``, userId was intailsed as null even after stating it was a string. So, mention to check before fetching. only query Firestore if userId exists. And it worked, this ensures bookmarks loads only for a logged-in user.

- **Friday 27th Feb:**
  - I'm changing the layout of the notes page for better UX.The form doesn't have a cancel button when you click on edit or when click on edit you can't go back to an empty form to create a new note.  At first, I wanted to make a viw page, but decided against it. So, I tackled the issue by creating a new function that resets the form to empty strings.
  - I'm changing the auth page to make more functional. I want username to be required only when creating a new account, not when logging in. That is working now. I removed a few bits that are not mandetory for example the excess error handling from before.
  - I have added a logout as well, to in sure better UX.
  - I will be added the auth page and home page together. I believe there is no need to make it seperate, espaecially for what I'll be doing. I have transfered everthing from the ``HomePage()`` to the ``AuthPage()``. For now, I'll not delete in the ``HomePage()`` yet. I want to make sure everything works before doing so permanently.
  - I'm working on the visual aspect of things, I want it to look and feel like a book. I have centered the content. Added drop shadows to make it pop.
  - I have fixed the majority of the login page. I have implemented a background on all the screens.
  
- **Saturday 28th Feb:**
  - Added a few visual aspects. Margin, svg, etc.

### WEEK 4
- **Monday 2nd Mar:**
  - I'm modifying the checklists/page.tsx. I want the user to be able to also edit and delete an item, currently that are only able to add an item. So, a full CRUD functionality. All changes should update immediatly
  - I used deleteDoc which led to the deletetion of a checklist document. The solution is to use upadteDoc becuase I'm updating the doc when an item is deleted, so it would make modifcation on the item array instead.
  - I also used the wrong state when it comes to editing. Initially, it wasn't tracking the checklist item that was being edited. So I added new states for editing an item using ``editingChecklistId``, ``editingIndex``, ``editingValue``.
  - I added a fallback using ``(checklist.items?? []) ``in case some may not have an items array.
  - Created models called Checklist and ChecklistItem, simliar in notes.page.tsx and previous others. This mad thigns easier and I could remove all `any` types to eniusre type safety.
  - For some reason `...doc.data()` was deemed unsafe, so I had to plainly map the Firestore docmuent data instead of using the the spread operator.
  - Now, there is a CRUD operation system for checklist.
  - Making visual changes on the layouts

- **Tuesday 3rd Mar:**
  - I'll be attempting a profile section, It is important for the user to have the option to be able to change their username, email and even password. They can also write a small description about themselves, and if they want to delete their account all together, they should have that option. Their privacy is their right.
  - I noticed something strange with my login/sign up page. When a user forgets a their email, it ends up creatig a new account for them instead. I think it make sense to create two handelers; one for login and one for sign in. Had to separate the logic.
  - Back to profile, I want the user to manage the profile, and for it to update in firestore. I had collection instead of doc for a single document. The snapshot data structure was incorrect. The User type didn't realy make sense. 
  - I had fix that as well as added error handling using ``try/catch``, especially for email, password and deleting account, those information are sensitive and ahould be handled with care.
  - Now, username and description updates properly
  - I tried updating the email, however, I get the error ``auth/operation-not-allowed``. That is because Firebase doesn't allow this to happen for the current user. I even added more error handling in attempt to cover as much base as possible, but that still didn't fix. The email/password had already been enabled. And I checked the password and it updated well, only the email is failing so far.

- **Wednesday 4th Mar:** 
  - I figured out issue now related to email update. Firebase requred that user to first verify the new email before they can update it. This is all about security reasons. Firebase expects me to send a verfication email to the new email to relpace the old one.
  -So, I created another handler to handle email verifications, it was alomst the same to the update email handler, the biggest difference is that first sends a verfication email and wait for the user to verfiy before any changes can be made.
  -I made a new email to test, I send a verification email to update to that new email, but didn't get anything in the inbox. As it turns out, ``sendEmailVerification()``, send the verfication email to he old instad of the new email. What should have been used is ``verifyBeforeUpdateEmail()``. Because of this, there's no need to have to buttons, and therefore two handlers. handleUpdateEmail takes care of everthing now.
  - When, i tried again, nothing in the inbox of the new email address, so I checked the domain in firebase, made sure the email template in firebase is enabled, and looked through the spam. But nothing there. As it turns out the use must first verify in their current email address before allowing updates. So, first verify for the current email, not the new yet. Once the current is verfied then, it sends a  email to the new email address. Only then will firebase allow an update.
  -I added a password, prompt to ensure that this is the user this is to verify the user, once done, a verification email is sent to the new email address and when the user pressed a the link, they will be notified in the old email that is had been updated to the new email. Once the user logs back in with the new email, it will be updated in the databse.
  I have tried that out, it was works, there may be a few adjustments but the core issue is resolved.

- **Friday 6th Mar:**
  - I'm now moving to deleting an account, I keep getting error. At first it said ``auth/requires-recent-login`` when consoled logged, as it turned out the session has timer. The user has to log out and go back in inorder and then delete their account for it to work. So, I added another error handling to catch that. 
  - However, another error happened again, I console logged that, and this error popped up: ``FirebaseError: Missing or insufficient permissions``. It seems like this related to the rules in firebase that needs to be modified for firebase to allow this action. In forebase rule, add this: ``allow delete: if request.auth != null && request.auth.uid == userId;`` in the users document, specifically the userId as well as any subcollections related to the user.
  - When I attempted to delete account, it didn't work. Despite the rule changes, as it turns out the order in which this are being deleted was incorrect, I was deleteUser() before the deleteDoc() associated with the user. So, ends up happing is that if the user gets deleted, the docs cannot due to the fact that the user is no longer there, so when deletedoc() comes in, it is denied. Delete the doc *first* before the user.
  - I created a user account and have successfully deleted it. However, when looking closely the subcollections in the database are still there.  It seems like it olny deleted the *fields* of the user not the subcollections. So, it has to delete the subcollection first, then the fields of the user, and lastly the actual user. The order in which things are being deleted is important.
  - I have now succesfully deleted anything related to the user's id.
  - Focusing now on the layout and style of the web app.

- **Saturday 7th Mar:**
  - I updated the app/layout.tsx, now the web app is installable using pwa. It works for Google Chrome, Microsoft Edge, iPhone(Safari) & Android. However, with Firefox it is limited. Currently, it only work when sharing the same Wi-Fi network.
  - For it to be used outside the local and same wi-fi network, it needs to deployed. Vercel works perfectly with Next since creators of Next made it. I have succesfully deployed my software project to Vercel with GitHub.

### WEEK 5
- **Monday 9th Mar:**
  - An issue occured with the notes/page.tsx. When I Attempt to write a note, it doesn't appear or get stored in the database.
  - As it turns out the submission logic was in correct, I had not mentioned that the form was a submit. I had to the functions in onSumit in the form. I have updated the button compoment to take ``type`` since in the form it only take ``<button type="button">`` of `<button type="submit">`. I made the component to also accept them. Now, it work, it apears in the database as well. The note Crud is functional.
  - Focusing on the layout of the web app. Fixed major issues with the navbar, added a hamburger menu.
  - Trying to implement automated testing, I'm using jest - a mature, large ecosystem and snapshot/mocking support. It works with TypeScript and React. Handles functions, utilities, and components. I installed it using `npm install --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom identity-obj-proxy` into the terminal. Added a test folder to try things. I'm setting the up the environment for automated testing.
  - Fixed the layout of the tracking/page.tsx.
  - Add more details in the layout of checklists/page.tsx.
  - Moving to reviews/page.tsx.
  
- **Tuesday 10th Mar:**
  - Stopped with the reviews for now.
  - Modifying the faqs section, added a dropdown for the answers for each question.

- **Wednesday 11th Mar:**
  - Finished most of the resources area.
  - Going back to the reviews section layout. Added a new called `rating.tsx` its role it to convert the a number into into an icon specifically a star. Created an array for with the length of the ``maxStars`` being the max. In this case it is number 5, and in index position it 4. ``{i < rating ? "text-yellow-400" : "text-gray-300"}`` this says, if ``i`` is less than ``rating``, fill the stars and leave the rest on filled. ``i`` tracks the index position and ``rating`` is the number. I was able to convert number into star icons.

- **Thursday 12th Mar:**
  - When it comes to the layout of profile section I decided to separate the logic. One to display and another to edit. Created another route `/profile/page.tsx/security/page.tsx` this where all the edit and as well as the deleting the user account. This is to enhance user experience. I'm thinking of adding a upload image for the profile of a user.

- **Friday 13th Mar:**
  - I'm trying to implement a searchbar to search and filter the chapters. The chapters has already been fecthed from the database.
  - I made a new component called `SearchChapter`, it needed to be a client based component since `ChapterPage` is a server component and it passing down info.
  - I made a filterchapter as an object, at a first it wasn't triggering rendering. I was later solved by  `useState`. I added a `return` with `||` so that it can accept different fields. 
  - When I added `chapter.overview` as optional TypeScript gave out and I had to use `&&` to make sure it takes both string and undifined.
  - I also added the format of the chapters in the `SearchChapter` instead of `ChapterPage` since I'm using `.map()` in there, there is not need to repeat it.
  - I decided to make a new file for the `Chapter` type as it is needed it two other files. Instead of duplicating, I can just import it those files instead.
  - I'll make new searchbar for faq.
  - It has been made, it is always inportant to make sure that first one works correctly before trying the next. One step at a time.
  - Attempting image uploader in profile section.
  - I fot the refrecne to Firestorage, created a ref(path) for that slected user's image, uplaoed it to that the path, got back the public url to then save that url to firestore and update the doc. Ialso stlyed it to make look my presenatable. I added a cursor pointer style to make it obvious that the prfile circle is clickable. The image file picker is working.
  - When I click on an image, it doesn't display that image on the browser or in the Firebase storage. As it turns out, oit behind a paywall. So had a few options, upgrade the payment plan or use a free alternative. Cloudinary was an option I chose.
  - Created a Cloudinary account, obtained the  cloud and preset name. Set the upload prset to "unsigned" to allow frontend uploads.
  - I replaced the Firbase Storage import with a ``fetch`` call to Cloudinary's API. I used `FormData` to package both the file and uplaod preset before sending to Cloudinary. Retrived `data.secure_url` from the Cloudinary response as the image URL. I then saved in the Firestore and updated it.
  - Cloudinary was free and support unsigned uploads which means thatre's no need for a secret key, anyone can upload. The upside is that user can upload an image straight from the browser. The downside is that because anyone can uplaod, they can also find my cloud name and upload inappropriate content to my Cloudinary account. The best thing to hinder that is to do unsigned which is the server side of things. For my project it is completlety fine to leave it unsigned.
  - More styling in checklists section and navbar.

- **Saturday 14th Mar:**
  - I want to be able to toggle between light and dark modde across all pages as well as changing background and images. I had installed ``next-theme`` using this command `npm install next-themes` on the terminal. It suitable because it is reactive. The component re-render once the theme changa and acts accordingly.
  - I also made a toggle button component called `BulbButton` that way the user has control on when they can have it dark or light. I put in the ``NavBar`` component.
  - I later realised that ``useTheme`` is only for client components. So, in order for it accept both server and client to change theme, I had to `import { ThemeProvider } from "next-themes"` and then add `suppressHydrationWarning` in the `html` tag in the `layout.tsx` and wrap `{children}` with `<ThemeProvider attribute="class" defaultTheme="system">` tag. I also made sure that the `BulbButton` was client so that it could actually run.
  - Icam accros issues with rendering. The server rendered one image but the client side wanted another. The it was solved was through ``mounted`` using  `useEffect` to delay render until the client is ready.
  - The toggle is working but it not updating on the browser. I checked `global.css` and it was using `@media (prefers-color-scheme: dark)` which systems preference not the user when they toggle to light or dark. It had to be replaced it with `.dark`, it is knows that it is the class that it should look at.
  - I also made a `PaperBackground` component for the images, instead of repeating the same thing accros all pages, it makes sense to create component to lessen load of a single page and that it will react well for bot the client and server components with the backgorund image needing to be chaged when the `BulbButton` is triggered.
  - The dark mode works on the pages that has it implemented.
  - I have implemented the dark mode in the pages. I have properly styled `security/page.tsx`.
  - More style of the dark mode button.
  - I ended up using `HomePage`. Separating the ``AuthPage`` for login or sign from the ``HomePage``, is used for book cover.
  - More touches related to styling.
  - I separated the ``AuthPage`` into two: ``LoginPage``  and `RegisterPage`. It causes less confusion to the user.
  - The `AuthPage` is now used to redirect to ``LoginPage``.

### WEEK 6
- **Monday 16th Mar:**
  - I'm begining the automatued testing. I had to change fre thing in my setup. I'm using TypeScript(TS) and Jest doesn't understand it on it's own. It needs to be transformed ``.ts`` files into JS before running. I have already instaled ``ts-jest`` to tackled that. I had to add few more thing in ``jest.config.ts``. Those are: `preset: 'ts-jest'`, to handle TS; ``testEnvironment: 'jest-environment-jsdom'``, for React/Next; `setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],`, it points to `jest.setup.ts`.
  - Jest can't read TS, I needed top install ``ts-node``.
  - I replaced `require()` in ``sum.ts`` to `import {sum} from "./sum";`. I soon fine out that.
  - Now it runs perfectly when I tested a function by using `npm test`