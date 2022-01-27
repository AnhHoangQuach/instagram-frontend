import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { TextField, InputAdornment, Avatar, Hidden, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import { setMessage } from '../../store/messageSlice';
import NewPost from '../../components/NewPost';
import { stringify, parse } from 'query-string';
import {
  HomeIcon,
  HomeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  MessageIcon,
} from '../../utils/icons';
import { useRef } from 'react';
import io from 'socket.io-client';
import { baseUrl } from '../../utils/helpers';

export default function Header() {
  //set link active
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const socket = useRef();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //search
  const { keywords = '' } = parse(router.query);
  const [inputValue, setInputValue] = useState(keywords);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const { ...query } = parse(router.query);
      router.push({
        pathname: '/search',
        search: stringify({ ...query, keywords: inputValue }),
      });
    }
  };

  useEffect(() => {
    if (router.pathname !== '/search') {
      setInputValue('');
    }
  }, [router.pathname]);

  const handleLogOut = () => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.disconnect();
      socket.current.off();
    }

    setAnchorEl(null);
    dispatch(logout());
    dispatch(setMessage({ type: 'success', message: 'Logout success' }));
    router.replace('/login');
  };

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <Brightness4Icon onClick={() => setTheme('light')} className="w-7 h-7" role="button" />
      );
    } else {
      return <NightsStayIcon onClick={() => setTheme('dark')} className="w-7 h-7" role="button" />;
    }
  };

  //set info user
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="shadow-sm bg-white dark:bg-gray-900 border sticky top-0 z-50 dark:border-gray-700">
      <div className="flex justify-between items-center max-w-5xl mx-5 xl:mx-auto py-1">
        {theme === 'dark' ? (
          <Link href="/" passHref>
            <InstagramIcon fontSize="large" className="cursor-pointer" />
          </Link>
        ) : (
          <div>
            <Hidden smDown>
              <Link href="/" passHref>
                <img src="/assets/images/logo.png" className="cursor-pointer" />
              </Link>
            </Hidden>
            <Hidden smUp>
              <Link href="/" passHref>
                <InstagramIcon fontSize="large" className="cursor-pointer" />
              </Link>
            </Hidden>
          </div>
        )}

        <div className="hidden md:block">
          <TextField
            className="dark:bg-white"
            type="search"
            placeholder="Search"
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="flex items-center justify-end space-x-3 md:space-x-4">
          <Link href="/" passHref>
            <div>
              {isActive('/') ? (
                <HomeActiveIcon className="cursor-pointer" />
              ) : (
                <HomeIcon className="cursor-pointer" />
              )}
            </div>
          </Link>
          <Link href="/messages" passHref>
            <div>
              <MessageIcon color="action" className="cursor-pointer" />
            </div>
          </Link>
          <NewPost />
          <Link href="/explore" passHref>
            <div>
              {isActive('/explore') ? (
                <ExploreActiveIcon className="cursor-pointer" />
              ) : (
                <ExploreIcon className="cursor-pointer" />
              )}
            </div>
          </Link>

          {renderThemeChanger()}
          <Avatar
            src={currentUser?.avatar}
            id="basic-avatar"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="cursor-pointer"
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-avatar',
            }}
          >
            <Link href={`/profile/${currentUser?._id}`} passHref>
              <MenuItem onClick={handleClose}>
                <AccountCircleOutlinedIcon className="mr-2" /> Profile
              </MenuItem>
            </Link>
            <Link href="/profile/edit" passHref>
              <MenuItem onClick={handleClose} divider>
                <SettingsOutlinedIcon className="mr-2" />
                Settings
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
