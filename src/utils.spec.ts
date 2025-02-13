import test from 'ava';

import { SHOW_ON_HOME_INDICATOR } from './consts';
import { CategoryListElement } from './types';
import {
  determineOrder,
  determineShowOnHome,
  hasShowOnHomeIndicator,
  sortingStrategy,
} from './utils';

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

test(`hasShowOnHomeIndicator() should return correct boolean based on presence of "${SHOW_ON_HOME_INDICATOR}" indicator in title`, (t) => {
  // happy path
  t.is(hasShowOnHomeIndicator('1#'), true);

  // happy path with title containing name of the product instead of ordering number
  t.is(hasShowOnHomeIndicator('Some product #'), true);

  // item without SHOW_ON_HOME_INDICATOR
  t.is(hasShowOnHomeIndicator('Some product'), false);
});

test('sortingStrategy() should sort ascending', (t) => {
  const categoriesToSort = [{ order: 3 }, { order: 1 }, { order: 2 }];
  const expectedResult = [{ order: 1 }, { order: 2 }, { order: 3 }];

  t.deepEqual(categoriesToSort.sort(sortingStrategy), expectedResult);
});

const sampleCategory: CategoryListElement = {
  id: 1,
  name: 'Some product',
  image: 'Some image',
  order: 1,
  children: [],
  showOnHome: false,
};

test('determineShowOnHome() should set `showOnHome` to `true` for all categories when there are less or equal to maximum shown categories configured by `smallSetThreshold`', (t) => {
  const testingThreshold = 3;
  const smallCategoriesSet = new Array(testingThreshold).fill(sampleCategory);
  const bigCategoriesSet = new Array(testingThreshold + 1).fill(sampleCategory);

  const smallCategoriesSetResult = determineShowOnHome(
    smallCategoriesSet,
    testingThreshold
  );
  t.true(
    smallCategoriesSetResult.every((category) => category.showOnHome === true)
  );

  const bigCategoriesSetResult = determineShowOnHome(
    bigCategoriesSet,
    testingThreshold
  );
  t.is(bigCategoriesSetResult[0].showOnHome, true);
  t.is(bigCategoriesSetResult[1].showOnHome, true);
  t.is(bigCategoriesSetResult[2].showOnHome, true);
  t.is(bigCategoriesSetResult[3].showOnHome, false);
});
