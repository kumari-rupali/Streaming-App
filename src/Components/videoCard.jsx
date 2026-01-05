const VideoCard = ({ video, channel, onVideoSelect }) => {
    if (!channel) return null;
    return (
        <div onClick={() => onVideoSelect(video)} className="flex flex-col space-y-3 cursor-pointer group">
            <div className="relative"><img src={video.thumbnail} alt={video.title} className="w-full h-auto rounded-xl object-cover transition-transform duration-200 group-hover:scale-105" /></div>
            <div className="flex items-start space-x-3">
                <img src={channel.avatar} alt={channel.name} className="w-9 h-9 rounded-full mt-1"/>
                <div className="flex-1">
                    <h3 className="text-md font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">{video.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{channel.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{video.views} &bull; {video.timestamp}</p>
                </div>
            </div>
        </div>
    );
};