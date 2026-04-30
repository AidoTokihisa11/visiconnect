import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"

const LanguageSelector = () => {
  const { language, changeLanguage, getAvailableLanguages } = useTranslation();
  const availableLanguages = getAvailableLanguages();
  const currentLang = availableLanguages.find(lang => lang.code === language);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 rounded-full relative"
          title={currentLang?.name || 'Language'}
        >
          <Globe className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-400" />
          <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center font-semibold uppercase" style={{ zIndex: 10 }}>
            {language.slice(0, 2)}
          </span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer gap-2 ${lang.code === language ? 'bg-accent font-semibold' : ''}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {lang.code === language && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default LanguageSelector;