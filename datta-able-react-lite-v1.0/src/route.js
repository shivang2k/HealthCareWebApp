import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const SigninP = React.lazy(() => import('./Demo/Authentication/SignIn/SignInP'));
const Start = React.lazy(() => import('./Demo/Authentication/start.js'));

const route = [
    { path: '/signup', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/signin', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/signinp', exact: true, name: 'Signin Patient', component: SigninP },
    { path: '/start', exact: true, name: 'Start', component: Start }
];

export default route;