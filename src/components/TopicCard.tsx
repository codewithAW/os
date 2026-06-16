import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface TopicCardProps {
  icon: IconType;
  title: string;
  description: string;
  to: string;
}

export default function TopicCard({ icon: Icon, title, description, to }: TopicCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card group rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-glow transition"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-md shadow-cyan-500/10">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
      <Link
        to={to}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition group-hover:underline"
      >
        Explore
      </Link>
    </motion.article>
  );
}
