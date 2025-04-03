
import React, { useState } from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const UserMenu = () => {
  const { userName, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <div className="flex items-center gap-2 text-white">
            <UserCircle className="h-6 w-6" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">
            {userName || 'Usuário'}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            usuário do sistema
          </p>
        </div>
        <DropdownMenuItem
          className="cursor-pointer flex items-center"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
