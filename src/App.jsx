import 'react'
import './App.css';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [summaryModal, setSummaryModal] = useState({ isOpen: false, title: '', content: '', isLoading: false });
  const [genericModal, setGenericModal] = useState({ isOpen: false, title: '', content: ''});
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState({});
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoStats, setVideoStats] = useState({});

  useEffect(() => {
    const loadData = async () => {
        const videoData = await api.fetchVideos();
        const channelData = await api.fetchChannels();
        setVideos(videoData);
        setChannels(channelData);
        
        const stats = {};
        videoData.forEach(v => {
            stats[v.id] = { likes: v.likes, userAction: null }; // null, 'like', or 'dislike'
        });
        setVideoStats(stats);
    };
    loadData();
  }, []);

  const handleToggleSubscription = async (channelId) => {
      if (!isLoggedIn) { setIsSignInModalOpen(true); return; }
      const updatedChannels = await api.toggleSubscription(channels, channelId);
      setChannels(updatedChannels);
  };

  const handleLikeDislike = (videoId, action) => {
      if (!isLoggedIn) { setIsSignInModalOpen(true); return; }
      setVideoStats(prevStats => {
          const current = prevStats[videoId];
          const newStats = { ...prevStats };
          let newLikes = current.likes;
          let newAction = action;

          if (current.userAction === action) { // User clicks the same button again
              newAction = null;
              if (action === 'like') newLikes -= 1;
          } else { // User clicks a new button
              if (current.userAction === 'like') newLikes -= 1;
              if (action === 'like') newLikes += 1;
          }
          newStats[videoId] = { likes: newLikes, userAction: newAction };
          return newStats;
      });
  };
  
  const handleShare = (video) => {
    const url = `https://www.youtube.com/watch?v=${getVideoId(video.url)}`;
    navigator.clipboard.writeText(url).then(() => {
        setGenericModal({isOpen: true, title: 'Link Copied!', content: 'The video link has been copied to your clipboard.'});
    });
  };

  const handleDownload = () => {
      setGenericModal({isOpen: true, title: 'Premium Feature', content: 'Downloading videos is available for Premium members only.'});
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSummaryModal = () => setSummaryModal({ ...summaryModal, isOpen: false });
  const handleSignIn = () => { setIsLoggedIn(true); setIsSignInModalOpen(false); };
  const handleSignOut = () => setIsLoggedIn(false);
  const handleSignUp = () => { setIsLoggedIn(true); setIsSignUpModalOpen(false); };
  const handleSwitchToSignUp = () => { setIsSignInModalOpen(false); setIsSignUpModalOpen(true); };
  const handleSwitchToSignIn = () => { setIsSignUpModalOpen(false); setIsSignInModalOpen(true); };
  const handleVideoSelect = (video) => { setSelectedVideo(video); setCurrentPage('video'); window.scrollTo(0, 0); };
  const handleGoHome = () => { setCurrentPage('home'); setSelectedVideo(null); };
  
  const generateSummary = async (title) => {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: `Summarize the following hypothetical YouTube video in a short, engaging paragraph: "${title}"` }] }] };
    
    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setSummaryModal({ isOpen: true, title, content: text || "Could not generate summary.", isLoading: false });
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryModal({ isOpen: true, title, content: "An error occurred.", isLoading: false });
    }
  };

  const handleSummarizeClick = (title) => {
    setSummaryModal({ isOpen: true, title, content: '', isLoading: true });
    generateSummary(title);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen">
      <Header toggleSidebar={toggleSidebar} onSignIn={() => setIsSignInModalOpen(true)} onSignOut={handleSignOut} isLoggedIn={isLoggedIn} onGoHome={handleGoHome} />
      {isBannerVisible && currentPage === 'home' && <PromotionBanner onClose={() => setIsBannerVisible(false)} />}
      <Sidebar isOpen={isSidebarOpen} isBannerVisible={isBannerVisible && currentPage === 'home'} onGoHome={handleGoHome} />
      
      {currentPage === 'home' ? (
        <MainContent isSidebarOpen={isSidebarOpen} isBannerVisible={isBannerVisible} videos={videos} channels={channels} onVideoSelect={handleVideoSelect} />
      ) : (
        <VideoPage 
            video={selectedVideo} 
            channel={channels[selectedVideo.channelId]} 
            upNextVideos={videos.filter(v => v.id !== selectedVideo.id)} 
            allChannels={channels} 
            onToggleSubscription={handleToggleSubscription} 
            onSummarize={handleSummarizeClick} 
            onVideoSelect={handleVideoSelect} 
            isSidebarOpen={isSidebarOpen} 
            handleLikeDislike={handleLikeDislike}
            videoStats={videoStats}
            handleShare={handleShare}
            handleDownload={handleDownload}
        />
      )}

      <GenericModal isOpen={summaryModal.isOpen} onClose={handleCloseSummaryModal} title={`✨ AI Summary: ${summaryModal.title}`}>
        {summaryModal.isLoading ? <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div> : <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{summaryModal.content}</p>}
      </GenericModal>
      <GenericModal isOpen={genericModal.isOpen} onClose={() => setGenericModal({isOpen: false, title: '', content: ''})} title={genericModal.title}><p>{genericModal.content}</p></GenericModal>
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} onSignIn={handleSignIn} onSwitchToSignUp={handleSwitchToSignUp} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} onSignUp={handleSignUp} onSwitchToSignIn={handleSwitchToSignIn} />
    </div>
  );
}
