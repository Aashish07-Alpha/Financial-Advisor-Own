import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Chatbot from "../Pages/chatbot.jsx";

const ChatbotButton = () => {
  const [open, setOpen] = useState(false);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setRel({
      x: e.clientX - drag.x,
      y: e.clientY - drag.y,
    });
    e.preventDefault();
  };
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setDrag({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
    e.preventDefault();
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 animate-pulse animate-bounce"
          onClick={() => setOpen((o) => !o)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
      {open && (
        <div
          className="fixed bottom-24 right-8 z-50 bg-white/95 rounded-2xl shadow-2xl border border-green-200 w-[85vw] max-w-sm h-[60vh] flex flex-col animate-fade-in"
          style={{
            transform: `translate(${drag.x}px, ${drag.y}px)`,
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          <div
            className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-t-2xl border-b border-green-100 cursor-move select-none"
            onMouseDown={handleMouseDown}
          >
            <span className="font-bold text-green-700">Chatbot</span>
            <button
              className="text-green-700 hover:text-red-500 transition"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <Chatbot />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
