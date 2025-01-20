import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';

function Routes() {
    const { pathname } = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const isUserLoggedIn = !!localStorage.getItem('usernameOrEmail');

    if (!isUserLoggedIn && pathname !== '/login') {
        history.push('/login');
    }

    // const isUserLoggedIn = true;
    return isUserLoggedIn ? <PrivateSection /> : <PublicRoutes />;
}

export default Routes;
