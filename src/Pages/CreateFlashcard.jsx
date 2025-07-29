// src/pages/CreateFlashcard.jsx
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Tabs from "../Components/Tabs";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useFormik } from "formik";

// Redux imports
import { useDispatch } from "react-redux";
import { addFlashcard } from "../redux/flashcardSlice";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function CreateFlashcard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!groupName || !description || flashcards.length === 0) {
    setError("Please fill in all the fields");
    return;
  }
  

  // Proceed to submit
  setError(""); // Clear error
};
  const [fields, setFields] = useState([
    { term: "", definition: "", image: null },
  ]);

  // Convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const formik = useFormik({
    initialValues: {
      groupName: "",
      image: null,
      description: "",
    },
    onSubmit: async (values) => {
      try {
        const groupImageBase64 = values.image
          ? await fileToBase64(values.image)
          : null;

        const flashcardsWithBase64 = await Promise.all(
          fields.map(async (field) => ({
            ...field,
            image: field.image ? await fileToBase64(field.image) : null,
          }))
        );
        // Group-level fields
        const data = {
          groupName: values.groupName,
          description: values.description,
          image: groupImageBase64,
          flashcards: flashcardsWithBase64,
        };

        dispatch(addFlashcard(data));
        toast.success("Flashcard Created!", {
          position: "top-center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
        navigate("/my-flashcards");

        formik.resetForm();
        setFields([{ term: "", definition: "", image: null }]);
      } catch (err) {
        console.error("Image conversion error:", err);
      }
    },
  });
// Handle input change for terms
  const handleFieldChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };
// Terms list
  const addField = () => {
    setFields([...fields, { term: "", definition: "", image: null }]);
  };
// Handle removing a specific term
  const removeField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Tabs active="create" />

      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Flashcard
        </h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          {/* Group + Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Create Group<span className="text-red-500">*</span>
              </label>
              <select
                name="groupName"
                value={formik.values.groupName}
                onChange={formik.handleChange}
                required
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select a group
                </option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="FullStack">FullStack</option>
                <option value="Database">Database</option>
                <option value="Web 1">Web 1</option>
                <option value="Web 2">Web 2</option>
                <option value="Web 3">Web 3</option>
                <option value="Web 4">Web 4</option>
                <option value="Web 5">Web 5</option>
                <option value="Web 6">Web 6</option>
                <option value="Web 7">Web 7</option>
                <option value="Web 8">Web 8</option>
                <option value="Web 9">Web 9</option>
                <option value="Web 10">Web 10</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 top-[24px] flex items-center text-gray-400 pr-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Upload Image
              </label>
              <input
              
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  
                  formik.setFieldValue("image", e.currentTarget.files[0])
                }
                
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Describe the flashcard group..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Flashcard Inputs */}
          {fields.map((field, index) => (
            <div
              key={index}
              className="relative border rounded-lg p-4 mt-4 bg-gray-50"
            >
              <div className="text-sm absolute -top-2 left-2 bg-white px-2 text-blue-600 font-bold">
                {index + 1}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <input
                  type="text"
                  placeholder="Enter Term *"
                  value={field.term}
                  onChange={(e) =>
                    handleFieldChange(index, "term", e.target.value)
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />

                <input
                  type="text"
                  placeholder="Enter Definition"
                  value={field.definition}
                  onChange={(e) =>
                    handleFieldChange(index, "definition", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    handleFieldChange(index, "image", e.currentTarget.files[0])
                  }
                  className="w-[80%] px-4 py-2 border border-gray-300 rounded-lg bg-white text-[12px]"
                />
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="absolute top-4 right-2 text-red-600 hover:text-red-800"
                  title="Remove this set"
                >
                  <FiTrash size={18} />
                </button>
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={addField}
              className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition"
            >
              <FiPlus className="mr-2" /> Add More
            </button>
                
                {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Flashcard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
