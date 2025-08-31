"use client"

import { useState } from 'react'
import { Compass, TrendingUp, Star, Clock, Users, Search, Filter } from 'lucide-react'

export function DiscoverPage() {
  const [discoveries] = useState([
    {
      id: 1,
      title: 'AI-Powered Content Creation',
      description: 'Discover how AI is revolutionizing content creation across industries',
      category: 'Technology',
      trending: true,
      featured: true,
      views: '2.4K',
      time: '5 min read',
      author: 'AI Insights Team'
    },
    {
      id: 2,
      title: 'Sustainable Business Practices',
      description: 'Explore innovative approaches to building environmentally conscious businesses',
      category: 'Business',
      trending: false,
      featured: true,
      views: '1.8K',
      time: '8 min read',
      author: 'Sustainability Hub'
    },
    {
      id: 3,
      title: 'Future of Remote Work',
      description: 'How remote work is shaping the future of employment and productivity',
      category: 'Workplace',
      trending: true,
      featured: false,
      views: '3.1K',
      time: '6 min read',
      author: 'Work Trends'
    },
    {
      id: 4,
      title: 'Digital Health Revolution',
      description: 'The latest innovations in digital health and telemedicine',
      category: 'Health',
      trending: false,
      featured: true,
      views: '1.5K',
      time: '7 min read',
      author: 'Health Tech'
    },
    {
      id: 5,
      title: 'Blockchain in Finance',
      description: 'Understanding the impact of blockchain technology on traditional finance',
      category: 'Finance',
      trending: true,
      featured: false,
      views: '2.9K',
      time: '10 min read',
      author: 'Crypto Insights'
    },
    {
      id: 6,
      title: 'Climate Change Solutions',
      description: 'Innovative technologies and strategies to combat climate change',
      category: 'Environment',
      trending: false,
      featured: true,
      views: '2.2K',
      time: '9 min read',
      author: 'Green Future'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Technology', 'Business', 'Workplace', 'Health', 'Finance', 'Environment']

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Discover</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-5 transition-colors">
              <Star className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore trending topics, insights, and discoveries from around the world
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search discoveries..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-5 text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Discoveries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discoveries.map((discovery) => (
          <div
            key={discovery.id}
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-5 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            {/* Discovery Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-5 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-5">
                  {discovery.category}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {discovery.trending && (
                  <div className="p-1 bg-orange-100 dark:bg-orange-900/20 rounded-5">
                    <TrendingUp className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                  </div>
                )}
                {discovery.featured && (
                  <div className="p-1 bg-yellow-100 dark:bg-yellow-900/20 rounded-5">
                    <Star className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Discovery Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                {discovery.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                {discovery.description}
              </p>
            </div>

            {/* Discovery Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{discovery.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{discovery.time}</span>
                </div>
              </div>
              <span className="text-xs font-medium">{discovery.author}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no discoveries) */}
      {discoveries.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-5 flex items-center justify-center mx-auto mb-4">
            <Compass className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No discoveries found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search or filters to find more content
          </p>
          <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200">
            Explore All
          </button>
        </div>
      )}
    </div>
  )
}
