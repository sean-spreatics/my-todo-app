import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import '../styles/Todo.scss';

const Todo = ({ item, deleteItem, updateItem }) => {
  // console.log(item); // { id: 1, title: 'todo1', done: false, }

  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
  };

  // title 클릭시 실행될 함수: readOnly를 false로 변경
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  // readOnly true: enter키 누르면 readOnly를 true로 변경
  const enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      // TODO: 가짜 데이터에서는 단순히 true로 변경하지만 API 연결시 update api 불러와 서버에 바뀐 아이템 저장할 예정
      setReadOnly(true);
      updateItem(todoItem); // 수정1 - 엔터 누르면 저장
    }
  };

  // 커서가 깜빡인다고 수정 가능한 것은 아님: 사용자가 키보드 입력할 때마다 item 새 값으로 변경
  const editEventHandler = (e) => {
    // rest: id, done 정보
    const { title, ...rest } = todoItem;
    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  // checkbox 업데이트
  const checkboxEventHandler = (e) => {
    // rest: id, title 정보
    const { done, ...rest } = todoItem;
    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };
    setTodoItem(updatedItem);
    updateItem(updatedItem); // 수정2 - 체크 박스 변경시 저장
  };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${todoItem.id}`}
        name={`todo${todoItem.id}`}
        value={`todo${todoItem.id}`}
        defaultChecked={todoItem.done}
        onChange={checkboxEventHandler}
      />
      {/* <label htmlFor="todo0">{todoItem.title}</label> */}
      <input
        type="text"
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode}
        onKeyPress={enterKeyEventHandler}
        onChange={editEventHandler}
      />
      <button onClick={onDeleteButtonClick}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};

export default Todo;
