import useUsersStore from '../stores/use-users-store';

const useUsersFacade = () => {
  const {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteUsers,
  } = useUsersStore(state => ({
    users: state.users,
    loading: state.loading,
    error: state.error,
    fetchUsers: state.fetchUsers,
    addUser: state.addUser,
    updateUser: state.updateUser,
    deleteUser: state.deleteUser,
    deleteUsers: state.deleteUsersByIds,
  }));

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteUsers,
  };
};

export default useUsersFacade;
