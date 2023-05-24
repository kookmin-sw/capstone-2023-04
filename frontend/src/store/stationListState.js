import { atom } from 'recoil';

const stationListState = atom({
  key: 'stationListState',
  default: [],
});

export default stationListState;