import { Characteristics, Samples } from '@/pages';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TopTabsBar } from './top-tabs-bar/top-tabs-bar';
import { useAuthStore } from '@/features/users/stores';
import { useEffect, useState } from 'react';
import { useSamplesFacade } from '@/features/samples/facades';
import { useCharacteristicsFacade } from '@/features/characteristics/facades';
import { LoadingScreen } from '@/features/ui';

const TopTabsNavigator = createMaterialTopTabNavigator();

const TopTabs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuthStore();
  const { fetchSamples } = useSamplesFacade();
  const { fetchCharacteristics } = useCharacteristicsFacade();

  useEffect(() => {
    Promise.all([
      fetchSamples(accessToken),
      fetchCharacteristics(accessToken),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [accessToken, fetchCharacteristics, fetchSamples]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <TopTabsNavigator.Navigator tabBar={props => <TopTabsBar {...props} />}>
      <TopTabsNavigator.Screen
        name="samples"
        options={{
          title: 'Пробы',
        }}
        component={Samples}
      />
      <TopTabsNavigator.Screen
        name="characterisitcs"
        component={Characteristics}
        options={{
          title: 'Характеристики',
        }}
      />
    </TopTabsNavigator.Navigator>
  );
};

export default TopTabs;
