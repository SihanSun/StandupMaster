import { NavigationActions } from 'react-navigation';

let navigator = null;

export const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator && navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};