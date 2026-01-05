const Header = ({ toggleSidebar, onSignIn, onSignOut, isLoggedIn, onGoHome }) => (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm px-4 py-2 flex items-center justify-between z-50 h-20">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <MenuIcon />
        </button>
        <div onClick={onGoHome} className="flex items-center space-x-2 cursor-pointer">
          <YoutubeLogo />
        </div>
      </div>
      <div className="flex-1 flex justify-center px-4 lg:px-16">
          <div className="w-full max-w-xl flex items-center">
              <input type="text" placeholder="Search" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" />
              <button className="px-5 py-2 border-t border-b border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <SearchIcon />
              </button>
               <button className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <MicIcon />
              </button>
          </div>
      </div>
      <div className="flex items-center space-x-4">
         <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><VideoIcon /></button>
         <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><BellIcon /></button>
          {isLoggedIn ? (
               <button onClick={onSignOut} className="w-10 h-10 flex items-center justify-center"><UserCircleIcon size={10} /></button>
          ) : (
              <button onClick={onSignIn} className="flex items-center space-x-2 border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full px-4 py-1.5 transition-colors">
                  <UserCircleIcon size={6}/>
                  <span className="font-semibold text-sm">Sign In</span>
              </button>
          )}
      </div>
    </header>
);