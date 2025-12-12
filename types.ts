export interface Project {
  id: string;
  name: string;
  professors: string[];
  summary: string;
  methodology: string;
  meetingDate: string;
  meetingTime: string;
  meetingLocation: string;
  
  // Meeting 2 (Optional)
  meeting2Date?: string;
  meeting2Time?: string;
  meeting2Location?: string;

  // Meeting 3 (Optional)
  meeting3Date?: string;
  meeting3Time?: string;
  meeting3Location?: string;

  activityStartDate: string;
  activityEndDate: string;
  primaryCourse: string;
  secondaryCourse?: string;
  studentsPerGroup: number;
  needsMonitor: boolean;
  city: string;
  status: 'draft' | 'submitted';
  createdAt: number;
}

export interface Course {
  id: string;
  name: string;
  area: string;
}

export type ViewState = 'dashboard' | 'form' | 'details';