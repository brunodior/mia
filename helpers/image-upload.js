const multer = require("multer")
const path = require("path")

const { initializeApp } = require("firebase/app");
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage")

const firebaseConfig = {
  apiKey: "AIzaSyDTNricNj42dBao6HauhcY6XHn_KnE8Y7c",
  authDomain: "miau-b5b0a.firebaseapp.com",
  projectId: "miau-b5b0a",
  storageBucket: "miau-b5b0a.appspot.com",
  messagingSenderId: "1039299190210",
  appId: "1:1039299190210:web:3cfc347c66a99a1c5d0a5b",
  measurementId: "G-1T6FCEK920"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const storage = getStorage()



async function upload(req, file) {


        let storageRef = undefined
        if(req.baseUrl.includes("user")){
            storageRef = ref(storage, `users/${Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname)}`)

        }else if(req.baseUrl.includes("pets")){
             storageRef = ref(storage, `pets/${Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname)}`)
        }

        const metadata = {
            contentType: file.mimetype
        }

        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)

        const downloadURL = await getDownloadURL(snapshot.ref)

        return downloadURL
}


// Destination to store the images
const imageStorage = multer.diskStorage({
    
    destination: async function (req, file, cb){
        
        console.log(file)
    
        const storageRef = ref(storage, `files/${file.originalname + Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname)}`)

        const metadata = {
            contentType: file.mimetype
        }



        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)

        const downloadURL = await getDownloadURL(snapshot.ref)

        console.log('File successfully updoaded')
        
        // console.log(downloadURL)


        let folder = ""

        if(req.baseUrl.includes("users")){
            folder = "users"
        }else if(req.baseUrl.includes("pets")){
            folder = "pets"
        }

        cb(null, `public/images/${folder}`)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname))
    }
})


const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
   
})



module.exports = {imageUpload, upload}