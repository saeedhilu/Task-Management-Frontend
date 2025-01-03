import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider/ThemeToggle";
import { useDispatch } from 'react-redux'
import { setTheme as setReduxTheme } from "@/redux/slice/themeSlice"

export function ModeToggle() {
  const { setTheme : setThemeFromHook  } = useTheme();
  const dispatch  = useDispatch()
  
  
  
  const themes = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    
  ];

  const handleThemeToggle=(theme)=>{
    dispatch(setReduxTheme(theme))
    
    setThemeFromHook(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((item, idx) => (
          <DropdownMenuItem key={idx} onClick={() => handleThemeToggle(item.value)} >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
