const UpNextCard = ({ video, channel, onVideoSelect }) => {
    if (!channel) return null;
    return (
        <div onClick={() => onVideoSelect(video)} className="flex items-start space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <img src={video.thumbnail} alt={video.title} className="w-40 h-24 rounded-lg object-cover" />
            <div className="flex-1">
                <h3 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">{video.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{channel.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{video.views}</p>
            </div>
        </div>
    );
};