
# Prompt Amplifier

✨ Supercharge your prompt engineering workflow with a beautiful, modern, and intuitive frontend app.

## Features

## Screenshots


### Home / Intent Selection
![Prompt Amplifier Home](public/screenshots/home.png)

### Step 1: Write Content (COSTAR)
![Prompt Amplifier Write Content](public/screenshots/write-content.png)

### Step 2: Automate Task (AUTOMAT)
![Prompt Amplifier Automate Task](public/screenshots/automate-task.png)

*Screenshots show the animated background, intent-driven flow, and step-by-step prompt builder.*

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the app locally:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:5173` (or as shown in your terminal).

3. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Project Structure
- `src/App.tsx` — Main app container and layout
- `src/components/IntentPicker.tsx` — Intent selection UI
- `src/components/FrameworkForm.tsx` — Step-by-step prompt builder
- `src/components/Confetti.tsx` — Confetti animation
- `src/data/templates.ts` — Prompt frameworks and field definitions
- `src/index.css` — Global styles and font imports


## Credits
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).

## License
MIT

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
