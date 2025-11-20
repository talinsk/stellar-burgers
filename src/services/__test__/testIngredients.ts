import { TIngredient } from '@utils-types';

export const testBun: TIngredient = {
  _id: 'testId',
  name: 'testName',
  type: 'bun',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: 'testImageUri',
  image_large: 'testLargeImageUri',
  image_mobile: 'testMobileImageUri'
};

export const testMain: TIngredient = {
  _id: 'ingr1',
  name: 'TestIngredient1Name',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

export const testSauce: TIngredient = {
  _id: 'sauce1',
  name: 'TestSauce1Name',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};
