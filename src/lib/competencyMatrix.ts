/**
 * Role / operation matrix sourced from @Roles decorators in the backend
 * controllers under apps/backend/src/. Each entry has a stable `id` used
 * as the translation key, plus an array of role identifiers that have the
 * permission.
 *
 * Role identifiers correspond to the role keys already used in /manual:
 *   sys  — System Admin (SYSTEM_ADMIN)
 *   adm  — School Admin (ADMIN)
 *   hed  — Headmaster / Principal (PRINCIPAL)
 *   dep  — Deputy (DEPUTY)
 *   tea  — Teacher (TEACHER)
 *   par  — Parent (PARENT)
 *   stu  — Student (STUDENT)
 */
export type RoleId = 'sys' | 'adm' | 'hed' | 'dep' | 'tea' | 'par' | 'stu';

export const COMPETENCY_ROLES: readonly RoleId[] = ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] as const;

export interface CompetencyOperation {
  id: string;
  roles: RoleId[];
}

export interface CompetencyDomain {
  id: string;
  operations: CompetencyOperation[];
}

export const COMPETENCY_MATRIX: CompetencyDomain[] = [
  {
    id: 'tenancy',
    operations: [
      { id: 'manage-schools', roles: ['sys'] },
      { id: 'system-users', roles: ['sys'] },
      { id: 'sso-config', roles: ['sys'] },
      { id: 'audit-log', roles: ['sys'] },
      { id: 'invite-users', roles: ['adm', 'hed', 'dep'] },
      { id: 'manage-users', roles: ['adm', 'hed', 'dep'] },
      { id: 'change-role', roles: ['adm', 'hed', 'dep'] },
      { id: 'view-profile', roles: ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'edit-profile', roles: ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'gdpr-export', roles: ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
    ],
  },
  {
    id: 'academic',
    operations: [
      { id: 'academic-years', roles: ['adm', 'hed', 'dep'] },
      { id: 'semesters', roles: ['adm', 'hed', 'dep'] },
      { id: 'grade-levels', roles: ['adm', 'hed', 'dep'] },
      { id: 'subject-templates', roles: ['adm', 'hed', 'dep'] },
      { id: 'subject-instances', roles: ['adm', 'hed', 'dep'] },
      { id: 'curriculum-versions', roles: ['adm', 'hed', 'dep'] },
      { id: 'batch-enrollment', roles: ['adm', 'hed', 'dep'] },
      { id: 'rvp-competencies', roles: ['adm', 'hed', 'dep'] },
      { id: 'view-white-book', roles: ['adm', 'hed', 'dep'] },
    ],
  },
  {
    id: 'workload',
    operations: [
      { id: 'classrooms', roles: ['adm', 'hed', 'dep'] },
      { id: 'buildings-rooms', roles: ['adm', 'hed', 'dep'] },
      { id: 'share-rooms', roles: ['adm', 'hed', 'dep'] },
      { id: 'teacher-workloads', roles: ['adm', 'hed', 'dep'] },
      { id: 'staff-workloads', roles: ['adm', 'hed', 'dep'] },
      { id: 'assign-subjects', roles: ['adm', 'hed', 'dep'] },
    ],
  },
  {
    id: 'schedule',
    operations: [
      { id: 'view-schedule', roles: ['adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'edit-schedule', roles: ['adm', 'hed', 'dep'] },
      { id: 'bulk-schedule', roles: ['adm', 'hed', 'dep'] },
      { id: 'substitutions', roles: ['adm', 'hed', 'dep'] },
      { id: 'validate-schedule', roles: ['adm', 'hed', 'dep'] },
      { id: 'classbook-entry', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'classbook-sign', roles: ['adm', 'hed', 'dep', 'tea'] },
    ],
  },
  {
    id: 'grading',
    operations: [
      { id: 'record-attendance', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'view-attendance', roles: ['adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'submit-excuse', roles: ['par'] },
      { id: 'review-excuses', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'export-attendance', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'create-grade', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'view-classroom-grades', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'view-own-grades', roles: ['par', 'stu'] },
      { id: 'behavior-grades', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'competency-grades', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'report-cards', roles: ['adm', 'hed', 'dep'] },
      { id: 'ai-polish', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'educational-measures', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'commission-exams', roles: ['adm', 'hed', 'dep'] },
    ],
  },
  {
    id: 'planning',
    operations: [
      { id: 'thematic-plans', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'lesson-preparations', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'teaching-materials', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'view-materials', roles: ['adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
    ],
  },
  {
    id: 'communication',
    operations: [
      { id: 'send-messages', roles: ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'bulletin-create', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'bulletin-view', roles: ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'bulletin-delete', roles: ['adm', 'hed', 'dep'] },
      { id: 'polls-create', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'polls-vote', roles: ['adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'calendar-create', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'calendar-rsvp', roles: ['adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
      { id: 'notifications', roles: ['sys', 'adm', 'hed', 'dep', 'tea', 'par', 'stu'] },
    ],
  },
  {
    id: 'system',
    operations: [
      { id: 'ai-chat', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'ai-generation', roles: ['adm', 'hed', 'dep', 'tea'] },
      { id: 'ai-seed-classroom', roles: ['sys', 'adm'] },
      { id: 'backups', roles: ['sys'] },
      { id: 'test-data', roles: ['sys'] },
      { id: 'monitoring', roles: ['sys'] },
      { id: 'system-settings', roles: ['sys'] },
      { id: 'mcp-tools', roles: ['sys', 'adm'] },
    ],
  },
];
