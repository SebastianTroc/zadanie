import { MAIN_NESTING_LEVEL } from './consts';
import { Category, CategoryListElement, DataSourceResponse } from './types';
import {
  determineOrder,
  determineShowOnHome,
  hasShowOnHomeIndicator,
  sortingStrategy,
} from './utils';

const prepareCategories = (
  categories: Category[],
  nestingLevel = MAIN_NESTING_LEVEL
): CategoryListElement[] => {
  const isMainNestingLevel = nestingLevel === MAIN_NESTING_LEVEL;
  return categories
    .map((category) => {
      return {
        id: category.id,
        name: category.name,
        image: category.MetaTagDescription,
        order: determineOrder(category),
        children: category.children
          ? prepareCategories(category.children, nestingLevel + 1).sort(
              sortingStrategy
            )
          : [],
        showOnHome:
          isMainNestingLevel && hasShowOnHomeIndicator(category.Title), // set default value, will be processed again later
      };
    })
    .sort(sortingStrategy);
};

export const categoryTree = async (
  fetchCategories: () => Promise<DataSourceResponse<Category>>
): Promise<CategoryListElement[]> => {
  const res = await fetchCategories();

  if (!res.data) {
    return [];
  }

  let categoryListElements = prepareCategories(res.data);

  // process showOnHome again for sorted set
  categoryListElements = determineShowOnHome(categoryListElements);

  return categoryListElements;
};
