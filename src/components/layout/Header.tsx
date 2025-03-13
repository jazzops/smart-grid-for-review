
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { LanguageSelector } from "@/components/LanguageSelector";
import { NotificationCenter } from "@/components/ui/notifications/NotificationCenter";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export function Header({ toggleMobileMenu }: HeaderProps) {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const headerTranslateY = useTransform(scrollY, [0, 100], [0, -100]);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{
        opacity: headerOpacity,
        y: headerTranslateY
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <ApiKeySettings />
          <div className="flex flex-col items-center sm:items-start gap-1">
            <h1 className="text-xl font-semibold text-center sm:text-left">
              {t('Panel monitorowania jakości powietrza')}
            </h1>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {t('Monitoruj zużycie i jakość powietrza w czasie rzeczywistym, oraz wykorzystaj potencjał zaawansowanych algorytmów AI ')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LanguageSelector />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('changeLanguage', 'Change language')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <NotificationCenter />
          <DarkModeToggle />
        </div>
      </div>
    </motion.div>
  );
}
