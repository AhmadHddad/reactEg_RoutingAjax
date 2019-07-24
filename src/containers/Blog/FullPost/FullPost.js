import React, {Component} from 'react';
import './FullPost.css';
import axios from 'axios'
import {Redirect} from "react-router";


class FullPost extends Component {

	state = {
		loadedPost: null,
		delete: false,
	};

	componentDidMount(prevProps, nextState) {
		console.log('this is CDM from FULLPOST.js', this.props);
		this.loadPost()

	}

	componentDidUpdate(prevProps, nextState) {
		this.loadPost()
	}

	loadPost = () => {
		if (this.props.match.params.postID) {
			// eslint-disable-next-line
			if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.postID)) {
				axios.get('posts/' + this.props.match.params.postID)
					.then(response => this.setState({loadedPost: response.data}))
					.catch(error => console.log('this is from error', error))
			}
		} else {
			console.log('you did not select any thing yet !');
		}

	};

	deleteHandler = () => {
		axios.delete('posts/' + this.props.match.params.postID)
			.then(response => {
				response ? this.setState({delete: true}) : null;
				return console.log('this is from delete', response)
			});
	};

	render() {
		if (this.state.delete) {
			return <Redirect to={'/posts'}/>;
		}
		let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

		if (this.props.match.params.postID && !this.state.loadedPost) {
			post = <p style={{textAlign: 'center'}}>Loading ...</p>;
		}

		if (this.state.loadedPost) {

			return post =
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button onClick={this.deleteHandler} className="Delete">Delete</button>
					</div>
				</div>

		}
		return post;
	}
}

export default FullPost;