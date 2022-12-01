import React, { useState } from 'react'
import "./Estilos/Login_Register/css/styleLoginRegister.css";
import imagefront_Login_register from "./Estilos/Login_Register/images/frontImg1.jpeg";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import CryptoJS from 'crypto-js';


const Register = () => {
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	const handleSubmitRegister = async (e) =>{
		e.preventDefault();
		const displayName = e.target[1].value;
		const UserName = e.target[0].value;
		const email = e.target[2].value;
		const file = e.target[3].files[0];
		const password = e.target[4].value;

		console.log(e.target[0].value);
		console.log(e.target[1].value);
		console.log(e.target[2].value);
		console.log(e.target[3].value);
		console.log(e.target[4].value);

		/*console.log(displayName);
		console.log(UserName);
		console.log(email);
		console.log(password);*/
		
		
		try{
			debugger
			const res = await createUserWithEmailAndPassword(auth, email, password);
			
			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
			(error) => {
				setErr(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
					await updateProfile(res.user,{
						displayName,
						photoURL:downloadURL, 
					});
			await setDoc(doc(db, "users", res.user.uid),{
				uid: res.user.uid,
				displayName,
				UserName,
				email,
				photoURL:downloadURL,

				});

				await setDoc(doc(db, "userChats", res.user.uid),{})
					navigate("/");
				});
			}
			);
					}
					catch(err){
						setErr(true);
						console.dir(err);
					}	

	};

	
	const handleSubmitLogin = async (e) =>{
		e.preventDefault();
		debugger
		const email = e.target[0].value;
		const password = e.target[1].value;

		/*email = cifrar(email);
		password = cifrar(password);*/

		try{
			await signInWithEmailAndPassword(auth, email, password);
				navigate("/");
				}
				catch(err){
					setErr(true);
					alert(err);
				}	

	};

	return(
    <div class="container">
    <input type="checkbox" id="flip"/>
    <div class="cover">
      <div class="front">
        <img src={imagefront_Login_register} alt=""/>
      </div>
      <div class="back">
        <img class="backImg" src={imagefront_Login_register} alt=""/>
      </div>
    </div>
    <div class="forms">
        <div class="form-content">
          <div class="login-form">
            <div class="title">Inicio de Sesión</div>
          	<form onSubmit={handleSubmitLogin}>
            	<div class="input-boxes">
            	  <div class="input-box">
            	    <i class="fas fa-user"></i>
            	    <input type="text" placeholder="Correo" required/>
            	  </div>
            	  <div class="input-box">
            	    <i class="fas fa-lock"></i>
            	    <input type="password" placeholder="Contraseña" required/>
            	  </div>
            	  <div class="button input-box">
            	    <input type="submit" value="Iniciar Sesión"/>
					{err && <span>Algo Salio Mal...</span>}
            	  </div>
            	  <div class="text sign-up-text">No tienes una cuenta? <label for="flip">Registrate ahora!</label></div>
            	</div>
        	</form>
      	  </div>
          <div class="signup-form">
            <div class="title">Registro</div>
          	<form onSubmit={handleSubmitRegister}>
          	    <div class="input-boxes">
          	      <div class="input-box">
                  	<i class="fas fa-user"></i>
          	        <input type="text" placeholder="Nombre Completo" required/>
          	      </div>
                  <div class="input-box">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Usuario" required/>
                  </div>
                	<div class="input-box">
          	        <i class="fas fa-envelope"></i>
          	        <input type="email" placeholder="Correo electónico" required/>
          	      </div>
                  </div>
                    <div class="input-box">
                    <i class="fas fa-image"></i>
                    <input type="file" placeholder="Foto" accept="image/*" required/>
                  </div>
                	<div class="input-box">
          	        <i class="fas fa-lock"></i>
                  	<input type="password" placeholder="Contraseña" required=""/>
          	      </div>    
          	      <div class="button input-box">
          	        <input type="submit" value="Registrar"/>
					{err && <span>Algo Salio Mal...</span>}
       	   	      </div>
          	      <div class="text sign-up-text">Ya tienes una cuenta? <label for="flip">Inicia sesión ahora</label></div>
                  </form>
          	    </div>
    	  </div>
    	</div>
    </div>
	);
}; 

export default Register