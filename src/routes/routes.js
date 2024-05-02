import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import NotFoundPage from '../pages//NotFoundPage';
import { Login, SignUp, Tasks } from '../pages';
// Dynamically import pages
const Todo = React.lazy(() => import('../pages/Todo'));
const Profile = React.lazy(() => import('../pages/Profile'));
// const Login = React.lazy(() => import('../pages/Login'));
// const SignUp = React.lazy(() => import('../pages/SignUp'));
// const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));


const routes = createBrowserRouter([
	{
		path: '/',
		element: React.createElement(AuthWrapper),
		errorElement: React.createElement(NotFoundPage),
		children: [
			{
				path: '/',
				element: React.createElement(Todo),
			},
			{
				path: '/profile',
				element: React.createElement(Profile),
			},
			{
				path: '/tasks',
				element: React.createElement(Tasks),
			},
		],
	},
	{
		path: '/login',
		element: React.createElement(Login),
		errorElement: React.createElement(NotFoundPage),
	},
	{
		path: '/sign-up',
		element: React.createElement(SignUp),
		errorElement: React.createElement(NotFoundPage),
	},
]);

export default routes;
