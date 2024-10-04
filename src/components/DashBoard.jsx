import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // stores the ID of the category being deleted

  const token = localStorage.getItem("token");

  // GET
  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.dezinfeksiyatashkent.uz/api/categories"
      );
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // POST
  const handlePost = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsAdding(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await fetch(
        "https://api.dezinfeksiyatashkent.uz/api/categories",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Category added successfully!");
        getCategories();
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error posting new category:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // DELETE
  const handleDeleteCategory = async (id) => {
    setIsDeleting(id);
    try {
      const response = await fetch(
        `https://api.dezinfeksiyatashkent.uz/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Category deleted successfully!");
        getCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  // EDIT
  const handleEdit = (id) => {
    const category = categories.find((item) => item.id === id);
    if (category) {
      setEditingCategoryId(id);
      setName(category.name);
      setDescription(category.description);
      setModalOpen(true);
    }
  };

  // UPDATE Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsEditing(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await fetch(
        `https://api.dezinfeksiyatashkent.uz/api/categories/${editingCategoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Category updated successfully!");
        getCategories();
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <ToastContainer position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={deleteToken}
          className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-all shadow-md"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={() => {
            setModalOpen(true);
            setEditingCategoryId(null);
            setName("");
            setDescription("");
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-all mb-6"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add New Category"}
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded shadow-md hover:bg-blue-600 transition-all"
                      disabled={isEditing}
                    >
                      {isEditing && editingCategoryId === item.id
                        ? "Editing..."
                        : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition-all"
                      disabled={isDeleting === item.id}
                    >
                      {isDeleting === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingCategoryId ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={editingCategoryId ? handleUpdate : handlePost}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  disabled={isAdding || isEditing}
                >
                  {isAdding || isEditing
                    ? editingCategoryId
                      ? "Saving..."
                      : "Adding..."
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
