import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  stars: number;
  url: string;
}

export const ResourceCard = ({
  title,
  description,
  category,
  stars,
  url,
}: ResourceCardProps) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="block overflow-hidden bg-white border rounded-lg shadow-sm transition-all hover:shadow-md"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
            {category}
          </span>
          <div className="flex items-center text-gray-500">
            <Star className="w-4 h-4 mr-1" />
            <span className="text-sm">{stars.toLocaleString()}</span>
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.a>
  );
};