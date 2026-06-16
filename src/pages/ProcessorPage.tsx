import { processorGenerations, amdSeries, intelSeries } from '../data/processorData';
import SectionTitle from '../components/SectionTitle';

function SeriesCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="rounded-3xl surface-card p-5 shadow-glow">
      <h4 className="text-lg font-semibold text-primary">{name}</h4>
      <p className="mt-3 text-sm text-muted">{description}</p>
    </div>
  );
}

export default function ProcessorPage() {
  return (
    <div className="space-y-10">
      <SectionTitle title="Processor Information" subtitle="Intel and AMD platform learning" />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-5 surface-panel p-6 shadow-glow backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-primary">Intel Processor Series</h3>
          <p className="text-muted">Compare Intel families by usage scenario, performance, and device fit.</p>
          <div className="mt-6 grid gap-4">
            {intelSeries.series.map((series) => (
              <SeriesCard key={series} name={series} description={intelSeries.details[series]} />
            ))}
          </div>
        </div>
        <div className="space-y-5 surface-panel p-6 shadow-glow backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-primary">AMD Processor Series</h3>
          <p className="text-muted">Explore AMD series designed for notebooks, mobile workstations, and gaming platforms.</p>
          <div className="mt-6 grid gap-4">
            {amdSeries.series.map((series) => (
              <SeriesCard key={series} name={series} description={amdSeries.details[series]} />
            ))}
          </div>
        </div>
      </div>

      <div className="surface-panel p-6 shadow-glow backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-primary">Processor Generations</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl surface-card p-5">
            <p className="text-accent">Intel Generations</p>
            <div className="grid gap-3">
              {processorGenerations.intel.map((generation) => (
                <div key={generation} className="rounded-3xl surface-panel p-4 text-sm text-muted">
                  {generation}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-3xl surface-card p-5">
            <p className="text-accent">AMD Generations</p>
            <div className="grid gap-3">
              {processorGenerations.amd.map((generation) => (
                <div key={generation} className="rounded-3xl surface-panel p-4 text-sm text-muted">
                  {generation}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-[color:var(--accent)/0.2] bg-[color:var(--surface-elevated)/0.92] p-5 text-muted">
          <h4 className="text-lg font-semibold text-primary">Interactive Comparison</h4>
          <p className="mt-2 text-sm text-muted">
            Each generation balances power, efficiency, and performance. Explore how CPU updates improve instruction throughput and thermal behavior.
          </p>
        </div>
      </div>
    </div>
  );
}
