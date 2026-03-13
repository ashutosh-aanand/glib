import React from 'react';

type FretValue = number | 'x' | 'o';

type ChordBoxProps = {
  name: string;
  positions: [FretValue, FretValue, FretValue, FretValue, FretValue, FretValue];
  fret?: number;
};

const stringOrder = ['Low E', 'A', 'D', 'G', 'B', 'High E'];

export default function ChordBox({ name, positions, fret = 1 }: ChordBoxProps) {
  return (
    <figure className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-slate-100" aria-label={`${name} chord diagram`}>
      <figcaption className="mb-2 text-sm font-semibold">{name}</figcaption>
      <div className="grid grid-cols-6 gap-2 text-center text-xs" role="img" aria-label={`${name} fretting positions by string`}>
        {positions.map((position, index) => (
          <div key={`${index}-${position}`} className="rounded bg-slate-800 px-2 py-1">
            <span className="block text-[10px] text-slate-400">{stringOrder[index]}</span>
            <span>{position}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-400">Fret {fret} position</p>
    </figure>
  );
}
