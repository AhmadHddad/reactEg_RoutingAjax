import React from 'react';
import axios from "../../../axiosInstance";
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";


class Posts extends React.Component {

	state = {
		posts: [],
		loading: false

	};

	postSelectHandler = (id) => {
		this.props.history.push({pathname: '/posts/' + id});
	};

	componentDidMount() {
		console.log('this is props from Posts.js CDM', this.props);
		axios.get('posts')
			.then(response => {
				!response ? this.setState({loading: true}) : null;
				const posts = response.data.slice(0, 4);
				const updatePosts = posts.map((post) => {
					return {...post, author: "Ahmad"}
				});
				this.setState({posts: updatePosts});

			})
			.catch(err => console.log('this is error', err))
	}

	render() {

		const posts = (this.state.posts).map((post) => {
			return (
				/*<Link to={'/posts/' + post.id} key={post.id}>*/
				<Post
					key={post.id}
					title={post.title}
					author={post.author}
					clicked={() => {
						this.postSelectHandler(post.id)
					}}/>
				// </Link>

			)
		});
		return (
			<div>
				<section className="Posts">
					{this.state.error ? <p> something went wrong !!!</p> : null}
					{this.props.loading ? <p> Loading... </p> : null}
					{posts}
				</section>
				<Route path={this.props.match.url + '/:postID'} exact component={FullPost}/>
			</div>

		);
	}
}

export default Posts;
