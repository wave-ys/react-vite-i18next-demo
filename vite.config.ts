import {defineConfig, PluginOption} from 'vite'
import react from '@vitejs/plugin-react-swc'

function i18nHotReload(): PluginOption {
  return {
    name: "i18n-hot-reload",
    handleHotUpdate({ file, server }) {
      if (file.includes("locales") && file.endsWith(".json")) {
        server.ws.send({
          type: "custom",
          event: "locales-update",
        });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), i18nHotReload()],
})
