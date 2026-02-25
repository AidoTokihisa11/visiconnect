import React, { useState } from 'react';
import { Globe } from 'lucide-react';
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
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
          <Globe className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-400" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer gap-2"
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default LanguageSelector;