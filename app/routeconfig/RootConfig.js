/**
 * Created by iross on 11/20/2015.
 */
import { store } from '../Root';


export const RootRoute = {
  component: require('../components/Application').default,
  childRoutes: [
    {
      path: '/',
      onEnter: function (nextState, replace) {
        replace({
          pathname: '/booking',
          state: { nextPathname: nextState.location.pathname }
        });
      }
    },    require('../features/error-pages'),
    {
      childRoutes: [
        require('../features/booking')
      ]
    }
  ]
};
