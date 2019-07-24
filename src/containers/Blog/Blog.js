import React, {Component, lazy, Suspense} from 'react';
import './Blog.css';
import Posts from "./Posts/Posts";
import {NavLink, Redirect, Route, Switch} from 'react-router-dom'
// import NewPost from "./NewPost/NewPost";
const NewPost = lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {

	render() {

		return (
			<div className=' Blog'>
				<header>
					<nav>
						<ul>
							<li><NavLink to='/posts' exact>Home</NavLink></li>
							<li><NavLink to={{
								pathname: "/NewPost",
								// hash is to jump in a specific location on component
								hash: '#submit'
							}} activeClassName={'active'}>New Post</NavLink></li>
						</ul>
					</nav>
				</header>


				<Switch>
					<Route path='/posts' component={Posts}/>
					<Suspense fallback={<div style={{textAlign: 'center'}}>Loading... </div>}>
						<Route path='/NewPost' exact component={NewPost}/>
					</Suspense>
					<Redirect from={'/'} to={'/posts'}/>
				</Switch>


				{/*	this method would not pass the props to the component*/}
				{/*<Route path='/NewPost' exact render={() => <NewPost/>}/>*/}
			</div>
		);
	}
}

export default Blog;