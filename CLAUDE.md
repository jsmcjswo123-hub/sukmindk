# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev          # 개발 서버 (http://localhost:5173, HMR 활성화)
npm run build        # tsc 타입 검사 → vite 프로덕션 빌드 (dist/)
npm run preview      # dist/ 로컬 미리보기
npm run lint         # ESLint 실행
npm run typecheck    # tsc --noEmit (빌드 없이 타입 검사만)
```

## 아키텍처

**데이터 흐름:** `useTodos` 훅 → `App` → 컴포넌트

`useTodos`(`src/hooks/useTodos.ts`)가 유일한 상태 저장소다. `todos[]`와 `filter` 상태를 관리하고, `filteredTodos`를 파생해서 반환한다. `App.tsx`는 훅과 컴포넌트를 연결하는 얇은 조합 레이어로, 자체 상태나 로직 없이 props만 전달한다.

**localStorage 연동:** `useTodos`가 `'todos'` 키로 자동 직렬화/역직렬화한다. `useState(loadTodos)`로 초기값을 한 번만 읽고, `useEffect`로 변경마다 저장한다. `TodoInput`은 자체 `value` 상태를 관리하고 제출 시에만 부모(`onAdd`)에 전달한다.

**CSS:** BEM 방식. 블록은 컴포넌트명 기반 (`todo-item`, `todo-input`, `todo-filter`). 전역 변수는 `src/index.css`의 `:root`에 정의. 컴포넌트별 스타일은 `src/App.css`에 모두 포함.

## 코드 스타일

- 컴포넌트 반환 타입: `React.JSX.Element` 명시
- Props: `interface` 선언 (type alias 지양)
- export: named export 사용 (`App.tsx`만 default export 예외)
- 수동 메모이제이션(`useMemo`, `useCallback`, `memo`) 금지 — React Compiler(babel-plugin-react-compiler)가 자동 처리
- `any` 금지 — ESLint `@typescript-eslint/no-explicit-any: error` 로 강제

## 커밋 규칙

Conventional Commits + 한글 메시지: `<타입>: <한글 설명>`

타입: `feat` / `fix` / `refactor` / `style` / `test` / `chore` / `docs`

예시: `feat: 할 일 완료 토글 기능 추가`

## 절대 수정 금지 파일

`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `package.json`, `package-lock.json`, `eslint.config.js`, `src/vite-env.d.ts`

변경이 필요하면 반드시 사용자에게 먼저 확인할 것.

## 문제 해결 우선순위

1. 실제 동작하는 해결책
2. 기존 코드 패턴 분석 및 일관성 유지
3. 타입 안전성 보장
4. 재사용 가능한 구조
