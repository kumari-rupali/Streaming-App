const Sidebar = ({ isOpen, isBannerVisible, onGoHome }) => {
    const navItems = [
        { icon: <HomeIcon />, name: 'Home', action: onGoHome },
        { icon: <TrendingIcon />, name: 'Trending' },
        { icon: <SubscriptionsIcon />, name: 'Subscriptions' },
    ];
    const secondaryNav = [{ icon: <LibraryIcon />, name: 'Library' }];
    
    return (
        <aside className={`fixed left-0 bottom-0 bg-white dark:bg-gray-900 z-30 transition-all duration-300 ease-in-out ${isBannerVisible ? 'top-32' : 'top-20'} ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 md:translate-x-0 md:w-20'} overflow-y-auto`}>
            <nav className="p-2 space-y-2">
                 {navItems.map((item, index) => (
                    <button key={index} onClick={item.action} className={`w-full flex items-center p-3 rounded-lg text-sm font-medium ${isOpen ? 'justify-start' : 'justify-center'} text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800`}>
                        {item.icon}
                        {isOpen && <span className="ml-4">{item.name}</span>}
                    </button>
                ))}
                 <hr className="my-2 border-gray-200 dark:border-gray-700" />
                 {secondaryNav.map((item, index) => (
                    <a key={index} href="#" className={`flex items-center p-3 rounded-lg text-sm font-medium ${isOpen ? 'justify-start' : 'justify-center'} text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800`}>
                        {item.icon}
                        {isOpen && <span className="ml-4">{item.name}</span>}
                    </a>
                ))}
            </nav>
        </aside>
    );
};