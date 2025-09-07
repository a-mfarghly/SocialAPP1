import React from 'react';
import './Post.css';

const Post = ({ post, onLike }) => {
  const handleLike = () => {
    if (onLike) {
      onLike();
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info">
          <div className="post-avatar">
            {post.user.profilePhoto ? (
              <img 
                src={post.user.profilePhoto} 
                alt={post.user.name} 
                className="profile-photo"
              />
            ) : (
              post.user.initials
            )}
          </div>
          <div className="post-user-details">
            <div className="post-user-name">{post.user.name}</div>
            <div className="post-timestamp">{post.timestamp}</div>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        <button 
          className={`post-action-btn like-btn${post.isLiked ? ' liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">
            {post.isLiked ? '❤️' : '🤍'}
          </span>
          <span className="action-text">
            {post.isLiked ? 'Liked' : 'Like'}
          </span>
          <span className="action-count">{post.likes}</span>
        </button>

        <button className="post-action-btn comment-btn">
          <span className="action-icon">💬</span>
          <span className="action-text">Comment</span>
          <span className="action-count">{post.comments}</span>
        </button>

        <button className="post-action-btn share-btn">
          <span className="action-icon">📤</span>
          <span className="action-text">Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post; 