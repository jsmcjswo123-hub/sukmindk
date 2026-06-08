# CLAUDE.md

## 프로젝트 개요

간단한 투두리스트 웹 앱 — 할 일 추가/완료/삭제 기능을 갖춘 React SPA.

## 기술 스택

- **React 19** (react@^19.2.7) — React Compiler 활성화, 수동 메모이제이션(`useMemo`, `useCallback`) 지양
- **TypeScript 6.0** — strict 모드 필수
- **Vite** — 빌드 도구 (CRA 사용 금지)

## 주요 명령어

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 시작 (http://localhost:5173)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint 실행
npm run typecheck    # tsc --noEmit 타입 체크
npm test             # 테스트 실행
```

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

## 코드 스타일

- 컴포넌트: 함수형 컴포넌트 + 명시적 반환 타입
- Props: `interface` 사용 (`type` 지양)
- 상태 관리: `useState` / `useReducer` 우선, 전역 상태 필요 시 Context API
- 파일명: PascalCase (컴포넌트), camelCase (유틸/훅)
- 커스텀 훅: `use` 접두사 필수 (예: `useTodos`)

## 타입 안전성

- `any` 사용 금지 — 불가피한 경우 `unknown` + 타입 가드 사용
- API 응답, 외부 입력은 반드시 타입 검증
- `tsconfig.json` strict 옵션 유지 (`"strict": true`)

## 문제 해결 우선순위

1. **실제 동작하는 해결책** — 완벽한 설계보다 동작하는 코드 우선
2. **기존 코드 패턴 분석** — 새 코드 작성 전 패턴 파악 후 일관성 유지
3. **타입 안전성 보장** — 타입 오류는 런타임 전에 해결
4. **재사용 가능한 구조** — 중복 제거, 단일 책임 원칙 준수

## 폴더 구조

```
src/
├── components/   # UI 컴포넌트
├── hooks/        # 커스텀 훅
├── types/        # 공용 TypeScript 타입/인터페이스
└── utils/        # 순수 유틸리티 함수
```
