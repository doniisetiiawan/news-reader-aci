import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Article from './Article';

const articleList = filter => props => (
  <Home {...props} filter={filter} />
);

const categoryListStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
};

const categoryItemStyle = {
  padding: '5px',
};

const Local = articleList('local');
const Global = articleList('global');
const Tech = articleList('tech');
const Sports = articleList('sports');

export default connect(state => state.get('App').toJS())(
  ({ title, links }) => (
    <BrowserRouter>
      <main>
        <h1>{title}</h1>
        <ul style={categoryListStyle}>
          {links.map(l => (
            <li key={l.url} style={categoryItemStyle}>
              <NavLink
                exact
                to={l.url}
                activeStyle={{ fontWeight: 'bold' }}
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <section>
          <Route exact path="/" component={Home} />
          <Route exact path="/local" component={Local} />
          <Route exact path="/global" component={Global} />
          <Route exact path="/tech" component={Tech} />
          <Route exact path="/sports" component={Sports} />
          <Route exact path="/articles/:id" component={Article} />
        </section>
      </main>
    </BrowserRouter>
  ),
);
