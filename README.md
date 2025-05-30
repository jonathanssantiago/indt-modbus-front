# Monitor IoT - Interface de Monitoramento

Uma aplicação web moderna para monitoramento de dados de dispositivos IoT em tempo real, desenvolvida com Next.js, TypeScript e Material-UI.

## 🚀 Características

- **Interface Responsiva**: Design moderno e responsivo com Material-UI
- **Tempo Real**: Comunicação via WebSocket para dados em tempo real
- **Gráficos Interativos**: Visualização de dados históricos com Recharts
- **Reconexão Automática**: Sistema robusto de reconexão automática
- **Notificações**: Sistema de notificações para status de conexão
- **TypeScript**: Código totalmente tipado para melhor manutenibilidade

## 📊 Dados Monitorados

- **Tensão (V)**: Medição de tensão elétrica
- **Corrente (A)**: Medição de corrente elétrica
- **Temperatura (°C)**: Medição de temperatura

## 🛠️ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Material-UI v6](https://mui.com/) - Biblioteca de componentes
- [Recharts](https://recharts.org/) - Biblioteca de gráficos
- [Socket.IO Client](https://socket.io/) - Comunicação em tempo real
- [ESLint](https://eslint.org/) - Linting de código

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd indt-modbus-front
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.local.example .env.local
```

4. Execute em modo de desenvolvimento:

```bash
npm run dev
```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linting do código

## ⚙️ Configuração

As configurações podem ser ajustadas através das variáveis de ambiente:

```env
# URL do servidor WebSocket
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:3003

# Nome da aplicação
NEXT_PUBLIC_APP_NAME="Modbus IHM"

# Máximo de pontos de dados históricos
NEXT_PUBLIC_MAX_DATA_POINTS=20
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas e layout (App Router)
├── components/             # Componentes React reutilizáveis
├── hooks/                  # Hooks customizados
├── services/               # Serviços (WebSocket, API)
├── types/                  # Definições de tipos TypeScript
└── config/                 # Configurações da aplicação
```

## 🔄 Funcionalidades WebSocket

A aplicação se conecta a um servidor WebSocket que deve fornecer:

- `modbusData`: Dados em tempo real dos sensores
- `connectionStatus`: Status da conexão Modbus

### Formato dos Dados

```typescript
interface ModbusData {
  voltage: number;
  current: number;
  temperature: number;
  timestamp: string;
}
```

## 🎨 Interface

### Tela Principal

- **Header**: Nome da aplicação e status de conexão
- **Leituras Atuais**: Cards com valores atuais dos sensores
- **Gráficos Históricos**: Visualização temporal dos dados

### Recursos da Interface

- Indicador visual de status de conexão
- Botão de reconexão manual
- Botão para limpar histórico de dados
- Notificações de mudança de status
- Estados de loading e error

## 🔧 Desenvolvimento

### Hooks Customizados

- `useIoTDeviceData()`: Gerencia dados dos sensores
- `useConnectionStatus()`: Gerencia status de conexão
- `useHistoricalData()`: Gerencia dados históricos

### Componentes Principais

- `ConnectionStatus`: Indicador de status de conexão
- `CurrentReadings`: Cards com leituras atuais
- `Dashboard`: Gráficos históricos
- `Notification`: Sistema de notificações

## 📦 Build e Deploy

Para gerar o build de produção:

```bash
npm run build
npm run start
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
