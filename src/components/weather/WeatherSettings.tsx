import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WeatherSettingsProps {
  units: string;
  onUnitsChange: (units: string) => void;
  displayOptions: {
    [key: string]: boolean;
  };
  onDisplayOptionChange: (option: string, value: boolean) => void;
}

export const WeatherSettings = ({
  units,
  onUnitsChange,
  displayOptions,
  onDisplayOptionChange,
}: WeatherSettingsProps) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>{t("settings")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>{t("units")}</Label>
          <Select value={units} onValueChange={onUnitsChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectUnits")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">{t("metric")} (°C, km/h)</SelectItem>
              <SelectItem value="imperial">{t("imperial")} (°F, mph)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>{t("displayOptions")}</Label>
          {Object.entries(displayOptions).map(([option, value]) => (
            <div key={option} className="flex items-center justify-between">
              <Label htmlFor={option}>{t(option)}</Label>
              <Switch
                id={option}
                checked={value}
                onCheckedChange={(checked) => onDisplayOptionChange(option, checked)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};