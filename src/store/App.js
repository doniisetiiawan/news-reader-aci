import { fromJS } from 'immutable';
import initialState from './initialState';

const title = initialState.getIn(['App', 'title']);

const articleLinks = fromJS([
  {
    name: 'Home',
    url: '/',
  },
]);

const homeLinks = initialState.getIn(['App', 'links']);

const typeMap = fromJS({
  FETCHING_ARTICLE: state => state.set('title', '...').set('links', articleLinks),

  FETCH_ARTICLE: (state, payload) => state.set('title', payload.title),

  FETCHING_ARTICLES: state => state.set('title', title).set('links', homeLinks),

  FETCH_ARTICLES: state => state.set('title', title),
});

export default (state, { type, payload }) => typeMap.get(type, () => state)(state, payload);
