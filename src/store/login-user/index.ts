import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { LoginUserInterface } from './state';
import actions from './actions';
import getters from './getters';
import * as mutations from './mutations';

const loginUserModule: Module<LoginUserInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default loginUserModule;
