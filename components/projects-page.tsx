"use client"

import { useState, useRef, useEffect } from 'react'
import { Plus, Briefcase, MoreVertical, Edit, Trash2, MessageSquare, FolderOpen, Users, Calendar } from 'lucide-react'

interface Chat {
  id: number
  title: string
  lastMessage: string
  timestamp: string
}

interface Project {
  id: number
  name: string
  description: string
  chats: Chat[]
  createdAt: string
  color: string
}

interface ProjectsPageProps {
  chats: Chat[]
  onAddChatToProject?: (chatId: number, projectId: number) => void
}

export function ProjectsPage({ chats, onAddChatToProject }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Web Development",
      description: "All conversations related to web development projects",
      chats: [],
      createdAt: "2025-08-30",
      color: "bg-purple-500"
    },
    {
      id: 2,
      name: "AI Research",
      description: "Research and discussions about artificial intelligence",
      chats: [],
      createdAt: "2025-08-30",
      color: "bg-indigo-500"
    }
  ])
  
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showAddChatModal, setShowAddChatModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')
  const [newProjectColor, setNewProjectColor] = useState('bg-blue-500')
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
    'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-gray-500'
  ]

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now(),
        name: newProjectName.trim(),
        description: newProjectDescription.trim(),
        chats: [],
        createdAt: new Date().toISOString().split('T')[0],
        color: newProjectColor
      }
      setProjects(prev => [...prev, newProject])
      setNewProjectName('')
      setNewProjectDescription('')
      setNewProjectColor('bg-blue-500')
      setShowNewProjectModal(false)
    }
  }

  const handleDeleteProject = (projectId: number) => {
    setProjects(prev => prev.filter(project => project.id !== projectId))
    setOpenMenuId(null)
  }

  const handleAddChatToProject = (chatId: number, projectId: number) => {
    const chat = chats.find(c => c.id === chatId)
    if (chat) {
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, chats: [...project.chats.filter(c => c.id !== chatId), chat] }
          : { ...project, chats: project.chats.filter(c => c.id !== chatId) }
      ))
    }
    setShowAddChatModal(false)
    setSelectedProject(null)
  }

  const handleRemoveChatFromProject = (chatId: number, projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, chats: project.chats.filter(c => c.id !== chatId) }
        : project
    ))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organize your conversations into projects</p>
          </div>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No projects yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first project to organize your conversations</p>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-5 border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Project Header */}
                <div className="relative">
                  <div className={`h-1.5 ${project.color}`}></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{project.chats.length} chats</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{project.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Button */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openMenuId === project.id && (
                          <div 
                            ref={menuRef}
                            className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 shadow-lg z-20"
                          >
                            <div className="py-1">
                              <button 
                                onClick={() => {
                                  setSelectedProject(project)
                                  setShowAddChatModal(true)
                                  setOpenMenuId(null)
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Chat</span>
                              </button>
                              <button 
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit Project</span>
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(project.id)}
                                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete Project</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Chats */}
                <div className="border-t border-gray-200 dark:border-gray-600">
                  {project.chats.length === 0 ? (
                    <div className="p-4 text-center">
                      <MessageSquare className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">No chats in this project</p>
                      <button
                        onClick={() => {
                          setSelectedProject(project)
                          setShowAddChatModal(true)
                        }}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                      >
                        Add your first chat
                      </button>
                    </div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto">
                      {project.chats.slice(0, 3).map((chat) => (
                        <div key={chat.id} className="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{chat.title}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveChatFromProject(chat.id, project.id)}
                              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                              title="Remove from project"
                            >
                              <Trash2 className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {project.chats.length > 3 && (
                        <div className="p-3 text-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{project.chats.length - 3} more chats
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-5 w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Create New Project</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Enter project description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewProjectColor(color)}
                      className={`w-8 h-8 rounded-full ${color} border-2 ${
                        newProjectColor === color 
                          ? 'border-gray-900 dark:border-gray-100' 
                          : 'border-gray-300 dark:border-gray-600'
                      } hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Chat to Project Modal */}
      {showAddChatModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-5 w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add Chat to "{selectedProject.name}"
            </h2>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {chats.filter(chat => !selectedProject.chats.find(c => c.id === chat.id)).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleAddChatToProject(chat.id, selectedProject.id)}
                  className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{chat.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                </button>
              ))}
              {chats.filter(chat => !selectedProject.chats.find(c => c.id === chat.id)).length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  All chats are already in this project
                </p>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowAddChatModal(false)
                  setSelectedProject(null)
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
