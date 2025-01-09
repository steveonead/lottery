export type Prize = {
  id: number;
  hosts: string;
  item: string;
  imgSrc: string;
  amount: number;
};

export type PrizeMapGroupByHost = Map<string, Prize[]>;

export type HostNameArr = [string, string];
