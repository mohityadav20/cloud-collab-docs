import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listTemplates } from '../../graphql/queries';
import { createTemplate } from '../../graphql/mutations';
import { Template } from '../../types';

const client = generateClient();

interface TemplateSelectorProps {
  onSelect: (template: Template | null) => void;
  onClose: () => void;
}

/**
 * Template selector component
 * Shows available templates and allows creating documents from them
 */
const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, onClose }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await client.graphql({
        query: listTemplates as any,
        variables: {
          filter: {
            or: [
              { isPublic: { eq: true } },
            ]
          }
        },
      }) as any;

      if ('data' in response && response.data?.listTemplates?.items) {
        setTemplates(response.data.listTemplates.items);
      }
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      alert('Name and content are required');
      return;
    }

    try {
      const user = await getCurrentUser();
      const response = await client.graphql({
        query: createTemplate as any,
        variables: {
          input: {
            name: newTemplate.name,
            description: newTemplate.description,
            content: newTemplate.content,
            category: newTemplate.category || 'Custom',
            isPublic: false,
            owner: user.username,
          },
        },
        authMode: 'userPool',
      }) as any;

      if ('data' in response && response.data?.createTemplate) {
        setTemplates([...templates, response.data.createTemplate]);
        setShowCreateForm(false);
        setNewTemplate({ name: '', description: '', content: '', category: '' });
        alert('Template created successfully!');
      }
    } catch (error) {
      console.error('Failed to create template:', error);
      alert('Failed to create template. Please try again.');
    }
  };

  const handleSelectTemplate = (template: Template) => {
    onSelect(template);
    onClose();
  };

  // Default templates (built-in)
  const defaultTemplates: Template[] = [
    {
      id: 'blank',
      name: 'Blank Document',
      description: 'Start with a blank document',
      content: ' ',
      category: 'Basic',
      isPublic: true,
      owner: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'meeting',
      name: 'Meeting Notes',
      description: 'Template for taking meeting notes',
      content: '<h1>Meeting Notes</h1><p><strong>Date:</strong> </p><p><strong>Attendees:</strong> </p><h2>Agenda</h2><ul><li></li></ul><h2>Notes</h2><p></p><h2>Action Items</h2><ul><li></li></ul>',
      category: 'Productivity',
      isPublic: true,
      owner: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'proposal',
      name: 'Project Proposal',
      description: 'Template for project proposals',
      content: '<h1>Project Proposal</h1><p><strong>Project Name:</strong> </p><p><strong>Date:</strong> </p><h2>Executive Summary</h2><p></p><h2>Objectives</h2><ul><li></li></ul><h2>Timeline</h2><p></p><h2>Budget</h2><p></p><h2>Expected Outcomes</h2><p></p>',
      category: 'Business',
      isPublic: true,
      owner: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'todo',
      name: 'To-Do List',
      description: 'Simple task list template',
      content: '<h1>To-Do List</h1><p><strong>Date:</strong> </p><h2>Priority Tasks</h2><ul><li></li><li></li></ul><h2>Regular Tasks</h2><ul><li></li><li></li></ul><h2>Completed</h2><ul><li></li></ul>',
      category: 'Productivity',
      isPublic: true,
      owner: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const allTemplates = [...defaultTemplates, ...templates];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Choose a Template</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {allTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded tracking-tight">
                    {template.category}
                  </span>
                </div>
              ))}
            </div>

            {!showCreateForm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Create Custom Template
              </button>
            )}

            {showCreateForm && (
              <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold mb-4">Create New Template</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Weekly Report"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Business, Personal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content *
                    </label>
                    <textarea
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Template content (can include HTML)"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateTemplate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 tracking-tight"
                    >
                      Create Template
                    </button>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 tracking-tight"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;

