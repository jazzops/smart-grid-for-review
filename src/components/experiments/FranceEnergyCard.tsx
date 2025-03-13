import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cloud, Factory, Flame, Atom, Droplet, Wind, Sun } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const COLORS = {
  nuclear: "#7C3AED",
  renewable: "#10B981",
  fossil: "#EF4444",
  import: "#F59E0B",
};

interface EnergySource {
  name: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

export function FranceEnergyCard() {
  const productionData: EnergySource[] = [
    { name: "Nuclear", value: 49351, icon: Atom, color: COLORS.nuclear },
    { name: "Hydro", value: 9084, icon: Droplet, color: COLORS.renewable },
    { name: "Wind", value: 1157, icon: Wind, color: COLORS.renewable },
    { name: "Solar", value: 0, icon: Sun, color: COLORS.renewable },
    { name: "Gas", value: 3904, icon: Flame, color: COLORS.fossil },
    { name: "Coal", value: 0, icon: Factory, color: COLORS.fossil },
    { name: "Biomass", value: 893, icon: Factory, color: COLORS.renewable },
    { name: "Battery", value: 5, icon: Battery, color: COLORS.renewable },
  ];

  const importExportData = [
    { name: "Import", value: 1476, color: COLORS.import },
    { name: "Export", value: 7221, color: COLORS.nuclear },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>France Energy Data</span>
            <div className="text-sm font-normal">
              <span className="text-green-500">93% Fossil-Free</span>
              {" | "}
              <span className="text-emerald-500">19% Renewable</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Production Breakdown */}
            <div className="h-[300px]">
              <h3 className="text-sm font-medium mb-4">Production Breakdown</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {productionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as EnergySource;
                        return (
                          <div className="bg-background/95 p-2 rounded-lg border shadow-sm">
                            <div className="flex items-center gap-2">
                              <data.icon className="h-4 w-4" />
                              <span className="font-medium">{data.name}</span>
                            </div>
                            <div className="text-sm">
                              {data.value.toLocaleString()} MW
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Import/Export */}
            <div className="h-[300px]">
              <h3 className="text-sm font-medium mb-4">Import/Export Balance</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={importExportData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Energy Sources List */}
            <div className="col-span-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {productionData.map((source) => (
                  <div
                    key={source.name}
                    className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                  >
                    <source.icon className="h-5 w-5" style={{ color: source.color }} />
                    <div>
                      <div className="text-sm font-medium">{source.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {source.value.toLocaleString()} MW
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}