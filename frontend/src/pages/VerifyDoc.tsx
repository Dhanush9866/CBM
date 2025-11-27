import { FormEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitVerificationRequest } from '@/services/verifyDoc';
import { FileCheck2, Loader2, ShieldCheck, UploadCloud } from 'lucide-react';

const locationOptions = [
  'Global',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'United Kingdom',
  'European Union',
  'United States',
  'Asia Pacific',
  'Africa',
  'Latin America',
];

export default function VerifyDoc() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    jobTitle: '',
    location: locationOptions[0],
    comments: '',
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const basicFieldsFilled =
      form.firstName.trim() &&
      form.lastName.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.location;
    return Boolean(basicFieldsFilled && documents.length > 0 && !submitting);
  }, [form, documents, submitting]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (!files.length) return;
    setDocuments((prev) => {
      const combined = [...prev, ...files];
      return combined.slice(0, 5);
    });
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      toast({
        title: 'Incomplete details',
        description: 'Please fill the required fields and attach at least one document.',
      });
      return;
    }
    try {
      setSubmitting(true);
      await submitVerificationRequest(
        {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          companyName: form.companyName.trim() || undefined,
          jobTitle: form.jobTitle.trim() || undefined,
          location: form.location,
          comments: form.comments.trim() || undefined,
        },
        documents
      );
      toast({
        title: 'Request sent',
        description: 'Your documents were shared with our verification team.',
      });
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        jobTitle: '',
        location: locationOptions[0],
        comments: '',
      });
      setDocuments([]);
    } catch (error: any) {
      const description =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unable to send your request. Please try again later.';
      toast({
        title: 'Submission failed',
        description,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-900/60" />
        <div className="relative container-responsive py-20 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide">
              Trusted Compliance Desk
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance lg:text-5xl">
              Verify Your Certificates & Technical Documents
            </h1>
            <p className="text-lg text-white/80">
              Upload inspection reports, compliance certificates, or calibration records securely.
              Our admin team will validate authenticity and respond with next steps within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#verify-form">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Verification
                </Button>
              </a>
              <div className="flex items-center text-sm text-white/80">
                <ShieldCheck className="mr-2 h-5 w-5 text-emerald-300" />
                Encrypted & handled by admin only
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-white" />
      </section>

      <section className="section -mt-12 bg-white" id="verify-form">
        <div className="container-responsive grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-tuv-sm lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Submit documents for manual verification</h2>
              <p className="text-muted-foreground mt-3">
                Provide the basic contact details and attach the certificates or reports that need
                validation. You can add up to 5 files (PDF, DOC/DOCX, JPG, PNG) per submission.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Official Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={form.location}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="companyName">Company Name (optional)</Label>
                  <Input
                    id="companyName"
                    placeholder="CBM 360 Global"
                    value={form.companyName}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, companyName: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title (optional)</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Operations Manager"
                    value={form.jobTitle}
                    onChange={(event) => setForm((prev) => ({ ...prev, jobTitle: event.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="comments">Comments / Reference (optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Add purchase order, certificate IDs, or any special notes..."
                  value={form.comments}
                  onChange={(event) => setForm((prev) => ({ ...prev, comments: event.target.value }))}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label>Upload documents *</Label>
                <div className="mt-3 rounded-2xl border-2 border-dashed border-border p-6 text-center">
                  <input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="documents" className="flex cursor-pointer flex-col items-center">
                    <UploadCloud className="mb-3 h-10 w-10 text-primary" />
                    <p className="font-semibold">Drag & drop or click to upload</p>
                    <p className="text-sm text-muted-foreground">
                      Up to 5 files • Max 10MB each • PDF, DOC, DOCX, JPG, PNG
                    </p>
                  </label>
                </div>
                {documents.length > 0 && (
                  <ul className="mt-4 space-y-3">
                    {documents.map((file, index) => (
                      <li
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="h-4 w-4 text-primary" />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full btn-primary" disabled={!canSubmit}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send to Admin Team'
                )}
              </Button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-lg">
              <ShieldCheck className="mb-4 h-10 w-10 text-emerald-300" />
              <h3 className="text-2xl font-semibold">What happens next?</h3>
              <ul className="mt-6 space-y-4 text-sm text-white/80">
                <li>
                  <span className="font-semibold text-white">1. Secure review:</span> Our admin desk
                  validates file integrity and authenticity.
                </li>
                <li>
                  <span className="font-semibold text-white">2. Confirmation email:</span> You will
                  receive a direct update from Support@cbm360tiv.com.
                </li>
                <li>
                  <span className="font-semibold text-white">3. Assisted follow-up:</span> Additional
                  clarifications or site audits are scheduled if needed.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <h4 className="text-lg font-semibold">Need quick assistance?</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Email Support@cbm360tiv.com or call +44 7934 980214 referencing &ldquo;Verify Doc
                Portal&rdquo; for priority routing.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

