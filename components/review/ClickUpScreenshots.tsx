'use client'

import React, { useState } from 'react'

// Mock ClickUp-style screenshots using styled divs
const mockScreenshots = {
  dashboard: {
    title: 'Dashboard View',
    component: <DashboardMock />
  },
  listView: {
    title: 'List View',
    component: <ListViewMock />
  },
  ganttChart: {
    title: 'Gantt Chart',
    component: <GanttMock />
  },
  kanban: {
    title: 'Board View',
    component: <KanbanMock />
  },
  calendar: {
    title: 'Calendar View',
    component: <CalendarMock />
  },
  docs: {
    title: 'Docs',
    component: <DocsMock />
  }
}

function DashboardMock() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Dashboard</h3>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">This Week</div>
          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Filter</div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">42</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">18</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg">
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">5</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Review</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">89%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">On Track</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Team Progress</h4>
          <div className="space-y-3">
            {['Design Team', 'Development', 'Marketing', 'Sales'].map((team, i) => (
              <div key={team}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{team}</span>
                  <span className="text-gray-900 dark:text-white">{75 + i * 5}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${75 + i * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {[
              'Sarah completed "Design System Update"',
              'Mike commented on "API Integration"',
              'Lisa created new task "User Testing"',
              'Tom moved "Feature X" to In Progress'
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ListViewMock() {
  const tasks = [
    { name: 'Design new landing page', status: 'In Progress', priority: 'High', assignee: 'Sarah K.', due: 'Dec 15' },
    { name: 'Implement user authentication', status: 'In Progress', priority: 'Critical', assignee: 'Mike R.', due: 'Dec 18' },
    { name: 'Write API documentation', status: 'To Do', priority: 'Medium', assignee: 'Lisa M.', due: 'Dec 20' },
    { name: 'Conduct user testing', status: 'Review', priority: 'High', assignee: 'Tom B.', due: 'Dec 14' },
    { name: 'Deploy to production', status: 'To Do', priority: 'Critical', assignee: 'John D.', due: 'Dec 22' },
  ]
  
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sprint Tasks</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">+ New Task</button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">⚙ View</button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Task Name</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Priority</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Assignee</th>
              <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span className="text-gray-900 dark:text-white">{task.name}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    task.status === 'To Do' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    task.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                      {task.assignee[0]}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{task.assignee}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400 text-sm">{task.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function GanttMock() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Timeline</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Today</button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Month</button>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-1 mb-2">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
          <div key={month} className="text-xs text-gray-600 dark:text-gray-400 text-center">{month}</div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <div className="w-32 text-sm text-gray-700 dark:text-gray-300">Phase 1</div>
          <div className="flex-1 relative h-8">
            <div className="absolute left-0 top-0 h-full bg-blue-500 rounded" style={{ width: '25%', marginLeft: '8%' }} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32 text-sm text-gray-700 dark:text-gray-300">Development</div>
          <div className="flex-1 relative h-8">
            <div className="absolute left-0 top-0 h-full bg-purple-500 rounded" style={{ width: '40%', marginLeft: '25%' }} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32 text-sm text-gray-700 dark:text-gray-300">Testing</div>
          <div className="flex-1 relative h-8">
            <div className="absolute left-0 top-0 h-full bg-green-500 rounded" style={{ width: '20%', marginLeft: '55%' }} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32 text-sm text-gray-700 dark:text-gray-300">Launch</div>
          <div className="flex-1 relative h-8">
            <div className="absolute left-0 top-0 h-full bg-orange-500 rounded" style={{ width: '15%', marginLeft: '70%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function KanbanMock() {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sprint Board</h3>
        <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">+ Add Task</button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {['Backlog', 'To Do', 'In Progress', 'Done'].map(column => (
          <div key={column} className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">{column}</h4>
              <span className="text-xs text-gray-500">
                {column === 'Backlog' ? '8' : column === 'To Do' ? '5' : column === 'In Progress' ? '3' : '12'}
              </span>
            </div>
            <div className="space-y-2">
              {(column === 'In Progress' ? ['Task A', 'Task B', 'Task C'] : ['Task X', 'Task Y']).map((task, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{task}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">A</span>
                    </div>
                    <span className="text-xs text-gray-500">2d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarMock() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">December 2024</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">← Prev</button>
          <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">Today</button>
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Next →</button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="aspect-square border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="text-sm text-gray-700 dark:text-gray-300">{(i % 31) + 1}</div>
            {i === 14 && (
              <div className="mt-1 text-xs bg-purple-100 text-purple-700 px-1 rounded">Launch</div>
            )}
            {i === 8 && (
              <div className="mt-1 text-xs bg-blue-100 text-blue-700 px-1 rounded">Review</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function DocsMock() {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-8 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project Documentation</h1>
        <div className="flex gap-4 mb-6">
          <button className="text-sm text-purple-600 dark:text-purple-400">Share</button>
          <button className="text-sm text-gray-600 dark:text-gray-400">Export</button>
          <button className="text-sm text-gray-600 dark:text-gray-400">Comments (3)</button>
        </div>
        
        <div className="prose dark:prose-invert">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This document outlines the project requirements and implementation strategy for the Q4 initiative.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Objectives</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
            <li>Improve user engagement by 40%</li>
            <li>Reduce load times to under 2 seconds</li>
            <li>Implement new feature set by end of quarter</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Timeline</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Phase 1: Research</span>
                <span className="text-gray-600 dark:text-gray-400">Week 1-2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Phase 2: Development</span>
                <span className="text-gray-600 dark:text-gray-400">Week 3-8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Phase 3: Testing</span>
                <span className="text-gray-600 dark:text-gray-400">Week 9-10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClickUpScreenshots({ 
  className = '' 
}: { 
  className?: string 
}) {
  const [selectedView, setSelectedView] = useState<keyof typeof mockScreenshots>('dashboard')
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* View Selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {Object.entries(mockScreenshots).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedView(key as keyof typeof mockScreenshots)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedView === key
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {value.title}
          </button>
        ))}
      </div>
      
      {/* Screenshot Display */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          {mockScreenshots[selectedView].component}
        </div>
      </div>
      
      {/* Caption */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ClickUp {mockScreenshots[selectedView].title} - Comprehensive project management interface
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Interactive demo showing ClickUp's versatile workspace
        </p>
      </div>
    </div>
  )
}