import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useDispatch } from 'react-redux';
import { getMe, addToken } from '../../store/userSlice';
import { updateDarkmode } from '../../store/coreUiSlice';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authorized, setAuthorized] = useState(false);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login', '/signup', '/forgot-password'];
    const path = url.split('?')[0];
    const token = localStorage.getItem('token');
    const mode = localStorage.getItem('mode') ?? 'light';
    dispatch(updateDarkmode(mode));
    if (!token && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
      });
    } else {
      Promise.all([dispatch(getMe()), dispatch(addToken())]).then(() => {
        setAuthorized(true);
      });
    }
    NProgress.done();
  }

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);
    // on route change start - hide page content by setting authorized to false
    const hideContent = (url) => {
      setAuthorized(false);
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return authorized && children;
}
