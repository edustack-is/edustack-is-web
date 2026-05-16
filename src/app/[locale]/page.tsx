import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import IdeaSection from '@/components/landing/IdeaSection';
import HowSection from '@/components/landing/HowSection';
import LearnSection from '@/components/landing/LearnSection';
import TourSection from '@/components/landing/TourSection';
import AudienceSection from '@/components/landing/AudienceSection';
import MethodSection from '@/components/landing/MethodSection';
import DownloadsSection from '@/components/landing/DownloadsSection';
import DemoSection from '@/components/landing/DemoSection';
import SourceSection from '@/components/landing/SourceSection';
import ContactSection from '@/components/landing/ContactSection';

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text font-body">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Hero />
        <IdeaSection />
        <HowSection />
        <LearnSection />
        <TourSection />
        <AudienceSection />
        <MethodSection />
        <DownloadsSection />
        <DemoSection />
        <SourceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
