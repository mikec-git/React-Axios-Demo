import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
import Posts from './Posts/Posts';
import './Blog.css';
// import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost')); // Lazy loading

class Blog extends Component {
  state = {
    auth: true
  }
  
  render () {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink 
                to="/posts" 
                exact
                activeClassName="my-active"
                activeStyle={{
                  color: "#fa923f",
                  textDecoration: 'underline'
                }}>Posts</NavLink></li>
              <li><NavLink 
                to={{
                  pathname: '/new',
                  hash: '#submit',
                  search: '?quick-submit=true'
                }} 
                exact>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <Posts />} /> */}
        <Switch>
          {this.state.auth ? <Route path="/new" exact component={AsyncNewPost} /> : null}
          <Route path="/posts" component={Posts} />
          <Route path="/" exact component={Posts} />
          <Route render={() => <h1>Not Found</h1>}/>
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;