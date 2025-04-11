# Guia de Integração com Backend - Grain Guardian

Este documento fornece orientações para integrar o frontend do Grain Guardian com um backend personalizado desenvolvido pelo curso. O frontend foi desenvolvido em React com TypeScript e utiliza várias APIs para obter dados em tempo real do sistema de supervisão de grãos.

## Sumário

1. [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
2. [Endpoints da API](#endpoints-da-api)
3. [Modelos de Dados](#modelos-de-dados)
4. [Autenticação](#autenticação)
5. [Implementando a Integração](#implementando-a-integração)
6. [Websockets para Dados em Tempo Real](#websockets-para-dados-em-tempo-real)
7. [Testes e Depuração](#testes-e-depuração)

## Visão Geral da Arquitetura

O Grain Guardian é um sistema de supervisório para monitoramento de recebimento e armazenamento de grãos. A arquitetura recomendada para a integração é:

```
┌────────────┐        ┌────────────┐        ┌────────────┐
│            │        │            │        │            │
│  Frontend  │<------>│  Backend   │<------>│  Sensores/ │
│   React    │  HTTP  │   API      │ OPC UA │  CLP       │
│            │   WS   │            │        │            │
└────────────┘        └────────────┘        └────────────┘
```

## Endpoints da API

O frontend espera os seguintes endpoints da API:

### Autenticação

- `POST /api/auth/login` - Autenticar usuário
- `POST /api/auth/logout` - Encerrar sessão

### Sensores e Status do Sistema

- `GET /api/status/overview` - Obter visão geral do sistema
- `GET /api/sensors/linha-suja` - Dados da linha suja
- `GET /api/sensors/linha-limpa` - Dados da linha limpa

### Silos

- `GET /api/silos` - Listar todos os silos
- `GET /api/silos/:id` - Obter detalhes de um silo específico
- `PATCH /api/silos/:id` - Atualizar configurações de um silo

### Secadores

- `GET /api/secadores` - Listar todos os secadores
- `GET /api/secadores/:id` - Obter detalhes de um secador específico
- `GET /api/secadores/:id/historico` - Obter histórico de um secador
- `POST /api/secadores/:id/comando` - Enviar comando para um secador

### Fluxos de Transferência

- `GET /api/fluxos` - Listar todos os fluxos disponíveis
- `GET /api/fluxos/ativos` - Listar fluxos ativos
- `GET /api/fluxos/bloqueados` - Listar fluxos bloqueados
- `POST /api/fluxos/:id/ativar` - Ativar um fluxo
- `POST /api/fluxos/:id/desativar` - Desativar um fluxo

### Logs e Atividades

- `GET /api/logs` - Obter logs do sistema
- `GET /api/atividades` - Obter registro de atividades

## Modelos de Dados

### StatusOverview

```typescript
interface StatusOverview {
  expedicao: {
    status: "Ativo" | "Inativo" | "Manutenção";
    statusCode: "normal" | "warning" | "critical";
  };
  recebimento: {
    status: "Ativo" | "Inativo" | "Manutenção";
    statusCode: "normal" | "warning" | "critical";
  };
  capacidadeUtilizada: {
    valor: number; // porcentagem
    statusCode: "normal" | "warning" | "critical";
  };
  linhaSuja: {
    valor: number; // ton/h
    statusCode: "normal" | "warning" | "critical";
  };
  linhaLimpa: {
    valor: number; // ton/h
    statusCode: "normal" | "warning" | "critical";
  };
}
```

### Silo

```typescript
interface Silo {
  id: string;
  nome: string;
  capacidade: number; // kg
  nivelAtual: number; // kg
  produto: string;
  temperatura: number; // Celsius
  umidade: number; // porcentagem
}
```

### Secador

```typescript
interface Secador {
  id: string;
  nome: string;
  status: "Ativo" | "Inativo" | "Manutenção";
  unidadeEntrada: number; // porcentagem
  unidadeSaida: number; // porcentagem
  temperaturaQueimador: number; // Celsius
  temperaturaFornalha: number; // Celsius
  temperaturaEntrada: number; // Celsius
  temperaturaSaida: number; // Celsius
  toneladaHoraEntrada: number; // ton/h
  toneladaHoraSaida: number; // ton/h
}
```

### Fluxo

```typescript
interface Fluxo {
  id: string;
  nome: string;
  descricao: string;
  status: "disponivel" | "ativo" | "bloqueado";
  origem: string;
  destino: string;
  capacidade: number; // ton/h
  passos: Array<{
    id: string;
    descricao: string;
    equipamentoId: string;
    tipo: "elevador" | "correia" | "valvula" | "silo" | "secador";
  }>;
}
```

### Log

```typescript
interface Log {
  id: string;
  timestamp: string;
  nivel: "info" | "warning" | "error";
  origem: string;
  mensagem: string;
  dados?: Record<string, any>;
}
```

## Autenticação

O sistema utiliza autenticação baseada em token JWT:

1. O cliente envia credenciais para `/api/auth/login`
2. O servidor retorna um token JWT
3. O cliente inclui este token em todas as requisições subsequentes no header `Authorization: Bearer {token}`

### Exemplo de Resposta de Login

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "nome": "Administrador",
    "papel": "admin"
  }
}
```

## Implementando a Integração

### 1. Configuração Inicial

Crie um arquivo de configuração da API:

```typescript
// src/api/config.ts
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3000';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};
```

### 2. Cliente HTTP

Recomendamos criar um cliente HTTP centralizado:

```typescript
// src/api/client.ts
import { API_BASE_URL, getAuthHeaders } from './config';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    ...getAuthHeaders()
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    // Tratamento de erro padronizado
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erro na requisição: ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  get: (endpoint: string) => fetchWithAuth(endpoint),
  
  post: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  put: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  patch: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  
  delete: (endpoint: string) => fetchWithAuth(endpoint, {
    method: 'DELETE'
  })
};
```

### 3. Serviços de API

Organize os serviços de API por domínio:

```typescript
// src/api/services/silosService.ts
import { apiClient } from '../client';
import type { Silo } from '../types';

export const silosService = {
  getAll: () => apiClient.get('/silos'),
  getById: (id: string) => apiClient.get(`/silos/${id}`),
  update: (id: string, data: Partial<Silo>) => apiClient.patch(`/silos/${id}`, data)
};
```

### 4. Hooks de Consulta

Utilize o React Query para gerenciar o estado da API:

```typescript
// src/hooks/use-silos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { silosService } from '../api/services/silosService';

export function useSilos() {
  return useQuery({
    queryKey: ['silos'],
    queryFn: silosService.getAll
  });
}

export function useSiloDetails(id: string) {
  return useQuery({
    queryKey: ['silos', id],
    queryFn: () => silosService.getById(id),
    enabled: !!id
  });
}

export function useUpdateSilo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => 
      silosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['silos'] });
    }
  });
}
```

## Websockets para Dados em Tempo Real

Para dados que precisam ser atualizados em tempo real, como leituras de sensores, recomendamos o uso de WebSockets.

### Configuração Básica

```typescript
// src/api/websocket.ts
import { WS_BASE_URL } from './config';

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Record<string, ((data: any) => void)[]> = {};

  connect() {
    if (this.socket) {
      this.socket.close();
    }

    const token = localStorage.getItem('authToken');
    this.socket = new WebSocket(`${WS_BASE_URL}?token=${token}`);

    this.socket.onopen = () => {
      console.log('WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);
        this.notifyListeners(type, payload);
      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket desconectado');
      // Reconectar após 5 segundos
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);

    return () => {
      this.listeners[type] = this.listeners[type].filter(cb => cb !== callback);
    };
  }

  private notifyListeners(type: string, data: any) {
    if (this.listeners[type]) {
      this.listeners[type].forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const wsService = new WebSocketService();
```

### Hook para Consumir Dados em Tempo Real

```typescript
// src/hooks/use-realtime-data.ts
import { useState, useEffect } from 'react';
import { wsService } from '../api/websocket';

export function useRealtimeData(dataType: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = wsService.subscribe(dataType, (newData) => {
      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, [dataType]);

  return data;
}
```

## Testes e Depuração

### Ambiente de Desenvolvimento

Para desenvolvimento, recomendamos o uso de mocks para simular o backend:

```typescript
// src/mocks/handlers.js (usando MSW - Mock Service Worker)
import { rest } from 'msw';
import { API_BASE_URL } from '../api/config';

const mockSilos = [
  // Dados de exemplo
];

export const handlers = [
  rest.get(`${API_BASE_URL}/silos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSilos));
  }),
  
  // Outros handlers de mock
];
```

### Validação de Integração

Checklist para validação da integração:

1. Autenticação funciona corretamente
2. Dados são atualizados em tempo real
3. Erros são tratados e exibidos adequadamente
4. As notificações e alertas do sistema funcionam
5. Os comandos enviados para o backend são processados corretamente

### Monitoramento

Recomendamos implementar logging do lado do cliente para facilitar a depuração:

```typescript
// src/utils/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
    // Enviar para servidor de logs, se necessário
  },
  
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
    // Enviar para servidor de logs, se necessário
  },
  
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Enviar para servidor de logs, se necessário
  }
};
```

## Integração com OPC UA

Para integração com o CLP através do protocolo OPC UA, o backend precisa implementar um cliente OPC UA que se conecta ao servidor OPC UA do CLP. Abaixo estão os principais aspectos a serem considerados:

### Cliente OPC UA

O backend deve utilizar uma biblioteca cliente OPC UA (como node-opcua para Node.js) para estabelecer a conexão com o servidor OPC UA do CLP:

```javascript
// Exemplo de código para o backend (utilizando node-opcua)
const { OPCUAClient, AttributeIds, TimestampsToReturn } = require("node-opcua");

async function connectToOpcUaServer() {
  const client = OPCUAClient.create({
    applicationName: "GrainGuardian",
    connectionStrategy: {
      initialDelay: 1000,
      maxRetry: 10
    }
  });
  
  // Conectar ao servidor OPC UA
  const endpointUrl = "opc.tcp://IP_DO_CLP:4840";
  await client.connect(endpointUrl);
  
  // Criar sessão
  const session = await client.createSession();
  
  return { client, session };
}

// Função para ler valores do CLP
async function readCLPValues(session, nodeId) {
  try {
    const dataValue = await session.read({
      nodeId,
      attributeId: AttributeIds.Value
    });
    return dataValue.value.value;
  } catch (error) {
    console.error(`Erro ao ler valor do CLP: ${error.message}`);
    throw error;
  }
}

// Função para escrever valores no CLP
async function writeCLPValue(session, nodeId, value) {
  try {
    await session.write({
      nodeId,
      attributeId: AttributeIds.Value,
      value: {
        value: {
          dataType: DataType.Double,
          value
        }
      }
    });
    return true;
  } catch (error) {
    console.error(`Erro ao escrever valor no CLP: ${error.message}`);
    throw error;
  }
}
```

### Mapeamento de Endpoints para Tags OPC UA

Recomenda-se criar um mapeamento claro entre os endpoints da API e as tags OPC UA no CLP:

```javascript
// Exemplo de mapeamento
const opcuaTagMapping = {
  silos: {
    'silo1.nivel': 'ns=2;s=SILO_01.NIVEL',
    'silo1.temperatura': 'ns=2;s=SILO_01.TEMPERATURA',
    'silo1.umidade': 'ns=2;s=SILO_01.UMIDADE',
    // Outros tags...
  },
  secadores: {
    'secador1.temperaturaEntrada': 'ns=2;s=SECADOR_01.TEMP_ENTRADA',
    'secador1.temperaturaSaida': 'ns=2;s=SECADOR_01.TEMP_SAIDA',
    // Outros tags...
  },
  // Outros equipamentos...
};
```

### Monitoramento de Dados em Tempo Real

Para dados em tempo real, configure a assinatura (subscription) OPC UA:

```javascript
async function setupSubscription(session, nodeId, callback) {
  const subscription = await session.createSubscription2({
    requestedPublishingInterval: 1000,
    requestedLifetimeCount: 100,
    requestedMaxKeepAliveCount: 10,
    maxNotificationsPerPublish: 100,
    publishingEnabled: true,
    priority: 10
  });

  const monitoredItem = await subscription.monitor({
    nodeId,
    attributeId: AttributeIds.Value
  },
  {
    samplingInterval: 1000,
    discardOldest: true,
    queueSize: 10
  });

  monitoredItem.on("changed", (dataValue) => {
    callback(dataValue.value.value);
  });

  return subscription;
}
```

### Considerações sobre Segurança

Ao utilizar OPC UA, considere os seguintes aspectos de segurança:

1. **Autenticação**: Configure a autenticação apropriada para o servidor OPC UA.
2. **Criptografia**: Utilize comunicação criptografada quando possível.
3. **Permissões**: Defina permissões adequadas para leitura/escrita de tags no CLP.

### Exemplo de Implementação no Backend

A API REST do backend deve fazer o intermédio entre as requisições do frontend e as comunicações OPC UA com o CLP:

```javascript
// Exemplo de API REST usando Express.js
app.get('/api/silos/:id', async (req, res) => {
  try {
    const { session } = await getOpcUaSession();
    const siloId = req.params.id;
    
    // Ler dados do CLP via OPC UA
    const nivel = await readCLPValues(session, opcuaTagMapping.silos[`silo${siloId}.nivel`]);
    const temperatura = await readCLPValues(session, opcuaTagMapping.silos[`silo${siloId}.temperatura`]);
    const umidade = await readCLPValues(session, opcuaTagMapping.silos[`silo${siloId}.umidade`]);
    
    // Retornar dados para o frontend
    res.json({
      id: siloId,
      nome: `Silo ${siloId}`,
      nivelAtual: nivel,
      temperatura,
      umidade,
      // Outros campos...
    });
  } catch (error) {
    console.error(`Erro ao obter dados do silo ${siloId}:`, error);
    res.status(500).json({ error: 'Falha ao obter dados do silo' });
  }
});
```

## Conclusão

Este guia fornece as bases para a integração do frontend do Grain Guardian com um backend personalizado que se comunica com CLPs via OPC UA. Adaptações específicas podem ser necessárias dependendo da implementação exata do backend desenvolvido pelo curso e dos modelos de CLPs utilizados.

Para qualquer dúvida adicional ou suporte, consulte a documentação específica do curso ou entre em contato com os instrutores.

---

**Versão:** 1.1  
**Última atualização:** 11/04/2025
