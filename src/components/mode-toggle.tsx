import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Light</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
                <Moon className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Dark</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTheme("system")}>
                <Monitor className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">System</span>
            </Button>
        </div>
    )
}
