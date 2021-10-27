import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useTheme } from 'next-themes';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { TextField, InputAdornment, Badge, Avatar, Hidden, Menu, MenuItem } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  return (
    <div className="shadow-sm bg-white dark:bg-gray-900 border sticky top-0 z-50 dark:border-gray-700">
      <div className="flex justify-between items-center max-w-5xl mx-5 xl:mx-auto py-1">
        {theme === 'dark' ? (
          <Link href="/">
            <InstagramIcon fontSize="large" className="cursor-pointer" />
          </Link>
        ) : (
          <div>
            <Hidden smDown>
              <Link href="/">
                <img src="/assets/images/logo.png" className="cursor-pointer" />
              </Link>
            </Hidden>
            <Hidden mdUp>
              <Link href="/">
                <InstagramIcon fontSize="large" className="cursor-pointer" />
              </Link>
            </Hidden>
          </div>
        )}

        <div className="hidden md:block">
          <TextField
            type="search"
            placeholder="Search"
            variant="outlined"
            size="small"
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
          <HomeOutlinedIcon className="nav-btn" />
          <Badge badgeContent={4} color="error">
            <SendOutlinedIcon color="action" className="rotate-45 nav-btn dark:text-white" />
          </Badge>
          <ControlPointIcon className="nav-btn" />
          <ExploreOutlinedIcon className="nav-btn" />

          <FavoriteBorderOutlinedIcon className="nav-btn" />
          {renderThemeChanger()}
          <Avatar
            src="/assets/images/45851733.png"
            id="basic-avatar"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
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
            <MenuItem>
              <AccountCircleOutlinedIcon className="mr-2" /> <Link href="/profile">Profile</Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <BookmarkBorderOutlinedIcon className="mr-2" />
              Saved
            </MenuItem>
            <MenuItem onClick={handleClose} divider>
              <SettingsOutlinedIcon className="mr-2" />
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
