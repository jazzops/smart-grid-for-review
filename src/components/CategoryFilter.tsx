import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "All" },
  { id: "framework", label: "Frameworks" },
  { id: "library", label: "Libraries" },
  { id: "software", label: "Software" },
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export const CategoryFilter = ({ selected, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 p-1 border rounded-lg">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            selected === category.id
              ? "bg-emerald-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
};