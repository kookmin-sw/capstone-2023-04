import { atom } from 'recoil';

const timeState = atom({
  key: 'timeState',
  default: '',
});

export default timeState;