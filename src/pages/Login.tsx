
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Wheat, Lock, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nome de usuário deve ter pelo menos 3 caracteres.",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a simple mock authentication
    // In a real application, you would call an API to verify credentials
    if (values.username === "admin" && values.password === "admin123") {
      // Save authentication state (in a real app, store a token)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", values.username);
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao Grain Guardian!",
      });
      
      navigate("/");
    } else {
      toast({
        title: "Erro de login",
        description: "Nome de usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-industrial-primary p-4 rounded-full">
            <Wheat size={32} className="text-industrial-warning" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-industrial-primary mb-6">
          Grain Guardian
        </h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">
          Supervisório de Recebimento de Grãos
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de Usuário</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Digite seu nome de usuário"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="w-full bg-industrial-primary hover:bg-industrial-primary/90"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </div>
          </form>
        </Form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Credenciais de demonstração:</p>
          <p>Usuário: admin / Senha: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
