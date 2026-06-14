import React, { useState } from "react";
import { Pet, CommunityPost } from "../types";
import { COMMUNITY_DATA } from "../data";
import { TRANSLATIONS } from "../utils";
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Plus, 
  Sparkles, 
  X, 
  Heart, 
  Clipboard,
  Send,
  User,
  CheckCircle2
} from "lucide-react";

interface CommunityForumProps {
  activePet: Pet;
  lang: string;
}

export default function CommunityForum({ activePet, lang }: CommunityForumProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_DATA);
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>("All");

  // Form input states for creating a new post
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState<"General" | "Health" | "Diet" | "Urgent" | "Welfare">("General");

  // State for writing a comment reply inline
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const handleLikePost = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const postItem: CommunityPost = {
      id: "post-" + Math.random().toString(36).substring(2, 6),
      authorName: activePet.ownerName || "Pet Lover",
      authorRole: "Owner",
      city: activePet.city,
      avatarColor: activePet.avatarColor || "bg-indigo-600",
      title: newTitle,
      content: newContent,
      likes: 0,
      commentsCount: 0,
      date: new Date().toISOString().split("T")[0],
      tag: newTag,
      replies: []
    };

    setPosts([postItem, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowAddPostModal(false);
  };

  const handleAddReply = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updateReplies = post.replies ? [...post.replies] : [];
        updateReplies.push({
          authorName: activePet.ownerName || "Pet Lover",
          authorRole: "Owner",
          content: text,
          date: new Date().toISOString().split("T")[0]
        });
        return { 
          ...post, 
          replies: updateReplies,
          commentsCount: post.commentsCount + 1 
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const filteredPosts = selectedTagFilter === "All"
    ? posts
    : posts.filter(post => post.tag === selectedTagFilter);

  const tagsList = ["All", "General", "Health", "Diet", "Urgent", "Welfare"];

  return (
    <div className="space-y-6 animate-fade-in" id="community-view">
      
      {/* 1. SECTOR: FORUM INTRO AND ACTIONS */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-1.5">
              <span>💬</span>
              <span>{t.communityFeed}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Seek help or exchange immunization and food guidance coordinates with domestic pet guardians in Pakistan
            </p>
          </div>

          <button
            type="button"
            id="btn-trigger-write-post"
            onClick={() => setShowAddPostModal(true)}
            className="w-full md:w-auto px-4 py-2.5 bg-indigo-650 hover:bg-indigo-800 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.createPost}</span>
          </button>
        </div>

        {/* Filters bar tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {tagsList.map(tag => (
            <button
              key={tag}
              type="button"
              id={`btn-filter-tag-${tag}`}
              onClick={() => setSelectedTagFilter(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTagFilter === tag
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              # {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CHAT FEED LOG CARDS GRID */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-6 border border-slate-150 shadow-xs space-y-4"
          >
            
            {/* Author info line */}
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  style={{ backgroundColor: activePet.avatarColor }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black select-none"
                >
                  {post.authorName[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-snug">
                    <span className="font-black text-xs text-slate-800">{post.authorName}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                      {post.authorRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{post.city} • {post.date}</span>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                # {post.tag}
              </span>
            </div>

            {/* Post message block */}
            <div className="space-y-1.5 font-sans">
              <h4 className="font-sans font-black text-slate-800 text-base leading-snug pr-4 hover:text-indigo-900 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{post.content}</p>
            </div>

            {/* Action panel metrics */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-bold">
              <button
                type="button"
                id={`btn-like-post-${post.id}`}
                onClick={() => handleLikePost(post.id)}
                className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} {t.likes}</span>
              </button>

              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span>{post.commentsCount} {t.comments}</span>
              </div>
            </div>

            {/* Replies section */}
            {post.replies && post.replies.length > 0 && (
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Replies & Answers</span>
                <div className="space-y-3 divide-y divide-slate-100">
                  {post.replies.map((reply, index) => (
                    <div key={index} className="pt-2 first:pt-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-indigo-950">{reply.authorName}</span>
                        <span className="text-[8px] font-bold px-1 rounded bg-indigo-50 text-indigo-600 uppercase">{reply.authorRole}</span>
                        <span className="text-[9px] text-slate-400 ml-auto">{reply.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-1 leading-relaxed">{reply.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Write reply inline bar */}
            <div className="flex gap-2 pt-2 border-t border-slate-100/60">
              <input
                type="text"
                id={`reply-input-${post.id}`}
                aria-label="Write a reply comment"
                placeholder="Write a helpful answer reply..."
                value={commentInputs[post.id] || ""}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                className="flex-grow rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 bg-white"
              />
              <button
                type="button"
                id={`btn-reply-submit-${post.id}`}
                onClick={() => handleAddReply(post.id)}
                className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-3.5 py-2 flex items-center justify-center transition-all cursor-pointer text-xs font-black"
                title="Submit comment"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* --- FLOATING WRITE NEW POST MODAL DIALOG --- */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100" id="addpost-modal">
            
            <div className="bg-indigo-900 text-white p-6 justify-between flex items-center">
              <h3 className="text-lg font-black font-sans">Publish Advice Line</h3>
              <button
                type="button"
                id="btn-close-post-modal"
                onClick={() => setShowAddPostModal(false)}
                className="p-1 text-indigo-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="p-6 space-y-4">
              <div>
                <label htmlFor="post-title-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Headline / Question title *</label>
                <input
                  type="text"
                  id="post-title-input"
                  required
                  placeholder="e.g. Sourcing salmon oil brand in Quetta?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label htmlFor="post-tag-select" className="block text-xs font-bold text-slate-600 uppercase mb-1">Tag Topic</label>
                <select
                  id="post-tag-select"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-white text-slate-700"
                >
                  <option value="General">General Questions</option>
                  <option value="Health">Clinic & Vaccinations</option>
                  <option value="Diet">Food & Stomach Cure</option>
                  <option value="Urgent">Urgent Emergency</option>
                  <option value="Welfare">Stray Rescue / Adoption</option>
                </select>
              </div>

              <div>
                <label htmlFor="post-content-textarea" className="block text-xs font-bold text-slate-600 uppercase mb-1">Detailed Content description *</label>
                <textarea
                  id="post-content-textarea"
                  required
                  rows={4}
                  placeholder="Ask our local community anything..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  id="btn-cancel-post"
                  onClick={() => setShowAddPostModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-add-post-submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 shadow shadow-indigo-100 cursor-pointer"
                >
                  Publish Post
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
