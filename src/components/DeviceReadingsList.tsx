'use client';

import { useState, useEffect } from 'react';
import { DeviceReading, DeviceReadingsApiResponse, ReadingType } from '@/types';
import { config } from '@/config';

interface DeviceReadingsListProps {
  refreshInterval?: number;
}

const ReadingTypeLabels: Record<ReadingType, string> = {
  VOLTAGE: 'Tensão',
  TEMPERATURE: 'Temperatura',
  CURRENT: 'Corrente',
};

const ReadingTypeUnits: Record<ReadingType, string> = {
  VOLTAGE: 'V',
  TEMPERATURE: '°C',
  CURRENT: 'A',
};

const ReadingTypeColors: Record<ReadingType, string> = {
  VOLTAGE: 'bg-blue-100 text-blue-800',
  TEMPERATURE: 'bg-red-100 text-red-800',
  CURRENT: 'bg-green-100 text-green-800',
};

export default function DeviceReadingsList({
  refreshInterval = 30000,
}: DeviceReadingsListProps) {
  const [readings, setReadings] = useState<DeviceReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchReadings = async (page: number = 1) => {
    try {
      setLoading(page === 1);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      const response = await fetch(
        `${config.api.baseUrl}/device-readings/history?${params}`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar leituras');
      }

      const apiResponse: DeviceReadingsApiResponse = await response.json();

      if (page === 1) {
        setReadings(apiResponse.data);
      } else {
        setReadings((prev) => [...prev, ...apiResponse.data]);
      }

      setTotalPages(apiResponse.meta.totalPages);
      setTotal(apiResponse.meta.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchReadings(nextPage);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatValue = (value: string | number, type: ReadingType) => {
    // Converte string para number, se necessário
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Verifica se é um número válido
    if (isNaN(numericValue)) {
      return `0.0 ${ReadingTypeUnits[type]}`;
    }

    return `${numericValue.toFixed(1)} ${ReadingTypeUnits[type]}`;
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        fetchReadings(1);
        setCurrentPage(1);
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Erro ao carregar leituras
            </h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <button
              onClick={() => fetchReadings()}
              className="mt-2 text-sm text-red-800 underline hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Histórico de Leituras
          </h2>
          {total > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {total}{' '}
              {total === 1 ? 'leitura encontrada' : 'leituras encontradas'}
            </p>
          )}
        </div>
      </div>

      {loading && readings.length === 0 ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center space-x-4">
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="flex-1 h-6 bg-gray-200 rounded"></div>
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {readings.map((reading, index) => (
              <div
                key={`${reading.id}-${reading.createdAt}-${index}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ReadingTypeColors[reading.type]
                      }`}
                    >
                      {ReadingTypeLabels[reading.type]}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatValue(reading.value, reading.type)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(reading.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {readings.length === 0 && !loading && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhuma leitura encontrada
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Não há leituras disponíveis no momento.
              </p>
            </div>
          )}

          {currentPage < totalPages && readings.length > 0 && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Carregando...
                  </>
                ) : (
                  'Carregar mais'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
