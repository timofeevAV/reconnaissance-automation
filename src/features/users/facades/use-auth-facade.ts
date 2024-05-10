import useAuthStore from '../stores/use-auth-store';

const useAuthFacade = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore(state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
  }));

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuthFacade;
