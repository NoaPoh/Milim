import airportIcon from '../assets/images/categories/airport.png';
import schoolIcon from '../assets/images/categories/school.png';
import parkIcon from '../assets/images/categories/park.png';
import kitchenIcon from '../assets/images/categories/kitchen.png';
import bedroomIcon from '../assets/images/categories/bedroom.png';
import supermarketIcon from '../assets/images/categories/supermarket.png';
import livingRoomIcon from '../assets/images/categories/living_room.png';
import { Category } from '@prisma/client';

export type DefaultCategoriesMap = {
  [id: number]: string;
};

const defaultCategoriesIcons: DefaultCategoriesMap = {
  1: airportIcon,
  2: schoolIcon,
  3: parkIcon,
  4: kitchenIcon,
  5: bedroomIcon,
  6: supermarketIcon,
  7: livingRoomIcon,
};

export function resolveImagePath(
  picture: string,
  categoryId: Category['id']
): string {
  return picture ?? defaultCategoriesIcons[categoryId];
}

export default defaultCategoriesIcons;
