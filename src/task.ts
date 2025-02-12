import { Category, CategoryListElement, DataSourceResponse } from './types';
import { determineOrder, determineShowOnHome, sortingStrategy } from './utils';

const prepareCategories = (
  categories: Category[],
  nestingLevel = 1
): CategoryListElement[] =>
  categories
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
        showOnHome: determineShowOnHome(category.Title, nestingLevel),
      };
    })
    .sort(sortingStrategy);

export const categoryTree = async (
  fetchCategories: () => Promise<DataSourceResponse<Category>>
): Promise<CategoryListElement[]> => {
  const res = await fetchCategories();

  if (!res.data) {
    return [];
  }

  return prepareCategories(res.data);
};
