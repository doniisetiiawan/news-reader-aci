import React, { Component } from 'react';
import { connect } from 'react-redux';

const textStyle = {
  padding: '5px',
};

class Article extends Component {
  componentDidMount = () => {
    this.props.fetchingArticle();
    this.props.fetchArticle(this.props.match.params.id);
  };

  render() {
    return <p style={textStyle}>{this.props.full}</p>;
  }
}

export default connect(
  state => (state, ownProps) => ({
    ...state.Article,
    ...ownProps,
  }),
  dispatch => ({
    fetchingArticle: () => dispatch({
      type: 'FETCHING_ARTICLE',
    }),
    fetchArticle: (id) => {
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      fetch(`/api/articles/${id}`, { headers })
        .then(resp => resp.json())
        .then(json => dispatch({
          type: 'FETCH_ARTICLE',
          payload: json,
        }));
    },
  }),
)(Article);
