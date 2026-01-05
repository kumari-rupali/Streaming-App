const SignInModal = ({ isOpen, onClose, onSignIn, onSwitchToSignUp }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm mx-4">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign In</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSignIn(); }}>
                    <div className="space-y-4">
                        <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label><input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" /></div>
                        <div><label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label><input type="password" id="password" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" /></div>
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                         <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Sign In</button>
                    </div>
                     <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">Don't have an account?{' '}<button type="button" onClick={onSwitchToSignUp} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Sign Up</button></p>
                </form>
            </div>
        </div>
    );
};