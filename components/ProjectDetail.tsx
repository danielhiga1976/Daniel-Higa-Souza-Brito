import React from 'react';
import { Project } from '../types';
import { ArrowLeft, Calendar, Clock, MapPin, User, BookOpen, Layers, Users, UserPlus } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-blue-600 p-8 text-white">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Voltar para lista
        </button>
        <div className="flex flex-wrap items-center gap-2 mb-2">
             <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                {project.city}
            </span>
             <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide flex items-center gap-1 ${project.needsMonitor ? 'bg-purple-500 text-white' : 'bg-gray-700/50 text-gray-300'}`}>
                <UserPlus size={12} />
                Monitor: {project.needsMonitor ? 'Sim' : 'Não'}
            </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {project.primaryCourse}
          </span>
          {project.secondaryCourse && (
             <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
             {project.secondaryCourse}
           </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Important Alert Box for Students */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-orange-400" aria-hidden="true" />
            </div>
            <div className="ml-3 w-full">
              <h3 className="text-sm font-medium text-orange-800 uppercase tracking-wide">1ª Reunião (Obrigatória)</h3>
              <div className="mt-2 text-sm text-orange-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-1">
                    <Calendar size={16}/> {new Date(project.meetingDate).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16}/> {project.meetingTime}
                </div>
                <div className="flex items-center gap-1">
                    <MapPin size={16}/> {project.meetingLocation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Meetings */}
        {(project.meeting2Date || project.meeting3Date) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.meeting2Date && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <h3 className="text-sm font-medium text-blue-800 uppercase tracking-wide mb-2">2ª Reunião (Opcional)</h3>
                         <div className="space-y-1 text-sm text-blue-700">
                             <div className="flex items-center gap-2"><Calendar size={14}/> {new Date(project.meeting2Date).toLocaleDateString('pt-BR')}</div>
                             <div className="flex items-center gap-2"><Clock size={14}/> {project.meeting2Time || 'A definir'}</div>
                             <div className="flex items-center gap-2"><MapPin size={14}/> {project.meeting2Location || 'A definir'}</div>
                         </div>
                    </div>
                )}
                 {project.meeting3Date && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <h3 className="text-sm font-medium text-blue-800 uppercase tracking-wide mb-2">3ª Reunião (Opcional)</h3>
                         <div className="space-y-1 text-sm text-blue-700">
                             <div className="flex items-center gap-2"><Calendar size={14}/> {new Date(project.meeting3Date).toLocaleDateString('pt-BR')}</div>
                             <div className="flex items-center gap-2"><Clock size={14}/> {project.meeting3Time || 'A definir'}</div>
                             <div className="flex items-center gap-2"><MapPin size={14}/> {project.meeting3Location || 'A definir'}</div>
                         </div>
                    </div>
                )}
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="text-blue-600" size={20} />
                Resumo do Projeto
              </h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                {project.summary}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="text-blue-600" size={20} />
                Metodologia & Atividades
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.methodology}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Responsáveis</h3>
              <ul className="space-y-3">
                {project.professors.map((prof, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <User size={16} className="text-blue-600" />
                    </div>
                    {prof}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Cronograma Geral</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Início das Atividades</p>
                  <p className="text-gray-900 font-medium">{new Date(project.activityStartDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Término das Atividades</p>
                  <p className="text-gray-900 font-medium">{new Date(project.activityEndDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Divisão de Grupos</p>
                  <div className="flex items-center gap-2 text-gray-900 text-sm">
                    <Users size={16} className="text-gray-400"/>
                    Até {project.studentsPerGroup} alunos por grupo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};