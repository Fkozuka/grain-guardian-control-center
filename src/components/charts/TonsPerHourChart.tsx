
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTonsPerHourData } from '@/utils/chartsData';
import { EquipmentType } from '@/utils/chartsData';

interface TonsPerHourChartProps {
  equipmentList: Record<EquipmentType, string[]>;
  selectedEquipment: string;
}

const TonsPerHourChart: React.FC<TonsPerHourChartProps> = ({ equipmentList, selectedEquipment }) => {
  const safeFormatValue = (value: string | number | undefined): string => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return String(value || '');
  };
  
  // Create and filter chart data based on selected equipment
  const getData = () => {
    const allData = [
      ...generateTonsPerHourData(equipmentList.elevadores),
      ...generateTonsPerHourData(equipmentList.corrente),
      ...generateTonsPerHourData(equipmentList.rosca)
    ];
    
    if (selectedEquipment === 'all') {
      return allData;
    }
    
    return allData.filter(item => item.name === selectedEquipment);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Tonelada/Hora por Equipamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis label={{ value: 'Tonelada/Hora', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => {
                const numValue = safeFormatValue(value as string | number) + ' ton/h';
                return [numValue, 'Desempenho'];
              }} />
              <Legend />
              <Bar dataKey="value" name="Tonelada/Hora" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TonsPerHourChart;
