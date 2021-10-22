import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useTheme } from 'next-themes';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useState, useEffect } from 'react';

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
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          {theme === 'dark' ? (
            <Image src="/assets/images/logo_white.png" layout="fill" objectFit="contain" />
          ) : (
            <Image src="/assets/images/logo.png" layout="fill" objectFit="contain" />
          )}
        </div>
        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image src="/assets/images/logo_responsive.png" layout="fill" objectFit="contain" />
        </div>

        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeOutlinedIcon className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          <div className="relative navBtn">
            <SendOutlinedIcon className="rotate-45" />
            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
              3
            </div>
          </div>
          <ControlPointIcon className="navBtn" />
          <ExploreOutlinedIcon className="navBtn" />
          <FavoriteBorderOutlinedIcon className="navBtn" />

          {renderThemeChanger()}
          <img src="/assets/images/45851733.png" className="rounded-full h-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
