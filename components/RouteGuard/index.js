import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { setMessage } from '../../store/messageSlice';
import { useDispatch } from 'react-redux';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);
    // on route change start - hide page content by setting authorized to false
    const hideContent = (url) => {
      setAuthorized(false);
      console.log(`Loading: ${url}`);
      if (url === '/login' && !localStorage.getItem('token')) {
        dispatch(setMessage({ type: 'success', message: 'Logout success' }));
      }
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

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login', '/signup'];
    const path = url.split('?')[0];
    const token = localStorage.getItem('token');
    if (!token && !publicPaths.includes(path)) {
      setAuthorized(false);
      dispatch(
        setMessage({ type: 'error', message: 'You must be logged in or sign up to view this page' })
      );
      router.push({
        pathname: '/login',
      });
    } else {
      setAuthorized(true);
    }
    NProgress.done();
  }

  return authorized && children;
}
