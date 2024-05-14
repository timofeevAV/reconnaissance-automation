import useAuthStore from '../stores/use-auth-store';

const useAuthFacade = () => {
  const {
    accessToken,
    refreshToken,
    user,
    isLoading,
    error,
    signIn,
    signUp,
    logout,
    getUser,
    refresh,
    verify,
    bootstrap,
  } = useAuthStore(state => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    signIn: state.signIn,
    signUp: state.signUp,
    logout: state.logout,
    getUser: state.getUser,
    refresh: state.refresh,
    verify: state.verify,
    bootstrap: state.bootstrap,
  }));

  return {
    accessToken,
    refreshToken,
    user,
    isLoading,
    error,
    signIn,
    signUp,
    logout,
    getUser,
    refresh,
    verify,
    bootstrap,
  };
};

export default useAuthFacade;
