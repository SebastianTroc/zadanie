import {
  SHOW_ON_HOME_INDICATOR,
  SHOW_ON_HOME_MAX_NESTING_LEVEL,
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
  Title: string,
  nestingLevel: number
): boolean => {
  if (nestingLevel > SHOW_ON_HOME_MAX_NESTING_LEVEL) {
    return false;
  }

  return Title.includes(SHOW_ON_HOME_INDICATOR);
};

export const sortingStrategy = (
  a: CategoryListElement,
  b: CategoryListElement
): number => {
  return a.order - b.order;
};
