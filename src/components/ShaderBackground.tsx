import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

export default function ShaderBackground() {
  return (
    <Shader style={{ width: '100%', height: '100%' }}>
      <Swirl colorA="#0F172A" colorB="#1E293B" detail={1.7} />
      <ChromaFlow
        baseColor="#0F172A"
        downColor="#2563EB"
        leftColor="#1D4ED8"
        rightColor="#3B82F6"
        upColor="#1E40AF"
        momentum={13}
        radius={3.5}
      />
      <FlutedGlass
        aberration={0.61}
        angle={31}
        frequency={8}
        highlight={0.06}
        highlightSoftness={0}
        lightAngle={-90}
        refraction={4}
        shape="rounded"
        softness={1}
        speed={0.15}
      />
      <FilmGrain strength={0.05} />
    </Shader>
  );
}
