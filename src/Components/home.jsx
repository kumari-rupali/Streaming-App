const HomePage = ({ isSidebarOpen, isBannerVisible, onCloseBanner, videos, channels, onVideoSelect }) => (
    <>
        {isBannerVisible && <PromotionBanner onClose={onCloseBanner} />}
        <main className={`transition-all duration-300 ease-in-out ${isBannerVisible ? 'pt-36' : 'pt-24'} ${isSidebarOpen ? 'ml-0 md:ml-20 lg:ml-64' : 'ml-0 md:ml-20'}`}>
            <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map(video => (
                    <VideoCard 
                        key={video.id} 
                        video={video} 
                        channel={channels[video.channelId]} 
                        onVideoSelect={onVideoSelect} 
                    />
                ))}
            </div>
        </main>
    </>
);