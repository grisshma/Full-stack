import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "HELLO", description: "asdfasdfasdf\nasdfasdfasdfasdf asdfa" }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const filteredTodos = todos.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setFormData({ title: "", description: "" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (todo) => {
    setFormData({ title: todo.title, description: todo.description });
    setEditingId(todo.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleSave = () => {
    if (!formData.title.trim() && !formData.description.trim()) return;

    if (editingId) {
      setTodos(todos.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      setTodos([{ id: Date.now(), ...formData }, ...todos]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fef9c3] font-['Comic_Sans_MS',_cursive] flex flex-col items-center py-20 relative">
      {/* Back button */}
      <button className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#fdf5f5] text-black/60 shadow-sm rounded-[4px] items-center justify-center hover:bg-white transition-colors">
        <IoChevronBack size={18} />
      </button>

      <h1 className="text-5xl font-extrabold mb-12 tracking-wide text-black drop-shadow-sm">
        Todo List
      </h1>

      {/* Search and Add action */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 px-4">
        <div className="flex items-center w-full sm:w-[350px] md:w-[450px] h-[46px] border-[2.5px] border-[#222] rounded-[14px] overflow-hidden bg-transparent">
          <input
            type="text"
            placeholder="search......"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 w-full h-full pl-4 pr-2 bg-transparent outline-none placeholder-[#444] text-[1.1rem] font-semibold tracking-wide"
          />
          <div className="h-full w-[54px] bg-[#ec8383] border-l-[2.5px] border-[#222] flex items-center justify-center shrink-0">
            <IoIosSearch size={24} className="text-[#222] stroke-current stroke-1" />
          </div>
        </div>
        <button 
          onClick={handleAddClick}
          className="h-[46px] px-8 bg-transparent border-[2.5px] border-[#222] rounded-[14px] hover:bg-black/5 transition-colors text-[1.1rem] font-bold"
        >
          Add
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex justify-center flex-wrap gap-6 px-4 w-full max-w-5xl">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="w-[260px] h-[340px] bg-transparent border-[2.5px] border-[#222] rounded-2xl p-5 flex flex-col relative group">
            <h2 className="text-[1.3rem] font-bold mb-4 text-[#222] tracking-wide truncate">
              Title: {todo.title}
            </h2>
            <div className="flex-1 overflow-y-auto mb-[60px] pr-2 custom-scrollbar">
              <p className="font-bold text-[1rem] mb-1 text-[#222]">Description:</p>
              <p className="text-[1rem] leading-tight text-[#333] font-semibold break-words whitespace-pre-wrap">
                {todo.description}
              </p>
            </div>
            {/* Action buttons inside card */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-2">
              <button 
                onClick={() => handleEditClick(todo)}
                className="px-5 py-[2px] pb-[4px] text-[0.95rem] font-bold tracking-wide bg-[#fef9c3] border-[2px] border-[#222] rounded-xl hover:bg-black/5"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(todo.id)}
                className="px-4 py-[2px] pb-[4px] text-[0.95rem] font-bold tracking-wide bg-[#fef9c3] border-[2px] border-[#222] rounded-xl hover:bg-black/5"
              >
                delete
              </button>
            </div>
          </div>
        ))}
        {/* Functional placeholder empty boxes */}
        {filteredTodos.length < 3 && Array.from({ length: 3 - filteredTodos.length }).map((_, i) => (
          <div 
            key={`empty-${i}`} 
            onClick={handleAddClick}
            className="w-[260px] h-[340px] bg-transparent border-[2.5px] border-[#222] rounded-2xl cursor-pointer hover:bg-black/5 transition-colors flex items-center justify-center group"
          >
            <span className="text-black/40 font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              + 
            </span>
          </div>
        ))}
        
        {filteredTodos.length === 0 && searchQuery && (
          <div className="w-full text-center text-xl font-bold mt-10 text-[#444]">
            No items found for "{searchQuery}".
          </div>
        )}
      </div>

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-[#fef9c3] w-full max-w-[400px] border-[2.5px] border-[#222] rounded-2xl p-6 flex flex-col gap-5 drop-shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-1 text-[#222]">
              {editingId ? "Edit Item" : "Add New Item"}
            </h2>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#222] ml-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 bg-transparent border-[2px] border-[#222] rounded-[10px] outline-none font-semibold focus:bg-[#f6cdcd] transition-colors"
                placeholder="Enter title..."
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#222] ml-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 bg-transparent border-[2px] border-[#222] rounded-[10px] outline-none font-semibold focus:bg-[#f6cdcd] transition-colors min-h-[120px] resize-none"
                placeholder="Enter description..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 font-bold bg-transparent border-[2.5px] border-[#222] rounded-xl hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 font-bold bg-[#ec8383] border-[2.5px] border-[#222] rounded-xl hover:bg-[#e07575] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
