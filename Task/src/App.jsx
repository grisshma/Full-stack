import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'HELLO',
      description: 'asdfasdfasdf\nasdfasdfasdfasdf asdfa',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentEditId, setCurrentEditId] = useState(null);
  const [modalForm, setModalForm] = useState({ title: '', description: '' });

  const handleAddClick = () => {
    setModalMode('add');
    setModalForm({ title: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (todo) => {
    setModalMode('edit');
    setCurrentEditId(todo.id);
    setModalForm({ title: todo.title, description: todo.description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
    setModalForm({ title: '', description: '' });
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      const newTodo = {
        id: Date.now(),
        title: modalForm.title,
        description: modalForm.description,
      };
      setTodos([newTodo, ...todos]);
    } else if (modalMode === 'edit') {
      setTodos(
        todos.map((t) =>
          t.id === currentEditId
            ? { ...t, title: modalForm.title, description: modalForm.description }
            : t
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fill empty slots to make at least 3 cards (for visual match with the image)
  const displayItems = [...filteredTodos];
  while (displayItems.length < 3) {
    displayItems.push({ id: `empty-${displayItems.length}`, isEmpty: true });
  }

  return (
    <>
      <div className={`min-h-screen py-16 px-4 max-w-5xl mx-auto ${isModalOpen ? 'opacity-90 blur-[1px]' : ''} transition-all duration-300`}>
        <h1 className="text-[3.5rem] font-bold text-center mb-12 tracking-wide">
          Todo List
        </h1>

        <div className="flex justify-center items-center gap-4 mb-20">
          <div className="flex items-center w-[400px]">
            <input
              type="text"
              placeholder="search......"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-[2px] border-black rounded-l-xl py-2 px-4 focus:outline-none bg-transparent font-semibold"
            />
            <button className="border-[2px] border-l-0 border-black bg-[#de7171] hover:bg-[#d66a69] text-black px-4 py-2 rounded-r-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <button
            onClick={handleAddClick}
            className="border-[2px] border-black rounded-xl px-8 py-2.5 bg-transparent hover:bg-black/5 font-bold text-[15px] tracking-wide transition-colors"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayItems.map((todo) => (
            <div
              key={todo.id}
              className={`border-[2px] border-black rounded-[20px] p-6 h-[400px] flex flex-col bg-transparent ${
                todo.isEmpty ? 'opacity-90' : ''
              }`}
            >
              {!todo.isEmpty ? (
                <div className="flex flex-col h-full">
                  <h2 className="font-bold text-2xl mb-6 truncate">
                    Title: {todo.title}
                  </h2>
                  <div className="text-[15px] space-y-1 mb-4 flex-1 content-start leading-tight">
                    <p className="font-bold mb-1">Description:</p>
                    <p className="whitespace-pre-wrap font-semibold leading-relaxed line-clamp-6">{todo.description}</p>
                  </div>

                  <div className="flex gap-4 mt-auto pl-2 mb-2">
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="border-[2px] border-black rounded-full px-6 py-1 text-[15px] font-bold hover:bg-black/5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="border-[2px] border-black rounded-full px-4 py-1 text-[15px] font-bold hover:bg-black/5"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-[#fef5cb] border-[2px] border-black rounded-[20px] p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-[28px] font-bold text-center mb-8 tracking-wide">
              {modalMode === 'add' ? 'Add New Item' : 'Edit Item'}
            </h2>
            
            <div className="mb-6">
              <label className="block font-bold mb-2 text-lg">Title</label>
              <input
                type="text"
                value={modalForm.title}
                onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                placeholder={modalMode === 'add' ? "Enter title..." : "Title"}
                className="w-full border-[2px] border-black rounded-xl py-3 px-4 focus:outline-none bg-transparent font-semibold"
              />
            </div>

            <div className="mb-10">
              <label className="block font-bold mb-2 text-lg">Description</label>
              <textarea
                value={modalForm.description}
                onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
                placeholder={modalMode === 'add' ? "Enter description..." : "Description"}
                className="w-full border-[2px] border-black rounded-xl p-4 min-h-[140px] focus:outline-none bg-transparent resize-none font-semibold"
              />
            </div>

            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={closeModal}
                className="border-[2px] border-black rounded-xl px-6 py-2 bg-transparent hover:bg-black/5 font-bold text-[16px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="border-[2px] border-black rounded-xl px-8 py-2 bg-[#df7a79] hover:bg-[#d66a69] font-bold text-[16px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
