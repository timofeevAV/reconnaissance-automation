import { useUsersFacade } from "@features/users/use-users-facade";
import { SignInPageProps } from "@pages/sign-in/sign-in-page-props";
import { useEffect } from "react";
import { ListItem, ScrollView, Text, YGroup } from "tamagui";

export const TestsPage = (props: SignInPageProps) => {
  const { navigation } = props;
  const { users, fetchUsers } = useUsersFacade();

  useEffect(() => {
    if (users.length) {
      return;
    }

    fetchUsers();
  }, []);

  return (
    <ScrollView>
      <YGroup gap="$1.5">
        {users.map((user) => (
          <YGroup.Item key={user.id}>
            <ListItem
              title={user.name}
              subTitle={`${user.email}\n${user.phone}`}
            >
              <Text>{user.website}</Text>
              <Text>{user.company.name}</Text>
            </ListItem>
          </YGroup.Item>
        ))}
      </YGroup>
    </ScrollView>
  );
};
