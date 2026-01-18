import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "./src/lib/prisma.ts",
      "./src/hooks/use-fetch.ts",
      "./src/app/(main)/dashboard/_components/other-users.tsx",
      "./src/components/availability/availability-form.tsx"
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-used-vars": "off",
    },
  },
];

export default eslintConfig;
