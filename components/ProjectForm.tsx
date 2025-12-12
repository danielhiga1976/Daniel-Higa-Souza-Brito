import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { COURSES } from '../constants';
import { refineText, suggestMethodology } from '../services/geminiService';
import { Save, Wand2, Plus, Trash2, Calendar, MapPin, Loader2, Info, UserPlus, Building2, Clock } from 'lucide-react';

interface ProjectFormProps {
  initialData?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    professors: [''],
    summary: '',
    methodology: '',
    meetingDate: '',
    meetingTime: '',
    meetingLocation: '',
    meeting2Date: '',
    meeting2Time: '',
    meeting2Location: '',
    meeting3Date: '',
    meeting3Time: '',
    meeting3Location: '',
    activityStartDate: '',
    activityEndDate: '',
    primaryCourse: '',
    secondaryCourse: '',
    studentsPerGroup: 10,
    needsMonitor: false,
    city: 'Uberaba',
    status: 'submitted',
  });

  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProfessorChange = (index: number, value: string) => {
    const newProfessors = [...(formData.professors || [])];
    newProfessors[index] = value;
    setFormData(prev => ({ ...prev, professors: newProfessors }));
  };

  const addProfessor = () => {
    setFormData(prev => ({ ...prev, professors: [...(prev.professors || []), ''] }));
  };

  const removeProfessor = (index: number) => {
    const newProfessors = [...(formData.professors || [])];
    newProfessors.splice(index, 1);
    setFormData(prev => ({ ...prev, professors: newProfessors }));
  };

  const handleImproveText = async (field: 'summary' | 'methodology') => {
    const text = field === 'summary' ? formData.summary : formData.methodology;
    if (!text) return;

    setLoadingAI(field);
    const refined = await refineText(text, field);
    setFormData(prev => ({ ...prev, [field]: refined }));
    setLoadingAI(null);
  };

  const handleSuggestMethodology = async () => {
      if (!formData.name || !formData.primaryCourse) {
          alert("Por favor, preencha o Nome do Projeto e o Curso Principal primeiro.");
          return;
      }
      setLoadingAI('methodology_suggestion');
      const suggestion = await suggestMethodology(formData.name, formData.primaryCourse);
      setFormData(prev => ({ ...prev, methodology: suggestion }));
      setLoadingAI(null);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.summary || !formData.meetingDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    const projectToSave: Project = {
      ...formData as Project,
      id: initialData?.id || crypto.randomUUID(),
      createdAt: initialData?.createdAt || Date.now(),
      professors: formData.professors?.filter(p => p.trim() !== '') || [],
    };
    onSave(projectToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      
      {/* Header Info */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Cadastro de Projeto de Extensão</h2>
        <p className="text-gray-500 mt-1">Preencha as informações para abertura do semestre.</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* City Selection - Positioned before Name as requested */}
        <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
            <div className="relative">
                <Building2 className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <select
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                <option value="Uberaba">Uberaba</option>
                <option value="Uberlândia">Uberlândia</option>
                <option value="Araxá">Araxá</option>
                </select>
            </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Projeto *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Ex: Assistência Jurídica Comunitária"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curso Principal *</label>
            <select
              name="primaryCourse"
              required
              value={formData.primaryCourse}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {COURSES.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
           </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curso Secundário</label>
            <select
              name="secondaryCourse"
              value={formData.secondaryCourse}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {COURSES.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
           </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 h-full">
                <input
                    id="needsMonitor"
                    name="needsMonitor"
                    type="checkbox"
                    checked={formData.needsMonitor}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="needsMonitor" className="ml-2 block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <UserPlus size={16} />
                    Solicitar Monitor?
                </label>
            </div>
        </div>
      </div>

      {/* Professors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professor(es) Responsável(is) *</label>
        {formData.professors?.map((prof, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              required
              value={prof}
              onChange={(e) => handleProfessorChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nome do Professor"
            />
            {formData.professors!.length > 1 && (
              <button
                type="button"
                onClick={() => removeProfessor(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                title="Remover professor"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addProfessor}
          className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800 mt-2"
        >
          <Plus size={16} /> Adicionar outro professor
        </button>
      </div>

      {/* Content with AI */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Resumo do Projeto (1 parágrafo) *</label>
            <button
              type="button"
              onClick={() => handleImproveText('summary')}
              disabled={loadingAI === 'summary' || !formData.summary}
              className="text-xs flex items-center gap-1 text-purple-600 font-medium hover:text-purple-800 disabled:opacity-50 transition-colors"
            >
              {loadingAI === 'summary' ? <Loader2 className="animate-spin" size={14}/> : <Wand2 size={14} />}
              Melhorar com IA
            </button>
          </div>
          <textarea
            name="summary"
            required
            rows={4}
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva brevemente o projeto..."
          />
          <p className="text-xs text-gray-500 mt-1">Este texto será usado para apresentar o projeto aos alunos.</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Como os alunos vão desenvolver as atividades *</label>
            <div className="flex gap-2">
                 <button
                    type="button"
                    onClick={handleSuggestMethodology}
                    disabled={loadingAI === 'methodology_suggestion'}
                    className="text-xs flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 disabled:opacity-50 transition-colors"
                    >
                    {loadingAI === 'methodology_suggestion' ? <Loader2 className="animate-spin" size={14}/> : <Info size={14} />}
                    Sugerir Metodologia
                </button>
                <button
                    type="button"
                    onClick={() => handleImproveText('methodology')}
                    disabled={loadingAI === 'methodology' || !formData.methodology}
                    className="text-xs flex items-center gap-1 text-purple-600 font-medium hover:text-purple-800 disabled:opacity-50 transition-colors"
                >
                    {loadingAI === 'methodology' ? <Loader2 className="animate-spin" size={14}/> : <Wand2 size={14} />}
                    Melhorar com IA
                </button>
            </div>
           
          </div>
          <textarea
            name="methodology"
            required
            rows={4}
            value={formData.methodology}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Explique a dinâmica das atividades, visitas, atendimentos, etc."
          />
        </div>
      </div>

      {/* Dates and Logistics */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-8">
        <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Calendar size={20} /> Logística e Datas Importantes
            </h3>
            
            {/* 1st Meeting (Mandatory) */}
            <div className="mb-6">
                <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3">1ª Reunião (Obrigatória)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">Data *</label>
                        <input
                        type="date"
                        name="meetingDate"
                        required
                        value={formData.meetingDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">Horário *</label>
                        <input
                        type="time"
                        name="meetingTime"
                        required
                        value={formData.meetingTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">Local *</label>
                        <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 text-blue-400" size={18} />
                        <input
                            type="text"
                            name="meetingLocation"
                            required
                            value={formData.meetingLocation}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Sala, Bloco, etc."
                        />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2nd Meeting (Optional) */}
            <div className="mb-6 border-t border-blue-100 pt-4">
                 <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Clock size={16}/> 2ª Reunião (Opcional)
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
                        <input
                        type="date"
                        name="meeting2Date"
                        value={formData.meeting2Date || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Horário</label>
                        <input
                        type="time"
                        name="meeting2Time"
                        value={formData.meeting2Time || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Local</label>
                        <input
                            type="text"
                            name="meeting2Location"
                            value={formData.meeting2Location || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                            placeholder="Opcional"
                        />
                    </div>
                </div>
            </div>

             {/* 3rd Meeting (Optional) */}
             <div className="mb-6 border-t border-blue-100 pt-4">
                 <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Clock size={16}/> 3ª Reunião (Opcional)
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
                        <input
                        type="date"
                        name="meeting3Date"
                        value={formData.meeting3Date || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Horário</label>
                        <input
                        type="time"
                        name="meeting3Time"
                        value={formData.meeting3Time || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Local</label>
                        <input
                            type="text"
                            name="meeting3Location"
                            value={formData.meeting3Location || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500"
                            placeholder="Opcional"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-blue-200">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">Início das Atividades *</label>
            <input
              type="date"
              name="activityStartDate"
              required
              value={formData.activityStartDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">Término das Atividades *</label>
            <input
              type="date"
              name="activityEndDate"
              required
              value={formData.activityEndDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-blue-800 mb-1">Alunos por Grupo *</label>
             <input 
                type="number"
                name="studentsPerGroup"
                value={formData.studentsPerGroup}
                onChange={handleChange}
                min={1}
                max={10}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
             />
             <p className="text-xs text-blue-600 mt-1">Máximo de 10 alunos por grupo.</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <Save size={20} />
          Salvar Projeto
        </button>
      </div>
    </form>
  );
};