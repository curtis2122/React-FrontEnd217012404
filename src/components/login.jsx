import React, { useState,useEffect, useContext } from 'react';
import { Link, Navigate, Routes, Route } from 'react-router-dom';
//import logoImg from "../img/logo.jpg";
//import { Card, Logo, Form, Input, Button } from '../components/AuthForms';

import { Card, Form, Input, Button } from 'antd';
import http from '../common/http-common';
import axios from 'axios';
//import { useAuth } from '../context/auth.jsx';
import { UserContext } from '../context/auth.jsx';

//function Login(props) {
function Login() {
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	//const { setAuthToken } = useAuth();
	const {setUserRole, isLoggedIn, setAuthTokens } = useContext(UserContext);
  //	const {setUsersTokens,isLoggedIn, setAuthTokens } = useContext(UserContext);

	function postLogin() {
		console.log(`logging in user: ${userName}`);
/*
    useEffect(()=>{
   fetch('https://COMBlog28032022.curtiswang1.repl.co/api/v1/users/login', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + btoa(userName + ':' + password)
			}
		})			
			.then(result => {
				if (result.status === 200) {
					alert('Login success!');
					setAuthTokens(result.data);
          console.log(result.data);
				} else {
					setIsError(true);
					alert('User login fail!');
				}
			})
			.catch(e => {
				setIsError(true);
			});
	
    },[])
  */
    fetch('https://COMBlog28032022.curtiswang1.repl.co/api/v1/users/login', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + btoa(userName + ':' + password)
			}
		})
			/*axios.post("https://COMBlog28032022.curtiswang1.repl.co/api/v1/users/login", {
      userName,
      password
    }) */
			.then(r => r.json())
			.then(result => {
				alert('Login success!');
				result.password = password;
        setAuthTokens(result || "");
        console.log(setAuthTokens);
        UserRole=result.role;
        setUserRole(UserRole);
        console.log("User role value",setUserRole);
       // 	setUsersTokens.setLocalStorage(userName)
					//setUsersTokens.login(userName);
			})
			.catch(e => {
				setIsError(true);
			});
	}

	if (isLoggedIn) {
		// return <Redirect to="/" />;
		// return <Navigate to="/dogs" />;
		return (
		
      <Navigate to="/" />
			//<Route path="/user" element={<User />} />
			//<Route path="/"  element={<Navigate replace to="/login" />} />  // OR path='/login'
			//<Route path='/login' element={<Login/>}
			//  		<Route path="/" element={<Navigate replace to="/dog" />} />
			//				<Route path="/dogs" element={<Dog />} />
      /*	<Routes>
				<Route path="/user" element={<Navigate to="/user" replace />} />
			</Routes>*/
		);
	}

	return (
		<Card>
			<Form>
				<Form.Item
					name="username"
					label="Username"
					value={userName}
					onChange={e => {
						setUserName(e.target.value);
					}}
					placeholder="email"
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					value={password}
					onChange={e => {
						setPassword(e.target.value);
					}}
					placeholder="password"
				>
					<Input.Password />
				</Form.Item>

				<Button onClick={postLogin}>Sign In</Button>
			</Form>

			{isError && (
				<p>The username or password provided were incorrect!</p>
			)}
		</Card>
	);
}

export default Login;

//	<Link to="/signup">Don't have an account?</Link>
/*
				<Input
					type="username"
					value={userName}
					onChange={e => {
						setUserName(e.target.value);
					}}
					placeholder="email"
				/>

				<Input
					type="password"
					value={password}
					onChange={e => {
						setPassword(e.target.value);
					}}
					placeholder="password"
				/>
            */
