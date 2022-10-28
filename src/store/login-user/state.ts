export interface LoginUserInterface {
  email: string;
  password: string;
  isLogged: boolean;
}

function state(): LoginUserInterface {
  return {
    email: '',
    password: '',
    isLogged: false
  }
};

export default state;

