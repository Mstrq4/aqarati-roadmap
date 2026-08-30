import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { applyTheme, getPreferredTheme, nextTheme, persistTheme, type ThemeName } from '@/lib/theme'
import { cn } from '@/lib/cn'

type ThemeToggleProps = { className?: string }

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeName>(() => getPreferredTheme())
  useEffect(() => { applyTheme(theme); persistTheme(theme) }, [theme])
  const isDark = theme === 'dark'
  return <button type="button" className={cn('interactive inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-sm hover:bg-secondary/70',className)} aria-label={`تبديل الوضع إلى ${isDark ? 'النهاري' : 'الليلي'}`} title={`الوضع ${isDark ? 'النهاري' : 'الليلي'}`} onClick={()=>setTheme(current=>nextTheme(current))}>{isDark?<Sun aria-hidden="true" className="h-5 w-5"/>:<Moon aria-hidden="true" className="h-5 w-5"/>}</button>
}
