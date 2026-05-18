'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ManualSidebar from '@/components/ManualSidebar';
import ScreenshotPlaceholder from '@/components/ScreenshotPlaceholder';
import Lightbox from '@/components/Lightbox';
import {COMPETENCY_MATRIX, COMPETENCY_ROLES, type RoleId} from '@/lib/competencyMatrix';
import {ENV_GROUPS, FRONTEND_URLS, type Required as EnvRequired} from '@/lib/envConfig';
import {
    Info,
    Laptop,
    Settings,
    LogIn,
    ShieldCheck,
    School,
    UserCheck,
    GraduationCap,
    Users,
    CheckCircle2,
    Heart,
    ChevronLeft,
    ChevronRight,
    Cpu,
    Layers,
    ExternalLink,
    ZoomIn,
    Box,
    Database,
    Workflow,
    Network,
    KeyRound,
    Check,
    Minus,
    Terminal,
    Globe,
    CloudUpload,
    Server,
    Rocket,
    Lock,
    Mail,
    Archive,
    Activity,
    HeartPulse,
    BookOpen,
    AlertTriangle,
    ToggleRight,
    Calendar,
    ClipboardCheck,
    Megaphone,
    Bell,
    FileText,
    Pencil,
    Award,
    Folder,
    GitCompare,
    ClipboardList,
    type LucideIcon,
} from 'lucide-react';

const roleColorMap: Record<string, string> = {
    systemAdmin: 'brand-purple',
    schoolStaff: 'brand-blue',
    schoolManagement: 'brand-blue',
    teacher: 'rose-500',
    parent: 'emerald-500',
    student: 'brand-orange',
};

const bgLightMap: Record<string, string> = {
    'brand-purple': 'bg-brand-purple/10',
    'brand-slate': 'bg-brand-slate/10',
    'brand-blue': 'bg-brand-blue/10',
    'brand-pink': 'bg-brand-pink/10',
    'brand-teal': 'bg-brand-teal/10',
    'rose-500': 'bg-rose-500/10',
    'emerald-500': 'bg-emerald-500/10',
    'brand-orange': 'bg-brand-orange/10',
};

const textMap: Record<string, string> = {
    'brand-purple': 'text-brand-purple',
    'brand-slate': 'text-brand-slate',
    'brand-blue': 'text-brand-blue',
    'brand-pink': 'text-brand-pink',
    'brand-teal': 'text-brand-teal',
    'rose-500': 'text-rose-500',
    'emerald-500': 'text-emerald-500',
    'brand-orange': 'text-brand-orange',
};

const borderMap: Record<string, string> = {
    'brand-purple': 'border-brand-purple',
    'brand-slate': 'border-brand-slate',
    'brand-blue': 'border-brand-blue',
    'brand-pink': 'border-brand-pink',
    'brand-teal': 'border-brand-teal',
    'rose-500': 'border-rose-500',
    'emerald-500': 'border-emerald-500',
    'brand-orange': 'border-brand-orange',
};

const bgFullMap: Record<string, string> = {
    'brand-purple': 'bg-brand-purple',
    'brand-slate': 'bg-brand-slate',
    'brand-blue': 'bg-brand-blue',
    'brand-pink': 'bg-brand-pink',
    'brand-teal': 'bg-brand-teal',
    'rose-500': 'bg-rose-500',
    'emerald-500': 'bg-emerald-500',
    'brand-orange': 'bg-brand-orange',
};

type FeatureImage = { id: string; src: string; wide?: boolean };
type SystemAdminFeature = {
    id: string;
    icon: LucideIcon;
    images: FeatureImage[];
};

const SYSTEM_ADMIN_PRIMARY: SystemAdminFeature[] = [
    {
        id: 'schools',
        icon: School,
        images: [
            {id: 'list', src: 'schools/00_list.png'},
            {id: 'createNew', src: 'schools/01_create_new_headmaster.png'},
            {id: 'createExisting', src: 'schools/02_create_existing_headmaster.png'},
            {id: 'edit', src: 'schools/03_edit.png'},
            {id: 'enter', src: 'schools/04_enter_as_role.png'},
            {id: 'delete', src: 'schools/05_delete.png'},
            {id: 'deleteFilled', src: 'schools/06_delete_filled.png'},
        ],
    },
    {
        id: 'users',
        icon: UserCheck,
        images: [
            {id: 'list', src: 'users/00_list.png'},
            {id: 'addNew', src: 'users/01_add_new.png'},
            {id: 'addExisting', src: 'users/02_add_existing.png'},
            {id: 'remove', src: 'users/03_remove.png'},
        ],
    },
];

const SYSTEM_ADMIN_SETTINGS: SystemAdminFeature[] = [
    {
        id: 'ai',
        icon: Cpu,
        images: [
            {id: 'overview', src: 'settings/ai/00_overview.png'},
            {id: 'deleteKey', src: 'settings/ai/01_delete_key.png'},
        ],
    },
    {
        id: 'sso',
        icon: KeyRound,
        images: [
            {id: 'overview', src: 'settings/sso/00_overview.png'},
            {id: 'google', src: 'settings/sso/01_google.png'},
            {id: 'github', src: 'settings/sso/02_github.png'},
            {id: 'delete', src: 'settings/sso/03_delete.png'},
        ],
    },
    {
        id: 'security',
        icon: Lock,
        images: [
            {id: 'form', src: 'settings/security/00_form.png'},
        ],
    },
    {
        id: 'monitoring',
        icon: Activity,
        images: [
            {id: 'dashboard', src: 'settings/monitoring/00_dashboard.png'},
        ],
    },
    {
        id: 'backups',
        icon: Archive,
        images: [
            {id: 'list', src: 'settings/backups/00_list.png'},
            {id: 'create', src: 'settings/backups/01_create.png'},
            {id: 'delete', src: 'settings/backups/02_delete.png'},
        ],
    },
    {
        id: 'testData',
        icon: Database,
        images: [
            {id: 'form', src: 'settings/test-data/00_form.png'},
            {id: 'schoolType', src: 'settings/test-data/01_school_type.png'},
            {id: 'success', src: 'settings/test-data/02_success.png'},
        ],
    },
];

const SYSTEM_ADMIN_PROMPTS: SystemAdminFeature = {
    id: 'prompts',
    icon: Terminal,
    images: [{id: 'list', src: 'prompts/00_list.png'}],
};

const SCHOOL_STAFF_FEATURES: SystemAdminFeature[] = [
    {
        id: 'dashboard',
        icon: Heart,
        images: [
            {id: 'headmaster', src: 'dashboard/00_headmaster.png'},
            {id: 'deputy', src: 'dashboard/01_deputy.png'},
            {id: 'teacher', src: 'dashboard/02_teacher.png'},
        ],
    },
    {
        id: 'schedule',
        icon: Calendar,
        images: [
            {id: 'my', src: 'schedule/00_my.png'},
            {id: 'class', src: 'schedule/01_class.png'},
            {id: 'teacherSelect', src: 'schedule/02_teacher_select.png'},
            {id: 'teacher', src: 'schedule/03_teacher.png'},
            {id: 'classroomSelect', src: 'schedule/04_classroom_select.png'},
            {id: 'classroom', src: 'schedule/05_classroom.png'},
            {id: 'year', src: 'schedule/06_year.png'},
            {id: 'print', src: 'schedule/07_print.png'},
        ],
    },
    {
        id: 'grading',
        icon: GraduationCap,
        images: [
            {id: 'empty', src: 'grading/00_empty.png'},
            {id: 'list', src: 'grading/01_list.png'},
            {id: 'classSelect', src: 'grading/02_class_select.png'},
            {id: 'newEmpty', src: 'grading/03_new_empty.png'},
            {id: 'newFilled', src: 'grading/04_new_filled.png'},
            {id: 'aiGenerating', src: 'grading/05_ai_generating.png'},
            {id: 'aiDrafts', src: 'grading/06_ai_drafts.png'},
            {id: 'gradingOverview', src: 'grading/07_grading_overview.png'},
        ],
    },
    {
        id: 'attendance',
        icon: ClipboardCheck,
        images: [
            {id: 'excusesPending', src: 'attendance/00_excuses_pending.png'},
            {id: 'excusesDecided', src: 'attendance/01_excuses_decided.png'},
        ],
    },
    {
        id: 'classBook',
        icon: BookOpen,
        images: [
            {id: 'view', src: 'classbook/00_view.png'},
        ],
    },
    {
        id: 'messages',
        icon: Mail,
        images: [
            {id: 'inbox', src: 'messages/00_inbox.png'},
            {id: 'new', src: 'messages/01_new.png'},
            {id: 'conversation', src: 'messages/02_conversation.png'},
            {id: 'broadcastSchools', src: 'messages/03_broadcast_schools.png'},
            {id: 'broadcastClass', src: 'messages/04_broadcast_class.png'},
            {id: 'afterBroadcast', src: 'messages/05_after_broadcast.png'},
        ],
    },
    {
        id: 'community',
        icon: Megaphone,
        images: [
            {id: 'bulletin', src: 'community/00_bulletin.png'},
            {id: 'polls', src: 'community/01_polls.png'},
            {id: 'pollsMulti', src: 'community/02_polls_multi.png'},
            {id: 'eventsEmpty', src: 'community/03_events_empty.png'},
            {id: 'eventsResponses', src: 'community/04_events_responses.png'},
            {id: 'eventsNew', src: 'community/05_events_new.png'},
            {id: 'eventsAfterCreate', src: 'community/06_events_after_create.png'},
        ],
    },
];

