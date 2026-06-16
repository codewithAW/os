import { FaChalkboardTeacher, FaMicrochip, FaProjectDiagram, FaStream, FaCogs } from 'react-icons/fa';

export const navSections = [
  { title: 'Home', path: '/', icon: FaChalkboardTeacher },
  { title: 'CPU Management', path: '/cpu', icon: FaMicrochip },
  { title: 'Processor Info', path: '/processor-info', icon: FaCogs },
  { title: 'Process Management', path: '/process-management', icon: FaProjectDiagram },
  { title: 'Thread Management', path: '/thread-management', icon: FaStream },
  { title: 'Instruction Management', path: '/instruction-management', icon: FaMicrochip },
];
