# CLAUDE.md

## 프로젝트 개요

간단한 투두리스트 웹 앱 — 할 일 추가/완료/삭제 기능을 갖춘 React SPA.

## 기술 스택

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `react` | 19.2.7 | UI 라이브러리 |
| `react-dom` | 19.2.7 | DOM 렌더링 |
| `typescript` | 6.0.3 | 정적 타입 시스템 |
| `vite` | 8.0.16 | 빌드 도구 및 개발 서버 |
| `@vitejs/plugin-react` | 6.0.2 | Vite용 React 플러그인 (OXC 기반) |
| `babel-plugin-react-compiler` | 1.0.0 | React Compiler (자동 메모이제이션) |
| `eslint` | 9.39.4 | 코드 린터 |
| `typescript-eslint` | 8.60.1 | TypeScript ESLint 통합 |
| `eslint-plugin-react-hooks` | 5.2.0 | React Hooks 린트 규칙 |

**주의사항:**
- 수동 메모이제이션(`useMemo`, `useCallback`, `memo`) 사용 금지 — React Compiler가 자동 처리
- CRA(Create React App) 사용 금지 — Vite 사용

## 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173, HMR 활성화)
npm run dev

# 프로덕션 빌드 (tsc 타입 검사 후 vite build)
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview

# ESLint 실행
npm run lint

# TypeScript 타입 검사만 (빌드 없이)
npm run typecheck

# 테스트 실행
npm test
```

**빌드 결과물:** `dist/` 폴더 (git 추적 제외)

## 코드 스타일

### 컴포넌트
- 함수형 컴포넌트만 사용, 명시적 반환 타입 `React.JSX.Element` 필수
- Props 타입은 `interface` 선언 (`type` 지양), 파일 상단에 위치
- 컴포넌트 파일명과 export 이름 일치 (named export 사용, default export 금지 — `App.tsx` 제외)

```tsx
// Good
interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
}

export function TodoItem({ todo, onToggle }: Props): React.JSX.Element { ... }
```

### 파일 및 폴더 네이밍
- 컴포넌트: `PascalCase.tsx` (예: `TodoItem.tsx`)
- 커스텀 훅: `camelCase.ts`, `use` 접두사 필수 (예: `useTodos.ts`)
- 타입/유틸: `camelCase.ts` (예: `todo.ts`)

### 상태 관리
- `useState` / `useReducer` 우선, 전역 상태 필요 시 Context API
- 상태 로직은 커스텀 훅으로 분리 (`src/hooks/`)

### 스타일
- 컴포넌트 이름 기반 BEM 클래스명 사용 (예: `todo-item`, `todo-item__text`, `todo-item--completed`)
- CSS 파일은 대응하는 컴포넌트 파일 옆에 위치
- 인라인 스타일 사용 금지

## 타입 안전성

- `any` 사용 금지 — 불가피한 경우 `unknown` + 타입 가드 사용
- `tsconfig.app.json`의 `strict`, `noUnusedLocals`, `noUnusedParameters` 옵션 유지
- 외부 입력(localStorage, 사용자 입력)은 반드시 타입 검증 후 사용

## 절대 수정 금지 파일

아래 파일들은 프로젝트 설정의 근간이므로 **기능 추가/수정 목적으로 절대 변경하지 말 것.**
변경이 필요한 경우 반드시 사용자에게 먼저 확인할 것.

| 파일 | 이유 |
|------|------|
| `tsconfig.json` | 프로젝트 레퍼런스 루트 설정 |
| `tsconfig.app.json` | 앱 TypeScript 컴파일 옵션 (strict 모드 포함) |
| `tsconfig.node.json` | Vite 설정 파일용 TypeScript 옵션 |
| `vite.config.ts` | 빌드 도구 핵심 설정 |
| `package.json` | 의존성 및 스크립트 정의 |
| `package-lock.json` | 의존성 버전 잠금 (npm install 외 직접 수정 금지) |
| `eslint.config.js` | 린트 규칙 정의 |
| `src/vite-env.d.ts` | Vite 클라이언트 타입 선언 |
| `.gitignore` | Git 추적 제외 목록 |

## 커밋 규칙

Conventional Commits + 한글 메시지:

```
<타입>: <한글 설명>
```

| 타입 | 용도 |
|------|------|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩터링 (기능 변경 없음) |
| `style` | 포맷/스타일 (로직 변경 없음) |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 패키지, 설정 변경 |
| `docs` | 문서 수정 |

예시:
- `feat: 할 일 완료 토글 기능 추가`
- `fix: 빈 문자열 입력 시 추가되는 버그 수정`
- `refactor: TodoItem 컴포넌트 분리`

## 문제 해결 우선순위

1. **실제 동작하는 해결책** — 완벽한 설계보다 동작하는 코드 우선
2. **기존 코드 패턴 분석** — 새 코드 작성 전 패턴 파악 후 일관성 유지
3. **타입 안전성 보장** — 타입 오류는 런타임 전에 해결
4. **재사용 가능한 구조** — 중복 제거, 단일 책임 원칙 준수

## 폴더 구조

```
src/
├── components/   # UI 컴포넌트 (PascalCase.tsx)
├── hooks/        # 커스텀 훅 (useName.ts)
├── types/        # 공용 TypeScript 타입/인터페이스
└── utils/        # 순수 유틸리티 함수
```
