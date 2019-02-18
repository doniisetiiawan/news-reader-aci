/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const listItemStyle = {
  margin: '0 5px',
};

const titleStyle = {
  background: 'transparent',
  border: 'none',
  font: 'inherit',
  cursor: 'pointer',
  padding: '5px 0',
};

const emptyMap = Map()
  .set(true, <li style={listItemStyle}>...</li>)
  .set(false, null);

class Home extends Component {
  static defaultProps = {
    filter: '',
  };

  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchArticles: PropTypes.func.isRequired,
    fetchingArticles: PropTypes.func.isRequired,
    filter: PropTypes.string,
    toggleArticle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchingArticles();
    this.props.fetchArticles(this.props.filter);
  }

  onTitleClick = id => () => this.props.toggleArticle(id);

  render() {
    const { onTitleClick } = this;
    const { articles } = this.props;

    return (
      <ul style={listStyle}>
        {emptyMap.get(articles.length === 0)}
        {articles.map(a => (
          <li key={a.id} style={listItemStyle}>
            <button
              type="button"
              onClick={onTitleClick(a.id)}
              style={titleStyle}
            >
              {a.title}
            </button>
            <p style={{ display: a.display }}>
              <small>
                <span>{a.summary}</span>
                <Link to={`articles/${a.id}`}>More...</Link>
              </small>
            </p>
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(
  (state, ownProps) => Object.assign(state.get('Home').toJS(), ownProps),
  dispatch => ({
    fetchingArticles: () => dispatch({ type: 'FETCHING_ARTICLES' }),
    fetchArticles: (filter) => {
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      fetch(`/api/articles/${filter}`, { headers })
        .then(resp => resp.json())
        .then(json => dispatch({
          type: 'FETCH_ARTICLES',
          payload: json,
        }));
    },
    toggleArticle: payload => dispatch({
      type: 'TOGGLE_ARTICLE',
      payload,
    }),
  }),
)(Home);
