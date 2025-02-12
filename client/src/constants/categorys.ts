import { FaPalette, FaFlask, FaLeaf, FaBuilding, FaHome } from 'react-icons/fa';
import { IconType } from 'react-icons';

const questCategories: Category[] = [
  { id: 'all', name: 'ALL', icon: FaHome },
  { id: 'art', name: 'ART', icon: FaPalette },
  { id: 'science', name: 'SCIENCE', icon: FaFlask },
  { id: 'nature', name: 'NATURE', icon: FaLeaf },
  { id: 'architecture', name: 'ARCHITECTURE', icon: FaBuilding },
] as const;

export type questCategory = (typeof questCategories)[number];
export interface Category {
  id: string;
  name: string;
  icon: IconType;
}

export default questCategories;
