'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {ChevronLeft, ChevronRight, Book, Users, Laptop, Settings, LogIn, GraduationCap, School, ShieldCheck, UserCheck, Search, Heart} from 'lucide-react';

interface ManualSidebarProps {
  activeSection: string;
}

const activeTextMap: Record<string, string> = {
  systemAdmin: 'text-brand-purple',
  schoolAdmin: 'text-brand-slate',
  headmaster: 'text-brand-blue',
  deputy: 'text-brand-pink',
  teacher: 'text-brand-teal',
  parent: 'text-rose-500',
  student: 'text-brand-orange',
};

export default function ManualSidebar({ activeSection }: ManualSidebarProps) {
  const t = useTranslations('Manual');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    {
      id: 'chapters',
      title: t('sidebar.chapters'),
      icon: Book,
      items: [
        { id: 'development', label: t('development.title'), icon: Laptop },
        { id: 'setup', label: t('setup.title'), icon: Settings },
        { id: 'login', label: t('login.title'), icon: LogIn },
      ]
    },
    {
      id: 'roles',
      title: t('sidebar.roles'),
      icon: Users,
      items: [
        { id: 'systemAdmin', label: t('roles.systemAdmin.title'), icon: ShieldCheck },
        { id: 'schoolAdmin', label: t('roles.schoolAdmin.title'), icon: School },
        { id: 'headmaster', label: t('roles.headmaster.title'), icon: Search },
        { id: 'deputy', label: t('roles.deputy.title'), icon: UserCheck },
        { id: 'teacher', label: t('roles.teacher.title'), icon: GraduationCap },
        { id: 'parent', label: t('roles.parent.title'), icon: Heart },
        { id: 'student', label: t('roles.student.title'), icon: Users },
      ]
    }
  ];

  return (
    <aside 
      className={`sticky top-20 h-[calc(100vh-5rem)] transition-all duration-500 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl z-30 ${isCollapsed ? 'w-24' : 'w-80'}`}
    >
      <div className="flex flex-col h-full p-6 relative">
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-8 h-8 w-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-background flex items-center justify-center text-slate-500 hover:text-brand-purple transition-all shadow-xl z-50 hover:scale-110 active:scale-90"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div className={`flex flex-col gap-10 ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed && (
            <div className="px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-2">
                {t('sidebar.contents')}
              </h3>
              <div className="h-1 w-8 bg-brand-purple rounded-full" />
            </div>
          )}

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} className="space-y-6">
                {!isCollapsed && (
                  <h4 className="flex items-center gap-2 px-4 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white opacity-50">
                    {section.title}
                  </h4>
                )}
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${activeSection === item.id ? 'bg-slate-100 dark:bg-slate-900 shadow-inner' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                    >
                      <item.icon 
                        size={20} 
                        className={`shrink-0 transition-colors ${activeSection === item.id ? (activeTextMap[item.id] || 'text-brand-purple') : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} 
                      />
                      {!isCollapsed && (
                        <span className={`text-sm font-bold truncate transition-colors ${activeSection === item.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300'}`}>
                          {item.label}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
