import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EUROPEAN_COUNTRIES } from "../constants";

interface HeaderProps {
  powerData: any;
  selectedCountry: any;
  onCountrySelect: (value: string) => void;
}

export const Header = ({ powerData, selectedCountry, onCountrySelect }: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Select
        value={selectedCountry.id}
        onValueChange={(value) => {
          const country = EUROPEAN_COUNTRIES.find(c => c.id === value);
          if (country) onCountrySelect(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {EUROPEAN_COUNTRIES.map((country) => (
            <SelectItem key={country.id} value={country.id}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {powerData && (
        <div className="text-sm font-normal">
          <span className="text-green-500">{powerData.fossilFreePercentage}% Fossil-Free</span>
          {" | "}
          <span className="text-emerald-500">{powerData.renewablePercentage}% Renewable</span>
        </div>
      )}
    </div>
  );
};