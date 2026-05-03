import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ManualPage() {
  const t = useTranslations('Manual');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12 prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('intro')}</p>
        
        <div className="grid gap-12 mt-12">
          <section>
            <h2 className="text-2xl font-bold">Getting Started</h2>
            <p>To access the system, you need an account provided by your school administrator. Once you have your credentials, navigate to the login page and choose your preferred authentication method (Google, GitHub, or Microsoft).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">User Roles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">Administrator</h3>
                <p className="text-sm text-muted-foreground">Full access to school settings, registry management, and user impersonation for support.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">Teacher</h3>
                <p className="text-sm text-muted-foreground">Manage classes, assign grades, create schedule events, and interact with the AI teaching assistant.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">Student</h3>
                <p className="text-sm text-muted-foreground">View grades, personal schedule, and school broadcasts. Use AI chat for educational support.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">AI Assistant</h2>
            <p>The system integrates an AI assistant powered by the Model Context Protocol (MCP). It can help you with administrative tasks, generate educational content, or analyze school data in real-time. Use the chat drawer on the right side of the screen to interact with the assistant.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
