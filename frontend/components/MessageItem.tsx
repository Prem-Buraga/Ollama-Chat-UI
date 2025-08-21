import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";

export default function MessageItem({ role, content }: { role: "user" | "assistant" | "system"; content: string }) {
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  return (
    <div className={`msg ${isUser ? "msg-user" : "msg-assistant"}`}>
      <div className="text-xs text-subtext mb-1">{role.toUpperCase()}</div>
      {isAssistant ? (
        <div className="prose prose-invert max-w-none codeblock">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] }],
              rehypeHighlight
            ]}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="whitespace-pre-wrap">{content}</div>
      )}
    </div>
  );
}
