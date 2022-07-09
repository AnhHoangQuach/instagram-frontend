import {
  Search,
  AccountCircleOutlined,
  Instagram,
  SettingsOutlined,
  Brightness4Outlined,
  Brightness5Outlined,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TextField,
  InputAdornment,
  Avatar,
  Hidden,
  Menu,
  MenuItem,
  Button,
  Switch,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import { setMessage } from '../../store/messageSlice';
import { updateDarkmode } from '../../store/coreUiSlice';
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

  const darkReaderOptions = { brightness: 100, contrast: 96, sepia: 0 };

  async function toggleDarkMode() {
    if (typeof window != 'undefined') {
      const { isEnabled, enable, disable, setFetchMethod } = await import('darkreader');
      setFetchMethod(window.fetch);
      const isOn = isEnabled();
      isOn ? disable() : enable(darkReaderOptions);
      dispatch(updateDarkmode(!isOn));
    }
  }

  const { isDarkmode } = useSelector((state) => state.coreUi);

  //set info user
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="shadow-sm bg-white border sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-5xl mx-5 xl:mx-auto py-1">
        <div>
          <Hidden smDown>
            <Link href="/" passHref>
              {!isDarkmode ? (
                <img src="/assets/images/logo.png" className="cursor-pointer" />
              ) : (
                <Instagram fontSize="large" className="cursor-pointer" />
              )}
            </Link>
          </Hidden>
          <Hidden smUp>
            <Link href="/" passHref>
              <Instagram fontSize="large" className="cursor-pointer" />
            </Link>
          </Hidden>
        </div>

        <div className="hidden md:block">
          <TextField
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
                  <Search />
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
          <div className="flex items-center">
            <Switch checked={isDarkmode === true} onClick={toggleDarkMode} />
            {isDarkmode === true ? <Brightness4Outlined /> : <Brightness5Outlined />}
          </div>
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
                <AccountCircleOutlined className="mr-2" /> Profile
              </MenuItem>
            </Link>
            <Link href="/profile/edit" passHref>
              <MenuItem onClick={handleClose} divider>
                <SettingsOutlined className="mr-2" />
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
