# 포트폴리오 콘텐츠 작성

`ko/`, `en-US/` 아래의 Markdown을 수정합니다. `pnpm dev`에서 페이지를
새로고침해 확인하고, 커밋 후 재배포하면 운영 사이트에 반영됩니다.
기존 블로그의 Supabase 데이터나 Git에서 제외된 `posts/`와 독립적입니다.
`pnpm build`는 두 언어의 공개 콘텐츠도 검증합니다. 전체 사이트 빌드에는
기존 블로그의 Supabase 환경 설정과 네트워크 접근이 필요합니다.

## 소개와 연락처

`profile.md`의 필수 frontmatter는 `title`, `contactTitle`입니다.
제목의 줄바꿈은 YAML 큰따옴표 문자열 안의 `\n`으로 작성합니다.
`contactDescription`, `github`(HTTP/S URL), `email`(이메일 주소)은 선택입니다.
본문에는 소개를 작성합니다. 설정하지 않은 연락 링크는 표시하지 않습니다.

## 프로젝트

`projects/my-project.md`를 추가하면 자동 등록됩니다. 파일명(확장자 제외)이
URL의 프로젝트 ID이므로 번역 파일도 같은 이름을 사용하세요.

```markdown
---
title: "프로젝트 이름"
summary: "해결한 문제를 한 문장으로 설명합니다."
order: 1
featured: true
draft: false
example: false
cover: "/portfolio/my-project/cover.webp"
coverAlt: "프로젝트의 주요 화면"
stack: [React, TypeScript]
role: "담당한 역할"
problem: "해결한 문제"
outcome: "확인한 결과"
links:
  github: "https://github.com/your-name/your-project"
  demo: "https://example.com"
---

프로젝트의 배경과 **본인의 기여**를 소개합니다.
```

필수 항목은 `title`, `summary`, 숫자 `order`입니다. 이미지가 있으면
`coverAlt`도 필수입니다. 나머지 항목은 생략할 수 있습니다.
`featured: true`는 대표 작업 탭에 표시하며 모든 공개 프로젝트는 아카이브에
표시합니다. 아카이브에서 선택하면 대표 작업 영역에 해당 프로젝트가 열립니다.
대표 프로젝트가 없으면 첫 공개 프로젝트를 표시합니다.
`draft: true`는 공개 목록에서 제외합니다. `featured`, `draft`, `example`의
기본값은 false입니다. 예시 콘텐츠를 실제 작업으로 바꿀 때 `example`도 변경하세요.
정렬은 `order` 오름차순, 같은 값이면 파일명순입니다.

## 경험

`experiences/my-experience.md`를 추가합니다. 필수 항목은 `title`, `period`,
숫자 `order`이며, `role`, `example`, `draft`는 선택입니다.
기간은 `"2024.03 — 2025.02"`처럼 문자열로 작성하세요.
본문에는 주요 기여와 배운 점을 작성합니다.

## 이미지와 Markdown

이미지는 `public/portfolio/my-project/cover.webp`처럼 저장하고
`/portfolio/my-project/cover.webp`로 참조합니다. 경로 대소문자를 일치시키세요.
누락된 이미지, 잘못된 YAML, 필수 항목 오류는 파일명과 함께 보고됩니다.
초안은 이미지/필수 콘텐츠 검증에서 제외하지만 YAML은 유효해야 합니다.

본문은 문단, 제목, 강조, 목록, 링크, 이미지, 표, 코드 블록을 지원합니다.
본문 이미지도 `/portfolio/` 아래 로컬 파일을 사용합니다. HTML과 MDX는
실행하지 않습니다. 링크는 HTTP/S, mailto, `/`로 시작하는 내부 경로와
`#` 앵커를 사용합니다. 제목은 페이지 제목과 겹치지 않도록 한 단계 낮춰 렌더링합니다.

번역이 없는 프로젝트/경험은 해당 언어에서 표시하지 않습니다. 각 언어의
`profile.md`는 필수입니다. 프로젝트/경험 폴더가 비어 있으면 빈 상태를 표시합니다.
탐색 문구는 `messages/*.json`의 `Portfolio`에서 관리합니다.

가로 포트폴리오 주소는 `/{locale}/portfolio?section=work&project=my-project`
형식입니다. 섹션 값은 intro, work, archive, experience입니다.
프로젝트 상세 페이지는 아직 제공하지 않습니다.

## 커버 이미지 갤러리

커버를 클릭하면 프로젝트 이미지 모달이 열립니다. Markdown 파일명이 프로젝트
ID입니다. 예를 들어 `projects/soai.md`의 이미지는 `public/portfolio/soai/`에
저장하세요. 두 언어가 같은 이미지 폴더를 사용하며 별도 이미지 목록은 필요 없습니다.

폴더 바로 아래의 PNG, JPG/JPEG, WebP, GIF, AVIF, SVG 파일을 자동 수집합니다.
하위 폴더는 포함하지 않습니다. 커버가 이 폴더에 있으면 먼저 보여주고 나머지는
숫자를 고려한 파일명순으로 표시합니다. `01-main.png`, `02-detail.png`처럼
이름을 붙여 순서를 지정하세요. GIF는 애니메이션을 유지합니다.

폴더가 비어 있거나 없으면 준비 중 안내가 나옵니다. 커버가 없는 예시 화면에는
갤러리 버튼이 표시되지 않습니다. 아카이브의 커버는 갤러리를 열고, 제목과 목록은
대표 작업으로 이동합니다. 운영 사이트에는 이미지 추가 후 재빌드·배포해야 반영됩니다.
