import { LoginUserInterface } from './state';

const getters = {
  emailPassword(state: LoginUserInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      email: state.email,
      password: state.password
    }
  },
  isLogged(state: LoginUserInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.isLogged;
  },

}

export default getters;
