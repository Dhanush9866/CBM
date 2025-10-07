import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitJobApplication, JobApplicationData } from '@/utils/api';
import { useTranslation } from '@/contexts/TranslationContext';
import { ArrowRight, Upload, X } from 'lucide-react';

interface JobApplicationDialogProps {
  job: {
    title: string;
    department: string;
    location: string;
    type: string;
    level: string;
    description: string;
  };
  children: React.ReactNode;
}

export function JobApplicationDialog({ job, children }: JobApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<JobApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: job.title,
    department: job.department,
    experience: '',
    coverLetter: ''
  });
  
  const { toast } = useToast();
  const { translations } = useTranslation();

  // Helper function to get translation with fallback
  const t = (key: string, params?: Record<string, string>) => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value === 'string') {
      // Replace placeholders with params
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, param) => params[param] || match);
      }
      return value;
    }
    
    return key;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: t('pages.careers.applicationDialog.validation.invalidFileType'),
          description: t('pages.careers.applicationDialog.validation.invalidFileType'),
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t('pages.careers.applicationDialog.validation.fileTooLarge'),
          description: t('pages.careers.applicationDialog.validation.fileTooLarge'),
          variant: "destructive",
        });
        return;
      }
      
      setResumeFile(file);
    }
  };

  const handleInputChange = (field: keyof JobApplicationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast({
        title: t('pages.careers.applicationDialog.validation.resumeRequired'),
        description: t('pages.careers.applicationDialog.validation.resumeRequired'),
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'experience', 'coverLetter'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof JobApplicationData]);
    
    if (missingFields.length > 0) {
      toast({
        title: t('pages.careers.applicationDialog.validation.missingFields', { fields: missingFields.join(', ') }),
        description: t('pages.careers.applicationDialog.validation.missingFields', { fields: missingFields.join(', ') }),
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('pages.careers.applicationDialog.validation.invalidEmail'),
        description: t('pages.careers.applicationDialog.validation.invalidEmail'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await submitJobApplication(formData, resumeFile);
      
      if (result.success) {
        toast({
          title: t('pages.careers.applicationDialog.success.title'),
          description: t('pages.careers.applicationDialog.success.description'),
        });
        setOpen(false);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: job.title,
          department: job.department,
          experience: '',
          coverLetter: ''
        });
        setResumeFile(null);
      } else {
        throw new Error(result.message || t('pages.careers.applicationDialog.error.description'));
      }
    } catch (error: any) {
      toast({
        title: t('pages.careers.applicationDialog.error.title'),
        description: error.response?.data?.message || error.message || t('pages.careers.applicationDialog.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: job.title,
      department: job.department,
      experience: '',
      coverLetter: ''
    });
    setResumeFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t('pages.careers.applicationDialog.title', { position: job.title })}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{t('pages.careers.applicationDialog.positionDetails.title')}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{t('pages.careers.applicationDialog.positionDetails.position')}:</span>
                <p className="font-medium">{job.title}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t('pages.careers.applicationDialog.positionDetails.department')}:</span>
                <p className="font-medium">{job.department}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t('pages.careers.applicationDialog.positionDetails.location')}:</span>
                <p className="font-medium">{job.location}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t('pages.careers.applicationDialog.positionDetails.type')}:</span>
                <p className="font-medium">{job.type}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('pages.careers.applicationDialog.personalInformation')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t('pages.careers.applicationDialog.labels.firstName')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t('pages.careers.applicationDialog.labels.lastName')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t('pages.careers.applicationDialog.labels.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{t('pages.careers.applicationDialog.labels.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="experience">{t('pages.careers.applicationDialog.labels.experience')}</Label>
            <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('pages.careers.applicationDialog.placeholders.experience')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">{t('pages.careers.applicationDialog.experienceLevels.0-1')}</SelectItem>
                <SelectItem value="2-3">{t('pages.careers.applicationDialog.experienceLevels.2-3')}</SelectItem>
                <SelectItem value="4-5">{t('pages.careers.applicationDialog.experienceLevels.4-5')}</SelectItem>
                <SelectItem value="6-8">{t('pages.careers.applicationDialog.experienceLevels.6-8')}</SelectItem>
                <SelectItem value="9-12">{t('pages.careers.applicationDialog.experienceLevels.9-12')}</SelectItem>
                <SelectItem value="13+">{t('pages.careers.applicationDialog.experienceLevels.13+')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resume Upload */}
          <div>
            <Label htmlFor="resume">{t('pages.careers.applicationDialog.labels.resume')}</Label>
            <div className="mt-2">
              {resumeFile ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">{resumeFile.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setResumeFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('pages.careers.applicationDialog.fileUpload.clickToUpload')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('pages.careers.applicationDialog.fileUpload.maxFileSize')}
                  </p>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById('resume')?.click()}
                  >
                    {t('pages.careers.applicationDialog.fileUpload.chooseFile')}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter">{t('pages.careers.applicationDialog.labels.coverLetter')}</Label>
            <Textarea
              id="coverLetter"
              placeholder={t('pages.careers.applicationDialog.placeholders.coverLetter')}
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              rows={6}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              {t('pages.careers.applicationDialog.reset')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  {t('pages.careers.applicationDialog.submitting')}
                  <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </>
              ) : (
                <>
                  {t('pages.careers.applicationDialog.submitApplication')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}



