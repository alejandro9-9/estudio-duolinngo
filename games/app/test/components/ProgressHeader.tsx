import styles from "../quiz.module.css";

type ProgressHeaderProps = {
  progress: number;
  showBack?: boolean;
};

export default function ProgressHeader({ progress, showBack = false }: ProgressHeaderProps) {
  return (
    <div className="fixed top-0 left-0 w-full p-6 flex items-center justify-center space-x-4 max-w-2xl mx-auto">
      <button
        type="button"
        className={`text-gray-500 hover:text-white ${showBack ? "" : "hidden"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex-1 h-4 bg-[#37464f] rounded-full overflow-hidden">
        <div
          className={`h-full bg-[#58cc02] ${styles.progressBarFill}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-gray-500 font-bold">X</div>
    </div>
  );
}
