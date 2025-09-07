import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import './Feed.css';
import { AuthContext } from '../App';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const loadPosts = useCallback(() => {
    setIsLoading(true);
    
    // Simulate loading posts
    setTimeout(() => {
      const samplePosts = [
        {
          id: 1,
          user: {
            name: 'Sarah Johnson',
            username: 'sarah_j',
            initials: 'SJ',
            profilePhoto: null
          },
          content: 'Just finished an amazing workout session! 💪 The morning energy is unmatched. Who else loves starting their day with some exercise?',
          timestamp: '2 hours ago',
          likes: 24,
          comments: 8,
          isLiked: false
        },
        {
          id: 2,
          user: {
            name: 'Alex Chen',
            username: 'alex_dev',
            initials: 'AC',
            profilePhoto: null
          },
          content: 'Working on a new React project with some amazing features. The developer experience keeps getting better! 🚀 #ReactJS #WebDev',
          timestamp: '4 hours ago',
          likes: 42,
          comments: 15,
          isLiked: false
        },
        {
          id: 3,
          user: {
            name: 'Maria Rodriguez',
            username: 'maria_art',
            initials: 'MR',
            profilePhoto: null
          },
          content: 'Spent the weekend painting in the park. Nature provides the best inspiration! 🌳 Here\'s to finding creativity in everyday moments.',
          timestamp: '6 hours ago',
          likes: 67,
          comments: 23,
          isLiked: false
        }
      ];
      setPosts(samplePosts);
      setIsLoading(false);
    }, 500);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Load posts when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadPosts();
    }
  }, [isAuthenticated, user, loadPosts]);

  const currentUser = useMemo(() => ({
    name: user?.name || 'Amr Mahmoud',
    initials: user?.name ? 
      user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AM'
  }), [user?.name]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsCreating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPostObj = {
        id: Date.now(),
        user: {
          name: currentUser.name,
          username: currentUser.name.toLowerCase().replace(/\s+/g, '_'),
          initials: currentUser.initials,
          profilePhoto: localStorage.getItem('profilePhoto')
        },
        content: newPost.trim(),
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        isLiked: false
      };

      setPosts(prev => [newPostObj, ...prev]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
      // You could add a toast notification here for better UX
      alert('Failed to create post. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLikePost = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="feed-loading">
        <div className="loading-spinner"></div>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  // Show loading while loading posts
  if (isLoading) {
    return (
      <div className="feed-loading">
        <div className="loading-spinner"></div>
        <p>Loading your feed...</p>
      </div>
    );
  }

  return (
    <div className="feed-page custom-feed-bg">
      <div className="container">
        <div className="feed-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome back, <span className="user-name">{currentUser.name.split(' ')[0]}</span>! 👋
            </h1>
            <p className="welcome-subtitle">Here's what's happening in your community</p>
          </div>

          {/* Create Post Section */}
          <div className="create-post-section">
            <div className="create-post-card">
              <div className="create-post-header">
                <div className="create-post-avatar">
                  {localStorage.getItem('profilePhoto') ? (
                    <img 
                      src={localStorage.getItem('profilePhoto')} 
                      alt="Profile" 
                      className="profile-photo"
                    />
                  ) : (
                    <div className="avatar-initials">{currentUser.initials}</div>
                  )}
                </div>
                <form onSubmit={handleCreatePost} className="create-post-form">
                  <textarea
                    className="create-post-input"
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    disabled={isCreating}
                    rows="3"
                    maxLength="500"
                  />
                  <div className="create-post-actions">
                    <div className="post-char-count">
                      {newPost.length}/500
                    </div>
                    <button 
                      type="submit" 
                      className={`create-post-btn ${isCreating ? 'creating' : ''}`}
                      disabled={!newPost.trim() || isCreating}
                    >
                      {isCreating ? (
                        <>
                          <span className="loading-spinner-small"></span>
                          Posting...
                        </>
                      ) : (
                        'Post'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {posts.length > 0 ? (
              posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  onLike={() => handleLikePost(post.id)}
                />
              ))
            ) : (
              <div className="no-posts">
                <div className="no-posts-icon">📝</div>
                <h3>No posts yet</h3>
                <p>Be the first to share something with your community!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
