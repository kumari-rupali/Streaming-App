const VideoPage = ({ video, channel, upNextVideos, allChannels, onToggleSubscription, onSummarize, onVideoSelect, isSidebarOpen, handleLikeDislike, videoStats, handleShare, handleDownload }) => {
    if (!video || !channel) return null;

    const videoId = getVideoId(video.url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    const stats = videoStats[video.id] || { likes: video.likes, userAction: null };
    
    return (
        <main className={`transition-all duration-300 ease-in-out pt-24 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
            <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <h1 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">{video.title}</h1>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                             <img src={channel.avatar} alt={channel.name} className="w-12 h-12 rounded-full"/>
                             <div>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{channel.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{formatSubscribers(channel.subscribers)}</p>
                             </div>
                             <button onClick={() => onToggleSubscription(channel.id)} className={`ml-4 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${channel.isSubscribed ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'}`}>{channel.isSubscribed ? 'Subscribed' : 'Subscribe'}</button>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                             <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full">
                                <button onClick={() => handleLikeDislike(video.id, 'like')} className={`flex items-center space-x-2 pl-4 pr-3 py-2 rounded-l-full hover:bg-gray-200 dark:hover:bg-gray-700 ${stats.userAction === 'like' ? 'text-blue-500' : ''}`}>
                                    <LikeIcon filled={stats.userAction === 'like'} />
                                    <span>{formatCount(stats.likes)}</span>
                                </button>
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                                <button onClick={() => handleLikeDislike(video.id, 'dislike')} className={`px-3 py-2 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700 ${stats.userAction === 'dislike' ? 'text-blue-500' : ''}`}>
                                    <DislikeIcon filled={stats.userAction === 'dislike'}/>
                                </button>
                             </div>
                             <button onClick={() => handleShare(video)} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"><ShareIcon /><span>Share</span></button>
                             <button onClick={handleDownload} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"><DownloadIcon /><span>Download</span></button>
                        </div>
                    </div>
                     <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <p className="text-sm font-semibold">{video.views} &bull; {video.timestamp}</p>
                        <p className="text-sm mt-2">A placeholder for the video description. In a real app, this would contain detailed information about the video, links, and more.</p>
                        <button onClick={() => onSummarize(video.title)} className="mt-2 flex items-center space-x-1 px-3 py-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-semibold">✨ <span>Summarize with AI</span></button>
                    </div>
                    <CommentsSection comments={mockComments} />
                </div>
                <div className="w-full lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Up Next</h2>
                    <div className="space-y-4">
                        {upNextVideos.map(nextVideo => <UpNextCard key={nextVideo.id} video={nextVideo} channel={allChannels[nextVideo.channelId]} onVideoSelect={onVideoSelect}/>)}
                    </div>
                </div>
            </div>
        </main>
    );
}