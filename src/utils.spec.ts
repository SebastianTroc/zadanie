import test from 'ava';

import { SHOW_ON_HOME_INDICATOR } from './consts';
import { determineOrder, determineShowOnHome, sortingStrategy } from './utils';

test('determineOrder() should return correct number based on given input', (t) => {
  // Title is a name
  t.is(determineOrder({ id: 1, Title: 'Some product' }), 1);

  // Title is an ordering number
  t.is(determineOrder({ id: 2, Title: '3' }), 3);

  // Title is an ordering number with SHOW_ON_HOME_INDICATOR
  t.is(determineOrder({ id: 3, Title: `4${SHOW_ON_HOME_INDICATOR}` }), 4);

  // Title is an ordering number with other special characters
  t.is(determineOrder({ id: 4, Title: `5 !` }), 5);
});

test(`determineShowOnHome() should return correct boolean based on nesting level and "${SHOW_ON_HOME_INDICATOR}" indicator `, (t) => {
  // happy path
  t.is(determineShowOnHome('1#', 1), true);

  // happy path with Title containing name of the product instead of ordering number
  t.is(determineShowOnHome('Some product #', 1), true);

  // item without SHOW_ON_HOME_INDICATOR
  t.is(determineShowOnHome('Some product', 1), false);

  // nestingLevel higher than SHOW_ON_HOME_MAX_NESTING_LEVEL
  t.is(determineShowOnHome('Some product', 2), false);
  t.is(determineShowOnHome('Another product', 3), false);
});

test('sortingStrategy() should sort ascending', (t) => {
  const categoriesToSort = [{ order: 3 }, { order: 1 }, { order: 2 }];
  const expectedResult = [{ order: 1 }, { order: 2 }, { order: 3 }];

  t.deepEqual(categoriesToSort.sort(sortingStrategy), expectedResult);
});
