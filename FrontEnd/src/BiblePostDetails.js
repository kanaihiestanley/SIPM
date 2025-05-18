import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BiblePostList from './BiblePostList';
import EditBiblePost from './EditBiblePost';

function BiblePostDetails() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={BiblePostList} />
        <Route path="/edit/:postId" component={EditBiblePost} />
      </Switch>
    </Router>
  );
}

export default BiblePostDetails;
