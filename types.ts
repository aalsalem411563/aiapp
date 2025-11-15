export type Page = 'HOME' | 'REPORTS' | 'QR_CODE' | 'AI_TOOLS' | 'AI_CHAT';

export interface ReportData {
  class: string;
  location: string;
  beneficiaries: string;
  beneficiaryCount: string;
  date: string;
  goals: string;
  description: string;
  evidence: (string | null)[];
  title?: string;
  body?: string;
  schoolPrincipal?: string;
}

export type TemplateType = 'TEMPLATE_1' | 'TEMPLATE_2' | 'TEMPLATE_2_IMAGES' | 'ANNOUNCEMENT';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}