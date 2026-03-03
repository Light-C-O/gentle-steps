    'use client';
    import { db, auth} from "@/data/firebase";

    import {doc, updateDoc, onSnapshot, deleteDoc} from "firebase/firestore";
    import {onAuthStateChanged, updateEmail, updatePassword, deleteUser} from "firebase/auth";

    import {useEffect, useState} from "react";

    import { useRouter } from "next/navigation";

    import NavBar from "@/components/navbar";
    import Button from "@/components/button";

    type User = {
        id:string;
        username: string;
        email: string;
        description: string;
        createdAt: any;
    }

    export default function ProfilePage(){
        const router = useRouter();
        //stores the loggied user, it can be a string or null
        const [userId, setUserId] = useState<string | null>(null);
        const [userInfo, setUserInfo] = useState<User|null>(null);


        //by default empty string
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [description, setDescription] = useState("");

        //for authentication
        useEffect (()=>{
            const unsubscribe = onAuthStateChanged (auth, (user)=>{
                //checks the user
                if(user) {
                    setUserId(user.uid);//if logged in save the user id
                } else{
                    setUserId(null);//otherwise, clear it
                }
            });
            return ()=> unsubscribe();
        },[])

        useEffect(()=>{
            if(!userId) return;

            const userRef = doc(db, "users", userId);

            const unsubscribe = onSnapshot(userRef, (snapshot)=>{
                if(!snapshot.exists()) return;

                const data = snapshot.data();
                
                const UserData: User = {
                    id: snapshot.id,
                    username: data.username,
                    email: data.email,
                    description: data.description,
                    createdAt: data.createdAt
                };
                setUserInfo(UserData);
                setUsername(data.username);
                setEmail(data.email);
                setDescription(data.description);
            });
            return()=> unsubscribe();
        }, [userId]);

        const handleUpdateProfile = async ()=>{
            if (!userId) return;

            await updateDoc (doc(db, "users", userId),{username: username || "",description: description || ""});
            alert("Username or Description updated!");
        };

        const handleUpdateEmail = async ()=>{
            if (!auth.currentUser || !userId) return;

            try{
                await updateEmail(auth.currentUser, email);
                await updateDoc (doc(db, "users", userId),{email});
                alert("Email updated!");
            }catch(error:any){
                if(error.code === "auth/requires-recent-login"){
                    alert("Please log out and log back in before changing email your email");
                } else if(error.code === "auth/invalid-email"){
                    alert("The email entered is invalid")
                } else if(error.code === "auth/email-already-in-use"){
                    alert("The email is already in use")
                } else{
                    console.error(error)
                alert("Something went wrong")
                }
            }
        };

        const handleUpdatePassword = async ()=>{
            if (!auth.currentUser) return;

            try{
                await updatePassword(auth.currentUser, password);
                alert("Password updated!");
            }catch(error:any){
                if(error.code === "auth/requires-recent-login"){
                    alert("Please log out and log back in before changing sensitive info");
                } else{
                    alert("Something went wrong")
                }

            }

        };

        //to delete the user account
        const handleDeleteAccount = async () => {
            if (!auth.currentUser || !userId) return;

            const confirmDelete = confirm("Are you sure you want this account deleted?")
            if(!confirmDelete) return;

            try {
                await deleteUser(auth.currentUser);

                //delete the doc
                await deleteDoc(doc(db, "users", userId));

                router.push("/");
                alert("Account deleted!");
            }catch(error:any){
                if(error.code === "auth/requires-recent-login"){
                    alert("Please log out and log back in before deleting the account");
                } else{
                    alert("Something went wrong")
                }
            }
        };



        return(
            <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
                <div className="relative w-[90vw] max-w-3xl">
                    <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="relative z-10 items-center justify-center h-full px-[8%]">
                        <div><NavBar/></div>
                        <h1 className="text-3xl font-bold mb-6">My Info</h1>

                        {userInfo && (
                            <div className="space-y-4">
                                {/* Username */}
                                <div>
                                    <label>Username</label>
                                    <input 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border p-2 w-full"/>
                                </div>

                                {/* Description */}
                                <div>
                                    <label>About You</label>
                                    <textarea 
                                    placeholder="Tell something about yourself..." 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 overflow-auto" 
                                    cols={20}
                                    rows={20}
                                    ></textarea>
                                </div>

                                <Button onClick={handleUpdateProfile}>Save Changes</Button>

                                {/* Email */}
                                <div>
                                    <label>Email</label>
                                    <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border p-2 w-full"/>
                                </div>
                                <Button onClick={handleUpdateEmail}>Update Email</Button>

                                {/* Password */}
                                <div>
                                    <label>Password</label>
                                    <input
                                    placeholder="Minimum 6 characters"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border p-2 w-full"/>
                                </div>
                                <Button onClick={handleUpdatePassword}>Update Password</Button>

                                <div>
                                    <Button onClick={handleDeleteAccount}>Delete Account</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        )
    }