import babel from '@rolldown/plugin-babel';
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset({
      logger: {
        logEvent(filename: string | null, event: any) {
          const file = filename ? filename.split('/').slice(-2).join('/') : '?';
          const name = event.fnLoc?.identifierName ?? event.fnName ?? '<anon>';
          if (event.kind === 'CompileSuccess') {
            console.log(`[RC ✓] ${file} :: ${name}`);
          } else if (event.kind === 'CompileSkip') {
            console.log(`[RC -] ${file} :: ${name} — ${event.reason ?? ''}`);
          } else if (event.kind === 'CompileError') {
            const d = event.detail;
            const reason = d?.reason ?? d?.description ?? d?.message ?? '';
            const loc = d?.loc ? ` @${d.loc.start?.line}:${d.loc.start?.column}` : '';
            console.log(`[RC ✗] ${file} :: ${name} — ${reason}${loc}`);
          } else if (event.kind === 'PipelineError') {
            console.log(`[RC !] ${file} :: ${name} — ${event.data ?? ''}`);
          }
        },
      },
    } as any)] }),
    tailwindcss(),
    visualizer() as PluginOption
  ],
});
