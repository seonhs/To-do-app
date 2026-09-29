# 📝 나의 할 일 목록 (To-Do App)

HTML5, CSS3, 순수 자바스크립트(Vanilla JS)로 제작된 반응형 투두(To-Do) 웹 애플리케이션입니다.

---

## ✨ 주요 기능 (Features)

- 📌 **할 일 추가**: 텍스트 입력 후 `추가` 버튼 클릭 또는 `Enter` 키로 손쉽게 등록
- ⚠️ **유효성 검사**: 공백 입력 시 경고 알림(`alert`) 처리
- 솜 **완료/미완료 토글**: 체크박스 클릭 시 취소선 및 색상 변경
- 🗑️ **할 일 삭제**: 항목 삭제 버튼을 통해 목록에서 제거
- 💾 **LocalStorage 영구 저장**: 브라우저 새로고침이나 재접속 시에도 작성한 목록이 유지됨
- 📊 **실시간 개수 통계**: 상단 통계 배지를 통해 `전체 N개 · 완료 N개` 상태 실시간 확인
- 🎨 **모던 UI/UX**: 깔끔한 카드 스타일 (최대 너비 500px) 및 그라데이션 배경 디자인

---

## 📁 프로젝트 구조 (Project Structure)

```text
To do/
├── index.html    # 앱 구조 및 HTML 마크업
├── style.css     # 카드 레이아웃 및 반응형 스타일시트
├── main.js       # LocalStorage 연동 및 투두 관리 자바스크립트 로직
└── README.md     # 프로젝트 설명 문서
```

---

## 🚀 실행 방법 (Getting Started)

1. 저장소를 클론합니다:
   ```bash
   git clone https://github.com/seonhs/To-do-app.git
   ```
2. `index.html` 파일을 라이브 서버 또는 웹 브라우저에서 실행합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **LocalStorage API**
