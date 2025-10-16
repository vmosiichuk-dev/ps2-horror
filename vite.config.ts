import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@api': '/src/api',
			'@components': '/src/components',
			'@constants': '/src/constants',
			'@data': '/src/data',
			'@images': '/src/assets/images',
			'@store': '/src/store',
			'@styles': '/src/assets/styles',
			'@utils': '/src/utils'
		}
	}
});
