import { generateIcons } from "@vkontakte/icons-scripts";

generateIcons({
	srcDirectory: "./src",
	distDirectory: "./dist",
	tsFilesDirectory: "./ts",
	extraCategories: ["38h", "100", "106", "120", "126", "300", "Onboarding", "Unsorted"],
});
