import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { AtomCursor } from '@/app/components/AtomCursor';
import { auth } from '@/auth';

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const sections = [
    { name: 'Overview', path: '/docs' },
    { name: 'Quick Start', path: '/docs/quick-start' },
    { name: 'API Reference', path: '/docs/api-reference' },
    { name: 'SDK Reference', path: '/docs/sdk-reference' },
    { name: 'CI/CD Integration', path: '/docs/ci-cd' },
  ];

  return (
    <>
      <AtomCursor />
      <div className="bg-black text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-fixed min-h-screen flex flex-col">
        <Navbar session={session} />

      <main className="flex-grow pt-[120px] pb-3xl relative z-10 max-w-[1440px] w-full mx-auto px-margin flex flex-col md:flex-row gap-xl">
        
        {/* Docs Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky top-[120px] self-start mb-xl md:mb-0 hidden md:block">
          <nav className="space-y-sm bg-surface-container/50 p-lg rounded-xl border border-outline-variant/30 backdrop-blur-md">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-md border-b border-outline-variant/30 pb-xs">DOCUMENTATION</h3>
            <ul className="space-y-xs">
              {sections.map((section) => (
                <li key={section.path}>
                  <Link 
                    href={section.path} 
                    className="text-on-surface hover:text-primary-container transition-colors block py-xs font-medium text-sm"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <article className="flex-grow bg-surface-container-lowest/50 p-xl md:p-3xl rounded-xl border border-outline-variant/30 backdrop-blur-md prose prose-invert max-w-4xl prose-headings:font-headline prose-headings:text-primary-container prose-p:text-on-surface-variant prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {children}
        </article>
      </main>
    </div>
    </>
  );
}
