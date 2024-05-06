import { useUsersStore } from "./use-users-store";

export const useUsersFacade = () => {
  const { users, loading, error, fetchUsers } = useUsersStore((state) => ({
    users: state.users,
    loading: state.loading,
    error: state.error,
    fetchUsers: state.fetchUsers,
  }));

  return { users, loading, error, fetchUsers };
};
