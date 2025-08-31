"use client"

import { useState } from 'react'
import { Plus, FolderOpen, Users, Calendar, Search } from 'lucide-react'

export function SpacesPage() {
  const [spaces] = useState([
    {
      id: 1,
      name: 'AI Research Team',
      description: 'Collaborative space for AI research and development',
      members: 12,
      lastActive: '2 hours ago',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Product Development',
      description: 'Product planning and feature discussions',
      members: 8,
      lastActive: '1 day ago',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Marketing Strategy',
      description: 'Marketing campaigns and brand strategy',
      members: 15,
      lastActive: '3 hours ago',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Customer Support',
      description: 'Customer feedback and support tickets',
      members: 6,
      lastActive: '5 hours ago',
      color: 'bg-orange-500'
    }
  ])

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Spaces</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200">
            <Plus className="w-4 h-4" />
            <span>Create Space</span>
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Organize your work into collaborative spaces for better productivity
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search spaces..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            {/* Space Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${space.color} rounded-5 flex items-center justify-center`}>
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-all duration-200">
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Space Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {space.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {space.description}
              </p>
            </div>

            {/* Space Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{space.members} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{space.lastActive}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no spaces) */}
      {spaces.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-5 flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No spaces yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Create your first space to start collaborating with your team
          </p>
          <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200">
            Create Space
          </button>
        </div>
      )}
    </div>
  )
}