const PARENT_FEATURES: SystemAdminFeature[] = [
    {
        id: 'tour',
        icon: Heart,
        images: [
            {id: 'step1', src: '01.png'},
            {id: 'step2', src: '02.png'},
            {id: 'step3', src: '03.png'},
            {id: 'step4', src: '04.png'},
            {id: 'step5', src: '05.png'},
            {id: 'step6', src: '06.png'},
            {id: 'step7', src: '07.png'},
        ],
    },
];

const TEACHER_FEATURES: SystemAdminFeature[] = [
    {
        id: 'tour',
        icon: GraduationCap,
        images: [
            {id: 'step1', src: '01.png'},
            {id: 'step2', src: '02.png'},
            {id: 'step3', src: '03.png'},
            {id: 'step4', src: '04.png'},
            {id: 'step5', src: '05.png'},
            {id: 'step6', src: '06.png'},
            {id: 'step7', src: '07.png'},
            {id: 'step8', src: '08.png'},
            {id: 'step9', src: '09.png'},
            {id: 'step10', src: '10.png'},
            {id: 'step11', src: '11.png'},
        ],
    },
];

const STUDENT_FEATURES: SystemAdminFeature[] = [
    {
        id: 'tour',
        icon: GraduationCap,
        images: [
            {id: 'step1', src: '01.png'},
            {id: 'step2', src: '02.png'},
            {id: 'step3', src: '03.png'},
            {id: 'step4', src: '04.png'},
            {id: 'step5', src: '05.png'},
            {id: 'step6', src: '06.png'},
            {id: 'step7', src: '07.png'},
            {id: 'step8', src: '08.png'},
        ],
    },
];

const AI_TUTOR_FEATURE: SystemAdminFeature = {
    id: 'aiTutor',
    icon: Cpu,
    images: [
        {id: 'overview', src: '00_overview.png'},
        {id: 'chooseModel', src: '01_choose_model.png'},
        {id: 'ask', src: '02_ask.png'},
    ],
};

const SCHOOL_MANAGEMENT_FEATURES: SystemAdminFeature[] = [
    {
        id: 'yearSetup',
        icon: Calendar,
        images: [{id: 'view', src: 'year-setup/00_view.png'}],
    },
    {
        id: 'users',
        icon: Users,
        images: [
            {id: 'list', src: 'users/00_list.png'},
            {id: 'invite', src: 'users/01_invite.png'},
            {id: 'detail', src: 'users/02_detail.png'},
            {id: 'classes', src: 'users/03_classes.png'},
            {id: 'csv', src: 'users/04_csv.png'},
            {id: 'role', src: 'users/05_role.png'},
        ],
    },
    {
        id: 'classrooms',
        icon: School,
        images: [
            {id: 'list', src: 'classrooms/00_list.png'},
            {id: 'create', src: 'classrooms/01_create.png'},
            {id: 'buildings', src: 'classrooms/02_buildings.png'},
            {id: 'detail', src: 'classrooms/03_detail.png'},
        ],
    },
    {
        id: 'bellSchedule',
        icon: Bell,
        images: [{id: 'view', src: 'bell-schedule/00_view.png'}],
    },
    {
        id: 'rvp',
        icon: BookOpen,
        images: [
            {id: 'overview', src: 'rvp/00_overview.png'},
            {id: 'detail', src: 'rvp/01_detail.png'},
        ],
    },
    {
        id: 'svp',
        icon: Layers,
        images: [
            {id: 'overview', src: 'svp/00_overview.png'},
            {id: 'classes', src: 'svp/01_classes.png'},
            {id: 'subjects', src: 'svp/02_subjects.png'},
            {id: 'versions', src: 'svp/03_versions.png'},
            {id: 'curriculum', src: 'svp/04_curriculum.png'},
        ],
    },
    {
        id: 'whiteBook',
        icon: FileText,
        images: [{id: 'view', src: 'white-book/00_view.png'}],
    },
    {
        id: 'schedule',
        icon: Network,
        images: [{id: 'planner', src: 'schedule/00_planner.png'}],
    },
    {
        id: 'substitutions',
        icon: Workflow,
        images: [
            {id: 'list', src: 'substitutions/00_list.png'},
            {id: 'detail', src: 'substitutions/01_detail.png'},
        ],
    },
    {
        id: 'scheduleComparison',
        icon: GitCompare,
        images: [
            {id: 'overview', src: 'schedule-comparison/00_overview.png'},
            {id: 'detail', src: 'schedule-comparison/01_detail.png'},
        ],
    },
    {
        id: 'thematicPlans',
        icon: ClipboardList,
        images: [
            {id: 'list', src: 'thematic-plans/00_list.png'},
            {id: 'create', src: 'thematic-plans/01_create.png'},
            {id: 'detail', src: 'thematic-plans/02_detail.png'},
            {id: 'progress', src: 'thematic-plans/03_progress.png'},
        ],
    },
    {
        id: 'lessonPrep',
        icon: Pencil,
        images: [
            {id: 'list', src: 'lesson-prep/00_list.png'},
            {id: 'detail', src: 'lesson-prep/01_detail.png'},
        ],
    },
    {
        id: 'materials',
        icon: Folder,
        images: [
            {id: 'list', src: 'materials/00_list.png'},
            {id: 'detail', src: 'materials/01_detail.png'},
        ],
    },
    {
        id: 'reportCards',
        icon: Award,
        images: [
            {id: 'list', src: 'report-cards/00_list.png'},
            {id: 'template', src: 'report-cards/01_template.png'},
            {id: 'assignment', src: 'report-cards/02_assignment.png'},
            {id: 'progress', src: 'report-cards/03_progress.png'},
            {id: 'export', src: 'report-cards/04_export.png'},
            {id: 'detail', src: 'report-cards/05_detail.png'},
        ],
    },
    {
        id: 'clubs',
        icon: Heart,
        images: [
            {id: 'list', src: 'clubs/00_list.png'},
            {id: 'detail', src: 'clubs/01_detail.png'},
        ],
    },
    {
        id: 'events',
        icon: Megaphone,
        images: [
            {id: 'list', src: 'events/00_list.png'},
            {id: 'create', src: 'events/01_create.png'},
            {id: 'calendar', src: 'events/02_calendar.png'},
            {id: 'detail', src: 'events/03_detail.png'},
        ],
    },
    {
        id: 'disciplinary',
        icon: AlertTriangle,
        images: [
            {id: 'list', src: 'disciplinary/00_list.png'},
            {id: 'detail', src: 'disciplinary/01_detail.png'},
        ],
    },
    {
        id: 'audit',
        icon: Activity,
        images: [{id: 'view', src: 'audit/00_view.png'}],
    },
];

const roleWorkflowImages: Record<string, Record<number, string[]>> = {};

const BACKEND_EXAMPLE_BASE = 'https://be-sandbox-1.is-edustack.org';

