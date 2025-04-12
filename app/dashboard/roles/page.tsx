"use client"

import { Search, ChevronLeft, ChevronRight, Trash2, Edit, Plus, Eye, EyeOff, X, Info } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function RolesPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Saprun",
      email: "alexsaprun123@gmail.com",
      password: "123@321.com",
      designation: "Accountant",
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sapstar",
      email: "alexsaprun123@gmail.com",
      password: "123@321.com",
      designation: "Super Admin",
      addedOn: "2025-02-03",
      avatar: null,
    },
    {
      id: 3,
      name: "Naina Nohn",
      email: "alexsaprun123@gmail.com",
      password: "123@321.com",
      designation: "Super Admin",
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Alexendra",
      email: "alexsaprun123@gmail.com",
      password: "123@321.com",
      designation: "Accountant",
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "John Sigma",
      email: "alexsaprun123@gmail.com",
      password: "123@321.com",
      designation: "Accountant",
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: ""
  });

  // Handle form input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Open add user modal
  const handleAddClick = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      designation: ""
    });
    setShowAddModal(true);
  };

  // Open edit user modal
  const handleEditClick = (user:any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
      designation: user.designation
    });
    setShowEditModal(true);
  };

  // Open delete user modal
  const handleDeleteClick = (user:any) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Add new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      designation: formData.designation,
      addedOn: new Date().toISOString().split('T')[0],
      avatar: null
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
  };

  // Update user
  const handleUpdateUser = () => {
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? 
      {...user, 
        name: formData.name, 
        email: formData.email, 
        password: formData.password, 
        designation: formData.designation
      } : user
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  // Delete user
  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
  };

  // Component for modal backdrop
  const ModalBackdrop = ({ children, onClose }:any) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 relative">
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Users Roles</h1>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="flex justify-between mb-6">
          <div className="relative w-full max-w-md">
            <input type="text" placeholder="Search Users" className="w-full pl-6 pr-4 py-2 border rounded-full" />
            <Search className="absolute right-6 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center bg-[#2A3356] text-white px-4 py-2 rounded-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add user
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">User name</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Password</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Designation</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Added On</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-500">{user.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{user.password}</td>
                  <td className="px-4 py-4 text-sm">{user.designation}</td>
                  <td className="px-4 py-4 text-sm">{user.addedOn}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex space-x-2 gap-3">
                      <button 
                        className="text-red-500"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-[#2A3356]"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                1
              </div>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Total : 01 Pages
            </div>
          </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <ModalBackdrop onClose={() => setShowAddModal(false)}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-left">Add User Role</h2>
            
            <div className="mb-6 flex ">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">?</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 bg-[#2A3356] p-2 rounded-full">
                  <Edit className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">User Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full" 
                  placeholder="Enter Name" 
                />
              </div>
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">Designation</label>
                <select 
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full" 
                  placeholder="Enter Email Address" 
                />
              </div>
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-full" 
                    placeholder="Enter Password" 
                  />
                  <button 
                    className="absolute right-4 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-8">
              <button 
                onClick={() => setShowAddModal(false)} 
                className="px-8 py-2 bg-gray-200 text-gray-700 rounded-full font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddUser} 
                className="px-10 py-2 bg-[#2A3356] text-yellow-400 rounded-full font-medium"
              >
                Add
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <ModalBackdrop onClose={() => setShowDeleteModal(false)}>
          <div className="text-center py-6">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="../i.png" className=" text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-[#2A3356] mb-4">Delete User?</h2>
            <p className="text-xl text-gray-500 mb-10">
              Are you sure you want to Delete This User Role??
            </p>
            
            <div className="flex justify-center gap-14">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-7 py-3 border border-gray-900 text-gray-700 rounded-full font-medium w-40"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteUser}
                className="px-7 py-3 bg-[#2A3356] text-yellow-400 rounded-full font-medium w-40"
              >
                Yes I am Sure
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <ModalBackdrop onClose={() => setShowEditModal(false)}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-left">Edit User Role</h2>
            
            <div className="mb-6 flex ">
              <div className="relative ">
                {selectedUser.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">{selectedUser.name.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-[#2A3356] p-2 rounded-full">
                  <Edit className="h-5 w-5  text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">User Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full" 
                />
              </div>
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">Designation</label>
                <select 
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full appearance-none"
                >
                  <option value="Accountant">Accountant</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-full" 
                />
              </div>
              <div className="text-left">
                <label className="block text-xl font-medium mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-full" 
                  />
                  <button 
                    className="absolute right-4 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-4 mt-8">
              <button 
                onClick={() => setShowEditModal(false)} 
                className="px-8 py-2 bg-gray-200 text-gray-700 rounded-full font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateUser} 
                className="px-8 py-2 bg-[#2A3356] text-yellow-400 rounded-full font-medium"
              >
                Update
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}
    </div>
  )
}