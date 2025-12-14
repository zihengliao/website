import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import "./BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const context = require.context('./Posts', false, /\.md$/);
        const filePath = `./${id}.md`;

        const url = context(filePath);
        const res = await fetch(url);
        const text = await res.text();

        // Strip front matter
        const cleaned = text.replace(/^---[\s\S]*?---/, "");

        setContent(cleaned);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setContent("Post not found.");
      }
    };

    loadPost();
  }, [id]);

  return (
    <div className="blog-post-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPost;
