import { NextRequest, NextResponse } from 'next/server';

// Tipos de leitura permitidos
type ReadingType = 'VOLTAGE' | 'TEMPERATURE' | 'CURRENT';

interface DeviceReading {
  id: number;
  type: ReadingType;
  value: string; // Alterado para string para corresponder à API real
  createdAt: string;
}

// Simulação de dados - em produção viria de um banco de dados
const mockReadings: DeviceReading[] = [
  {
    id: 1,
    type: 'VOLTAGE',
    value: '220.5',
    createdAt: '2024-03-10T15:30:00.000Z',
  },
  {
    id: 2,
    type: 'TEMPERATURE',
    value: '23.5',
    createdAt: '2024-03-10T15:29:00.000Z',
  },
  {
    id: 3,
    type: 'CURRENT',
    value: '15.8',
    createdAt: '2024-03-10T15:28:00.000Z',
  },
  {
    id: 4,
    type: 'VOLTAGE',
    value: '218.7',
    createdAt: '2024-03-10T15:27:00.000Z',
  },
  {
    id: 5,
    type: 'TEMPERATURE',
    value: '24.1',
    createdAt: '2024-03-10T15:26:00.000Z',
  },
  {
    id: 6,
    type: 'CURRENT',
    value: '16.2',
    createdAt: '2024-03-10T15:25:00.000Z',
  },
  {
    id: 7,
    type: 'VOLTAGE',
    value: '221.3',
    createdAt: '2024-03-10T15:24:00.000Z',
  },
  {
    id: 8,
    type: 'TEMPERATURE',
    value: '22.8',
    createdAt: '2024-03-10T15:23:00.000Z',
  },
  {
    id: 9,
    type: 'CURRENT',
    value: '14.9',
    createdAt: '2024-03-10T15:22:00.000Z',
  },
  {
    id: 10,
    type: 'VOLTAGE',
    value: '219.8',
    createdAt: '2024-03-10T15:21:00.000Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as ReadingType | null;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredReadings = [...mockReadings];

    // Filtrar por tipo se fornecido
    if (type && ['VOLTAGE', 'TEMPERATURE', 'CURRENT'].includes(type)) {
      filteredReadings = filteredReadings.filter(
        (reading) => reading.type === type
      );
    }

    // Ordenar por data mais recente primeiro
    filteredReadings.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReadings = filteredReadings.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        data: paginatedReadings,
        meta: {
          total: filteredReadings.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(filteredReadings.length / limit),
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Erro ao buscar leituras:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
