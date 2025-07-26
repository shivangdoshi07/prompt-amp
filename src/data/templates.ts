// Prompt frameworks for PromptAmp

export type FrameworkKey = 'COSTAR' | 'AUTOMAT';

export interface FrameworkField {
  key: string;
  label: string;
  example: string;
}

export interface FrameworkTemplate {
  name: FrameworkKey;
  description: string;
  fields: FrameworkField[];
}

export const templates: Record<FrameworkKey, FrameworkTemplate> = {
  COSTAR: {
    name: 'COSTAR',
    description: 'Context, Objective, Style, Tone, Audience, Response-format',
    fields: [
      { key: 'context', label: 'Context', example: 'Summarize a legal brief' },
      { key: 'objective', label: 'Objective', example: 'Explain for a 5th grader' },
      { key: 'style', label: 'Style', example: 'Bullet points' },
      { key: 'tone', label: 'Tone', example: 'Friendly, concise' },
      { key: 'audience', label: 'Audience', example: 'Law students' },
      { key: 'responseFormat', label: 'Response-format', example: 'Markdown table' },
    ],
  },
  AUTOMAT: {
    name: 'AUTOMAT',
    description: 'Act as, User-persona & audience, Targeted action, Output definition, Mode/tonality/style, Atypical cases, Topic whitelisting',
    fields: [
      { key: 'actAs', label: 'Act as', example: 'Expert interviewer' },
      { key: 'userPersona', label: 'User-persona & audience', example: 'Startup founder, investors' },
      { key: 'targetedAction', label: 'Targeted action', example: 'Generate interview questions' },
      { key: 'outputDefinition', label: 'Output definition', example: 'List of 10 questions' },
      { key: 'mode', label: 'Mode/tonality/style', example: 'Conversational, direct' },
      { key: 'atypicalCases', label: 'Atypical cases', example: 'Edge cases, outliers' },
      { key: 'topicWhitelisting', label: 'Topic whitelisting', example: 'Only SaaS topics' },
    ],
  },
};
