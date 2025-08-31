"use client"

import { useState, useEffect } from 'react'
import { 
  X, Settings, User, Bell, Shield, Palette, Languages, Mic, 
  Eye, MessageSquare, Download, Trash2, HelpCircle, 
  ChevronRight, Volume2, Globe, Moon, Sun, Monitor
} from 'lucide-react'

interface SettingsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPopup({ isOpen, onClose }: SettingsPopupProps) {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'en',
    voiceEnabled: true,
    soundEnabled: true,
    notifications: true,
    autoSave: true,
    dataCollection: false,
    betaFeatures: false,
    fontSize: 'medium',
    apiModel: 'gpt-4',
    conversationMemory: 20,
    autoComplete: true,
    showSuggestions: true,
    exportFormat: 'json'
  })

  const settingsSections = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'language', name: 'Language & Voice', icon: Languages },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'data', name: 'Data & Storage', icon: Download },
    { id: 'help', name: 'Help & Support', icon: HelpCircle }
  ]

  const themeOptions = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor }
  ]



  const fontSizes = [
    { id: 'small', name: 'Small', preview: 'text-sm' },
    { id: 'medium', name: 'Medium', preview: 'text-base' },
    { id: 'large', name: 'Large', preview: 'text-lg' },
    { id: 'extra-large', name: 'Extra Large', preview: 'text-xl' }
  ]

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleExportData = () => {
    console.log('Exporting user data...')
    // Implementation for data export
  }

  const handleDeleteData = () => {
    console.log('Deleting user data...')
    // Implementation for data deletion
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">General Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-save conversations</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save your chat history</p>
            </div>
            <button
              onClick={() => updateSetting('autoSave', !settings.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.autoSave ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show conversation suggestions</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Display suggested prompts during conversations</p>
            </div>
            <button
              onClick={() => updateSetting('showSuggestions', !settings.showSuggestions)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showSuggestions ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.showSuggestions ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-complete prompts</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enable intelligent prompt completion</p>
            </div>
            <button
              onClick={() => updateSetting('autoComplete', !settings.autoComplete)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoComplete ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.autoComplete ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Conversation memory (messages)
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={settings.conversationMemory}
              onChange={(e) => updateSetting('conversationMemory', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5</span>
              <span className="font-medium">{settings.conversationMemory}</span>
              <span>50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Appearance</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((theme) => {
                const IconComponent = theme.icon
                return (
                  <button
                    key={theme.id}
                    onClick={() => updateSetting('theme', theme.id)}
                    className={`p-3 border-2 rounded-5 transition-all ${
                      settings.theme === theme.id
                        ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{theme.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Font Size</label>
            <div className="space-y-2">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => updateSetting('fontSize', size.id)}
                  className={`w-full p-3 text-left border rounded-5 transition-all ${
                    settings.fontSize === size.id
                      ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <span className={`${size.preview} text-gray-700 dark:text-gray-300`}>{size.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Language & Voice</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Interface Language</label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Voice input</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enable voice-to-text input</p>
            </div>
            <button
              onClick={() => updateSetting('voiceEnabled', !settings.voiceEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.voiceEnabled ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.voiceEnabled ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sound effects</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Play sounds for interactions</p>
            </div>
            <button
              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.soundEnabled ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Privacy & Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data collection for improvement</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Help improve Xyra AI by sharing anonymous usage data</p>
            </div>
            <button
              onClick={() => updateSetting('dataCollection', !settings.dataCollection)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dataCollection ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.dataCollection ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Beta features</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Access experimental features (may be unstable)</p>
            </div>
            <button
              onClick={() => updateSetting('betaFeatures', !settings.betaFeatures)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.betaFeatures ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.betaFeatures ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">AI Model Settings</h4>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Preferred AI Model</label>
              <select
                value={settings.apiModel}
                onChange={(e) => updateSetting('apiModel', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="gpt-4">GPT-4 (Most Capable)</option>
                <option value="gpt-3.5">GPT-3.5 (Fast & Efficient)</option>
                <option value="claude">Claude (Advanced Reasoning)</option>
                <option value="gemini">Gemini (Multimodal)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable notifications</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications for important updates</p>
            </div>
            <button
              onClick={() => updateSetting('notifications', !settings.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                  settings.notifications ? 'bg-white dark:bg-black translate-x-6' : 'bg-white translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Data & Storage</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Export Format</label>
            <select
              value={settings.exportFormat}
              onChange={(e) => updateSetting('exportFormat', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="txt">Plain Text</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center space-x-2 p-3 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-5 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export All Data</span>
            </button>
            
            <button
              onClick={handleDeleteData}
              className="w-full flex items-center justify-center space-x-2 p-3 border border-red-500 text-red-600 dark:text-red-400 rounded-5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderHelpSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Help & Support</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm text-gray-700 dark:text-gray-300">Documentation</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm text-gray-700 dark:text-gray-300">Keyboard Shortcuts</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm text-gray-700 dark:text-gray-300">Contact Support</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm text-gray-700 dark:text-gray-300">About Xyra AI</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings()
      case 'appearance': return renderAppearanceSettings()
      case 'language': return renderLanguageSettings()
      case 'privacy': return renderPrivacySettings()
      case 'notifications': return renderNotificationSettings()
      case 'data': return renderDataSettings()
      case 'help': return renderHelpSettings()
      default: return renderGeneralSettings()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-2 sm:p-4">
      <div 
        className={`bg-white dark:bg-gray-900 rounded-5 w-full max-w-4xl h-[95vh] sm:h-[85vh] flex flex-col sm:flex-row overflow-hidden shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Mobile Header with horizontal tabs */}
        <div className="sm:hidden p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {settingsSections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-5 transition-all duration-200 whitespace-nowrap text-sm ${
                    activeSection === section.id
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{section.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden sm:flex w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {settingsSections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-5 transition-all mb-1 ${
                    activeSection === section.id
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderContent()}
          </div>
          
          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-5 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
