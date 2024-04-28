import React from 'react';
import App from '../App';
import { Login, SignUp } from '../pages';
import AuthWrapper from '../AuthWrapper';

const routes = [
	{
		index: true,
		element: React.createElement(AuthWrapper),
	},
	{
		path: '/login',
		element: React.createElement(Login),
	},
	{
		path: '/sign-up',
		element: React.createElement(SignUp),
	},
];

export default routes;
