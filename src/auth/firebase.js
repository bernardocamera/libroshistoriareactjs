import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// 🔧 Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABpoU8ZToyMSTtrRtRRsPzkF63flvK12w",
  authDomain: "prueba-auth-af9c1.firebaseapp.com",
  projectId: "prueba-auth-af9c1",
  storageBucket: "prueba-auth-af9c1.firebasestorage.app",
  messagingSenderId: "667189944135",
  appId: "1:667189944135:web:2c9cf0f8328767ab497662"
};

const app = initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////////////////
///////////////// AUTENTICACIÓN DE USUARIOS FIREBASE//////////////////////////
//////////////////////////////////////////////////////////////////////

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password){
    return(
        new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
                // ..
            });
        })
    )
}

auth.useDeviceLanguage()
export function logearG(){
    return(
        new Promise((res, rej) => {
            signInWithPopup(auth, provider)
            .then((result) => {
                console.log("test", result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log("credenciales G", credential)
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User", user)
                res(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                console.log("test error", error )
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                rej()
                // ...
            });   
        })
    )

}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}
/////////////////////////////////////////////////////////////////
///////////////////// BASE DE DATOS FIRESTORE  //////// ////////
////////////////////////////////////////////////////////////////

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export { db };

export function crearProducto(producto) {
    return new Promise(async (res, rej) => {
        try {
        const docRef = await addDoc(collection(db, "productos"), {
            name: producto.name,
            imagen: producto.imagen,
            price: producto.price,
            description: producto.description
        });

        console.log("Document written with ID: ", docRef.id);
        res(docRef)

        } catch (e) {
        console.error("Error adding document: ", e);
        rej(e)
        }
    });
}

export function editarProductoFirebase(producto){
    return(
        new Promise(async (res, rej) => {
            try{
                await setDoc(doc(db, "productos", producto.id), {
                    name: producto.name,
                    imagen: producto.imagen,
                    price: producto.price,
                    description: producto.description
                })
                console.log("Document written ");
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }
        })
    )
}

export function eliminarProductoF(id){
    return(
        new Promise(async(res, rej) => {
            try{
                await deleteDoc(doc(db, "productos", id))
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }

        })
    )
}

export function obtenerProductosF() {
    return(
        new Promise(async (res, rej) => {
                try {
                    const querySnapshot = await getDocs(collection(db, "productos"));
                    console.log(querySnapshot, "respuesta al getDocs")
                    
                    const resultados = querySnapshot.docs.map(doc => {
                        console.log(doc, "documento sin ejecutar metodo .data()")
                        const data = doc.data();
                        console.log(data, "doc con data extraida")
                        return {
                            id: doc.id,
                            name: data.name,
                            imagen: data.imagen,
                            price: data.price,
                            description: data.description
                        };
                    });

                    res (resultados);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

export function obtenerProductoEnFirebase(id) {
    return(
        new Promise(async (res, rej) => {
                try {
                    const docRef = doc(db, "productos", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        const data = docSnap.data();
                        const producto = {
                            id: docSnap.id,
                            name: data.name,
                            imagen: data.imagen,
                            price: data.price,
                            description: data.description
                        }
                        console.log(producto)
                        res(producto)
                    } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                        rej("No such document!")
                    }
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}