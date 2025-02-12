import test from 'ava';

import { CORRECT as expectedResult } from './correctResult';
import { categoryTree } from './task';

test('categoryTree should return expected result', async (t) => {
  const result = await categoryTree();
  t.deepEqual(result, expectedResult);
});
