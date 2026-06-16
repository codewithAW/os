import { useEffect, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useAppStore } from '../stores/useAppStore';
import { searchTopics } from '../data/topicData';

export default function SearchBar() {
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);

  const results = useMemo(
    () =>
      searchTopics.filter((topic) =>
        topic.toLowerCase().includes(query.trim().toLowerCase()) && query.trim().length > 0,
      ),
    [query],
  );

  useEffect(() => {
    if (!query.trim()) return;
    const timeout = setTimeout(() => {
      setQuery(query);
    }, 200);
    return () => clearTimeout(timeout);
  }, [query, setQuery]);

  return (
    <div className="glass-card rounded-[28px] border-base bg-surface-overlay p-4 shadow-glow backdrop-blur-xl">
      <label className="relative block">
        <span className="sr-only">Search topics</span>
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--accent)/0.7]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics across the platform..."
          className="w-full rounded-3xl border border-base bg-[color:var(--surface-base)/0.92] py-4 pl-12 pr-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)/0.18]"
          aria-label="Search topics"
        />
      </label>
      {results.length > 0 && (
        <div className="mt-3 grid gap-2 text-sm text-[var(--text-body)]">
          {results.slice(0, 6).map((topic) => (
            <div key={topic} className="rounded-3xl border border-base bg-[color:var(--surface-elevated)/0.92] px-4 py-3 text-[var(--text-body)]">
              {topic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
