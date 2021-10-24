import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useTheme } from 'next-themes';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useState, useEffect } from 'react';
import { TextField, InputAdornment, Badge, Avatar, Hidden } from '@mui/material';

export default function Header() {
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
          <InstagramIcon fontSize="large" />
        ) : (
          <div>
            <Hidden smDown>
              <img src="/assets/images/logo.png" />
            </Hidden>
            <Hidden mdUp>
              <InstagramIcon fontSize="large" />
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
          <Avatar src="/assets/images/45851733.png" />
        </div>
      </div>
    </div>
  );
}
