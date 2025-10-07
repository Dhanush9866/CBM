import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

export function TranslationTest() {
  const { translations, currentLanguage } = useTranslation();

  if (!translations) {
    return <div>Loading translations...</div>;
  }

  const testKeys = [
    'pages.careers.applicationDialog.title',
    'pages.careers.applicationDialog.labels.firstName',
    'pages.careers.applicationDialog.validation.resumeRequired',
    'pages.careers.applicationDialog.success.title'
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Translation Test - Language: {currentLanguage}</h3>
      <div className="space-y-2">
        {testKeys.map(key => {
          const keys = key.split('.');
          let value: any = translations;
          
          for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
              value = value[k];
            } else {
              value = `Missing: ${key}`;
              break;
            }
          }
          
          return (
            <div key={key} className="flex justify-between">
              <span className="font-mono text-sm">{key}:</span>
              <span className="text-sm">{typeof value === 'string' ? value : 'Not found'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

