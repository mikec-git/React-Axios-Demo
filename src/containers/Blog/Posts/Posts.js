import React, { Component } from 'react';
import FullPost from '../FullPost/FullPost';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  }
  
  componentDidMount() {
    console.log(this.props);

    axios.get('/posts')
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts =  posts.map(post => ({...post, author: 'Mike'}));
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        // this.setState({ error: true });
        console.log(error);
      });
  }

  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id });
    console.log(id);
    this.props.history.push({pathname: this.props.match.url + "/" + id});
  }

  render() { 
    console.log(this.props.match.url);
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
      if(!this.state.error){
        posts = this.state.posts.map(post => {
          return (
            // <Link to={this.props.match.url + '/' + post.id} key={post.id} >
              <Post 
                key={post.id}
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />
            // </Link>
          );
        });
      }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section> 
        <Route path={this.props.match.url + "/:id"}  component={FullPost} />
      </div>
    );
  }
}
 
export default Posts;