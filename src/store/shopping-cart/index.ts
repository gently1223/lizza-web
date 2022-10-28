import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ShoppingCartStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import * as mutations from './mutations';

const shoppingCartModule: Module<ShoppingCartStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default shoppingCartModule;
