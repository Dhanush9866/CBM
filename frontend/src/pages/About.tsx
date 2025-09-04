import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { getPageWithSections, PageDto } from '@/utils/api';

export default function About() {
  const { currentLanguage } = useTranslation();
  const [page, setPage] = useState<PageDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lightweight Markdown-like parser supporting H1/H2/H3, paragraphs and bullets
  function parseContentToBlocks(raw: string): Array<{ type: string; content: JSX.Element; props?: any }> {
    const lines = raw.replace(/\r\n/g, '\n').split('\n');
    const blocks: Array<{ type: string; content: JSX.Element; props?: any }> = [];
    let paragraphBuffer: string[] = [];
    let listBuffer: string[] = [];

    const flushParagraph = () => {
      if (paragraphBuffer.length > 0) {
        const text = paragraphBuffer.join(' ').trim();
        if (text) {
          blocks.push({
            type: 'p',
            content: (
              <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{text}</p>
              </div>
            )
          });
        }
        paragraphBuffer = [];
      }
    };

    const flushList = () => {
      if (listBuffer.length > 0) {
        blocks.push({
          type: 'ul',
          content: (
            <ul key={`ul-${blocks.length}`} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {listBuffer.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          )
        });
        listBuffer = [];
      }
    };

    const startNewBlock = () => {
      flushParagraph();
      flushList();
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        startNewBlock();
        return;
      }

      // Bullets: -, *, •, – or numbered like 1.
      if (/^(\-|\*|•|–)\s+/.test(trimmed)) {
        flushParagraph();
        const bulletContent = trimmed.replace(/^(\-|\*|•|–)\s+/, '');

        // Check if bullet content starts with **text** pattern -> treat as heading
        const boldMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
        if (boldMatch) {
          const headingText = boldMatch[1].trim();
          const remainingText = boldMatch[2].trim();
          const Tag = 'h3' as keyof JSX.IntrinsicElements;
          const sizeClass = 'text-xl md:text-2xl';
          blocks.push({
            type: 'h3',
            content: (
              <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
                {headingText}
              </Tag>
            ),
            props: { children: headingText }
          });
          if (remainingText) {
            blocks.push({
              type: 'p',
              content: (
                <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                  <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{remainingText}</p>
                </div>
              )
            });
          }
          return;
        }
        listBuffer.push(bulletContent);
        return;
      }
      if (/^\d+\.[\)\.]?\s+/.test(trimmed)) {
        flushParagraph();
        const bulletContent = trimmed.replace(/^\d+\.[\)\.]?\s+/, '');
        const boldMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
        if (boldMatch) {
          const headingText = boldMatch[1].trim();
          const remainingText = boldMatch[2].trim();
          const Tag = 'h4' as keyof JSX.IntrinsicElements;
          const sizeClass = 'text-xl md:text-2xl';
          blocks.push({
            type: 'h3',
            content: (
              <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
                {headingText}
              </Tag>
            ),
            props: { children: headingText }
          });
          if (remainingText) {
            blocks.push({
              type: 'p',
              content: (
                <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                  <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{remainingText}</p>
                </div>
              )
            });
          }
          return;
        }
        listBuffer.push(bulletContent);
        return;
      }

      // Headings: #, ##, ### or **text** patterns
      const hMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
      if (hMatch) {
        startNewBlock();
        const level = hMatch[1].length;
        const text = hMatch[2].trim();
        const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as keyof JSX.IntrinsicElements;
        const sizeClass = level === 1 ? 'text-3xl md:text-4xl' : level === 2 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';
        blocks.push({
          type: level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3',
          content: (
            <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
              {text}
            </Tag>
          ),
          props: { children: text }
        });
        return;
      }

      const boldMatch = trimmed.match(/^\*\*(.*?)\*\*:?\s*$/);
      if (boldMatch) {
        startNewBlock();
        const text = boldMatch[1].trim();
        const Tag = 'h3' as keyof JSX.IntrinsicElements;
        const sizeClass = 'text-xl md:text-2xl';
        blocks.push({
          type: 'h3',
          content: (
            <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
              {text}
            </Tag>
          ),
          props: { children: text }
        });
        return;
      }

      // Fallback paragraph
      paragraphBuffer.push(trimmed);
    });

    // Flush remaining
    startNewBlock();
    return blocks;
  }

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getPageWithSections('about', undefined, currentLanguage)
      .then((data) => {
        if (mounted) {console.log("data", data);setPage(data);}
      })
      .catch((err) => {
        console.error('Failed to load About page:', err);
        if (mounted) setError('Failed to load content');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [currentLanguage]);

  const mainSection = useMemo(() => {
    const sections = page?.sections || [];
    return sections.find((s) => s.sectionId === 'about-main') || sections[0];
  }, [page]);

  const blocks = useMemo(() => {
    return mainSection?.bodyText ? parseContentToBlocks(mainSection.bodyText) : [];
  }, [mainSection]);

  if (loading) {
  return (
      <div className="container-responsive py-16">
        <p>Loading...</p>
              </div>
    );
  }

  if (error) {
    return (
      <div className="container-responsive py-16">
        <p className="text-destructive">{error}</p>
          </div>
    );
  }

  return (
    <div className="container-responsive py-12">
      <article className="prose max-w-none">
        {(!blocks.some(b => b.type === 'h1')) && (
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">{page?.title || 'About'}</h1>
        )}
        {/* Hero banner after first heading */}
        {mainSection?.images && mainSection.images[0] && (
          <div className="mb-8 max-w-3xl mx-auto">
            <img
              src={mainSection.images[0]}
              alt="About hero image"
              className="w-full h-auto object-contain"
              loading="eager"
            />
          </div>
        )}
        {page?.description && (
          <p className="text-lg text-muted-foreground mb-8">{page.description}</p>
        )}
        <div className="space-y-2">
          {(() => {
            const insertIndex = Math.floor(blocks.length / 2);
            const midImage = mainSection?.images && mainSection.images[1];
            return blocks.map((b, i) => (
              <div key={i}>
                {midImage && i === insertIndex && (
                  <div className="my-8">
                    <img
                      src={midImage}
                      alt="About mid content image"
                      className="w-full h-48 md:h-60 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                {b.content}
              </div>
            ));
          })()}
        </div>
      </article>
    </div>
  );
}
