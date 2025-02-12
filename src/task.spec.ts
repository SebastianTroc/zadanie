import test from 'ava';

import { CORRECT as expectedResult } from './correctResult';
import { getCategories } from './mockedApi';
import { categoryTree } from './task';

test('categoryTree should return expected result', async (t) => {
  const result = await categoryTree(getCategories);
  t.deepEqual(result, expectedResult);
});
