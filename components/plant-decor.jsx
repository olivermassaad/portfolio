export default function PlantDecor() {
  return (
    <div className="plant-decor" aria-hidden="true">
      <svg
        className="plant-decor-piece plant-decor-vine-left"
        viewBox="0 0 140 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 250C34 214 18 178 32 142C42 116 58 96 52 68C48 48 34 30 40 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M52 68C72 62 88 48 104 52C92 58 78 70 66 82"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M32 142C14 132 6 118 8 102C22 112 36 124 48 138"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="78" cy="54" rx="11" ry="7" transform="rotate(-24 78 54)" fill="currentColor" opacity="0.35" />
        <ellipse cx="22" cy="126" rx="10" ry="6" transform="rotate(32 22 126)" fill="currentColor" opacity="0.3" />
        <ellipse cx="58" cy="88" rx="9" ry="5.5" transform="rotate(-8 58 88)" fill="currentColor" opacity="0.28" />
        <ellipse cx="44" cy="168" rx="10" ry="6" transform="rotate(18 44 168)" fill="currentColor" opacity="0.32" />
      </svg>

      <svg
        className="plant-decor-piece plant-decor-branch-right"
        viewBox="0 0 120 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M88 8C82 34 94 58 78 82C66 100 48 112 54 136C58 152 72 168 64 188"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M78 82C62 74 46 62 34 64C48 72 60 84 70 96"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M54 136C38 142 24 154 18 168C32 158 44 148 56 138"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="42" cy="60" rx="10" ry="6" transform="rotate(22 42 60)" fill="currentColor" opacity="0.3" />
        <ellipse cx="86" cy="28" rx="9" ry="5.5" transform="rotate(-16 86 28)" fill="currentColor" opacity="0.28" />
        <ellipse cx="28" cy="160" rx="11" ry="6.5" transform="rotate(36 28 160)" fill="currentColor" opacity="0.32" />
      </svg>

      <svg
        className="plant-decor-piece plant-decor-sprig-bottom"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 68C28 58 42 42 58 46C72 50 82 62 94 56"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="36" cy="52" rx="8" ry="5" transform="rotate(-18 36 52)" fill="currentColor" opacity="0.26" />
        <ellipse cx="68" cy="48" rx="7" ry="4.5" transform="rotate(12 68 48)" fill="currentColor" opacity="0.24" />
        <ellipse cx="52" cy="62" rx="6" ry="4" transform="rotate(-6 52 62)" fill="currentColor" opacity="0.22" />
      </svg>

      <svg
        className="plant-decor-piece plant-decor-leaf-cluster"
        viewBox="0 0 80 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 92V44M40 44C52 38 62 26 58 14M40 44C28 38 18 28 22 16M40 60C50 56 58 48 56 38M40 60C30 56 22 48 24 38"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <ellipse cx="58" cy="14" rx="7" ry="10" transform="rotate(-20 58 14)" fill="currentColor" opacity="0.22" />
        <ellipse cx="22" cy="16" rx="7" ry="10" transform="rotate(20 22 16)" fill="currentColor" opacity="0.22" />
        <ellipse cx="56" cy="38" rx="6" ry="8" transform="rotate(-12 56 38)" fill="currentColor" opacity="0.2" />
        <ellipse cx="24" cy="38" rx="6" ry="8" transform="rotate(12 24 38)" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  );
}
