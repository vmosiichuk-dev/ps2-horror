import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@api': '/src/api',
			'@components': '/src/components',
			'@constants': '/src/constants',
			'@images': '/src/assets/images',
			'@pages': '/src/pages',
			'@store': '/src/store',
			'@styles': '/src/assets/styles'
		}
	}
});
