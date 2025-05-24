import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    return (
        <h1>TODO</h1>
    )
}