function RoleFeatureBlock({
    roleId,
    keyPrefix,
    feature,
    imageBasePath,
    accentClass,
    translate,
    nested = false,
}: {
    roleId?: string;
    keyPrefix?: string;
    feature: SystemAdminFeature;
    imageBasePath: string;
    accentClass: string;
    translate: (key: string) => string;
    nested?: boolean;
}) {
    const HeadingTag = nested ? 'h5' : 'h4';
    const headingClass = nested
        ? 'font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white'
        : 'font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white';
    const Icon = feature.icon;
    const base = keyPrefix ?? `roles.${roleId}.features.${feature.id}`;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${accentClass}`}/>
                <HeadingTag className={headingClass}>
                    {translate(`${base}.title`)}
                </HeadingTag>
            </div>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                {translate(`${base}.description`)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {feature.images.map((img) => (
                    <div key={img.id} className={`space-y-2 ${img.wide ? 'col-span-2' : ''}`}>
                        <ScreenshotPlaceholder
                            src={`${imageBasePath}${img.src}`}
                            alt={translate(`${base}.images.${img.id}`)}
                            roleColor="brand-purple"
                            className="shadow-lg"
                        />
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                            {translate(`${base}.images.${img.id}`)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ManualPage() {
    const t = useTranslations('Manual');
    const [activeSection, setActiveSection] = useState('tech-stack');
    const [workflowImageIndices, setWorkflowImageIndices] = useState<Record<string, number>>({});
    const [diagramLightbox, setDiagramLightbox] = useState<{ src: string; alt: string } | null>(null);

    const openDiagram = (src: string, alt: string) => setDiagramLightbox({src, alt});

    // Helper for dynamic translations to avoid ESLint any errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translate = (key: string) => t(key as any);

    // Sync the sidebar highlight with the URL hash on mount (and whenever
    // it changes), so deep-linking from outside the page (e.g. the landing
    // methodology cards) marks the right item before the first scroll event.
    useEffect(() => {
        const applyHash = () => {
            const id = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
            if (id && document.getElementById(id)) {
                setActiveSection(id);
            }
        };
        applyHash();
        window.addEventListener('hashchange', applyHash);
        return () => window.removeEventListener('hashchange', applyHash);
    }, []);

    // Track the active section via scroll position: pick the last section
    // whose top is above the navbar bottom. This is more reliable than an
    // IntersectionObserver band at the page edges — at scrollY=0 the header
    // would occupy the band and no section would intersect, leaving the
    // default highlight stale.
    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>('section[id]'),
        );
        if (sections.length === 0) return;

        // Navbar + a small buffer; matches the scroll-mt-32 on each section.
        const offset = 140;

        const update = () => {
            const scrollY = window.scrollY;
            let current = sections[0].id;
            for (const s of sections) {
                if (s.offsetTop - offset <= scrollY) {
                    current = s.id;
                } else {
                    break;
                }
            }
            setActiveSection(current);
        };

        update();
        window.addEventListener('scroll', update, {passive: true});
        return () => window.removeEventListener('scroll', update);
    }, []);

    const getWorkflowImage = (roleId: string, workflowId: number) => {
        const images = roleWorkflowImages[roleId]?.[workflowId] || [];
        const activeIndex = workflowImageIndices[`${roleId}-${workflowId}`] || 0;
        return images[activeIndex] || images[0];
    };

    const setWorkflowImage = (roleId: string, workflowId: number, index: number) => {
        const images = roleWorkflowImages[roleId]?.[workflowId] || [];
        if (images.length === 0) return;

        // Wrap around logic
        const newIndex = (index + images.length) % images.length;

        setWorkflowImageIndices(prev => ({
            ...prev,
            [`${roleId}-${workflowId}`]: newIndex
        }));
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar/>

            <div className="flex-1 flex">
                {/* Sidebar */}
                <div className="hidden md:block">
                    <ManualSidebar activeSection={activeSection}/>
                </div>

                {/* Content */}
                <main className="flex-1 px-4 md:px-10 lg:px-16 py-16 md:py-24 overflow-hidden">
                    <div className="max-w-[100rem] mx-auto space-y-32">

                        {/* Header */}
                        <div
                            className="space-y-6 text-center md:text-left border-b border-slate-100 dark:border-slate-800 pb-20">
                            <h1 className="font-display text-4xl sm:text-5xl md:text-[58px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.02]">
                                {t('title')}
                            </h1>
                            <p className="text-base md:text-[19px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[56rem]">
                                {t('intro')}
                            </p>
                        </div>

                        {/* Chapters Section */}
                        <div className="space-y-64">

                            {/* Tech Stack */}
                            <section id="tech-stack" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Cpu className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('tech_stack.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('tech_stack.description')}
                                    </p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {['nestjs', 'react', 'cloudflare_d1', 'mcp', 'nextjs', 'tailwind'].map((key) => (
                                        <a
                                            key={key}
                                            href={translate(`tech_stack.items.${key}.link`)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all hover:-translate-y-1"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">
                                                    {translate(`tech_stack.items.${key}.title`)}
                                                </h4>
                                                <ExternalLink size={20}
                                                              className="text-slate-300 group-hover:text-brand-purple transition-colors"/>
                                            </div>
                                            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                {translate(`tech_stack.items.${key}.description`)}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </section>

                            {/* Application Modules */}
                            <section id="modules" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Layers className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('modules.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('modules.description')}
                                    </p>
                                </div>

                                <div className="space-y-10">
                                    {['admin', 'auth', 'registry', 'schedule', 'grading', 'ai', 'mcp'].map((key) => (
                                        <div key={key}
                                             className="group p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl transition-all">
                                            <div className="grid lg:grid-cols-3 gap-12">
                                                <div className="space-y-4">
                                                    <div
                                                        className="inline-flex p-3 rounded-2xl bg-brand-purple/10 text-brand-purple mb-2">
                                                        <Box size={24}/>
                                                    </div>
                                                    <h4 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">
                                                        {translate(`modules.list.${key}.title`)}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {translate(`modules.list.${key}.tech`).split(', ').map((tag: string) => (
                                                            <span key={tag}
                                                                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                {tag}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
                                                    <div className="space-y-3">
                                                        <span
                                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">How it&apos;s built</span>
                                                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                                                            {translate(`modules.list.${key}.built`)}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <span
                                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Core Benefit</span>
                                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                                            {translate(`modules.list.${key}.benefit`)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Data Model */}
                            <section id="data-model" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Database className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('data_model.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('data_model.description')}
                                    </p>
                                </div>

                                <div className="grid gap-10 md:grid-cols-2">
                                    {[
                                        {id: 'tenancy', file: '01-tenancy-identity'},
                                        {id: 'academic', file: '02-academic-structure'},
                                        {id: 'workload', file: '03-workload-space'},
                                        {id: 'schedule', file: '04-schedule'},
                                        {id: 'grading', file: '05-attendance-grading'},
                                        {id: 'planning', file: '06-planning-materials'},
                                        {id: 'communication', file: '07-communication'},
                                        {id: 'system', file: '08-system-ai'},
                                    ].map((d, idx) => {
                                        const base = `/images/documentation/architecture/er-domains/${d.file}`;
                                        return (
                                            <figure key={d.id}
                                                    className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden">
                                                <div className="flex items-center gap-3 px-8 pt-7 pb-4">
                          <span
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                            {idx + 1}
                          </span>
                                                    <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                        {translate(`data_model.domains.${d.id}.title`)}
                                                    </h3>
                                                </div>
                                                <p className="px-8 pb-5 text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                    {translate(`data_model.domains.${d.id}.description`)}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => openDiagram(`${base}.png`, translate(`data_model.domains.${d.id}.title`))}
                                                    aria-label={t('data_model.openFull')}
                                                    className="relative block w-full text-left border-t border-slate-100 dark:border-slate-800 bg-white overflow-hidden cursor-zoom-in"
                                                >
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={`${base}.png`}
                                                        alt={translate(`data_model.domains.${d.id}.title`)}
                                                        className="block w-full h-auto bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                                                        loading="lazy"
                                                    />
                                                    <span
                                                        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('data_model.openFull')}
                                                        <ZoomIn size={12}/>
                          </span>
                                                </button>
                                            </figure>
                                        );
                                    })}
                                </div>

                                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                    {t('data_model.caption')}
                                </p>

                                {/* Full consolidated diagram */}
                                <div className="space-y-8 pt-12 border-t border-slate-100 dark:border-slate-800">
                                    <div className="space-y-4">
                                        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('data_model.fullTitle')}
                                        </h3>
                                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                            {t('data_model.fullDescription')}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => openDiagram('/images/documentation/architecture/er-diagram.png', t('data_model.fullTitle'))}
                                        aria-label={t('data_model.openFull')}
                                        className="group relative block w-full text-left rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden cursor-zoom-in"
                                    >
                                        <div className="overflow-auto max-h-[80vh]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/images/documentation/architecture/er-diagram.png"
                                                alt={t('data_model.fullTitle')}
                                                className="block h-auto max-w-none bg-white"
                                                style={{width: '6000px'}}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div
                                            className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest">
                                            {t('data_model.fullScrollHint')}
                                        </div>
                                        <span
                                            className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('data_model.openFull')}
                                            <ZoomIn size={12}/>
                    </span>
                                    </button>
                                </div>
                            </section>

                            {/* Competency Matrix */}
                            <section id="competency-matrix" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <KeyRound className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('competency_matrix.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('competency_matrix.description')}
                                    </p>
                                    <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <span
                          className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-purple/15 text-brand-purple">
                        <Check size={14} strokeWidth={3}/>
                      </span>
                        {t('competency_matrix.legend.allowed')}
                    </span>
                                        <span className="inline-flex items-center gap-2">
                      <span
                          className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Minus size={14} strokeWidth={3}/>
                      </span>
                                            {t('competency_matrix.legend.denied')}
                    </span>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    {COMPETENCY_MATRIX.map((domain, dIdx) => (
                                        <div
                                            key={domain.id}
                                            className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                                        >
                                            <div
                                                className="flex flex-wrap items-center justify-between gap-3 px-8 pt-7 pb-4">
                                                <div className="flex items-center gap-3">
                          <span
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                            {dIdx + 1}
                          </span>
                                                    <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                        {translate(`competency_matrix.domains.${domain.id}`)}
                                                    </h3>
                                                </div>
                                                <span
                                                    className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {domain.operations.length} {t('competency_matrix.legend.domainOps')}
                        </span>
                                            </div>

                                            <div
                                                className="overflow-x-auto border-t border-slate-100 dark:border-slate-800">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-slate-50/60 dark:bg-slate-950/40">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="sticky left-0 z-10 bg-slate-50/60 dark:bg-slate-950/40 px-6 py-4 text-left font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[300px]"
                                                        >
                                                            Operation
                                                        </th>
                                                        {COMPETENCY_ROLES.map((r) => (
                                                            <th
                                                                key={r}
                                                                scope="col"
                                                                className="px-2 py-4 text-center font-bold text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 whitespace-nowrap"
                                                                title={translate(`competency_matrix.roles.${r}`)}
                                                            >
                                                                <span
                                                                    className="hidden md:inline">{translate(`competency_matrix.roles.${r}`)}</span>
                                                                <span
                                                                    className="md:hidden">{translate(`competency_matrix.rolesShort.${r}`)}</span>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                    {domain.operations.map((op, opIdx) => (
                                                        <tr
                                                            key={op.id}
                                                            className={opIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/30 dark:bg-slate-950/20'}
                                                        >
                                                            <th
                                                                scope="row"
                                                                className="sticky left-0 z-[5] bg-inherit px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300"
                                                            >
                                                                {translate(`competency_matrix.ops.${op.id}`)}
                                                            </th>
                                                            {COMPETENCY_ROLES.map((r: RoleId) => {
                                                                const allowed = op.roles.includes(r);
                                                                return (
                                                                    <td key={r} className="px-2 py-3 text-center">
                                      <span
                                          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${allowed ? 'bg-brand-purple/15 text-brand-purple' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'}`}
                                          aria-label={allowed ? t('competency_matrix.legend.allowed') : t('competency_matrix.legend.denied')}
                                      >
                                        {allowed ? <Check size={14} strokeWidth={3}/> :
                                            <Minus size={14} strokeWidth={3}/>}
                                      </span>
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* System Architecture */}
                            <section id="system-architecture" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Network className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('system_architecture.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('system_architecture.description')}
                                    </p>
                                </div>

                                <div className="space-y-12">
                                    {[
                                        {
                                            id: 'components',
                                            title: t('system_architecture.componentsTitle'),
                                            description: t('system_architecture.componentsDescription'),
                                            file: 'components'
                                        },
                                        {
                                            id: 'actors',
                                            title: t('system_architecture.actorsTitle'),
                                            description: t('system_architecture.actorsDescription'),
                                            file: 'actors'
                                        },
                                    ].map((d) => {
                                        const src = `/images/documentation/architecture/components/${d.file}.png`;
                                        return (
                                            <figure key={d.id}
                                                    className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden">
                                                <div className="px-8 pt-7 pb-3 space-y-3">
                                                    <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                        {d.title}
                                                    </h3>
                                                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                        {d.description}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => openDiagram(src, d.title)}
                                                    aria-label={t('system_architecture.openFull')}
                                                    className="relative block w-full text-left border-t border-slate-100 dark:border-slate-800 bg-white overflow-hidden cursor-zoom-in"
                                                >
                                                    <div className="overflow-x-auto">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={src}
                                                            alt={d.title}
                                                            className="block h-auto max-w-none bg-white transition-transform duration-500 group-hover:scale-[1.01]"
                                                            style={{
                                                                width: '100%',
                                                                minWidth: d.id === 'components' ? '1800px' : '900px'
                                                            }}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <span
                                                        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('system_architecture.openFull')}
                                                        <ZoomIn size={12}/>
                          </span>
                                                </button>
                                            </figure>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Key Processes (sequence diagrams) */}
                            <section id="processes" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Workflow className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('processes.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('processes.description')}
                                    </p>
                                </div>

                                <div className="space-y-10">
                                    {[
                                        {id: 'init-setup', file: 'seq-init-setup'},
                                        {id: 'login', file: 'seq-login'},
                                        {id: 'generate-data', file: 'seq-generate-data'},
                                        {id: 'backup-restore', file: 'seq-backup-restore'},
                                        {id: 'ai-generation', file: 'seq-ai-generation'},
                                        {id: 'substitution', file: 'seq-substitution'},
                                        {id: 'absence-excuse', file: 'seq-absence-excuse'},
                                    ].map((d, idx) => {
                                        const src = `/images/documentation/architecture/sequences/${d.file}.png`;
                                        return (
                                            <figure key={d.id}
                                                    className="group flex flex-col rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:border-brand-purple/30 transition-all overflow-hidden">
                                                <div className="flex items-center gap-3 px-8 pt-7 pb-3">
                          <span
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                            {idx + 1}
                          </span>
                                                    <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                        {translate(`processes.list.${d.id}.title`)}
                                                    </h3>
                                                </div>
                                                <p className="px-8 pb-5 pl-20 text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                    {translate(`processes.list.${d.id}.description`)}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => openDiagram(src, translate(`processes.list.${d.id}.title`))}
                                                    aria-label={t('processes.openFull')}
                                                    className="relative block w-full text-left border-t border-slate-100 dark:border-slate-800 bg-white overflow-hidden cursor-zoom-in"
                                                >
                                                    <div className="overflow-x-auto">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={src}
                                                            alt={translate(`processes.list.${d.id}.title`)}
                                                            className="block h-auto max-w-none bg-white"
                                                            style={{width: '100%', minWidth: '1600px'}}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <span
                                                        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            {t('processes.openFull')}
                                                        <ZoomIn size={12}/>
                          </span>
                                                </button>
                                            </figure>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Local Development */}
                            <section id="development" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Laptop className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('development.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('development.description')}
                                    </p>
                                </div>

                                {/* Prerequisites */}
                                <div className="space-y-6">
                                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {t('development.prereqsTitle')}
                                    </h3>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {(['node', 'npm', 'flyctl'] as const).map((p) => (
                                            <div key={p}
                                                 className="p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                                <h4 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                                                    {translate(`development.prereqs.${p}.label`)}
                                                </h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    {translate(`development.prereqs.${p}.description`)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick start steps */}
                                <div className="space-y-6">
                                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {t('development.stepsTitle')}
                                    </h3>
                                    <div className="space-y-4">
                                        {(['clone', 'env', 'secrets', 'install', 'db', 'dev'] as const).map((s, idx) => (
                                            <div key={s}
                                                 className="flex gap-4 p-5 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                                <div
                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1 min-w-0 space-y-2">
                                                    <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                                                        {translate(`development.steps.${s}.title`)}
                                                    </h4>
                                                    <pre
                                                        className="overflow-x-auto rounded-xl bg-slate-950 text-slate-100 px-4 py-3 text-xs md:text-sm font-mono leading-relaxed">
                            <code>{translate(`development.steps.${s}.command`)}</code>
                          </pre>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Default URLs */}
                                <div className="space-y-6">
                                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {t('development.urlsTitle')}
                                    </h3>
                                    <div
                                        className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                                        <table className="w-full text-sm">
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {FRONTEND_URLS.map((u) => (
                                                <tr key={u.id}>
                                                    <th scope="row"
                                                        className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300 inline-flex items-center gap-2">
                                                        <Globe size={14} className="text-slate-400"/>
                                                        {translate(`development.urls.${u.id}`)}
                                                    </th>
                                                    <td className="px-6 py-3 font-mono text-xs md:text-sm text-brand-purple">
                                                        {u.url}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Frontend note */}
                                <div
                                    className="rounded-[2rem] border border-brand-purple/20 bg-brand-purple/5 dark:bg-brand-purple/10 p-6 md:p-8 space-y-3">
                                    <h4 className="font-display text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Info size={18} className="text-brand-purple"/>
                                        {t('development.frontendNoteTitle')}
                                    </h4>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {t('development.frontendNote')}
                                    </p>
                                </div>

                                {/* .env reference */}
                                <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <Terminal className="h-6 w-6 text-brand-purple"/>
                                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('development.env.title')}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('development.env.description')}
                                    </p>

                                    <div className="space-y-8">
                                        {ENV_GROUPS.map((g, gIdx) => (
                                            <div key={g.id}
                                                 className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                                                <div className="flex items-center gap-3 px-6 pt-5 pb-3">
                          <span
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple font-bold text-xs">
                            {gIdx + 1}
                          </span>
                                                    <h4 className="font-display text-base md:text-lg font-bold text-slate-900 dark:text-white">
                                                        {translate(`development.env.groups.${g.id}`)}
                                                    </h4>
                                                </div>
                                                <div
                                                    className="overflow-x-auto border-t border-slate-100 dark:border-slate-800">
                                                    <table className="w-full text-sm">
                                                        <thead className="bg-slate-50/60 dark:bg-slate-950/40">
                                                        <tr>
                                                            <th scope="col"
                                                                className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[180px]">
                                                                {t('development.env.columnName')}
                                                            </th>
                                                            <th scope="col"
                                                                className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[180px]">
                                                                {t('development.env.columnExample')}
                                                            </th>
                                                            <th scope="col"
                                                                className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                                {t('development.env.columnDescription')}
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody
                                                            className="divide-y divide-slate-100 dark:divide-slate-800">
                                                        {g.vars.map((v) => {
                                                            const badge: Record<EnvRequired, string> = {
                                                                required: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                                                                recommended: 'bg-brand-purple/15 text-brand-purple',
                                                                optional: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
                                                            };
                                                            return (
                                                                <tr key={v.id} className="align-top">
                                                                    <th scope="row" className="px-4 py-3 text-left">
                                                                        <code
                                                                            className="font-mono text-xs md:text-sm text-slate-900 dark:text-slate-100 break-all">
                                                                            {v.name}
                                                                        </code>
                                                                        <div className="mt-1.5">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${badge[v.required]}`}>
                                          {t(`development.env.${v.required}`)}
                                        </span>
                                                                        </div>
                                                                    </th>
                                                                    <td className="px-4 py-3">
                                                                        {v.example ? (
                                                                            <code
                                                                                className="font-mono text-xs text-slate-600 dark:text-slate-400 break-all whitespace-pre-wrap">
                                                                                {v.example}
                                                                            </code>
                                                                        ) : (
                                                                            <span
                                                                                className="text-slate-300 dark:text-slate-600">—</span>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                                        {translate(`development.env.vars.${v.id}`)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Deployment */}
                            <section id="deployment" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Rocket className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">
                                        {t('deployment.title')}
                                    </h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('deployment.description')}
                                    </p>
                                </div>

                                {/* Topology */}
                                <div className="space-y-6">
                                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {t('deployment.topologyTitle')}
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {([
                                            {id: 'backend', icon: Server},
                                            {id: 'frontend', icon: CloudUpload},
                                            {id: 'maildev', icon: Mail},
                                            {id: 'backups', icon: Archive},
                                            {id: 'domains', icon: Globe},
                                        ] as const).map(({id, icon: Icon}) => (
                                            <div key={id}
                                                 className="p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                                <Icon className="h-6 w-6 text-brand-purple mb-3"/>
                                                <h4 className="font-display text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2">
                                                    {translate(`deployment.topology.${id}.title`)}
                                                </h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    {translate(`deployment.topology.${id}.description`)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Workflow actions */}
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('deployment.workflowTitle')}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                            {t('deployment.workflowDescription')}
                                        </p>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {(['deploy', 'delete'] as const).map((a) => (
                                            <div key={a}
                                                 className="p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                                                <h4 className="font-mono text-sm font-bold text-brand-purple uppercase tracking-widest">
                                                    {translate(`deployment.actions.${a}.title`)}
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {translate(`deployment.actions.${a}.description`)}
                                                </p>
                                                <pre
                                                    className="overflow-x-auto rounded-xl bg-slate-950 text-slate-100 px-4 py-3 text-xs md:text-sm font-mono leading-relaxed">
                          <code>{translate(`deployment.actions.${a}.command`)}</code>
                        </pre>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* GitHub secrets */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <Lock className="h-6 w-6 text-brand-purple"/>
                                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('deployment.secretsTitle')}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('deployment.secretsDescription')}
                                    </p>
                                    <div
                                        className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-slate-50/60 dark:bg-slate-950/40">
                                            <tr>
                                                <th scope="col"
                                                    className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 min-w-[200px]">
                                                    {t('development.env.columnName')}
                                                </th>
                                                <th scope="col"
                                                    className="px-4 py-3 text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                    {t('development.env.columnDescription')}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {([
                                                {id: 'fly-api-token', name: 'FLY_API_TOKEN', level: 'required'},
                                                {
                                                    id: 'cloudflare-api-token',
                                                    name: 'CLOUDFLARE_API_TOKEN',
                                                    level: 'required'
                                                },
                                                {
                                                    id: 'cloudflare-account-id',
                                                    name: 'CLOUDFLARE_ACCOUNT_ID',
                                                    level: 'required'
                                                },
                                                {id: 'jwt-secret', name: 'JWT_SECRET', level: 'recommended'},
                                                {id: 'encryption-key', name: 'ENCRYPTION_KEY', level: 'recommended'},
                                                {id: 'mcp-auth-token', name: 'MCP_AUTH_TOKEN', level: 'recommended'},
                                                {
                                                    id: 'r2-access-key-id',
                                                    name: 'R2_ACCESS_KEY_ID',
                                                    level: 'recommended'
                                                },
                                                {
                                                    id: 'r2-secret-access-key',
                                                    name: 'R2_SECRET_ACCESS_KEY',
                                                    level: 'recommended'
                                                },
                                            ] as const).map((s) => {
                                                const badge: Record<string, string> = {
                                                    required: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                                                    recommended: 'bg-brand-purple/15 text-brand-purple',
                                                };
                                                const label = s.level === 'required' ? t('deployment.secretsRequired') : t('deployment.secretsRecommended');
                                                return (
                                                    <tr key={s.id} className="align-top">
                                                        <th scope="row" className="px-4 py-3 text-left">
                                                            <code
                                                                className="font-mono text-xs md:text-sm text-slate-900 dark:text-slate-100 break-all">
                                                                {s.name}
                                                            </code>
                                                            <div className="mt-1.5">
                                  <span
                                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${badge[s.level]}`}>
                                    {label}
                                  </span>
                                                            </div>
                                                        </th>
                                                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                            {translate(`deployment.secrets.${s.id}`)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* One-time prereqs */}
                                <div className="space-y-6">
                                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {t('deployment.prereqsTitle')}
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {(['cloudflare', 'fly'] as const).map((p) => (
                                            <div key={p}
                                                 className="p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                                    {translate(`deployment.prereqs.${p}`)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Costs */}
                                <div
                                    className="rounded-[2rem] border border-brand-purple/20 bg-brand-purple/5 dark:bg-brand-purple/10 p-6 md:p-8 space-y-3">
                                    <h3 className="font-display text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Info size={18} className="text-brand-purple"/>
                                        {t('deployment.costsTitle')}
                                    </h3>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {t('deployment.costs')}
                                    </p>
                                    <a
                                        href="https://github.com/edustack-is/edustack-is-sandbox#deployment"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple hover:underline"
                                    >
                                        {t('deployment.readmeLink')}
                                        <ExternalLink size={14}/>
                                    </a>
                                </div>
                            </section>

                            {/* Backend Health & Status */}
                            <section id="backend-status" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Activity className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">
                                        {t('backendStatus.title')}
                                    </h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('backendStatus.description')}
                                    </p>
                                    <div
                                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-5 py-4 flex flex-wrap items-center gap-x-3 gap-y-1 max-w-[56rem]">
                    <span
                        className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {t('backendStatus.baseUrlLabel')}
                    </span>
                                        <a
                                            href={BACKEND_EXAMPLE_BASE}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-bold text-brand-purple hover:underline break-all"
                                        >
                                            <code className="font-mono text-sm">{BACKEND_EXAMPLE_BASE}</code>
                                            <ExternalLink size={14} className="shrink-0"/>
                                        </a>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t('backendStatus.baseUrlHint')}
                    </span>
                                    </div>
                                </div>

                                {/* Status page */}
                                <div className="grid gap-10 lg:grid-cols-2 items-start">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <Activity className="h-6 w-6 text-brand-purple"/>
                                            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {t('backendStatus.statusTitle')}
                                            </h3>
                                        </div>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {t('backendStatus.statusDescription')}
                                        </p>
                                        <a
                                            href={`${BACKEND_EXAMPLE_BASE}${t('backendStatus.statusPath')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple hover:underline break-all"
                                        >
                                            <code
                                                className="font-mono">{`{backendUrl}${t('backendStatus.statusPath')}`}</code>
                                            <ExternalLink size={14} className="shrink-0"/>
                                        </a>
                                    </div>
                                    <ScreenshotPlaceholder
                                        src="/images/documentation/backend-status/00_status_page.png"
                                        alt="Backend status page"
                                        roleColor="brand-purple"
                                        className="shadow-2xl"
                                    />
                                </div>

                                {/* Health gating */}
                                <div className="grid gap-10 lg:grid-cols-2 items-start">
                                    <ScreenshotPlaceholder
                                        src="/images/documentation/backend-status/01_frontend_loading.png"
                                        alt="Frontend loading screen while waiting for /api/health"
                                        roleColor="brand-purple"
                                        className="shadow-2xl lg:order-1"
                                    />
                                    <div className="space-y-6 lg:order-2">
                                        <div className="flex items-center gap-3">
                                            <HeartPulse className="h-6 w-6 text-brand-purple"/>
                                            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {t('backendStatus.healthTitle')}
                                            </h3>
                                        </div>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {t('backendStatus.healthDescription')}
                                        </p>
                                        <a
                                            href={`${BACKEND_EXAMPLE_BASE}${t('backendStatus.healthPath')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple hover:underline break-all"
                                        >
                                            <code
                                                className="font-mono">{`{backendUrl}${t('backendStatus.healthPath')}`}</code>
                                            <ExternalLink size={14} className="shrink-0"/>
                                        </a>
                                        <div className="space-y-3">
                                            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                {t('backendStatus.healthSampleTitle')}
                                            </h4>
                                            <pre
                                                className="overflow-x-auto rounded-2xl bg-slate-950 text-slate-100 px-4 py-4 text-xs md:text-sm font-mono leading-relaxed">
                        <code>{`{
  "status": "healthy",
  "uptime": 7717,
  "database": "ok",
  "memory": {
    "rss": 213,
    "heapUsed": 72,
    "heapTotal": 78
  },
  "version": "1.0.0",
  "commit": "205ec58b9db0245897b62984e584cb7866ee74c4",
  "buildTime": "2026-05-17T15:24:12Z",
  "timestamp": "2026-05-17T17:33:30.541Z"
}`}</code>
                      </pre>
                                        </div>
                                    </div>
                                </div>

                                {/* API documentation */}
                                <div className="grid gap-10 lg:grid-cols-2 items-start">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-6 w-6 text-brand-purple"/>
                                            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {t('backendStatus.docsTitle')}
                                            </h3>
                                        </div>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {t('backendStatus.docsDescription')}
                                        </p>
                                        <a
                                            href={`${BACKEND_EXAMPLE_BASE}${t('backendStatus.docsPath')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-brand-purple hover:underline break-all"
                                        >
                                            <code className="font-mono">{t('backendStatus.docsPath')}</code>
                                            <ExternalLink size={14} className="shrink-0"/>
                                        </a>
                                    </div>
                                    <ScreenshotPlaceholder
                                        src="/images/documentation/backend-status/02_swagger_docs.png"
                                        alt="Swagger / OpenAPI documentation"
                                        roleColor="brand-purple"
                                        className="shadow-2xl"
                                    />
                                </div>
                            </section>

                            {/* System Setup */}
                            <section id="setup" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Settings className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('setup.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('setup.description')}
                                    </p>
                                </div>

                                {/* Deploy workflow toggles */}
                                <div className="grid gap-10 lg:grid-cols-2 items-start">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <ToggleRight className="h-6 w-6 text-brand-purple"/>
                                            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {t('setup.workflowToggles.title')}
                                            </h3>
                                        </div>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {t('setup.workflowToggles.description')}
                                        </p>
                                        <div className="space-y-3">
                                            {(['helper', 'seed'] as const).map((k) => (
                                                <div key={k}
                                                     className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                                                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-purple">
                                                        {translate(`setup.workflowToggles.${k}Title`)}
                                                    </h4>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                        {translate(`setup.workflowToggles.${k}Description`)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <ScreenshotPlaceholder
                                        src="/images/documentation/system-setup/02_deploy_workflow_toggles.png"
                                        alt="Deploy Environment workflow toggles"
                                        roleColor="brand-purple"
                                        className="shadow-2xl"
                                    />
                                </div>

                                {/* Auto-seed demo data */}
                                <div
                                    className="rounded-[2rem] border border-brand-purple/20 bg-brand-purple/5 dark:bg-brand-purple/10 p-6 md:p-8 space-y-5">
                                    <div className="flex items-center gap-3">
                                        <Database className="h-6 w-6 text-brand-purple"/>
                                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('setup.autoSeed.title')}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {t('setup.autoSeed.description')}
                                    </p>
                                    <div
                                        className="rounded-2xl border border-brand-purple/20 bg-white dark:bg-slate-900 p-4 md:p-5 space-y-3">
                                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                            {t('setup.autoSeed.credentialsLabel')}
                                        </h4>
                                        <dl className="grid gap-2 sm:grid-cols-2 text-sm">
                                            <div className="space-y-1">
                                                <dt className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">Email</dt>
                                                <dd>
                                                    <code
                                                        className="font-mono text-slate-900 dark:text-slate-100 break-all">{t('setup.autoSeed.adminEmail')}</code>
                                                </dd>
                                            </div>
                                            <div className="space-y-1">
                                                <dt className="font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">Password</dt>
                                                <dd>
                                                    <code
                                                        className="font-mono text-slate-900 dark:text-slate-100">{t('setup.autoSeed.adminPassword')}</code>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div
                                        className="flex items-start gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-4 py-3">
                                        <AlertTriangle size={18}
                                                       className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"/>
                                        <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                                            {t('setup.autoSeed.securityNote')}
                                        </p>
                                    </div>
                                </div>

                                {/* Login helper */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <LogIn className="h-6 w-6 text-brand-purple"/>
                                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('setup.loginHelper.title')}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('setup.loginHelper.description')}
                                    </p>
                                </div>

                                {/* Manual first-boot setup */}
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                            {t('setup.manualTitle')}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                            {t('setup.manualDescription')}
                                        </p>
                                    </div>
                                    <div className="grid gap-10 md:grid-cols-2">
                                        <div
                                            className="group flex flex-col gap-8 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-2xl">
                                            <div className="space-y-4">
                                                <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-brand-purple">{translate('setup.option1.title')}</h3>
                                                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{translate('setup.option1.description')}</p>
                                            </div>
                                            <ScreenshotPlaceholder
                                                src="/images/documentation/system-setup/03_manual_fresh_install.png"
                                                alt="Manual system setup — fresh install with administrator form"
                                                roleColor="brand-purple"
                                                className="aspect-[3/4] group-hover:scale-[1.03] transition-transform"
                                            />
                                        </div>
                                        <div
                                            className="group flex flex-col gap-8 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-2xl">
                                            <div className="space-y-4">
                                                <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-brand-purple">{translate('setup.option2.title')}</h3>
                                                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{translate('setup.option2.description')}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <ScreenshotPlaceholder
                                                    src="/images/documentation/system-setup/04_manual_restore_empty.png"
                                                    alt="Restore from backup — no file selected"
                                                    roleColor="brand-purple"
                                                    className="aspect-[3/4] group-hover:scale-[1.03] transition-transform"
                                                />
                                                <ScreenshotPlaceholder
                                                    src="/images/documentation/system-setup/05_manual_restore_with_file.png"
                                                    alt="Restore from backup — .sqlite file selected"
                                                    roleColor="brand-purple"
                                                    className="aspect-[3/4] group-hover:scale-[1.03] transition-transform"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <ScreenshotPlaceholder
                                                    src="/images/documentation/system-setup/06_manual_restore_success.png"
                                                    alt="Restore finished sucesfully"
                                                    roleColor="brand-purple"
                                                    className="aspect-[3/4] group-hover:scale-[1.03] transition-transform"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* User Authentication */}
                            <section id="login" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div
                                        className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <LogIn className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">{t('login.title')}</h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('login.description')}
                                    </p>
                                </div>

                                <div className="grid gap-10 lg:grid-cols-2 items-start">
                                    <div className="space-y-6">
                                        {(['helper', 'credentials', 'sso', 'reset'] as const).map((type) => (
                                            <div
                                                key={type}
                                                className="p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3 hover:bg-white dark:hover:bg-slate-900 transition-colors hover:shadow-xl group"
                                            >
                                                <h4 className="font-display text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-purple transition-colors">
                                                    {translate(`login.${type}.title`)}
                                                </h4>
                                                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                                    {translate(`login.${type}.description`)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {([
                                            {id: 'helperSso', src: '00_helper_with_sso.png', wide: false},
                                            {id: 'helperNoSso', src: '01_helper_without_sso.png', wide: false},
                                            {id: 'credsSso', src: '02_credentials_with_sso.png', wide: false},
                                            {id: 'credsNoSso', src: '03_credentials_without_sso.png', wide: false},
                                            {id: 'reset', src: '04_reset_password.png', wide: false},
                                            {id: 'setNewPassword', src: '06_set_new_password.png', wide: false},
                                            {id: 'resetEmail', src: '05_reset_email.png', wide: true},
                                        ] as const).map(({id, src, wide}) => (
                                            <div key={id} className={`space-y-2 ${wide ? 'col-span-2' : ''}`}>
                                                <ScreenshotPlaceholder
                                                    src={`/images/documentation/login/${src}`}
                                                    alt={translate(`login.screenshots.${id}`)}
                                                    roleColor="brand-purple"
                                                    className="shadow-lg"
                                                />
                                                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                                                    {translate(`login.screenshots.${id}`)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* AI Tutor — same feature for every role */}
                            <section id="ai-tutor" className="scroll-mt-32 space-y-16">
                                <div className="space-y-6">
                                    <div className="inline-flex p-4 rounded-[2rem] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white shadow-inner">
                                        <Cpu className="h-10 w-10"/>
                                    </div>
                                    <h2 className="font-display text-3xl md:text-[46px] font-bold tracking-tight leading-[1.05]">
                                        {t('aiTutor.title')}
                                    </h2>
                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                        {t('aiTutor.description')}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {AI_TUTOR_FEATURE.images.map((img) => (
                                        <div key={img.id} className="space-y-2">
                                            <ScreenshotPlaceholder
                                                src={`/images/documentation/ai-tutor/${img.src}`}
                                                alt={translate(`aiTutor.images.${img.id}`)}
                                                roleColor="brand-purple"
                                                className="shadow-lg"
                                            />
                                            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center">
                                                {translate(`aiTutor.images.${img.id}`)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Roles Section */}
                        <div className="space-y-32 pt-20 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-6 text-center md:text-left">
                                <h2 className="font-display text-4xl sm:text-5xl md:text-[58px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.02]">
                                    {t('roles.title')}
                                </h2>
                                <div className="h-2 w-32 bg-brand-purple rounded-full md:mx-0 mx-auto"/>
                                <p className="text-base md:text-[19px] text-slate-500 dark:text-slate-400 font-medium max-w-[56rem]">
                                    {t('roles.intro')}
                                </p>
                                <ul className="grid gap-3 md:grid-cols-2 max-w-[56rem] text-left">
                                    {(['schoolManagement', 'teacher', 'student', 'parent'] as const).map((k) => (
                                        <li key={k} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-5 py-4">
                                            <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                                                {translate(`roles.distinctions.${k}.title`)}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                                                {translate(`roles.distinctions.${k}.body`)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-64">
                                {[
                                    {id: 'systemAdmin', icon: ShieldCheck},
                                    {id: 'schoolStaff', icon: School},
                                    {id: 'schoolManagement', icon: Settings},
                                    {id: 'teacher', icon: GraduationCap},
                                    {id: 'parent', icon: Heart},
                                    {id: 'student', icon: Users},
                                ].map((role) => {
                                    const color = roleColorMap[role.id];
                                    return (
                                        <section id={role.id} key={role.id} className="scroll-mt-32 space-y-48 group">
                                            {/* Role Introduction */}
                                            <div className="grid gap-16 lg:grid-cols-2 items-center">
                                                <div className="space-y-10">
                                                    <div className="space-y-6">
                                                        <div
                                                            className={`inline-flex p-6 rounded-[2.5rem] ${bgLightMap[color]} ${textMap[color]} transition-all group-hover:scale-110 group-hover:rotate-6 shadow-xl`}>
                                                            <role.icon className="h-16 w-10"/>
                                                        </div>
                                                        <h3 className={`font-display text-3xl md:text-[46px] font-bold tracking-tight ${textMap[color]} leading-[1.05]`}>
                                                            {translate(`roles.${role.id}.title`)}
                                                        </h3>
                                                    </div>

                                                    <div className="space-y-8">
                                                        <p className="font-display text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200 leading-snug text-balance">
                                                            {translate(`roles.${role.id}.description`)}
                                                        </p>

                                                        <div
                                                            className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-6 relative overflow-hidden">
                                                            <div
                                                                className={`absolute top-0 right-0 h-full w-2 ${bgFullMap[color]}`}/>
                                                            <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                                                                <Info size={16}/> {t('roles.coreFunctions')}
                                                            </h4>
                                                            <p className="text-base md:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                                                {translate(`roles.${role.id}.functions`)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <div
                                                        className={`absolute -inset-4 bg-${color}/10 blur-3xl rounded-full opacity-50`}/>
                                                    <ScreenshotPlaceholder
                                                        roleColor={color}
                                                        src={
                                                            role.id === 'systemAdmin'
                                                                ? '/images/documentation/system-admin/00_dashboard.png'
                                                                : role.id === 'schoolStaff'
                                                                    ? '/images/documentation/school-staff/dashboard/00_headmaster.png'
                                                                    : role.id === 'teacher'
                                                                        ? '/images/documentation/teacher/00.png'
                                                                        : role.id === 'schoolManagement'
                                                                            ? '/images/documentation/school-staff/dashboard/00_headmaster.png'
                                                                            : role.id === 'student'
                                                                                ? '/images/documentation/student/00.png'
                                                                                : role.id === 'parent'
                                                                                    ? '/images/documentation/parent/00.png'
                                                                                    : undefined
                                                        }
                                                        className="relative z-10 aspect-video shadow-2xl"
                                                    />
                                                </div>
                                            </div>

                                            {/* Detailed Workflows (skipped for roles that have custom feature blocks below) */}
                                            {!['systemAdmin', 'schoolStaff', 'teacher', 'schoolManagement', 'student', 'parent'].includes(role.id) && (
                                            <div className="space-y-32">
                                                <div className="flex items-center gap-6">
                                                    <h4 className="font-display text-base md:text-lg font-bold tracking-[0.08em] uppercase opacity-30 italic">{t('roles.workflows')}</h4>
                                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"/>
                                                </div>

                                                <div className="grid gap-48">
                                                    {[1, 2, 3].map((w) => {
                                                        const images = roleWorkflowImages[role.id]?.[w] || [];
                                                        const activeIndex = workflowImageIndices[`${role.id}-${w}`] || 0;

                                                        return (
                                                            <div key={w} className="space-y-12">
                                                                <div className="grid lg:grid-cols-5 gap-16 items-start">
                                                                    <div className="lg:col-span-2 space-y-8">
                                                                        <div className="space-y-4">
                                                                            <div className="flex items-center gap-4">
                                                                                <div
                                                                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border-2 ${borderMap[color]} ${textMap[color]} font-bold text-xl shadow-lg`}>
                                                                                    {w}
                                                                                </div>
                                                                                <h5 className="font-display text-xl md:text-[23px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                                                                                    {translate(`roles.${role.id}.workflow${w}.title`)}
                                                                                </h5>
                                                                            </div>
                                                                            <p className="text-base md:text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-16">
                                                                                {translate(`roles.${role.id}.workflow${w}.description`)}
                                                                            </p>
                                                                        </div>

                                                                        <div className="pl-16 space-y-6">
                                                                            <div className="flex items-center gap-3">
                                                                                <div
                                                                                    className={`h-px w-8 ${bgFullMap[color]}`}/>
                                                                                <span
                                                                                    className={`text-xs font-bold uppercase tracking-widest ${textMap[color]}`}>{t('roles.procedure')}</span>
                                                                            </div>
                                                                            <div className="grid gap-4">
                                                                                {[1, 2, 3, 4].map((s) => (
                                                                                    <div key={s}
                                                                                         className="flex gap-4 group/step transition-all hover:translate-x-1">
                                                                                        <CheckCircle2
                                                                                            className={`h-6 w-6 shrink-0 ${textMap[color]} opacity-20 group-hover/step:opacity-100 transition-opacity`}/>
                                                                                        <p className="text-sm md:text-[15px] font-medium text-slate-700 dark:text-slate-300 leading-snug">
                                                                                            {translate(`roles.${role.id}.workflow${w}.step${s}`)}
                                                                                        </p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="lg:col-span-3 space-y-8">
                                                                        <div className="relative group/carousel">
                                                                            <ScreenshotPlaceholder
                                                                                roleColor={color}
                                                                                src={getWorkflowImage(role.id, w)}
                                                                                className="aspect-video shadow-2xl rounded-[3rem]"
                                                                            />

                                                                            {/* Carousel Controls */}
                                                                            {images.length > 1 && (
                                                                                <>
                                                                                    <button
                                                                                        onClick={() => setWorkflowImage(role.id, w, activeIndex - 1)}
                                                                                        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white/20 active:scale-95 z-20"
                                                                                        aria-label="Previous image"
                                                                                    >
                                                                                        <ChevronLeft size={24}
                                                                                                     strokeWidth={3}/>
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => setWorkflowImage(role.id, w, activeIndex + 1)}
                                                                                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white/20 active:scale-95 z-20"
                                                                                        aria-label="Next image"
                                                                                    >
                                                                                        <ChevronRight size={24}
                                                                                                      strokeWidth={3}/>
                                                                                    </button>

                                                                                    {/* Counter */}
                                                                                    <div
                                                                                        className="absolute top-6 right-6 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest z-20">
                                                                                        {activeIndex + 1} / {images.length}
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </div>

                                                                        {/* Multi-image indicators */}
                                                                        {images.length > 1 ? (
                                                                            <div className="flex gap-4 h-2">
                                                                                {images.map((_, idx) => (
                                                                                    <button
                                                                                        key={idx}
                                                                                        onClick={() => setWorkflowImage(role.id, w, idx)}
                                                                                        className={`flex-1 rounded-full ${bgFullMap[color]} transition-all duration-300 ${activeIndex === idx ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                                                                                        aria-label={`Show image ${idx + 1}`}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="grid grid-cols-3 gap-4 h-2">
                                                                                <div
                                                                                    className={`rounded-full ${bgFullMap[color]} opacity-100`}/>
                                                                                <div
                                                                                    className={`rounded-full ${bgFullMap[color]} opacity-40`}/>
                                                                                <div
                                                                                    className={`rounded-full ${bgFullMap[color]} opacity-10`}/>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            )}

                                            {/* System Administrator feature blocks (replaces the carousel-based workflow tour) */}
                                            {role.id === 'systemAdmin' && (
                                                <div className="space-y-32 pt-16">
                                                    {SYSTEM_ADMIN_PRIMARY.map((feature) => (
                                                        <RoleFeatureBlock
                                                            key={feature.id}
                                                            roleId="systemAdmin"
                                                            feature={feature}
                                                            imageBasePath="/images/documentation/system-admin/"
                                                            accentClass="text-brand-purple"
                                                            translate={translate}
                                                        />
                                                    ))}

                                                    <div className="space-y-16">
                                                        <div className="space-y-6">
                                                            <div className="flex items-center gap-3">
                                                                <Settings className="h-6 w-6 text-brand-purple"/>
                                                                <h4 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                                    {translate('roles.systemAdmin.features.settings.title')}
                                                                </h4>
                                                            </div>
                                                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[56rem]">
                                                                {translate('roles.systemAdmin.features.settings.description')}
                                                            </p>
                                                        </div>
                                                        <div className="space-y-24 border-l-2 border-brand-purple/20 pl-6 md:pl-10">
                                                            {SYSTEM_ADMIN_SETTINGS.map((feature) => (
                                                                <RoleFeatureBlock
                                                                    key={feature.id}
                                                                    roleId="systemAdmin"
                                                                    feature={feature}
                                                                    imageBasePath="/images/documentation/system-admin/"
                                                                    accentClass="text-brand-purple"
                                                                    translate={translate}
                                                                    nested
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <RoleFeatureBlock
                                                        roleId="systemAdmin"
                                                        feature={SYSTEM_ADMIN_PROMPTS}
                                                        imageBasePath="/images/documentation/system-admin/"
                                                        accentClass="text-brand-purple"
                                                        translate={translate}
                                                    />
                                                </div>
                                            )}

                                            {/* School staff feature blocks (Headmaster, Deputy, Teacher) */}
                                            {role.id === 'schoolStaff' && (
                                                <div className="space-y-32 pt-16">
                                                    {SCHOOL_STAFF_FEATURES.map((feature) => (
                                                        <RoleFeatureBlock
                                                            key={feature.id}
                                                            roleId="schoolStaff"
                                                            feature={feature}
                                                            imageBasePath="/images/documentation/school-staff/"
                                                            accentClass="text-brand-teal"
                                                            translate={translate}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Teacher feature blocks */}
                                            {role.id === 'teacher' && (
                                                <div className="space-y-32 pt-16">
                                                    {TEACHER_FEATURES.map((feature) => (
                                                        <RoleFeatureBlock
                                                            key={feature.id}
                                                            roleId="teacher"
                                                            feature={feature}
                                                            imageBasePath="/images/documentation/teacher/"
                                                            accentClass="text-rose-500"
                                                            translate={translate}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* School management feature blocks (Headmaster + Deputy only) */}
                                            {role.id === 'schoolManagement' && (
                                                <div className="space-y-32 pt-16">
                                                    {SCHOOL_MANAGEMENT_FEATURES.map((feature) => (
                                                        <RoleFeatureBlock
                                                            key={feature.id}
                                                            roleId="schoolManagement"
                                                            feature={feature}
                                                            imageBasePath="/images/documentation/school-management/"
                                                            accentClass="text-brand-blue"
                                                            translate={translate}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Student feature blocks */}
                                            {role.id === 'student' && (
                                                <div className="space-y-32 pt-16">
                                                    {STUDENT_FEATURES.map((feature) => (
                                                        <RoleFeatureBlock
                                                            key={feature.id}
                                                            roleId="student"
                                                            feature={feature}
                                                            imageBasePath="/images/documentation/student/"
                                                            accentClass="text-brand-orange"
                                                            translate={translate}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Parent feature blocks */}
                                            {role.id === 'parent' && (
                                                <div className="space-y-32 pt-16">
                                                    {PARENT_FEATURES.map((feature) => (
                                                        <RoleFeatureBlock
                                                            key={feature.id}
                                                            roleId="parent"
                                                            feature={feature}
                                                            imageBasePath="/images/documentation/parent/"
                                                            accentClass="text-emerald-500"
                                                            translate={translate}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </section>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            <Footer/>

            <Lightbox
                src={diagramLightbox?.src ?? ''}
                alt={diagramLightbox?.alt ?? ''}
                isOpen={diagramLightbox !== null}
                onClose={() => setDiagramLightbox(null)}
                fit="native"
            />
        </div>
    );
}
