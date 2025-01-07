export type Prize = {
  item: string;
  imgSrc: string;
  amount: number;
};

export type PrizeGroup = {
  hosts: [string, string];
  prizes: Prize[];
};

export const prizeGroupList: PrizeGroup[] = [
  {
    hosts: ['Paul', 'John'],
    prizes: [
      { item: 'iPhone 13', imgSrc: '/dyson.jpg', amount: 10 },
      { item: '雀巢膠囊咖啡機-雀巢多趣酷思膠囊咖啡機 Genio S 簡約白', imgSrc: '/model-y.png', amount: 1 },
      { item: 'Model X', imgSrc: '/model-y.png', amount: 1 },
    ],
  },
  {
    hosts: ['Ken', 'Jack'],
    prizes: [
      { item: 'PlayStation 5', imgSrc: '/ps5.jpg', amount: 1 },
      { item: 'Model Y', imgSrc: '/model-y.png', amount: 0 },
      { item: 'Model X', imgSrc: '/model-y.png', amount: 1 },
      { item: 'Model Z', imgSrc: '/model-y.png', amount: 2 },
    ],
  },
  {
    hosts: ['Penny', 'Andy'],
    prizes: [
      { item: 'Model A', imgSrc: '/model-y.png', amount: 1 },
      { item: 'Model T', imgSrc: '/model-y.png', amount: 1 },
    ],
  },
  {
    hosts: ['Jenny', 'Jessie'],
    prizes: [
      { item: 'Model A', imgSrc: '/model-y.png', amount: 1 },
    ],
  },
];
