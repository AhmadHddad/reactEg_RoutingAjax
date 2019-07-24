import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'


axios.interceptors.request
	.use(request => {
			console.log('this is interceptors request ', request);
			return request
		},
		error => {
			return Promise.reject(error)		});
axios.interceptors.response.use(response => {
		console.log('this is from interceptors response', response);
		return response
	}
	, error => {
		return Promise.reject(error);
	});

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';



ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
