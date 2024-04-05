import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import CanvasKitInit from 'canvaskit-wasm/bin/canvaskit.js';
import CanvasKitWasm from 'canvaskit-wasm/bin/canvaskit.wasm?url';
import './index.css';

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(<LazyLoad />);

function LazyLoad() {
  const Inner = lazy(async () => {
    // @ts-ignore
    global.CanvasKit = await CanvasKitInit({ locateFile: () => CanvasKitWasm });
    // @ts-ignore
    return import('../src/App');
  });

  return (
    <Suspense>
      <Inner />
    </Suspense>
  );
}
