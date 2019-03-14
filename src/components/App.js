import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Axios from 'axios';
import Post from './Post/Post'

const baseUrl = 'https://practiceapi.devmountain.com/api/posts'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    Axios.get(baseUrl).then(res => {
      this.setState({posts: res.data});
    }).catch(() => console.log("Failed to mount component"));
  }

  updatePost(id, text) {
    Axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(res => {
      this.setState({posts: res.data})
    }).catch(() => console.log("Failed to update post"))
  }

  deletePost(id) {
    Axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(res => {
      this.setState({posts: res.data})
    }).catch(() => console.log("Failed to delete post"))
  }

  createPost(text) {
    Axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(res => {
      this.setState({posts: res.data})
    }).catch(() => console.log("Failed to create post"))
  }

  filterResults = (word) => {
    if (word) {
      console.log(this.state.posts);
      let filtered = this.state.posts.filter(post => encodeURI(post.text).includes(encodeURI(word)));
      console.log(filtered)
     this.setState({posts: filtered})
    } else {
      Axios.get(baseUrl).then(res => {
        this.setState({posts: res.data});
      }).catch(() => console.log("Failed to mount component"));
    }
  }

  render() {
    const { posts } = this.state;
    console.log(this.state.posts);

    return (
      <div className="App__parent">
        <Header filterResultsFn={this.filterResults}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {posts.map(post => (
            <Post key={post.id}
                  text={post.text}
                  date={post.date}
                  id={post.id}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}/>))}

        </section>
      </div>
    );
  }
}

export default App;
