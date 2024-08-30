import { GitFork } from "lucide-react";
import Calculator from "@/components/calculator";

export default function Home(): React.ReactNode {
  return (
    <main className="flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Turbo-Next-Rust Calculator
      </h1>
      <Calculator />
      <p className="text-center mt-8 text-sm">
        Powered by Rust, WebAssembly, and Next.js and TurboRepo
      </p>
      <div className="mt-8 flex justify-center">
        <a
          className="flex items-center space-x-2 underline"
          href="https://github.com/yourusername/turbo-next-rust-calculator"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitFork className="w-5 h-5" />
          <span className="mt-0">Fork on GitHub</span>
        </a>
      </div>
    </main>
  );
}
