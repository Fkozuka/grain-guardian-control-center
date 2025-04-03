
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateReceptionProgressData } from '@/utils/chartsData';

const ReceptionProgressChart: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Avanço do Recebimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={generateReceptionProgressData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis label={{ value: 'Toneladas', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="goal" 
                name="Meta" 
                stroke="#8884d8" 
                fill="#8884d8"
                fillOpacity={0.2}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                name="Realizado" 
                stroke="#82ca9d" 
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceptionProgressChart;
