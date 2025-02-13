import {
  MAX_CATEGORIES_ON_HOME_WHEN_NOT_SET,
  SHOW_ON_HOME_INDICATOR,
  SMALL_SET_THRESHOLD,
} from './consts';
import { Category, CategoryListElement } from './types';

export const determineOrder = ({
  id,
  Title,
}: Pick<Category, 'id' | 'Title'>): number => {
  const order = parseInt(Title, 10);

  return isNaN(order) ? id : order;
};

export const determineShowOnHome = (
  categories: CategoryListElement[],
  smallSetThreshold = SMALL_SET_THRESHOLD,
  maxCategoriesOnHomeByDefault = MAX_CATEGORIES_ON_HOME_WHEN_NOT_SET
): CategoryListElement[] => {
  const isAllCategoriesShownOnHome = categories.length <= smallSetThreshold;
  const isCertainCategoriesSetToShowOnHome = categories.some(
    (category) => category.showOnHome
  );

  if (isAllCategoriesShownOnHome) {
    return categories.map((category) => ({
      ...category,
      showOnHome: true, // set all to true
    }));
  } else if (isCertainCategoriesSetToShowOnHome) {
    return categories; // leave as is
  } else {
    return categories.map((category, index) => ({
      ...category,
      showOnHome: index <= maxCategoriesOnHomeByDefault, // set all to true
    }));
  }
};

export const hasShowOnHomeIndicator = (title: string): boolean =>
  title.includes(SHOW_ON_HOME_INDICATOR);

export const sortingStrategy = (
  a: CategoryListElement,
  b: CategoryListElement
): number => {
  return a.order - b.order;
};
