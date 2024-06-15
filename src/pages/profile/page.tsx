import { InputWithLabel } from '@/features/ui';
import { useAuthFacade } from '@/features/users';
import { LogOut } from '@tamagui/lucide-icons';
import { Button, View } from 'tamagui';

const labels: Record<string, string> = {
  email: 'Адрес эл.почты',
  lastName: 'Фамилия',
  firstName: 'Имя',
  middleName: 'Отчество',
  role: 'Роль',
};

export const Profile = () => {
  const { user, logout } = useAuthFacade();

  return (
    <View
      flex={1}
      justifyContent="center"
      paddingHorizontal="$3">
      {user &&
        Object.entries(user).map(([key, value]) => {
          if (key in labels) {
            return (
              <InputWithLabel
                label={labels[key]}
                key={key}
                name={key}
                value={value || ''}
                readOnly
              />
            );
          }
          return null;
        })}
      <Button
        theme="active"
        onPress={logout}
        mt="$5"
        icon={LogOut}>
        Выйти
      </Button>
    </View>
  );
};
