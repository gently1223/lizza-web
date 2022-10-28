import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ShoppingDataStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import * as mutations from './mutations';

const shoppingDataModule: Module<ShoppingDataStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default shoppingDataModule;
