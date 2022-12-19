import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { API_BASE_URL } from './app-config'; // defulat export가 아니였으므로 {} 즁괄호로 감싸주어야 함
import './styles/App.scss';

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    console.log('첫 렌더링 완료');
    const getTodos = async () => {
      let res = await axios.get(`${API_BASE_URL}/api/todos`);
      setTodoItems(res.data);
    };

    getTodos();
  }, []);

  // AddTodo 컴포넌트는 상위 컴포넌트 items에 접근 불가능
  // 상위 컴포넌트인 App은 AddTodo에 접근 가능
  // => App 컴포넌트에 add() 함수 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo에서 아용
  const addItem = async (newItem) => {
    /*
    // newItem.id = todoItems.length + 1; // key를 위한 id 추가
    newItem.id = todoId.current++;
    newItem.done = false; // done 초기화
    // 기존 아이템 유지하고 새로운 아이템 추가
    // 기존 아이템: ...todoItems
    // 새로운 아이템 추가: e.target.value
    setTodoItems([...todoItems, newItem]);
    // setTodoItems(todoItems.concat(newItem));
    */

    const res = await axios.post(`${API_BASE_URL}/api/todo`, newItem);
    // 기존 아이템: ...todoItems
    // 새로운 아이템: res.data ( {id: 15, title: 'bb', done: false} )
    setTodoItems([...todoItems, res.data]);
  };

  // 전체 Todo 리스트는 App 컴포넌트에서 관리하고 있으므로
  // deleteItem() 함수는 App 컴포넌트에 작성해야 함
  const deleteItem = async (targetItem) => {
    /*
    const newTodoItems = todoItems.filter((e) => e.id !== targetItem.id);
    setTodoItems(newTodoItems);
    */

    await axios.delete(`${API_BASE_URL}/api/todo/${targetItem.id}`);
    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  // => 즉, update() 함수를 App.js에 만들지 않아도 됐음!
  // 하지만 API를 이용해 update하려면
  // (1) Serve API를 이용해 서버 데이터를 업데이트 한 후
  // (2) 변경된 내용을 화면에 다시 출력하는 두 가지 작업 필요
  const updateItem = async (targetItem) => {
    console.log(targetItem);
    await axios.patch(`${API_BASE_URL}/api/todo/${targetItem.id}`, targetItem);
  };

  return (
    <div className="App">
      <header>✌🏻 My Todo App</header>
      <AddTodo addItem={addItem} />
      <div className="left-todos">🚀 {todoItems.length} Todos</div>
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
          // console.log(item); // { id: 1, title: 'todo1', done: false, }
          return (
            <Todo
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          );
        })
      ) : (
        <p className="empty-todos">Todo를 추가해주세요 🔥</p>
      )}
    </div>
  );
};

export default App;
