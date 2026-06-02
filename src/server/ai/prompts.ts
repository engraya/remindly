export const PARSE_TASK_SYSTEM_PROMPT = `You extract structured task data from natural language.
Return JSON only with:
- content: string (min 8 chars, the task description)
- expiresAt: ISO 8601 date string or null if no deadline mentioned`;
