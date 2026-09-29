// LocalStorage 저장 키 선언
const STORAGE_KEY = 'mytodo_app_items';

// 1. 페이지 로드 시 LocalStorage에서 할 일 데이터 로드 (없을 경우 빈 배열)
let todos = loadFromLocalStorage();

// DOM 요소 참조
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyMsg = document.getElementById('emptyMsg');
const todoStats = document.getElementById('todoStats');

/**
 * LocalStorage에서 데이터 불러오기
 */
function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('LocalStorage 로드 실패:', e);
    return [];
  }
}

/**
 * 2. 할 일 추가/삭제/완료 시 LocalStorage 자동 저장
 */
function saveToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('LocalStorage 저장 실패:', e);
  }
}

/**
 * 3. 할 일 개수 통계 표시 (전체 N개, 완료 N개)
 */
function updateStats() {
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;

  if (todoStats) {
    todoStats.textContent = `전체 ${totalCount}개 · 완료 ${completedCount}개`;
  }
}

/**
 * XSS 방지 이스케이프 함수
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 할 일 목록 및 통계 화면 렌더링
 */
function renderTodos() {
  // 개수 통계 업데이트
  updateStats();

  // 등록된 할 일이 없는 경우 처리
  if (todos.length === 0) {
    emptyMsg.style.display = 'block';
    todoList.innerHTML = '';
    return;
  }

  emptyMsg.style.display = 'none';

  // <li> 목록 HTML 구성
  todoList.innerHTML = todos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <div class="todo-item-content">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
        <span class="todo-text">${escapeHtml(todo.text)}</span>
      </div>
      <button class="todo-delete-btn" onclick="deleteTodo(${todo.id})" title="삭제">🗑️</button>
    </li>
  `).join('');
}

/**
 * 할 일 추가 기능
 */
function addTodo() {
  const text = todoInput.value.trim();

  // 빈 값 예외 처리
  if (text === '') {
    alert('할 일을 입력하세요');
    todoInput.focus();
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  
  // 자동 저장 및 렌더링
  saveToLocalStorage();

  todoInput.value = '';
  todoInput.focus();
  renderTodos();
}

/**
 * 할 일 완료/미완료 토글 기능
 */
function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  // 자동 저장 및 렌더링
  saveToLocalStorage();
  renderTodos();
}

/**
 * 할 일 삭제 기능
 */
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  // 자동 저장 및 렌더링
  saveToLocalStorage();
  renderTodos();
}

/**
 * 앱 초기화 및 이벤트 등록
 */
function initApp() {
  addBtn.addEventListener('click', addTodo);

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // Inline event handlers용 전역 함수 등록
  window.toggleTodo = toggleTodo;
  window.deleteTodo = deleteTodo;

  // 페이지 새로고침 시에도 기존 저장 데이터로 렌더링
  renderTodos();
}

document.addEventListener('DOMContentLoaded', initApp);
