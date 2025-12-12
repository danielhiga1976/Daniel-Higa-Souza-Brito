import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { Edit, Eye, Search, Filter, ChevronRight, User } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onView: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Todos');

  // Extract unique courses for the filter dropdown
  const courses = useMemo(() => {
    const uniqueCourses = Array.from(new Set(projects.map(p => p.primaryCourse))).sort();
    return ['Todos', ...uniqueCourses];
  }, [projects]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.professors.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCourse = selectedCourse === 'Todos' || project.primaryCourse === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [projects, searchTerm, selectedCourse]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Buscar por projeto ou professor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="block w-full md:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
          >
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projeto / Professor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cidade
                </th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Nenhum projeto encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 line-clamp-1" title={project.name}>
                          {project.name}
                        </span>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                           <User size={12} className="mr-1" />
                           {project.professors[0]} {project.professors.length > 1 && `(+${project.professors.length - 1})`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {project.primaryCourse}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.city}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                           project.meetingDate && project.meetingLocation && project.meetingLocation !== 'Campus Aeroporto - A definir'
                           ? 'bg-green-100 text-green-800' 
                           : 'bg-yellow-100 text-yellow-800'
                       }`}>
                           {project.meetingDate && project.meetingLocation && project.meetingLocation !== 'Campus Aeroporto - A definir' ? 'Preenchido' : 'Pendente'}
                       </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => onView(project)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          title="Visualizar Detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onEdit(project)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                          <span>Editar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
          Mostrando {filteredProjects.length} de {projects.length} projetos
        </div>
      </div>
    </div>
  );
};