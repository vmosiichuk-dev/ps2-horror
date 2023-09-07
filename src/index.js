import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import RootContent from "./components/root-content"

const root = createRoot(document.getElementById("root"))
root.render(
	<StrictMode>
		<RootContent />
	</StrictMode>
)