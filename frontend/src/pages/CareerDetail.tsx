import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JobApplicationDialog } from '@/components/Common/JobApplicationDialog';
import { CareerDto, getCareerById } from '@/services/careersService';
import { useTranslation } from '@/contexts/TranslationContext';
import { MapPin, Clock, Briefcase, ArrowLeft } from 'lucide-react';

export default function CareerDetail() {
  const { id } = useParams();
  const { currentLanguage, translations } = useTranslation();
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };
  const [job, setJob] = useState<CareerDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          throw new Error('Missing career id');
        }
        // Force refetch by including currentLanguage in the request
        const data = await getCareerById(id, currentLanguage);
        if (isMounted) {
          setJob(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load career');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [id, currentLanguage]);

  if (loading) {
    return (
      <div className="section">
        <div className="container-responsive text-center text-muted-foreground">
          {translations?.pages?.careers?.currentOpenings?.loadingText || 'Loading careers...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container-responsive text-center text-destructive">{error}</div>
      </div>
    );
  }

  if (!job) return null;

  const renderFormattedDescription = (text: string) => {
    const lines = text.split(/\r?\n/);

    // Improved heading detection (matches Admin logic)
    const headingKeywords = [
      'overview', 'responsibility', 'responsibilities', 'requirement', 'requirements',
      'qualification', 'qualifications', 'benefit', 'benefits', 'about', 'summary', 'role',
      'what you will do', 'who you are', 'skills', 'experience', 'reporting to', 'reporting',
      'technical', 'language', 'languages', 'offer', 'apply', 'education', 'knowledge', 'competencies'
    ];

    return (
      <div>
        {lines.map((line, idx) => {
          const l = line.trim();
          if (l.length === 0) {
            return <div key={idx} className="h-3" />; // spacing for blank lines
          }

          const isShort = l.length < 80;
          const containsKeyword = headingKeywords.some(kw => l.toLowerCase().includes(kw));
          const endsWithColon = l.endsWith(':');
          const isReviewHeader = /^\s*(?:\d+\.|[a-zA-Z]\))\s+/.test(l);
          const isBullet = /^[-*•]\s/.test(l);

          // If line looks like a heading, style it Bold & Black
          if (isShort && !isBullet && (containsKeyword || endsWithColon || isReviewHeader)) {
            return (
              <h3 key={idx} className="text-base font-bold mt-6 mb-2 text-black" style={{ color: 'black' }}>{l}</h3>
            );
          }

          return (
            <p key={idx} className="text-muted-foreground">{line}</p>
          );
        })}
      </div>
    );
  };

  return (
    <section className="section">
      <div className="container-responsive">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/careers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="bg-white border border-border rounded-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{job.type} • {job.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{job.type} • {job.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Posted {formatDate(job.postedAt)}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <JobApplicationDialog job={job}>
                <Button className="w-full lg:w-auto">
                  {translations?.pages?.careers?.applyNow || 'Apply Now'}
                </Button>
              </JobApplicationDialog>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none mt-6">
            {/* <h2 className="text-xl font-semibold mb-2">Job Description</h2> */}
            {job.sections && job.sections.length > 0 ? (
              <div className="space-y-6">
                {job.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-base font-bold mt-2 mb-2 text-black" style={{ color: 'black' }}>{section.heading}</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              renderFormattedDescription(job.description)
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {job.requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Benefits</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {job.benefits.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


