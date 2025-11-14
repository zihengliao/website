// Blog.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const context = require.context('./Posts', false, /\.md$/); // dynamically import markdown files in this folder
        const keys = context.keys();
        
        const postsPromises = keys.map(async (fileName) => {
          const module = context(fileName);
          const fileUrl = module.default || module;
          
          const response = await fetch(fileUrl);    // the markdown file becomes URL since im dynamically importing
          const content = await response.text();
          
          const id = fileName.replace('./', '').replace('.md', '');
          
          // Extract frontmatter
          const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
          const match = content.match(frontmatterRegex);
          
          let title = id;
          let date = '';
          
          if (match) {
            const frontmatter = match[1];
            const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?\s*$/m);
            const dateMatch = frontmatter.match(/date:\s*["']?(.+?)["']?\s*$/m);
            
            if (titleMatch) title = titleMatch[1].replace(/["']/g, '');
            if (dateMatch) date = dateMatch[1].replace(/["']/g, '');
          }
          
          return {
            id,
            title,
            date,
            content
          };
        });
        
        const posts = await Promise.all(postsPromises);
        
        // Sort by date (newest first)
        posts.sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(b.date) - new Date(a.date);
        });
        
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="blog-list-container">
      <h1>Blog</h1>
      <div className="blog-posts">
        {blogPosts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} className="blog-post-card-link">
              <div className="blog-post-card">
                {post.date && <p className="blog-date">{post.date}</p>}
                <h2>{post.title}</h2>
              </div>
            </Link>

          ))
        )}
      </div>
    </div>
  );
};

export default Blog;