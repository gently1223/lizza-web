import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { CreateProductStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import * as mutations from './mutations';

const createProductModule: Module<CreateProductStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default createProductModule;
