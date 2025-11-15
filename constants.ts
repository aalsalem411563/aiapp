import type { Page } from './types';

export const PAGES: { [key: string]: Page } = {
  HOME: 'HOME',
  REPORTS: 'REPORTS',
  QR_CODE: 'QR_CODE',
  AI_TOOLS: 'AI_TOOLS',
  AI_CHAT: 'AI_CHAT',
};

export const TEMPLATES = {
    TEMPLATE_1: { id: 'TEMPLATE_1', name: 'النموذج الأول', description: 'تقرير قياسي مع شاهدين.' },
    TEMPLATE_2: { id: 'TEMPLATE_2', name: 'النموذج الثاني', description: 'تقرير مفصل مع 4 شواهد.' },
    TEMPLATE_2_IMAGES: { id: 'TEMPLATE_2_IMAGES', name: 'النموذج الثالث', description: 'تقرير يركز على عرض صورتين.' },
    ANNOUNCEMENT: { id: 'ANNOUNCEMENT', name: 'إعلان أو خبر', description: 'قالب بسيط مع صورة واحدة.' },
};
