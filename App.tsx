import React, { useState, useEffect } from 'react';
import { Project, ViewState } from './types';
import { MOCK_PROJECTS } from './constants';
import { ProjectList } from './components/ProjectList';
import { ProjectForm } from './components/ProjectForm';
import { ProjectDetail } from './components/ProjectDetail';
import { Layout, PlusCircle, BarChart3, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem('uni_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(MOCK_PROJECTS as Project[]);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('uni_projects', JSON.stringify(projects));
    }
  }, [projects]);

  const handleSaveProject = (project: Project) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === project.id);
      if (exists) {
        return prev.map(p => p.id === project.id ? project : p);
      }
      return [project, ...prev];
    });
    setView('dashboard');
    setSelectedProject(undefined);
  };

  const handleDeleteProject = (id: string) => {
     if(confirm("Tem certeza que deseja excluir este projeto?")) {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (selectedProject?.id === id) {
            setView('dashboard');
            setSelectedProject(undefined);
        }
     }
  }

  const startNewProject = () => {
    setSelectedProject(undefined);
    setView('form');
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setView('form');
  };

  const handleView = (project: Project) => {
    setSelectedProject(project);
    setView('details');
  };

  // Stats
  const totalProjects = projects.length;
  const totalCourses = new Set(projects.map(p => p.primaryCourse)).size;
  const totalProfessors = new Set(projects.flatMap(p => p.professors)).size;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <GraduationCap size={32} className="text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold leading-none">UNIUBE</h1>
              <p className="text-xs text-blue-200">Gestão de Projetos de Extensão Curricularizados</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             {view !== 'dashboard' && (
                 <button 
                 onClick={() => setView('dashboard')}
                 className="text-sm font-medium hover:text-blue-200 transition-colors"
               >
                 Voltar ao Painel
               </button>
             )}
            <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold border border-blue-500">
              CP
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Projetos Ativos</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalProjects}</h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <Layout size={24} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Cursos Envolvidos</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalCourses}</h3>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                  <BarChart3 size={24} />
                </div>
              </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Docentes</p>
                  <h3 className="text-3xl font-bold text-gray-900">{totalProfessors}</h3>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-green-600">
                  <GraduationCap size={24} />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Painel de Controle</h2>
              <button
                onClick={startNewProject}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-all transform hover:scale-105"
              >
                <PlusCircle size={20} />
                Novo Projeto
              </button>
            </div>

            {/* List */}
            <ProjectList 
              projects={projects} 
              onEdit={handleEdit} 
              onView={handleView}
            />
          </div>
        )}

        {view === 'form' && (
          <div className="max-w-3xl mx-auto">
             <button 
              onClick={() => setView('dashboard')}
              className="mb-4 text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
             >
               &larr; Voltar
             </button>
            <ProjectForm 
              initialData={selectedProject} 
              onSave={handleSaveProject} 
              onCancel={() => setView('dashboard')} 
            />
             {selectedProject && (
                  <div className="mt-8 text-center">
                      <button 
                        onClick={() => handleDeleteProject(selectedProject.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium underline"
                      >
                          Excluir este projeto
                      </button>
                  </div>
              )}
          </div>
        )}

        {view === 'details' && selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onBack={() => setView('dashboard')} 
          />
        )}
      </main>

      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} UNIUBE - Extensão Universitária. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;