import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddTodo.scss';

const AddTodo = ({ addItem }) => {
  const [todoItem, setTodoItem] = useState({
    title: '',
  }); // 사용자 입력을 저장할 객체 (id, title, done에 대한 정보를 저장해야하므로 객체 자료형 사용!)

  // Add 핸들러 추가 (부모 컴포넌트 App에서 add 함수를 props로 받아옴)
  const onAddButtonClick = () => {
    addItem(todoItem); // add 함수 사용
    setTodoItem({
      title: '',
    }); // 상태 초기화
  };

  // Enter 키 입력시 아이템 추가
  const onEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddButtonClick();
    }
  };

  return (
    <div className="AddTodo">
      <input
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
        onKeyPress={onEnterKeyPress}
      />
      <button onClick={onAddButtonClick}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default AddTodo;
