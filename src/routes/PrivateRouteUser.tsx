import { Route, Redirect } from 'react-router-dom';
import { RouteCustomProps } from 'types';
import Header from 'components/main/header';
import useDocumentTitle from './hooks/useDocumentTitle';
import useVerifyUser from './hooks/useVerifyUser';

const PrivateRouteUser = ({
  showlogo = true,
  style = {},
  title = 'Quizby',
  component: Component,
  ...rest
}: RouteCustomProps) => {
  const usernamePath = window.location.pathname.split('/').splice(2, 1)[0];
  const { isAuthenticated, username } = useVerifyUser();
  useDocumentTitle(title);

  return isAuthenticated ? (
    <Route
      {...rest}
      render={(props) =>
        username === usernamePath ? (
          <>
            <Header showlogo={showlogo} style={style} />
            <Component {...props} />
          </>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  ) : null;
};

export default PrivateRouteUser;
