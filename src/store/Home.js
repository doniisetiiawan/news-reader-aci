import { fromJS } from 'immutable';

const typeMap = fromJS({
  FETCHING_ARTICLES: state => state.update('articles', a => a.clear()),

  FETCH_ARTICLES: (state, payload) => state.set(
    'articles',
    fromJS(payload)
      .map(a => a.set('display', 'none')),
  ),

  TOGGLE_ARTICLE: (state, id) => state.updateIn([
    'articles',
    state
      .get('articles')
      .findIndex(a => a.get('id') === id),
    'display',
  ], display => (display === 'none' ? 'block' : 'none')),
});

export default (state, { type, payload }) => typeMap.get(type, s => s)(state, payload);
