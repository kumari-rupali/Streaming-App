const CommentsSection = ({ comments }) => (
    <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>
        <div className="flex items-center space-x-4 mb-6">
            <UserCircleIcon size={10} />
            <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="space-y-6">
            {comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-4">
                    <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-sm">{comment.user}</p>
                        <p>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);