import { useEffect, useRef, useState } from 'react';
import { Dna } from 'lucide-react';
import { PedigreeNode, ROLE_LABELS } from '../data/pedigrees';

type Tone = 'dark' | 'light';

interface PedigreeChartProps {
  data: PedigreeNode;
  variant?: 'horizontal' | 'vertical';
  tone?: Tone;
  className?: string;
}

// ─── Vertical branch (file-tree style) — used on light sections / vertical variant. ──
function VerticalBranch({ node, tone, root = false }: { node: PedigreeNode; tone: Tone; root?: boolean }) {
  return (
    <div className="pedigree-branch">
      <div className={`pedigree-card${root ? ' pedigree-card--root' : ''}${tone === 'dark' ? ' pedigree-card--dark' : ''}`}>
        <div className="pedigree-card__media">
          {node.photo ? <img src={node.photo} alt={node.name} loading="lazy" /> : <Dna className="w-6 h-6" />}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="pedigree-card__role">{ROLE_LABELS[node.role]}</span>
          <span className="pedigree-card__name">{node.name}</span>
          {node.meta?.map((line, i) => (
            <span key={i} className="pedigree-card__meta">{line}</span>
          ))}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="pedigree-children">
          {node.children.map((child, i) => (
            <VerticalBranch key={i} node={child} tone={tone} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Horizontal branch (bracket chart) — [card left][children column right].
//     Gold (accent) bracket connectors, see .pedigree-h-* in index.css. ──────
function HorizontalBranch({ node, root = false }: { node: PedigreeNode; root?: boolean }) {
  return (
    <div className="pedigree-h-branch">
      <div className={`pedigree-h-card${root ? ' pedigree-h-card--root' : ''}`}>
        {node.photo && (
          <div className="pedigree-h-card__media">
            <img src={node.photo} alt={node.name} loading="lazy" />
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="pedigree-card__role">{ROLE_LABELS[node.role]}</span>
          <span className="pedigree-h-card__name">{node.name}</span>
          {node.meta?.map((line, i) => (
            <span key={i} className="pedigree-h-card__meta">{line}</span>
          ))}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="pedigree-h-children">
          {node.children.map((child, i) => (
            <HorizontalBranch key={i} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Horizontally-scrollable wrapper with edge-fade scroll hints.
//     A fade appears on whichever side still has hidden content. ─────────────
function ScrollableChart({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setEdges({
        left: el.scrollLeft > 4,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  const fade = tone === 'dark' ? 'from-secondary' : 'from-bg-light';

  return (
    <div className="relative">
      <div ref={ref} className="overflow-x-auto pb-3">
        {children}
      </div>
      <div
        className={`pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-16 bg-gradient-to-r ${fade} to-transparent transition-opacity duration-300 ${edges.left ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-16 bg-gradient-to-l ${fade} to-transparent transition-opacity duration-300 ${edges.right ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default function PedigreeChart({ data, variant = 'horizontal', tone = 'dark', className = '' }: PedigreeChartProps) {
  if (variant === 'vertical') {
    return (
      <div className={`pedigree${tone === 'dark' ? ' pedigree--dark' : ''} ${className}`}>
        <VerticalBranch node={data} tone={tone} root />
      </div>
    );
  }

  return (
    <ScrollableChart tone={tone}>
      <div className={`pedigree-h ${className}`}>
        <HorizontalBranch node={data} root />
      </div>
    </ScrollableChart>
  );
}
